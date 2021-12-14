import * as THREE from 'https://cdn.skypack.dev/pin/three@v0.135.0-pjGUcRG9Xt70OdXl97VF/mode=imports,min/optimized/three.js';
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.135.0/examples/jsm/controls/OrbitControls.js';
import { evaluate_cmap } from '/assets/js/lib/js-colormaps.module.js'

function clusterToRGB(cluster_id, n_clusters) {
    if (cluster_id == -1) {
      return 0x000000;
    }

    const [r, g, b] = evaluate_cmap(cluster_id / n_clusters, COLORMAP, false);
    return `rgb(${r}, ${g}, ${b})`;
}

function groupBy(xs, key) {
  return xs.reduce(function(rv, x) {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
}

export function renderClusters(data) {
    // CSV processing
    const newspapers = data.map(p => ({
        name: p.journal,
        cluster_id: parseInt(p.cluster_id),
        position: [parseFloat(p.x2), parseFloat(p.y2), parseFloat(p.z2)]
    }));
    const cluster_count = new Set(newspapers.map(p => p.cluster_id)).size - data.includes(-1);
    const clusters = groupBy(newspapers, 'cluster_id')

    
    // Scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera( 75, 1, 0.1, 1000 );

    const renderer = new THREE.WebGLRenderer({alpha: true});
    renderer.setSize(800, 800);
    document.getElementById("clusters-visualization").appendChild( renderer.domElement );
    
    const controls = new OrbitControls( camera, renderer.domElement );

    var renderCluster = function(cluster_id, newspapers) {
        const cluster_id_int = parseInt(cluster_id);
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(newspapers.flatMap(np => np.position));
        const material = new THREE.PointsMaterial({color: new THREE.Color(clusterToRGB(cluster_id_int, cluster_count)), size: (cluster_id_int == -1) ? 0.01 : 0.05});
        const points = new THREE.Points(geometry, material);
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        points.scale.set(4, 4, 4);
        return points;
    }
    
    const all_points = Object.entries(clusters).map(group => renderCluster(...group));
    all_points.forEach(points => scene.add(points));

    camera.position.z = 5;
    function animate() {
        requestAnimationFrame( animate );
        controls.update();
        renderer.render(scene, camera);
    }

    animate();
}

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

}
