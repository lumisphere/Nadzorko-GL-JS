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

layerOptions.forEach((option) => {
  option.addEventListener("click", () => {
    const provider = option.parentElement.parentElement.getAttribute("data-provider");
    const layer = option.getAttribute("data-layer");

    let styleUrl;

    if (provider === "maplibre") {
      styleUrl = `https://api.maptiler.com/maps/${layer}/style.json?key=${maptilerAPI}`;
    } // else if (provider === 'otherProvider') { ... }

    setMapStyle(styleUrl);
  });
});