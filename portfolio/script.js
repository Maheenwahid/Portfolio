"use strict";

document.documentElement.classList.add("js");

const menuToggle = document.querySelector(".menu-toggle");
const navPanel = document.querySelector(".nav-panel");
const themeToggle = document.querySelector(".theme-toggle");
const navLinks = [...document.querySelectorAll(".nav-links a")];

function updateTheme(theme) {
  const nextTheme = theme === "dark" ? "light" : "dark";
  const label = `Switch to ${nextTheme} mode`;

  document.documentElement.dataset.theme = theme;
  if (!themeToggle) return;

  themeToggle.setAttribute("aria-label", label);
  themeToggle.setAttribute("title", label);
  themeToggle.setAttribute("aria-pressed", String(theme === "dark"));
  themeToggle.querySelector(".theme-toggle-icon").textContent = theme === "dark" ? "☀" : "☾";

  const themeColor = document.querySelector('meta[name="theme-color"]');
  if (themeColor) themeColor.content = theme === "dark" ? "#0c1315" : "#f6fcfa";
}

const initialTheme = document.documentElement.dataset.theme === "dark" ? "dark" : "light";
updateTheme(initialTheme);

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const nextTheme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    updateTheme(nextTheme);
    try {
      localStorage.setItem("maheen-theme", nextTheme);
    } catch (error) {
      console.warn("Could not save the theme preference.", error);
    }
  });
}

function closeMenu() {
  if (!menuToggle || !navPanel) return;
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Open navigation menu");
  navPanel.classList.remove("is-open");
}

if (menuToggle && navPanel) {
  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Open navigation menu" : "Close navigation menu");
    navPanel.classList.toggle("is-open", !isOpen);
  });

  navLinks.forEach((link) => link.addEventListener("click", closeMenu));
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });
  document.addEventListener("click", (event) => {
    if (!navPanel.contains(event.target) && !menuToggle.contains(event.target)) closeMenu();
  });
}

if ("IntersectionObserver" in window) {
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((link) => {
        if (link.hash === `#${entry.target.id}`) {
          link.setAttribute("aria-current", "location");
        } else {
          link.removeAttribute("aria-current");
        }
      });
    });
  }, { rootMargin: "-25% 0px -65% 0px" });

  document.querySelectorAll("main section[id]").forEach((section) => sectionObserver.observe(section));

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12 });

  document.documentElement.classList.add("motion-ready");
  document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));
}

const year = document.querySelector("#current-year");
if (year) year.textContent = String(new Date().getFullYear());
