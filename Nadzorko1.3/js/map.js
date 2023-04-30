var mymap = L.map('mapid', {
    zoomControl: false
}).setView([43.5081, 16.4402], 13);
var accessToken = 'pk.eyJ1IjoiYW5hbHdvb2QiLCJhIjoiY2xneWJlMm9lMDd2MzNtcDQwOXJwcGtwbCJ9.WwrjO_cMftXcXMOZgucD9Q';
var maptilerAPI = 'v0X1HSm5SNBEcBxVk7iB';

var osmLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 19,
    crossOrigin: 'anonymous',
    id: 'osm'
});

var darkMatterLayer = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="https://carto.com/attributions">CARTO</a>',
    maxZoom: 23,
    crossOrigin: 'anonymous',
    id: 'darkMatter'
});

var maptilerdarkLayer = L.tileLayer('https://api.maptiler.com/maps/streets-v2-dark/{z}/{x}/{y}.png?key=' + maptilerAPI, {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="https://maptiler.com/">MapTiler</a>',
  maxZoom: 22,
}).addTo(mymap);

var darkLayer = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v11/tiles/{z}/{x}/{y}?access_token=' + accessToken, {
    attribution: '',
    maxZoom: 23,
    tileSize: 512,
    zoomOffset: -1,
    crossOrigin: 'anonymous',
    id: 'dark',

});

var lightLayer = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/{z}/{x}/{y}?access_token=' + accessToken, {
    attribution: '',
    maxZoom: 23,
    tileSize: 512,
    zoomOffset: -1,
    crossOrigin: 'anonymous',
    id: 'light',
});

var outdoorsLayer = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/outdoors-v11/tiles/{z}/{x}/{y}?access_token=' + accessToken, {
    attribution: '',
    maxZoom: 23,
    tileSize: 512,
    zoomOffset: -1,
    crossOrigin: 'anonymous',
    id: 'outdoors',
});

var streetsLayer = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token=' + accessToken, {
    attribution: '',
    maxZoom: 23,
    tileSize: 512,
    zoomOffset: -1,
    crossOrigin: 'anonymous',
    id: 'streets',
});

var satelliteLayer = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-v9/tiles/{z}/{x}/{y}?access_token=' + accessToken, {
    attribution: '',
    maxZoom: 23,
    tileSize: 512,
    zoomOffset: -1,
    crossOrigin: 'anonymous',
    id: 'satellite',
}); 

function initCustomLayerControl() {
    const layerControlContent = document.getElementById('layer-control-content');
  
    for (const layerName in baseMaps) {
      const layerControlElement = document.createElement('div');
      const layerControlInput = document.createElement('input');
      layerControlInput.type = 'radio';
      layerControlInput.name = 'layer-control';
      layerControlInput.value = layerName;
      layerControlInput.addEventListener('change', function () {
        for (const otherLayerName in baseMaps) {
          if (otherLayerName !== layerName) {
            mymap.removeLayer(baseMaps[otherLayerName]);
          }
        }
        mymap.addLayer(baseMaps[layerName]);
      });
  
      if (mymap.hasLayer(baseMaps[layerName])) {
        layerControlInput.checked = true;
      }
  
      layerControlElement.appendChild(layerControlInput);
      layerControlElement.appendChild(document.createTextNode(layerName));
      layerControlContent.appendChild(layerControlElement);
    }
  
    const layerControlToggle = document.getElementById('layer-control-toggle');
    layerControlToggle.addEventListener('click', function () {
      const layerControlSidebar = document.getElementById('layer-control-sidebar');
      layerControlSidebar.classList.toggle('active');
    });
  }