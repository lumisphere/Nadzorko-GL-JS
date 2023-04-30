const layersToggle = document.getElementById('layers-toggle');
const layersSidebar = document.getElementById('layers-sidebar');

layersToggle.addEventListener('click', () => {
  layersSidebar.classList.toggle('open');
});