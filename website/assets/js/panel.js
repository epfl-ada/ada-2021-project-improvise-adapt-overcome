import { highlightOn, highlightOff } from "/assets/js/clusters.js";

const SELECTOR_ID = "panel-selector";
const BTN_CLASS = "btn";
const BTN_SELECTED_CLASS = `${BTN_CLASS} btn-selected`;

let selected_button = null;
let selected_button_id = null;

export function initPanel(clusters) {
  const panelSelector = document.getElementById(SELECTOR_ID);

  for (let cluster of clusters) {
    const button = makeButton(cluster);
    panelSelector.appendChild(button);
  }
}

function makeButton(cluster) {
  const button = document.createElement("button");
  button.setAttribute("class", BTN_CLASS);
  button.innerHTML = cluster.name;

  button.onclick = () => {
    if (selected_button_id !== cluster.cluster_id) {
      if (selected_button) {
        selected_button.setAttribute("class", BTN_CLASS);
        highlightOff(selected_button_id);
      }

      button.setAttribute("class", BTN_SELECTED_CLASS);

      selected_button_id = cluster.cluster_id;
      selected_button = button;

      highlightOn(selected_button_id);
    } else {
      button.setAttribute("class", BTN_CLASS);
      highlightOff(cluster.cluster_id);

      selected_button_id = null;
      selected_button = null;
    }
  };

  return button;
}

function makeCluster(id) {
  return {
    cluster_id: id,
    name: `Health and science ${id}`,
  };
}
