var mymap = L.map('mapid', {
    zoomControl: false
}).setView([43.5081, 16.4402], 13);
var accessToken = 'pk.eyJ1IjoidmVrZWpzbiIsImEiOiJja25ubHFoMWIxNXZ0MnNwbjFtaW1nbnFmIn0.8pX2xs2EKOq75QjXqkxAFQ';

var osmLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 23,
    crossOrigin: 'anonymous',
    id: 'osm'
}).addTo(mymap);

var darkMatterLayer = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="https://carto.com/attributions">CARTO</a>',
    maxZoom: 23,
    crossOrigin: 'anonymous',
    id: 'darkMatter'
});

var darkLayer = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v11/tiles/{z}/{x}/{y}?access_token=' + accessToken, {
    attribution: '',
    maxZoom: 23,
    tileSize: 512,
    zoomOffset: -1,
    crossOrigin: 'anonymous',
    id: 'dark',
    // Set the default layer to be the dark layer
    // You can change this to any of the other layers if you want a different default
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

// Add the layer control button to the map
var baseMaps = {
    "OSM": osmLayer,
    "DarkMatter": darkMatterLayer,
    "Dark": darkLayer,
    "Light": lightLayer,
    "Outdoors": outdoorsLayer,
    "Streets": streetsLayer,
    "Satellite": satelliteLayer,
};
L.control.layers(baseMaps).addTo(mymap);