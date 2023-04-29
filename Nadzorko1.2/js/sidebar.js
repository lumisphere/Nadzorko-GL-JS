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