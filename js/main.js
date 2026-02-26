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
      threshold: 0.45,
      rootMargin: "0px 0px -15% 0px",
    }
  );

  els.forEach((el) => io.observe(el));
})();

  (function () {
    const slider = document.querySelector(".slider");
    if (!slider) return;

    const track = slider.querySelector(".slider-track");
    const slides = Array.from(slider.querySelectorAll(".slide"));
    const prevBtn = slider.querySelector(".slider-btn.prev");
    const nextBtn = slider.querySelector(".slider-btn.next");
    const dotsWrap = slider.querySelector(".slider-dots");

    let index = 0;
    let timer = null;
    const interval = Number(slider.dataset.interval || 4200);

    // Build dots
    const dots = slides.map((_, i) => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "slider-dot" + (i === 0 ? " is-active" : "");
      b.setAttribute("aria-label", "Go to slide " + (i + 1));
      b.addEventListener("click", () => goTo(i));
      dotsWrap.appendChild(b);
      return b;
    });

    function update() {
      track.style.transform = `translateX(-${index * 100}%)`;
      slides.forEach((s, i) => s.classList.toggle("is-active", i === index));
      dots.forEach((d, i) => d.classList.toggle("is-active", i === index));
    }

    function goTo(i) {
      index = (i + slides.length) % slides.length;
      update();
      restart();
    }

    function next() { goTo(index + 1); }
    function prev() { goTo(index - 1); }

    prevBtn.addEventListener("click", prev);
    nextBtn.addEventListener("click", next);

    function start() {
      stop();
      timer = setInterval(next, interval);
    }

    function stop() {
      if (timer) clearInterval(timer);
      timer = null;
    }

    function restart() {
      start();
    }

    // Pause on hover and focus
    slider.addEventListener("mouseenter", stop);
    slider.addEventListener("mouseleave", start);
    slider.addEventListener("focusin", stop);
    slider.addEventListener("focusout", start);

    // Basic swipe support
    let startX = 0;
    let dragging = false;

    slider.addEventListener("touchstart", (e) => {
      dragging = true;
      startX = e.touches[0].clientX;
      stop();
    }, { passive: true });

    slider.addEventListener("touchend", (e) => {
      if (!dragging) return;
      dragging = false;

      const endX = (e.changedTouches && e.changedTouches[0]) ? e.changedTouches[0].clientX : startX;
      const dx = endX - startX;

      if (Math.abs(dx) > 40) {
        dx < 0 ? next() : prev();
      }
      start();
    });

    update();
    start();
  })();

