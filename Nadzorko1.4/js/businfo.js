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
  
        const routeName = vehicleData.data.routeName;
        const pathwayName = vehicleData.data.fulfilmentRecord.pathwayName;
        const currentSpeed = Math.round(vehicleData.data.currentSpeed);
        const timestamp = new Date(vehicleData.data.timestamp).toLocaleString();
        const delayStartTime = new Date(vehicleData.data.fulfilmentRecord.delayStartTime).toLocaleString();
  
        const busInfoElement = document.getElementById("bus-info");
        busInfoElement.innerHTML = `
          <button id="close-bus-info"><i class="fa-solid fa-xmark" style="color: #ffffff;"></i></button>
          <img src="${busDetails.imageUrl}" alt="Bus Image" width="330" height="210" style="border-radius: 25px;" />
          <div class="bus-info-text">
            <p><strong>Model:</strong> ${busDetails.model}</p>
            <p><strong>Type:</strong> ${busDetails.type}</p>
            <p><strong>Plates:</strong> ${busDetails.plates}</p>
          </div>
          <div class="bus-info-right">
            <p><strong>${routeName}</strong> - ${pathwayName}</p>
            <p><strong>Current Speed:</strong> ${currentSpeed} km/h</p>
            <p><strong>Timestamp:</strong> ${timestamp}</p>
            <p><strong>Delay Start Time:</strong> ${delayStartTime}</p>
          </div>
          <div class="bus-info-bottom">
            <p><strong>Garage Number:</strong> ${garageNumber}</p>
          </div>
        `;
  
        document.getElementById("close-bus-info").addEventListener("click", () => {
          toggleBusInfo(false);
        });
      }
    }
  }