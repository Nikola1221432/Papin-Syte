function activatePageNavigation() {
  const navLinks = document.querySelectorAll(".nav-link");

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      document
        .querySelectorAll(".nav-link.active-page-indicator")
        .forEach((element) => element.classList.remove("active-page-indicator"));
      document
        .querySelectorAll(`.nav-link[href="${link.getAttribute("href")}"]`)
        .forEach((element) => element.classList.add("active-page-indicator"));
      closeMobileMenu();
    });
  });
}

function setCurrentPage() {
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  const page = currentPage === "" ? "index.html" : currentPage;

  document.querySelectorAll(".nav-link").forEach((link) => {
    link.classList.toggle(
      "active-page-indicator",
      link.getAttribute("href") === page,
    );
  });
}

function closeMobileMenu() {
  const menu = document.querySelector(".mobile-menu");
  const toggle = document.querySelector(".menu-toggle");
  if (!menu) return;

  document.body.classList.remove("menu-open");
  menu.setAttribute("aria-hidden", "true");
  toggle?.setAttribute("aria-expanded", "false");
}

function openMobileMenu() {
  const menu = document.querySelector(".mobile-menu");
  const toggle = document.querySelector(".menu-toggle");
  if (!menu) return;

  document.body.classList.add("menu-open");
  menu.setAttribute("aria-hidden", "false");
  toggle?.setAttribute("aria-expanded", "true");
  menu.querySelector(".menu-close")?.focus();
}

function activateMobileMenu() {
  const toggle = document.querySelector(".menu-toggle");
  if (!toggle) return;

  toggle.addEventListener("click", () => {
    const expanded = toggle.getAttribute("aria-expanded") === "true";
    if (expanded) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  });

  document.querySelectorAll("[data-menu-close]").forEach((element) => {
    element.addEventListener("click", closeMobileMenu);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMobileMenu();
  });
}

window.addEventListener("DOMContentLoaded", () => {
  setCurrentPage();
  activatePageNavigation();
  activateMobileMenu();
});
