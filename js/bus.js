// Define the base API URL
const baseApi = 'https://api.split.prometko.si';

// Function to fetch bus data from the API
let fetchCounter = 0;

async function fetchBusData() {
  const response = await fetch(`${baseApi}/vehicles`);
  const data = await response.json();
  
  fetchCounter++;

  if (data.success) {
    if (fetchCounter % 10 === 0) {
      console.log("Fetched split buses!", data.data);
    }
    return data.data;
  } else {
    return [];
  }
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
async function updateBusMarkers(map, activeMarkers, inactiveMarkers) {
  const busData = await fetchBusData();
  const activeBuses = busData.filter(bus => new Date() - new Date(bus.timestamp) <= 5 * 60 * 1000);
  const inactiveBuses = busData.filter(bus => new Date() - new Date(bus.timestamp) > 5 * 60 * 1000);

  updateMarkers(map, activeMarkers, activeBuses, true);
  updateMarkers(map, inactiveMarkers, inactiveBuses, false);
}

let showInactiveBusesState = false; // Declare a variable to store the state of the showInactiveBuses checkbox

document.addEventListener("showInactiveBusesChanged", (event) => {
  showInactiveBusesState = event.detail.show; // Update the variable based on the event detail
});

function updateMarkers(map, markers, buses, isActive) {
  buses.forEach((bus) => {
    let marker = markers.find((m) => m.id === bus.id);
    const busMarkerElement = createBusMarker(bus, isActive);

    if (!marker) {
      marker = new maplibregl.Marker({
        element: busMarkerElement,
        anchor: 'center'
      }).setLngLat([bus.longitude, bus.latitude]).addTo(map);
      marker.id = bus.id;
      markers.push(marker);
    } else {
      if (!isActive) {
        if (showInactiveBusesState) {
          marker.getElement().style.display = 'block';
          marker.getElement().style.opacity = 0.1;
        } else {
          marker.getElement().style.display = 'none';
        }
      } else {
        marker.setLngLat([bus.longitude, bus.latitude]);
      }

      // Rotate the pointer based on the bus bearing
      const pointer = marker.getElement().querySelector(".pointer");
      pointer.style.transform = `rotate(${bus.bearing + 225}deg)`;
    }
  });
}


// Call the updateBusMarkers function to update the markers on the map
const activeMarkers = [];
const inactiveMarkers = [];
updateBusMarkers(map, activeMarkers, inactiveMarkers);

// Update the bus markers using requestAnimationFrame
function updateLoop() {
  updateBusMarkers(map, activeMarkers, inactiveMarkers);
}

setInterval(updateLoop, 1000);
