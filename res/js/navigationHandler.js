function activatePageNavigation() {
  const navLinks = document.querySelectorAll(".nav-link");
  const dropdownLinks = document.querySelectorAll(".dropdown-content a");
  const dropdown = document.querySelector(".dropdown");

  dropdownLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      document
        .querySelectorAll(".nav-link.active-page-indicator")
        .forEach((el) => {
          el.classList.remove("active-page-indicator");
        });
      link.classList.add("active-page-indicator");
      window.location.href = link.href;
    });
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      if (link.classList.contains("dropleft")) {
        e.preventDefault();
        return;
      }
      document
        .querySelectorAll(".nav-link.active-page-indicator")
        .forEach((el) => {
          el.classList.remove("active-page-indicator");
        });
      link.classList.add("active-page-indicator");
    });
  });
}

window.addEventListener("DOMContentLoaded", () => {
  const currentPage = window.location.pathname.split("/").pop();

  if (currentPage === "index.html" || currentPage === "") {
    document
      .querySelector('.nav-link[href="index.html"]')
      ?.classList.add("active-page-indicator");
  } else if (currentPage === "notes.html") {
    document
      .querySelector('.nav-link[href="notes.html"]')
      ?.classList.add("active-page-indicator");
  } else if (currentPage === "history.html") {
    document
      .querySelector('.dropdown-content a[href="history.html"]')
      ?.classList.add("active-page-indicator");
  } else if (currentPage === "relics.html") {
    document
      .querySelector('.dropdown-content a[href="relics.html"]')
      ?.classList.add("active-page-indicator");
  }

  activatePageNavigation();
});
