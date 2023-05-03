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
    showInactiveBuses = event.target.checked;
  
    inactiveMarkers.forEach((marker) => {
      if (showInactiveBuses) {
        marker.getElement().style.display = "";
      } else {
        marker.getElement().style.display = "none";
      }
    });
  });

  const slideDurationInput = document.getElementById("slide-duration");
  const slideDurationValue = document.getElementById("slide-duration-value");
  
  let updateSlideDurationTimeout;

  slideDurationInput.addEventListener("input", function (event) {
    const slideDuration = event.target.value;
    slideDurationValue.textContent = `${slideDuration}ms`;
  
    clearTimeout(updateSlideDurationTimeout);
    updateSlideDurationTimeout = setTimeout(() => {
      // Update the slide duration globally
      updateSlideDuration(slideDuration);
    }, 300); // Wait for 300ms of inactivity before updating slide duration
  });