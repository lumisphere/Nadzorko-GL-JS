const sidebarToggle = document.getElementById("sidebar-toggle");
const sidebar = document.getElementById("sidebar");

sidebarToggle.addEventListener("click", () => {
  sidebarToggle.classList.toggle("open");
  sidebar.classList.toggle("open");
});