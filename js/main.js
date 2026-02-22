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

// Typing headline effect
(function () {
  const title = document.querySelector(".type-title");
  if (!title) return;

  // Respect reduced motion
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const text = title.getAttribute("data-type-text") || "";

  const textEl = title.querySelector(".type-text");
  const caretEl = title.querySelector(".type-caret");

  if (!textEl || !caretEl) return;

  if (prefersReduced) {
    textEl.textContent = text;
    caretEl.style.opacity = "0";
    return;
  }

  // Start empty, then type
  textEl.textContent = "";

  // Tuned to feel good on desktop + mobile
  // Slight randomness makes it feel less robotic
  const baseDelay = 22; // ms per character baseline
  const variance = 18;  // random extra ms
  const startDelay = 250;

  let i = 0;

  function typeNext() {
    if (i >= text.length) {
      // done: caret keeps blinking
      return;
    }

    textEl.textContent += text[i];
    i += 1;

    const nextDelay = baseDelay + Math.floor(Math.random() * variance);
    window.setTimeout(typeNext, nextDelay);
  }

  window.setTimeout(typeNext, startDelay);
})();
// Scroll reveal for headings (delayed + more noticeable)
(() => {
  const els = document.querySelectorAll(".reveal-on-scroll");
  if (!els.length) return;

  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReduced) {
    els.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const io = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        // Delay so it doesn't fire instantly on scroll
        setTimeout(() => {
          entry.target.classList.add("is-visible");
        }, 220);

        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.35,
      rootMargin: "0px 0px -15% 0px",
    }
  );

  els.forEach((el) => io.observe(el));
})();
