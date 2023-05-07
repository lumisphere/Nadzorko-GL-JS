// Define the base API URL
const baseApi = 'https://api.split.prometko.si';

// Function to fetch bus data from the API
async function fetchBusData() {
  const response = await fetch(`${baseApi}/vehicles`);
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

    let marker = markers.find((m) => m.id === bus.id);
    const isActive = opacity === 1;
    const busMarkerElement = createBusMarker(bus, isActive);

    if (!marker) {
      marker = new maplibregl.Marker({
        element: busMarkerElement,
        anchor: 'center'
      }).setLngLat([bus.longitude, bus.latitude]).addTo(map);
      marker.id = bus.id;
      markers.push(marker);

      if (!isActive) {
        marker.getElement().style.opacity = opacity;
      }
    } else {
        marker.setLngLat([bus.longitude, bus.latitude]);

      if (marker.getElement().classList.contains('inactive') && isActive) {
        const index = markers.indexOf(marker);
        markers.splice(index, 1);
        marker.remove();
      } else {
        marker.getElement().style.opacity = opacity;
      }
    }

    // Rotate the pointer based on the bus bearing
    const pointer = marker.getElement().querySelector(".pointer");
    pointer.style.transform = `rotate(${bus.bearing + 225}deg)`;
  });
}

// Call the updateBusMarkers function to update the markers on the map
const markers = [];
updateBusMarkers(map, markers);

// Update the bus markers every 1 second
setInterval(() => updateBusMarkers(map, markers), 1000);
