let inactiveMarkers = [];

const baseapi = 'https://api.split.prometko.si';

// Function to fetch bus data from the API
async function fetchBusData() {
  const response = await fetch(`${baseapi}/vehicles`);
  const data = await response.json();
  return data.success ? data.data : [];
}

// Function to update the slide duration globally
function updateSlideDuration(newSlideDuration) {
  slideDuration = newSlideDuration;
}

// Function to update bus markers
async function updateBusMarkers(map) {
    const busData = await fetchBusData();
  
    // Create a GeoJSON FeatureCollection for the bus markers
    const busMarkersFeatures = {
      type: 'FeatureCollection',
      features: busData.map((bus) => {
        const timeDifference = new Date() - new Date(bus.timestamp);
        const opacity = timeDifference > 5 * 60 * 1000 ? 0.1 : 1;
        const isActive = opacity === 1;
  
        return {
            type: 'Feature',
            properties: {
              id: `bus-${bus.id}`,
              routeShortName: bus.routeShortName,
              garageNumber: bus.garageNumber,
              bearing: bus.bearing,
              opacity: opacity,
              size: 25, // Set size to 25px
            },
            geometry: {
              type: 'Point',
              coordinates: [bus.longitude, bus.latitude],
            },
          };
      }),
    };
  
    // If the bus markers source does not exist, create it and add the layers
    if (!map.getSource('bus-markers')) {
      // Add the bus markers source
      map.addSource('bus-markers', {
        type: 'geojson',
        data: busMarkersFeatures,
      });
  
      // Add the bus markers circle layer
      map.addLayer({
        id: 'bus-markers',
        type: 'circle',
        source: 'bus-markers',
        paint: {
          'circle-radius': ['get', 'size'],
          'circle-color': '#FFC107',
          'circle-opacity': ['get', 'opacity'],
        },
      });
  
      // Add the route short name layer
      map.addLayer({
        id: 'bus-markers',
        type: 'circle',
        source: 'bus-markers',
        paint: {
          'circle-radius': [
            'interpolate',
            ['linear'],
            ['zoom'],
            12, ['get', 'size'],
            22, ['*', ['get', 'size'], Math.pow(2, 22 - 12)],
          ],
          'circle-color': '#FFC107',
          'circle-opacity': ['get', 'opacity'],
        },
      });
    } else {
      // If the bus markers source exists, update its data
      map.getSource('bus-markers').setData(busMarkersFeatures);
    }
  }  