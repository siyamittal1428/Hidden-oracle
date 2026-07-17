// Carousel Slider initializer
document.addEventListener("DOMContentLoaded", () => {
  initCarousels();
});

function initCarousels() {
  const carousels = document.querySelectorAll(".carousel-wrapper");
  
  carousels.forEach((carousel) => {
    const track = carousel.querySelector(".carousel-track");
    const prevBtn = carousel.querySelector(".carousel-prev");
    const nextBtn = carousel.querySelector(".carousel-next");
    if (!track) return;

    const checkScroll = () => {
      const { scrollLeft, scrollWidth, clientWidth } = track;
      if (prevBtn) {
        if (scrollLeft > 10) {
          prevBtn.classList.remove("md:hidden");
          prevBtn.classList.add("md:grid");
        } else {
          prevBtn.classList.remove("md:grid");
          prevBtn.classList.add("md:hidden");
        }
      }
      if (nextBtn) {
        if (scrollLeft + clientWidth < scrollWidth - 15) {
          nextBtn.classList.remove("md:hidden");
          nextBtn.classList.add("md:grid");
        } else {
          nextBtn.classList.remove("md:grid");
          nextBtn.classList.add("md:hidden");
        }
      }
    };

    // Attach scroll and resize listeners
    track.addEventListener("scroll", checkScroll, { passive: true });
    window.addEventListener("resize", checkScroll, { passive: true });
    
    // Initial check
    setTimeout(checkScroll, 100);

    // Chevron clicks
    if (prevBtn) {
      prevBtn.addEventListener("click", () => {
        const { scrollLeft, clientWidth } = track;
        const amount = clientWidth * 0.75;
        track.scrollTo({ left: scrollLeft - amount, behavior: "smooth" });
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        const { scrollLeft, clientWidth } = track;
        const amount = clientWidth * 0.75;
        track.scrollTo({ left: scrollLeft + amount, behavior: "smooth" });
      });
    }
  });
}
