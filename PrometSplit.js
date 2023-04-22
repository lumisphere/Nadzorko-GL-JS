// Startaj mapu (initiziraj je valjda)
var mymap = L.map('mapid').setView([43.5081, 16.4402], 13);

// Dodati OSM layer na kartu
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
    maxZoom: 18,
}).addTo(mymap);

// Pingaj API
fetch('https://api.split.prometko.si/vehicles')
  .then(response => response.json())
  .then(data => {
    // Define a function to create the custom marker
    function createBusMarker(bus) {
      // Get the bus line name from the bus object
      const busLine = bus.routeShortName;

      // Create a new marker with the custom icon
      const marker = L.marker(
        [bus.latitude, bus.longitude], 
        {
          icon: L.divIcon({
            className: 'bus-icon',
            html: `<div class="bus-circle">${busLine}</div>`,
            iconSize: [32, 32]
          })
        }
      );

      return marker;
    }

    // loop through the bus data and add markers to the map
    data.data.forEach(bus => {
      if (bus.latitude && bus.longitude) {
        const marker = createBusMarker(bus);
        marker.addTo(mymap);
      }
    });
  })
  .catch(error => console.error(error));