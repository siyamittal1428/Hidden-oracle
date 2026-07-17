// Scroll reveals and counting card animation script
function initScrollReveal() {
  const revealElements = document.querySelectorAll(".reveal");

  const observerOptions = {
    root: null,
    rootMargin: "-60px",
    threshold: 0.15,
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const delay = parseFloat(el.getAttribute("data-delay")) || 0;
        
        if (delay > 0) {
          el.style.transitionDelay = `${delay}s`;
        }
        
        el.classList.add("active");
        observer.unobserve(el); // Only reveal once
      }
    });
  }, observerOptions);

  revealElements.forEach((el) => observer.observe(el));
}

// Counters (Numbers counting animation when scrolled into view)
document.addEventListener("DOMContentLoaded", () => {
  initCounters();
});

function initCounters() {
  const counterCards = document.querySelectorAll("[data-counter-to]");
  
  const observerOptions = {
    root: null,
    rootMargin: "-50px",
    threshold: 0.1,
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const targetNum = parseInt(el.getAttribute("data-counter-to")) || 0;
        const suffix = el.getAttribute("data-counter-suffix") || "";
        const numElement = el.querySelector(".counter-number");

        if (numElement) {
          animateCount(numElement, targetNum, suffix);
        }
        observer.unobserve(el);
      }
    });
  }, observerOptions);

  counterCards.forEach((card) => observer.observe(card));
}

function animateCount(element, to, suffix) {
  const duration = 1800; // 1.8 seconds matching React
  const startTime = performance.now();

  function tick(now) {
    const elapsed = now - startTime;
    const progress = Math.min(1, elapsed / duration);
    
    // Ease out cubic
    const easeProgress = 1 - Math.pow(1 - progress, 3);
    const currentNum = Math.floor(to * easeProgress);

    element.textContent = currentNum.toLocaleString("en-IN") + suffix;

    if (progress < 1) {
      requestAnimationFrame(tick);
    }
  }

  requestAnimationFrame(tick);
}
