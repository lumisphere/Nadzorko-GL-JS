var mymap = L.map('mapid', {
    zoomControl: false,
    attributionControl: false // Disable the default attribution control
}).setView([43.5081, 16.4402], 13);

var customAttributionControl = L.control.attribution({
    prefix: false, // Remove the "Leaflet" text
}).addTo(mymap);


var accessToken = 'pk.eyJ1IjoiYW5hbHdvb2QiLCJhIjoiY2xneWJlMm9lMDd2MzNtcDQwOXJwcGtwbCJ9.WwrjO_cMftXcXMOZgucD9Q';
var maptilerAPI = 'v0X1HSm5SNBEcBxVk7iB';

var darkMatterLayer = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    attribution: '',
    maxZoom: 23,
    crossOrigin: 'anonymous',
    id: 'darkMatter'
}).addTo(mymap);

var osmLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '',
    maxZoom: 19,
    crossOrigin: 'anonymous',
    id: 'osm'
});

var maptilerdarkLayer = L.tileLayer('https://api.maptiler.com/maps/streets-v2-dark/{z}/{x}/{y}.png?key=' + maptilerAPI, {
  attribution: '',
  maxZoom: 22,
});

var darkLayer = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v11/tiles/{z}/{x}/{y}?access_token=' + accessToken, {
    attribution: '',
    maxZoom: 23,
    tileSize: 512,
    zoomOffset: -1,
    crossOrigin: 'anonymous',
    id: 'dark',

});

var lightLayer = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/light-v11/tiles/{z}/{x}/{y}?access_token=' + accessToken, {
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

// Set the initial selected layer
document.querySelector('.layer-option[data-layer="darkmatter"]').classList.add('selected');

// Function to change the active tile layer
function changeTileLayer(layerId) {
  const layers = {
    darkmatter: darkMatterLayer,
    osm: osmLayer,
    dark: darkLayer,
    light: lightLayer,
    outdoors: outdoorsLayer,
    streets: streetsLayer,
    satellite: satelliteLayer,
    maptilerdark: maptilerdarkLayer,
  };

  mymap.removeLayer(layers[mymap.activeLayer]);
  mymap.addLayer(layers[layerId]);
  mymap.activeLayer = layerId;
}

// Add event listeners to layer options
const layerOptions = document.querySelectorAll('.layer-option');
layerOptions.forEach((option) => {
  option.addEventListener('click', () => {
    changeTileLayer(option.dataset.layer);

    // Update the selected layer style
    layerOptions.forEach((opt) => {
      opt.classList.remove('selected');
    });
    option.classList.add('selected');
  });
});

// Set the initial active layer
mymap.activeLayer = 'darkmatter';

mymap.attributionControl.setPrefix(false);
mymap.attributionControl.addAttribution('');

// Function to toggle attributions
function toggleAttributions() {
  const checkbox = document.getElementById('toggle-attributions');
  
  if (checkbox.checked) {
    mymap.attributionControl.setPrefix('&copy; <a href="https://leafletjs.com">Leaflet</a>');
  } else {
    mymap.attributionControl.setPrefix(false);
  }
}

// Add event listener to the "Show attributions" toggle
document.getElementById('toggle-attributions').addEventListener('change', toggleAttributions);