(function () {
  const yearEl = document.querySelector("[data-year]");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  const header = document.querySelector("[data-header]");
  const nav = document.querySelector("[data-nav]");
  const toggle = document.querySelector("[data-nav-toggle]");

  if (!nav || !toggle) return;

  function setOpen(isOpen) {
    nav.classList.toggle("is-open", isOpen);
    toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    toggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
  }

  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.contains("is-open");
    setOpen(!isOpen);
  });

  document.addEventListener("click", (e) => {
    const target = e.target;
    if (!target) return;
    const clickedInside = header && header.contains(target);
    if (!clickedInside) setOpen(false);
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") setOpen(false);
  });
})();

