// Define a function to create the custom bus icon
function createBusIcon(busLine) {
  return L.divIcon({
    className: 'bus-icon',
    html: `<div class="bus-circle">${busLine}</div>`,
    iconSize: [32, 32]
  });
}

// Define a function to create the bus marker
function createBusMarker(bus) {
  // Get the bus line name from the bus object
  const busLine = bus.routeShortName;

  // Set the opacity based on the vehicle status
  let opacity = 1;
  if (bus.vehicleStatus === 'NOT_ACTIVE_TRIP') {
    opacity = 0.2; // Set the opacity to 20%
  }

  // Create a new marker with the custom icon and opacity
  const marker = L.marker(
    [bus.latitude, bus.longitude], 
    {
      icon: createBusIcon(busLine),
      opacity: opacity,
      busId: bus.id
    }
  );

  return marker;
}

// Define a function to find the bus marker by its bus ID
function findBusMarker(busId) {
  let marker = null;
  mymap.eachLayer(layer => {
    if (layer.options.icon && layer.options.icon.options.className === 'bus-icon' && layer.options.busId === busId) {
      marker = layer;
    }
  });
  return marker;
}

// Define a function to check if the timestamp is more than 15 minutes ago
function isOldTimestamp(timestamp) {
  const fifteenMinutesAgo = Date.now() - 15 * 60 * 1000;
  return new Date(timestamp) < fifteenMinutesAgo;
}

// Define a function to update the bus markers on the map
function updateBusMarkers() {
  console.log('Updating bus markers...');
  // Fetch the bus data from the API
  fetch('https://api.split.prometko.si/vehicles')
    .then(response => response.json())
    .then(data => {
      console.log('Fetched bus data:', data);
      // Remove existing bus markers from the map
      mymap.eachLayer(layer => {
        if (layer.options.icon && layer.options.icon.options.className === 'bus-icon') {
          const busId = layer.options.busId;
          const busData = data.data.find(bus => bus.id === busId);
          if (!busData || busData.vehicleStatus === 'NOT_ACTIVE_TRIP' || isOldTimestamp(busData.timestamp)) {
            mymap.removeLayer(layer);
          }
        }
      });

      // Loop through the bus data and add new markers to the map
      data.data.forEach(bus => {
        if (bus.latitude && bus.longitude) {
          const busId = bus.id;
          const existingMarker = findBusMarker(busId);
          if (existingMarker) {
            // Update the existing marker
            const busLine = bus.routeShortName;
            existingMarker.setIcon(createBusIcon(busLine));
            existingMarker.setLatLng([bus.latitude, bus.longitude]);
          } else {
            // Create a new marker and add it to the map
            const marker = createBusMarker(bus);
            marker.addTo(mymap);
          }
        }
      });
    })
    .catch(error => console.error(error));
}

// Call the updateBusMarkers function to load the initial bus markers
updateBusMarkers();

// Set an interval to update the bus markers every 5 seconds
setInterval(updateBusMarkers, 5000);