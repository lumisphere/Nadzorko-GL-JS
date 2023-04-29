document.getElementById("sidebar-toggle").addEventListener("click", function () {
    document.getElementById("sidebar").classList.toggle("active");
  });
  
  // To make the sidebar customizable
  function customizeSidebar(customStyle) {
    var sidebar = document.getElementById("sidebar");
    for (var property in customStyle) {
      sidebar.style[property] = customStyle[property];
    }
  }

  document.getElementById("toggle-inactive-buses").addEventListener("change", function (event) {
    const showInactive = event.target.checked;
    markers.forEach((marker) => {
      const markerElement = marker.getElement();
      const isInactive = markerElement.classList.contains("inactive");
      if (isInactive && !showInactive) {
        markerElement.style.opacity = 0;
        markerElement.style.pointerEvents = "none";
      } else {
        markerElement.style.opacity = "";
        markerElement.style.pointerEvents = "";
      }
    });
  });