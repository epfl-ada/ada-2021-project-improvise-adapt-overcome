import {
  highlightOn,
  highlightOff,
  clusterToRGB,
} from "/assets/js/clusters.js";

const SELECTOR_ID = "panel-selector";
const BTN_CLASS = "btn";
const BTN_SELECTED_CLASS = `${BTN_CLASS} btn-selected`;

let selected_button = null;
let selected_button_id = null;

export function initPanel(clusters) {
  const panelSelector = document.getElementById(SELECTOR_ID);

  for (let cluster of clusters) {
    const button = makeButton(cluster, clusters.length);
    panelSelector.appendChild(button);
  }
}

function makeButton(cluster, n_clusters) {
  const button = document.createElement("button");
  const color = clusterToRGB(cluster.cluster_id, n_clusters);
  button.className = BTN_CLASS;
  button.innerHTML = cluster.name;

  button.style = `background-color: ${color}`;

  button.onclick = () => {
    if (selected_button_id !== cluster.cluster_id) {
      if (selected_button) {
        selected_button.setAttribute("class", BTN_CLASS);
        highlightOff();
      }

      button.className = BTN_SELECTED_CLASS;

      selected_button_id = cluster.cluster_id;
      selected_button = button;

      highlightOn(selected_button_id);
      setClusterInfo(cluster);
    } else {
      button.setAttribute("class", BTN_CLASS);
      highlightOff();

      selected_button_id = null;
      selected_button = null;
      removeClusterInfo();
    }
  };

  return button;
}

function setClusterInfo(cluster, n_clusters) {
  const panel = document.getElementById("panel-cluster");
  panel.style.display = "block";

  const panelTitle = document.getElementById("panel-cluster-title");
  panelTitle.innerText = cluster.name;

  const panelStats = document.getElementById("panel-cluster-stats");
  const journalTable = makeJournalTable(cluster.journals);
  const speakerTable = makeSpeakerTable(cluster.speakers);

  panelStats.innerHTML = journalTable + speakerTable;
  console.log(cluster);
}

function removeClusterInfo() {
  const panel = document.getElementById("panel-cluster");
  panel.style.display = "none";
}

function makeJournalTable(journals) {
  const header =
    "<tr><th colspan=2>Top journals</th></tr>" +
    "<tr><th>Rank</th><th>Name</th></tr>";
  const itemToString = (journal, index) =>
    `<td class="center">${parseInt(index) + 1}</td><td>${journal}</td>`;

  return makeTable(journals, header, itemToString);
}

function makeSpeakerTable(speakers) {
  const header =
    `<tr><th colspan=3>Top Quotes</th></tr>` +
    `<tr><th>%</th><th>Speakers</th><th>Description</th></tr>`;
  const itemToString = ([name, title, pct]) =>
    `<td class="center">${(100 * pct).toFixed(
      2
    )}<td>${name}</td><td class="table-overflow">${title}</td>`;

  return makeTable(speakers, header, itemToString);
}

function makeTable(items, header, itemToString = (x) => `<td>${x}</td>`) {
  let tableItems = `${header}`;
  for (let itemIdx in items) {
    tableItems += `<tr>${itemToString(items[itemIdx], itemIdx)}</tr>`;
  }

  return `<div class="panel-table"><table>${tableItems}</table></div>`;
}
