function toggleBusInfo(visible) {
    const busInfo = document.getElementById("bus-info");
    if (visible) {
      busInfo.classList.remove("hidden");
      busInfo.classList.add("visible");
    } else {
      busInfo.classList.remove("visible");
      busInfo.classList.add("hidden");
    }
  }
  
  async function fetchBusDetails(garageNumber) {
    const response = await fetch("json/buses.json");
    const data = await response.json();
    return data.find((bus) => bus.id === parseInt(garageNumber, 10).toString());
  }
  
  async function updateBusInfo(garageNumber) {
    const busDetails = await fetchBusDetails(garageNumber);
  
    if (busDetails) {
      const busResponse = await fetch("https://api.split.prometko.si/vehicles");
      const busData = await busResponse.json();
      const busInfo = busData.data.find((bus) => bus.garageNumber === garageNumber);
  
      if (busInfo) {
        const busId = busInfo.id;
        const vehicleResponse = await fetch(`https://api.split.prometko.si/vehicle/${busId}`);
        const vehicleData = await vehicleResponse.json();
  
        const routeName = busInfo.routeShortName;
        const pathwayName = vehicleData.data.fulfilmentRecord.pathwayName;
        const currentSpeed = Math.round(vehicleData.data.currentSpeed);
        const timestamp = new Date(vehicleData.data.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit',second: '2-digit' });
        const delayStartTime = new Date(vehicleData.data.fulfilmentRecord.delayStartTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit',second: '2-digit' });
        const passengerCount = vehicleData.data.passangerCount; console.log(vehicleData);
  
        const busInfoElement = document.getElementById("bus-info");
        busInfoElement.innerHTML = `
        <button id="close-bus-info"><i class="fa-solid fa-xmark" style="color: #ffffff;"></i></button>
        <div class="bus-info-content">
          <img src="${busDetails.imageUrl}" alt="Bus Image" width="330" height="210" style="border-radius: 25px;" />
          <div class="bus-info-details">
            <div class="bus-info-right">
            <p><span class="route-number">${routeName}</span> ${pathwayName}</p>
              <p><strong>Speed:</strong> <span class="speed-number">${currentSpeed}</span> km/h <p>
              <p><strong>Last Fetch:</strong> <span class="timestamp-number">${timestamp}</p>
              <p><strong>Start Time:</strong> <span class="delay-number">${delayStartTime}</p>
              <p><strong>Passenger Count:</strong> <span class="pass-number">${passengerCount}</p>
            </div>
          </div>
        </div>
        <div class="bus-info-bottom">
        <p><strong>Garage Number:</strong> <span class="gar-number">${garageNumber}</p>
        <p><strong>Model:</strong> <span class="model-text">${busDetails.model}</p>
        <p><strong>Type:</strong> <span class="type-text">${busDetails.type}</p>
        <p><strong>Plates:</strong> <span class="plates-text">${busDetails.plates}</p>
        </div>
      `;
  
        document.getElementById("close-bus-info").addEventListener("click", () => {
          toggleBusInfo(false);
        });
      }
    }
  }