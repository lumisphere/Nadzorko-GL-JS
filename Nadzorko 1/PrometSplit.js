// Define a function to create the custom bus icon
function createBusIcon(busLine, garageNumber) {
  return L.divIcon({
    className: 'bus-icon',
    html: `<div class="bus-circle">${busLine}<br/><span class="garage-number">${garageNumber}</span></div>`,
    iconSize: [32, 32]
  });
}

// Define a function to create the bus marker
function createBusMarker(bus) {
  // Get the bus line name and garage number from the bus object
  const busLine = bus.routeShortName;
  const garageNumber = bus.garageNumber;

  // Calculate the time difference in seconds
  const timeDiffSeconds = Math.floor((Date.now() - new Date(bus.timestamp)) / 1000);

  // Set the opacity based on the time difference
  let opacity = 1;
  if (timeDiffSeconds > 300) {
    opacity = 0.2; // Set the opacity to 20%
  }

  // Create a new marker with the custom icon and opacity
  const marker = L.marker(
    [bus.latitude, bus.longitude], 
    {
      icon: createBusIcon(busLine, garageNumber),
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

// Define a function to check if the timestamp is more than 5 minutes ago
function isOldTimestamp(timestamp) {
  const fiveMinutesAgo = Date.now() - 5 * 60 * 1000;
  return new Date(timestamp) < fiveMinutesAgo;
}

// Define a function to update the bus markers on the map
function updateBusMarkers() {
  console.log('Updating bus markers...');
  // Fetch the bus data from the API
  fetch('https://api.split.prometko.si/vehicles')
    .then(response => response.json())
    .then(data => {
      console.log('Fetched bus data:', data);
      // Remove existing bus markers from the map if the timestamp is too old
      mymap.eachLayer(layer => {
        if (layer.options.icon && layer.options.icon.options.className === 'bus-icon') {
          const busId = layer.options.busId;
          const busData = data.data.find(bus => bus.id === busId);
          if (!busData || isOldTimestamp(busData.timestamp)) {
            // Set opacity to 0.2 instead of removing the layer
            layer.setOpacity(0.2);
          } else {
            const opacity = Math.floor((Date.now() - new Date(busData.timestamp)) / 1000) > 300 ? 0.2 : 1;
            layer.setOpacity(opacity);
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
            const garageNumber = bus.garageNumber;
            existingMarker.setIcon(createBusIcon(busLine, garageNumber));
            existingMarker.setLatLng([bus.latitude, bus.longitude]);
            const opacity = Math.floor((Date.now() - new Date(bus.timestamp)) / 1000) > 300 ? 0.2 : 1;
            existingMarker.setOpacity(opacity);
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