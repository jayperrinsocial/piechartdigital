// js/main.js

(() => {
  const header = document.querySelector("[data-header]");
  const navToggle = document.querySelector("[data-nav-toggle]");
  const nav = document.querySelector("[data-nav]");
  const yearEl = document.querySelector("[data-year]");

  // Footer year
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // Mobile nav toggle
  if (navToggle && nav) {
    const openNav = () => {
      nav.classList.add("is-open");
      navToggle.setAttribute("aria-expanded", "true");
      navToggle.setAttribute("aria-label", "Close menu");
    };

    const closeNav = () => {
      nav.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
      navToggle.setAttribute("aria-label", "Open menu");
    };

    const isOpen = () => nav.classList.contains("is-open");

    navToggle.addEventListener("click", () => {
      if (isOpen()) closeNav();
      else openNav();
    });

    // Close menu when a nav link is clicked (mobile)
    nav.addEventListener("click", (e) => {
      const target = e.target;
      if (target && target.matches("a")) closeNav();
    });

    // Close menu on Escape
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && isOpen()) {
        closeNav();
        navToggle.focus();
      }
    });

    // Close menu if resizing to desktop
    const mq = window.matchMedia("(min-width: 861px)");
    const handleMq = () => {
      if (mq.matches) closeNav();
    };

    if (typeof mq.addEventListener === "function") mq.addEventListener("change", handleMq);
    else if (typeof mq.addListener === "function") mq.addListener(handleMq);
  }

  // Optional: subtle header shadow once scrolled
  if (header) {
    const onScroll = () => {
      if (window.scrollY > 6) header.classList.add("is-scrolled");
      else header.classList.remove("is-scrolled");
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }
})();
