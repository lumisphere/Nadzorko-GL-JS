// Load the bus tracking markers
const API_URL = 'https://api.split.prometko.si/vehicles';

const busIcon = L.divIcon({
  className: 'bus-marker',
  iconSize: [25, 25],
  html: `<div class="bus-marker-circle"></div>`
});

function loadBusMarkers() {
  // Fetch the bus tracking data
  fetch(API_URL)
    .then(response => response.json())
    .then(data => {
      const currentTime = new Date();

      // Remove all existing bus markers
      mymap.eachLayer(layer => {
        if (layer instanceof L.Marker && layer.options.className === 'bus-marker') {
          layer.remove();
        }
      });

      // Add new bus markers for each vehicle in the data
      data.data.forEach(vehicle => {
        const diffTime = (currentTime - new Date(vehicle.timestamp)) / 60000;

        const opacity = diffTime <= 5 ? 1 : 0.1;

        const marker = L.marker([vehicle.latitude, vehicle.longitude], {
          icon: busIcon,
          opacity: opacity,
          rotationAngle: vehicle.bearing - 90
        }).addTo(mymap);

        marker.bindPopup(vehicle.vehicleStatus);
      });
    })
    .catch(error => console.error(error));
}

// Load the bus markers for the first time
loadBusMarkers();

// Update the bus markers every second
setInterval(loadBusMarkers, 1000);