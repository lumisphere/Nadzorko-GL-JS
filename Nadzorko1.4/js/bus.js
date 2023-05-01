let inactiveMarkers = [];

var baseapi = 'https://api.split.prometko.si'

// Function to fetch bus data from the API
async function fetchBusData() {
    const response = await fetch(baseapi + '/vehicles');
    const data = await response.json();
    return data.success ? data.data : [];
  }
  
  // Function to create bus marker
  function createBusMarker(bus, isActive) {
    const markerElement = document.createElement("div");
    markerElement.className = `bus-marker ${isActive ? "active" : "inactive"}`;
  
    const routeShortName = document.createElement("span");
    routeShortName.className = "route-short-name";
    routeShortName.textContent = bus.routeShortName;
    markerElement.appendChild(routeShortName);
  
    const busCircle = document.createElement("div");
    busCircle.className = "bus-circle";
    markerElement.appendChild(busCircle);
  
    const garageNumber = document.createElement("div");
    garageNumber.className = "garage-number";
    garageNumber.textContent = bus.garageNumber;
    markerElement.appendChild(garageNumber);
  
    const pointer = document.createElement("img");
    pointer.className = "pointer";
    pointer.src = "ico/bussmjer.svg";
    markerElement.appendChild(pointer);
  
    return markerElement;
  }
  
// Function to update bus markers
async function updateBusMarkers(map, markers) {
  const busData = await fetchBusData();

  busData.forEach((bus) => {
    const timeDifference = new Date() - new Date(bus.timestamp);
    const opacity = timeDifference > 5 * 60 * 1000 ? 0.1 : 1;

    let marker = markers.find((m) => m.options.id === bus.id);
    const isActive = opacity === 1;
    const busMarkerElement = createBusMarker(bus, isActive);

    if (!marker) {
      // busMarkerElement.style.opacity = opacity;

      marker = L.marker([bus.latitude, bus.longitude], {
        icon: L.divIcon({
          className: "",
          html: busMarkerElement.outerHTML,
          iconAnchor: [12.5, 12.5],
        }),
        id: bus.id,
      }).addTo(map);
    
      marker.on("click", () => {
        toggleBusInfo(true);
        updateBusInfo(bus.garageNumber);
      });
    
      markers.push(marker);
    
      if (!isActive) {
        inactiveMarkers.push(marker);
      }
    } else {
      marker.slideTo([bus.latitude, bus.longitude], {
        duration: 500, // Animation duration in milliseconds
        keepAtCenter: false,
      });
      marker.getElement().style.opacity = opacity;
    }

    // Rotate the pointer based on the bus bearing
    const pointer = marker.getElement().querySelector(".pointer");
    pointer.style.transform = `rotate(${bus.bearing + 225}deg)`;
  });
}
  
  const markers = [];
  // Call the updateBusMarkers function to update the markers on the map
  updateBusMarkers(mymap, markers);
  
  // Update the bus markers every 1 second
  setInterval(() => updateBusMarkers(mymap, markers), 1000);