const layersToggle = document.getElementById('layers-toggle');
const layersSidebar = document.getElementById('layers-sidebar');

layersToggle.addEventListener('click', () => {
  layersSidebar.classList.toggle('open');
});

document.querySelectorAll('.provider-title').forEach((title) => {
  title.addEventListener('click', () => {
    const layers = title.nextElementSibling;
    const arrowIcon = title.querySelector('i');

    if (layers.style.maxHeight === '0px' || layers.style.maxHeight === '') {
      layers.style.maxHeight = layers.scrollHeight + 'px';
      arrowIcon.style.transform = 'rotate(180deg)';
    } else {
      layers.style.maxHeight = '0px';
      arrowIcon.style.transform = 'rotate(0deg)';
    }
  });
});

document.querySelectorAll('.layer-option').forEach((option) => {
  option.addEventListener('click', () => {
    const layerName = option.textContent;
    // Implement the logic for changing the tile layer
  });
});