// Function to fetch bus data from the API
async function fetchBusData() {
    const response = await fetch("https://api.split.prometko.si/vehicles");
    const data = await response.json();
    return data.success ? data.data : [];
  }
  
  // Function to create bus marker
  function createBusMarker(bus) {
    const markerElement = document.createElement("div");
    markerElement.className = "bus-marker";
  
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
      const opacity = timeDifference > 5 * 60 * 1000 ? 0.2 : 1;
  
      let marker = markers.find((m) => m.options.id === bus.id);
  
      if (!marker) {
        const busMarkerElement = createBusMarker(bus);
        busMarkerElement.style.opacity = opacity;
  
        marker = L.marker([bus.latitude, bus.longitude], {
          icon: L.divIcon({
            className: "",
            html: busMarkerElement.outerHTML,
          }),
          id: bus.id,
        }).addTo(map);
        markers.push(marker);
      } else {
        marker.setLatLng([bus.latitude, bus.longitude]);
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