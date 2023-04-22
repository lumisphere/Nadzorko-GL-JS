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
    // do something with the data
  })
  .catch(error => console.error(error));

//idfk
fetch('https://api.split.prometko.si/vehicles')
  .then(response => response.json())
  .then(data => {
    // Napravi novu ikonu za BUS
    var busIcon = L.icon({
      iconUrl: 'https://i.imgur.com/cubObdJ.png',
      iconSize: [38, 38],
      iconAnchor: [19, 19]
    });

    // loop through the bus data and add markers to the map
    data.data.forEach(bus => {
      if (bus.latitude && bus.longitude) {
        var marker = L.marker([bus.latitude, bus.longitude], { icon: busIcon }).addTo(mymap);
      }
    });
  })
  .catch(error => console.error(error));