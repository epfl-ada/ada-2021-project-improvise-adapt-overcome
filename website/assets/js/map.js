const COLORMAP = "gist_rainbow";
const UNCLUSTERED_COLOR = "#000000";
const CIRLE_RADIUS = 5000;

function renderMap(clusters) {
  // Cast all clusters to integers
  for (let i = 0; i < clusters.length; i++) {
    clusters[i].cluster_id = Math.round(clusters[i].cluster_id);
  }

  // Compute number of clusters, not including -1
  const n_clusters = clusters
    .filter((x) => x != -1)
    .reduce((acc, x) => acc.add(Math.round(x.cluster_id)), new Set()).size;

  // Group cluster markers by cluster_id
  const markers = clusters.reduce(
    (markers, x) => createMarker(x, n_clusters, markers),
    {}
  );

  const map = initMap(n_clusters, markers);
}

/**
 * Initialise Leafelet map object and return it
 */
function initMap(n_clusters, markers) {
  const baseLayer = new L.StamenTileLayer("toner");

  // Add one layer with markers per cluster
  const overlayMaps = {};
  for (let cluster in markers) {
    overlayMaps[cluster] = L.layerGroup(markers[cluster]);
  }

  // Create map
  const map = new L.Map("map", {
    center: new L.LatLng(46.5191, 6.5668),
    zoom: 9,
    layers: [baseLayer, ...Object.values(overlayMaps)],
  });

  L.control.layers({ base: baseLayer }, overlayMaps).addTo(map);

  return map;
}

function createMarker({ cluster_id, journal, lat, lon }, n_clusters, markers) {
  if (lat && lon) {
    // Create circle object
    circle = L.circle([lat, lon], {
      color: clusterToRGB(cluster_id, n_clusters),
      fillOpacity: 1,
      radius: CIRLE_RADIUS,
    }).bindPopup(journal);

    // Add to markers map
    if (!(cluster_id in markers)) {
      markers[cluster_id] = [];
    }
    markers[cluster_id].push(circle);
  }

  return markers;
}

function clusterToRGB(cluster_id, n_clusters) {
  if (cluster_id < 0) {
    return UNCLUSTERED_COLOR;
  }

  [r, g, b] = evaluate_cmap(cluster_id / n_clusters, COLORMAP, false);
  return `rgb(${r}, ${g}, ${b})`;
}
