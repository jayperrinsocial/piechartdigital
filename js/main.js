// js/main.js

(function () {
  // Footer year
  const yearEl = document.querySelector("[data-year]");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // Mobile nav toggle
  const toggle = document.querySelector("[data-nav-toggle]");
  const nav = document.querySelector("[data-nav]");
  const header = document.querySelector("[data-header]");

  if (!toggle || !nav) return;

  const setOpen = (isOpen) => {
    nav.classList.toggle("is-open", isOpen);
    toggle.setAttribute("aria-expanded", String(isOpen));
  };

  toggle.addEventListener("click", () => {
    const isOpen = !nav.classList.contains("is-open");
    setOpen(isOpen);
  });

  // Close on outside click
  document.addEventListener("click", (e) => {
    if (!nav.classList.contains("is-open")) return;
    const target = e.target;
    const clickedInside =
      nav.contains(target) ||
      toggle.contains(target) ||
      (header && header.contains(target));

    if (!clickedInside) setOpen(false);
  });

  // Close on Esc
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") setOpen(false);
  });

  // Close after clicking a nav link (mobile)
  nav.addEventListener("click", (e) => {
    const link = e.target.closest("a");
    if (!link) return;
    setOpen(false);
  });

  // Close if resized up to desktop
  window.addEventListener("resize", () => {
    if (window.innerWidth > 980) setOpen(false);
  });
})();
