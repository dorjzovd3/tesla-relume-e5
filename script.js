// Mobile navbar toggle
(function () {
  const navbar = document.querySelector(".navbar");
  const toggle = navbar && navbar.querySelector(".navbar__toggle");
  if (!toggle) return;

  toggle.addEventListener("click", () => {
    const open = navbar.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Цэс хаах" : "Цэс нээх");
  });
})();

// Gallery sliders (arrows + dots)
document.querySelectorAll("[data-slider]").forEach((slider) => {
  const track = slider.querySelector(".slider__track");
  const slides = Array.from(track.children);
  const prev = slider.querySelector(".slider__arrow--prev");
  const next = slider.querySelector(".slider__arrow--next");
  const dotsWrap = slider.querySelector(".slider__dots");
  let index = 0;

  const dots = slides.map((_, i) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.className = "slider__dot";
    dot.setAttribute("aria-label", `${i + 1}-р зураг`);
    const img = document.createElement("img");
    img.width = 8;
    img.height = 8;
    img.alt = "";
    dot.appendChild(img);
    dot.addEventListener("click", () => goTo(i));
    dotsWrap.appendChild(dot);
    return dot;
  });

  function goTo(i) {
    index = Math.max(0, Math.min(i, slides.length - 1));
    const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
    const offset = (slides[0].getBoundingClientRect().width + gap) * index;
    track.style.transform = `translateX(${-offset}px)`;

    dots.forEach((dot, d) => {
      const active = d === index;
      dot.querySelector("img").src = active
        ? "assets/icons/dot-active.svg"
        : "assets/icons/dot.svg";
      dot.setAttribute("aria-current", active ? "true" : "false");
    });
    prev.disabled = index === 0;
    next.disabled = index === slides.length - 1;
  }

  prev.addEventListener("click", () => goTo(index - 1));
  next.addEventListener("click", () => goTo(index + 1));
  window.addEventListener("resize", () => goTo(index));
  goTo(0);
});
