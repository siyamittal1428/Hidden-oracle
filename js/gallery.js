// Fullscreen lightbox for images and videos
document.addEventListener("DOMContentLoaded", () => {
  initGalleryLightbox();
});

function initGalleryLightbox() {
  const triggers = document.querySelectorAll("[data-lightbox]");

  triggers.forEach((trigger) => {
    trigger.addEventListener("click", (e) => {
      e.preventDefault();
      const src = trigger.getAttribute("data-lightbox") || trigger.getAttribute("href") || trigger.getAttribute("data-src");
      const type = trigger.getAttribute("data-type") || (src.match(/\.(mp4|webm|ogg)$/i) ? "video" : "image");
      const alt = trigger.getAttribute("data-alt") || "Sacred media";

      openLightbox(src, type, alt);
    });
  });
}

function openLightbox(src, type, alt) {
  // Create lightbox overlay element
  const overlay = document.createElement("div");
  overlay.className = "fixed inset-0 z-[999] bg-background/92 backdrop-blur-xl grid place-items-center p-4 md:p-8 animate-fade-in";
  
  // Close buttons
  const closeBtn = document.createElement("button");
  closeBtn.setAttribute("aria-label", "Close");
  closeBtn.className = "absolute top-5 right-5 grid place-items-center w-11 h-11 rounded-full glass hover:bg-primary/20 transition-colors cursor-pointer";
  closeBtn.innerHTML = '<i data-lucide="x" class="w-5 h-5 text-foreground"></i>';

  // Container wrapper
  const container = document.createElement("div");
  container.className = "relative w-full max-w-4xl rounded-3xl overflow-hidden glow-gold border border-primary/40 bg-black max-h-[85vh] flex justify-center items-center scale-95 transition-all duration-300";
  
  let mediaElement;

  if (type === "video") {
    mediaElement = document.createElement("video");
    mediaElement.src = src;
    mediaElement.controls = true;
    mediaElement.autoplay = true;
    mediaElement.playsInline = true;
    mediaElement.muted = false; // Start unmuted
    mediaElement.className = "w-full h-auto max-h-[85vh] bg-black";

    // Add mute/unmute button
    const muteBtn = document.createElement("button");
    muteBtn.setAttribute("aria-label", "Mute");
    muteBtn.className = "absolute top-4 left-4 grid place-items-center w-11 h-11 rounded-full glass hover:bg-primary/20 transition-colors z-10 cursor-pointer";
    muteBtn.innerHTML = '<i data-lucide="volume-2" class="w-5 h-5 text-foreground"></i>';
    
    muteBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      mediaElement.muted = !mediaElement.muted;
      muteBtn.innerHTML = mediaElement.muted 
        ? '<i data-lucide="volume-x" class="w-5 h-5 text-foreground"></i>' 
        : '<i data-lucide="volume-2" class="w-5 h-5 text-foreground"></i>';
      if (typeof lucide !== "undefined") lucide.createIcons();
    });

    container.appendChild(mediaElement);
    container.appendChild(muteBtn);

    // Play with fallback if browser rejects unmuted autoplay
    setTimeout(() => {
      mediaElement.play().catch(() => {
        mediaElement.muted = true;
        muteBtn.innerHTML = '<i data-lucide="volume-x" class="w-5 h-5 text-foreground"></i>';
        if (typeof lucide !== "undefined") lucide.createIcons();
        mediaElement.play();
      });
    }, 50);
  } else {
    mediaElement = document.createElement("img");
    mediaElement.src = src;
    mediaElement.alt = alt;
    mediaElement.className = "w-full h-auto max-h-[85vh] object-contain bg-black";
    container.appendChild(mediaElement);
  }

  overlay.appendChild(closeBtn);
  overlay.appendChild(container);
  document.body.appendChild(overlay);
  document.body.style.overflow = "hidden"; // Prevent page scrolling

  // Trigger scale transition
  setTimeout(() => {
    container.classList.remove("scale-95");
    container.classList.add("scale-100");
  }, 10);

  // Initialize Lucide icon inside lightbox
  if (typeof lucide !== "undefined") {
    lucide.createIcons();
  }

  // Close functionality
  const close = () => {
    container.classList.remove("scale-100");
    container.classList.add("scale-95");
    overlay.classList.add("opacity-0");
    setTimeout(() => {
      if (mediaElement && type === "video") {
        mediaElement.pause();
        mediaElement.src = "";
      }
      document.body.removeChild(overlay);
      document.body.style.overflow = ""; // Restore page scrolling
    }, 300);
  };

  overlay.addEventListener("click", close);
  closeBtn.addEventListener("click", close);
  container.addEventListener("click", (e) => e.stopPropagation());

  // Close on Escape key press
  const handleKeydown = (e) => {
    if (e.key === "Escape") {
      close();
      window.removeEventListener("keydown", handleKeydown);
    }
  };
  window.addEventListener("keydown", handleKeydown);
}
