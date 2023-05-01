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

  document.getElementById("close-bus-info").addEventListener("click", () => {
    toggleBusInfo(false);
  });

  async function fetchBusDetails(garageNumber) {
    const response = await fetch("json/buses.json"); // update the path to the JSON file
    const data = await response.json();
    console.log("Fetched JSON data:", data);
    console.log("Searching for garage number:", garageNumber);
    return data.find((bus) => bus.id === parseInt(garageNumber, 10).toString());
  }

  async function updateBusInfo(garageNumber) {
    const busDetails = await fetchBusDetails(garageNumber);
    console.log(busDetails); // Add this line to log the bus details

    if (busDetails) {
        const busInfo = document.getElementById("bus-info");
        busInfo.innerHTML = `
            <button id="close-bus-info"><i class="fa-solid fa-xmark" style="color: #ffffff;"></i></button>
            <img src="${busDetails.imageUrl}" alt="Bus Image" width="330" height="210" style="border-radius: 25px;" />
            <div class="bus-info-text">
                <p><strong>Model:</strong> ${busDetails.model}</p>
                <p><strong>Type:</strong> ${busDetails.type}</p>
                <p><strong>Plates:</strong> ${busDetails.plates}</p>
            </div>
        `;

        document.getElementById("close-bus-info").addEventListener("click", () => {
            toggleBusInfo(false);
        });
    }
}