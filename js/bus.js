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
  pointer.src = "ico/busdirection.svg";
  markerElement.appendChild(pointer);

  return markerElement;
}

// Function to update bus markers
async function updateBusMarkers(map, markers) {
  const busData = await fetchBusData();
  const activeBuses = busData.filter(bus => new Date() - new Date(bus.timestamp) <= 5 * 60 * 1000);
  const inactiveBuses = busData.filter(bus => new Date() - new Date(bus.timestamp) > 5 * 60 * 1000);

  updateMarkers(map, markers, activeBuses, true);
  updateMarkers(map, markers, inactiveBuses, false);
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
      marker.prevState = isActive;
      markers.push(marker);
    } else {
      const prevState = marker.prevState;
      marker.prevState = isActive;

      if (prevState !== isActive) {
        console.log(`Bus ${bus.id} switched from ${prevState ? 'active' : 'inactive'} to ${isActive ? 'active' : 'inactive'}`);
      }

      if (!isActive && showInactiveBusesState) {
        marker.getElement().style.display = 'block';
        marker.getElement().style.opacity = 0.1;
      } else if (!isActive) {
        marker.getElement().style.display = 'none';
      }

      // Update the position and rotation of the marker regardless of its previous state
      marker.setLngLat([bus.longitude, bus.latitude]);
      const pointer = marker.getElement().querySelector(".pointer");
      pointer.style.transform = `rotate(${bus.bearing + 225}deg)`;
    }
  });
}

// Call the updateBusMarkers function to update the markers on the map
const markers = [];
updateBusMarkers(map, markers);

// Update the bus markers using requestAnimationFrame
function updateLoop() {
  updateBusMarkers(map, markers);
}

setInterval(updateLoop, 1000);