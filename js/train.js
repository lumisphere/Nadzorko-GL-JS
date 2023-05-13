// Define the base API URL
const trainApi = 'https://api.map.vlak.si/HR/hz/trips/active';

// Function to fetch train data from the API
async function fetchTrainData() {
  const response = await fetch(trainApi);
  const data = await response.json();
  return data.data;
}

// Function to create train marker
function createTrainMarker(train) {
  const markerElement = document.createElement("div");
  markerElement.className = `train-marker`;

  const trainNumber = document.createElement("span");
  trainNumber.className = "train-number";
  trainNumber.textContent = train.train_data.train_number;
  markerElement.appendChild(trainNumber);

  return markerElement;
}

// Function to update train markers
async function updateTrainMarkers(map, trainMarkers) {
  const trainData = await fetchTrainData();

  trainData.forEach((train) => {
    let marker = trainMarkers.find((m) => m.id === train.train_data.train_number);
    const trainMarkerElement = createTrainMarker(train);

    if (!marker) {
      marker = new maplibregl.Marker({
        element: trainMarkerElement,
        anchor: 'center',
        offset: [0, -20]
      }).setLngLat([train.coordinates.lng, train.coordinates.lat]).addTo(map);
      marker.id = train.train_data.train_number;
      trainMarkers.push(marker);
    } else {
      marker.setLngLat([train.coordinates.lng, train.coordinates.lat]);
    }
  });
}

// Call the updateTrainMarkers function to update the markers on the map
const trainMarkers = [];
updateTrainMarkers(map, trainMarkers);

// Update the train markers using requestAnimationFrame
function updateLoop() {
  updateTrainMarkers(map, trainMarkers);
  requestAnimationFrame(updateLoop);
}

updateLoop();
