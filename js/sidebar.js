const sidebarToggle = document.getElementById("sidebar-toggle");
const sidebar = document.getElementById("sidebar");

sidebarToggle.addEventListener("click", () => {
  sidebarToggle.classList.toggle("open");
  sidebar.classList.toggle("open");
});

const showInactiveBuses = document.getElementById("show-inactive-buses");

showInactiveBuses.addEventListener("change", () => {
  const show = showInactiveBuses.checked;
  const event = new CustomEvent("showInactiveBusesChanged", { detail: { show } });
  document.dispatchEvent(event);
});
