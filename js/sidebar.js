const sidebarToggle = document.getElementById("sidebar-toggle");
const sidebar = document.getElementById("sidebar");

sidebarToggle.addEventListener("click", () => {
  sidebarToggle.classList.toggle("open");
  sidebar.classList.toggle("open");
});

const toggleBuses = document.getElementById("toggle-buses");
const inactiveBuses = document.querySelectorAll(".bus.inactive");

toggleBuses.addEventListener("change", () => {
  if (toggleBuses.checked) {
    inactiveBuses.forEach(bus => bus.style.display = "block");
  } else {
    inactiveBuses.forEach(bus => bus.style.display = "none");
  }
});