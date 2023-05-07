var maptilerAPI = 'v0X1HSm5SNBEcBxVk7iB';
var accessToken = 'pk.eyJ1IjoiYW5hbHdvb2QiLCJhIjoiY2xneWJlMm9lMDd2MzNtcDQwOXJwcGtwbCJ9.WwrjO_cMftXcXMOZgucD9Q';

const map = new maplibregl.Map({
  container: 'map',
  style: 'https://api.maptiler.com/maps/streets-v2-dark/style.json?key=' + maptilerAPI,
  center: [16.4378, 43.5081], // Split, Croatia
  zoom: 12,
});

function setMapStyle(style) {
  map.setStyle(style);
}

// Expose the setMapStyle function to be accessible from other scripts
window.setMapStyle = setMapStyle;

map.on("load", () => {
  updateBusMarkers(map);
  setInterval(() => updateBusMarkers(map), 1000);
});