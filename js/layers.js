const layersToggle = document.getElementById("layers-toggle");
const layersSidebar = document.getElementById("layers-sidebar");
const providerTitles = document.querySelectorAll(".provider-title");

layersToggle.addEventListener("click", () => {
  layersToggle.classList.toggle("open");
  layersSidebar.classList.toggle("open");
});

providerTitles.forEach((title) => {
  title.addEventListener("click", () => {
    const provider = title.parentElement;
    const layers = provider.querySelector(".layers");

    layers.style.maxHeight = layers.style.maxHeight ? "" : `${layers.scrollHeight}px`;
    title.querySelector("i").style.transform = layers.style.maxHeight ? "rotate(180deg)" : "";
  });
});

const layerOptions = document.querySelectorAll(".layer-option");

function updateSelectedLayer(selectedLayer) {
  layerOptions.forEach((option) => {
    if (option === selectedLayer) {
      option.classList.add("selected");
    } else {
      option.classList.remove("selected");
    }
  });
}

layerOptions.forEach((option) => {
  // Add the 'selected' class to the default selected layer
  if (option.getAttribute("data-layer") === "streets-v2-dark") {
    option.classList.add("selected");
  }

  option.addEventListener("click", () => {
    const provider = option.parentElement.parentElement.getAttribute("data-provider");
    const layer = option.getAttribute("data-layer");

    let styleUrl;

    if (provider === "mapbox") {
      styleUrl = `https://api.mapbox.com/styles/v1/mapbox/${layer}?access_token=${accessToken}`;
    } else if (provider === "maptiler-streets" || provider === "maptiler-basic") {
      styleUrl = `https://api.maptiler.com/maps/${layer}/style.json?key=${maptilerAPI}`;
    } else if (provider === "carto") {
      styleUrl = `https://basemaps.cartocdn.com/gl/${layer}-gl-style/style.json`;
    }

    setMapStyle(styleUrl);

    // Update the selected layer
    updateSelectedLayer(option);
  });
});