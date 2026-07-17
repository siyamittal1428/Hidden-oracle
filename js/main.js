// Common dynamic layout injections and initializations
document.addEventListener("DOMContentLoaded", () => {
  injectHeader();
  injectFooter();
  initNavbarScroll();
  initMobileMenu();
  initCursorGlow();
  initScrollProgress();
  initParticles();

  // Initialize Lucide Icons
  if (typeof lucide !== "undefined") {
    lucide.createIcons();
  }

  // Initialize animations (Intersection Observer)
  if (typeof initScrollReveal === "function") {
    initScrollReveal();
  }
});

// Dynamic Header Injector
function injectHeader() {
  const header = document.querySelector(".site-header");
  if (!header) return;

  // Detect current active page
  const path = window.location.pathname;
  const page = path.split("/").pop().replace(".html", "") || "home";

  header.className = "fixed top-0 inset-x-0 z-50 transition-all duration-500 py-5";
  header.innerHTML = `
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between rounded-full px-5 py-3 transition-all duration-500 glass" id="nav-inner">
        <a href="index.html" class="flex items-center gap-2 group">
          <div class="grid place-items-center w-9 h-9 rounded-full bg-gradient-to-br from-primary to-accent glow-gold transition-transform duration-500 group-hover:rotate-180">
            <i data-lucide="sparkles" class="w-4 h-4 text-primary-foreground"></i>
          </div>
          <span class="font-display text-lg sm:text-xl tracking-wide text-gradient-gold">
            Hidden Oracle
          </span>
        </a>
        
        <nav class="hidden lg:flex items-center gap-1">
          <a href="index.html" class="nav-link relative px-3 py-2 text-sm transition-colors group ${page === "index" || page === "home" ? "text-primary active" : "text-foreground/80 hover:text-primary"}">
            <span class="relative z-10">Home</span>
            <span class="absolute inset-x-3 -bottom-0.5 h-px bg-gradient-to-r from-transparent via-primary to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
          </a>
          <a href="about.html" class="nav-link relative px-3 py-2 text-sm transition-colors group ${page === "about" ? "text-primary active" : "text-foreground/80 hover:text-primary"}">
            <span class="relative z-10">About</span>
            <span class="absolute inset-x-3 -bottom-0.5 h-px bg-gradient-to-r from-transparent via-primary to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
          </a>
          <a href="services.html" class="nav-link relative px-3 py-2 text-sm transition-colors group ${page === "services" ? "text-primary active" : "text-foreground/80 hover:text-primary"}">
            <span class="relative z-10">Services</span>
            <span class="absolute inset-x-3 -bottom-0.5 h-px bg-gradient-to-r from-transparent via-primary to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
          </a>
          <a href="gallery.html" class="nav-link relative px-3 py-2 text-sm transition-colors group ${page === "gallery" ? "text-primary active" : "text-foreground/80 hover:text-primary"}">
            <span class="relative z-10">Gallery</span>
            <span class="absolute inset-x-3 -bottom-0.5 h-px bg-gradient-to-r from-transparent via-primary to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
          </a>
          <a href="testimonials.html" class="nav-link relative px-3 py-2 text-sm transition-colors group ${page === "testimonials" ? "text-primary active" : "text-foreground/80 hover:text-primary"}">
            <span class="relative z-10">Testimonials</span>
            <span class="absolute inset-x-3 -bottom-0.5 h-px bg-gradient-to-r from-transparent via-primary to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
          </a>
          <a href="faq.html" class="nav-link relative px-3 py-2 text-sm transition-colors group ${page === "faq" ? "text-primary active" : "text-foreground/80 hover:text-primary"}">
            <span class="relative z-10">FAQ</span>
            <span class="absolute inset-x-3 -bottom-0.5 h-px bg-gradient-to-r from-transparent via-primary to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
          </a>
          <a href="contact.html" class="nav-link relative px-3 py-2 text-sm transition-colors group ${page === "contact" ? "text-primary active" : "text-foreground/80 hover:text-primary"}">
            <span class="relative z-10">Contact</span>
            <span class="absolute inset-x-3 -bottom-0.5 h-px bg-gradient-to-r from-transparent via-primary to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
          </a>
        </nav>

        <div class="flex items-center gap-2">
          <a href="booking.html" class="hidden sm:inline-flex items-center rounded-full bg-gradient-to-r from-primary to-gold-soft px-5 py-2 text-sm font-medium text-primary-foreground hover:scale-105 transition-transform glow-gold">
            Book Reading
          </a>
          <button id="mobile-menu-btn" class="lg:hidden grid place-items-center w-10 h-10 rounded-full glass hover:bg-primary/10 transition-colors" aria-label="Menu">
            <i data-lucide="menu" class="w-5 h-5" id="menu-icon"></i>
          </button>
        </div>
      </div>

      <nav id="mobile-menu" class="hidden mt-2 glass-gold rounded-3xl p-4 flex flex-col gap-1 animate-fade-in">
        <a href="index.html" class="px-4 py-3 rounded-2xl hover:bg-primary/10 text-foreground/90 mobile-nav-link ${page === "index" || page === "home" ? "bg-primary/15 text-primary" : ""}">Home</a>
        <a href="about.html" class="px-4 py-3 rounded-2xl hover:bg-primary/10 text-foreground/90 mobile-nav-link ${page === "about" ? "bg-primary/15 text-primary" : ""}">About</a>
        <a href="services.html" class="px-4 py-3 rounded-2xl hover:bg-primary/10 text-foreground/90 mobile-nav-link ${page === "services" ? "bg-primary/15 text-primary" : ""}">Services</a>
        <a href="gallery.html" class="px-4 py-3 rounded-2xl hover:bg-primary/10 text-foreground/90 mobile-nav-link ${page === "gallery" ? "bg-primary/15 text-primary" : ""}">Gallery</a>
        <a href="testimonials.html" class="px-4 py-3 rounded-2xl hover:bg-primary/10 text-foreground/90 mobile-nav-link ${page === "testimonials" ? "bg-primary/15 text-primary" : ""}">Testimonials</a>
        <a href="faq.html" class="px-4 py-3 rounded-2xl hover:bg-primary/10 text-foreground/90 mobile-nav-link ${page === "faq" ? "bg-primary/15 text-primary" : ""}">FAQ</a>
        <a href="contact.html" class="px-4 py-3 rounded-2xl hover:bg-primary/10 text-foreground/90 mobile-nav-link ${page === "contact" ? "bg-primary/15 text-primary" : ""}">Contact</a>
        <a href="booking.html" class="mt-2 text-center rounded-full bg-primary px-4 py-3 text-primary-foreground font-medium hover:bg-primary/95">Book Reading</a>
      </nav>
    </div>
  `;
}

// Dynamic Footer Injector
function injectFooter() {
  const footer = document.querySelector(".site-footer");
  if (!footer) return;

  footer.className = "relative mt-24 border-t border-border/50 bg-gradient-to-b from-transparent to-mystic-deep/60";
  footer.innerHTML = `
    <div class="pointer-events-none absolute inset-0 opacity-30" style="background: radial-gradient(ellipse at top, var(--gold) 0%, transparent 50%)"></div>
    <div class="relative mx-auto max-w-7xl px-6 py-16">
      <div class="grid gap-10 md:grid-cols-3 text-center md:text-left">
        <div class="flex flex-col items-center md:items-start">
          <a href="index.html" class="flex items-center gap-2">
            <div class="grid place-items-center w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent glow-gold">
              <i data-lucide="sparkles" class="w-5 h-5 text-primary-foreground"></i>
            </div>
            <span class="font-display text-2xl text-gradient-gold">Hidden Oracle</span>
          </a>
          <p class="mt-4 text-sm text-muted-foreground leading-relaxed max-w-xs">
            Personalized tarot readings and spiritual guidance for love, career, and life's deeper questions — by Siya.
          </p>
          <div class="mt-5 flex gap-3">
            <a href="https://www.instagram.com/hiddenoracle._14?igsh=MWRoeGtyZnB6eHpuYw%3D%3D&utm_source=qr" target="_blank" rel="noopener noreferrer" aria-label="Instagram" class="grid place-items-center w-11 h-11 rounded-full glass hover:glass-gold hover:glow-gold hover:-translate-y-1 transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4 text-primary"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
            </a>
            <a href="https://youtube.com/@hiddenoracle_14?si=BO3w8mPCdGvCEXf8" target="_blank" rel="noopener noreferrer" aria-label="YouTube" class="grid place-items-center w-11 h-11 rounded-full glass hover:glass-gold hover:glow-gold hover:-translate-y-1 transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4 text-primary"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17z"/><path d="m10 15 5-3-5-3z"/></svg>
            </a>
          </div>
        </div>

        <div>
          <h4 class="font-display text-lg text-gradient-gold mb-4">Quick Links</h4>
          <ul class="space-y-2 text-sm">
            <li><a href="about.html" class="text-muted-foreground hover:text-primary transition-colors">About</a></li>
            <li><a href="services.html" class="text-muted-foreground hover:text-primary transition-colors">Services</a></li>
            <li><a href="gallery.html" class="text-muted-foreground hover:text-primary transition-colors">Gallery</a></li>
            <li><a href="testimonials.html" class="text-muted-foreground hover:text-primary transition-colors">Testimonials</a></li>
            <li><a href="faq.html" class="text-muted-foreground hover:text-primary transition-colors">FAQ</a></li>
            <li><a href="contact.html" class="text-muted-foreground hover:text-primary transition-colors">Contact</a></li>
          </ul>
        </div>

        <div>
          <h4 class="font-display text-lg text-gradient-gold mb-4">Services</h4>
          <ul class="space-y-2 text-sm text-muted-foreground">
            <li>Love & Relationships</li>
            <li>Career & Business</li>
            <li>Finance Guidance</li>
            <li>Spiritual Growth</li>
            <li>Monthly Forecast</li>
            <li>Energy Healing</li>
          </ul>
        </div>
      </div>

      <div class="mt-12 pt-6 border-t border-border/40 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
        <p>© ${new Date().getFullYear()} Hidden Oracle by Siya. All readings confidential.</p>
        <div class="flex gap-5">
          <a href="#" class="hover:text-primary">Privacy Policy</a>
          <a href="#" class="hover:text-primary">Terms & Conditions</a>
        </div>
        <button onclick="window.scrollTo({ top: 0, behavior: 'smooth' })" class="inline-flex items-center gap-1 hover:text-primary transition-colors">
          <i data-lucide="arrow-up" class="w-3 h-3"></i> Back to top
        </button>
      </div>
    </div>
  `;
}

// Navbar scroll styles toggling
function initNavbarScroll() {
  const header = document.querySelector(".site-header");
  const navInner = document.getElementById("nav-inner");
  if (!header || !navInner) return;

  const handleScroll = () => {
    if (window.scrollY > 20) {
      header.classList.remove("py-5");
      header.classList.add("py-3");
      navInner.classList.remove("glass");
      navInner.classList.add("glass-gold", "glow-gold");
    } else {
      header.classList.remove("py-3");
      header.classList.add("py-5");
      navInner.classList.remove("glass-gold", "glow-gold");
      navInner.classList.add("glass");
    }
  };

  handleScroll();
  window.addEventListener("scroll", handleScroll, { passive: true });
}

// Mobile Menu behavior
function initMobileMenu() {
  const btn = document.getElementById("mobile-menu-btn");
  const menu = document.getElementById("mobile-menu");
  const icon = document.getElementById("menu-icon");
  if (!btn || !menu || !icon) return;

  btn.addEventListener("click", () => {
    const isHidden = menu.classList.contains("hidden");
    if (isHidden) {
      menu.classList.remove("hidden");
      menu.classList.add("flex");
      icon.setAttribute("data-lucide", "x");
    } else {
      menu.classList.remove("flex");
      menu.classList.add("hidden");
      icon.setAttribute("data-lucide", "menu");
    }
    if (typeof lucide !== "undefined") {
      lucide.createIcons();
    }
  });

  // Close when clicking outside
  document.addEventListener("click", (e) => {
    if (!btn.contains(e.target) && !menu.contains(e.target)) {
      menu.classList.remove("flex");
      menu.classList.add("hidden");
      icon.setAttribute("data-lucide", "menu");
      if (typeof lucide !== "undefined") {
        lucide.createIcons();
      }
    }
  });
}

// Cursor glow tracking
function initCursorGlow() {
  if (window.matchMedia("(pointer: coarse)").matches) return;

  const glow = document.createElement("div");
  glow.setAttribute("aria-hidden", "true");
  glow.className = "pointer-events-none fixed z-[100] w-[400px] h-[400px] rounded-full -translate-x-1/2 -translate-y-1/2 transition-transform duration-100 ease-out mix-blend-screen";
  glow.style.background = "radial-gradient(circle, oklch(0.82 0.14 85 / 0.12), transparent 60%)";
  glow.style.left = "-200px";
  glow.style.top = "-200px";
  document.body.appendChild(glow);

  document.addEventListener("mousemove", (e) => {
    glow.style.left = `${e.clientX}px`;
    glow.style.top = `${e.clientY}px`;
  });
}

// Scroll progress bar
function initScrollProgress() {
  const bar = document.createElement("div");
  bar.className = "fixed top-0 left-0 right-0 h-[3px] origin-left z-[60] bg-gradient-to-r from-primary via-accent to-primary transition-all duration-75";
  bar.style.width = "0%";
  document.body.appendChild(bar);

  window.addEventListener("scroll", () => {
    const total = document.documentElement.scrollHeight - window.innerHeight;
    const progress = total > 0 ? (window.scrollY / total) * 100 : 0;
    bar.style.width = `${progress}%`;
  }, { passive: true });
}

// Particle field generator
function initParticles() {
  const fields = document.querySelectorAll(".particle-field");
  fields.forEach((field) => {
    const count = parseInt(field.getAttribute("data-count")) || 20;
    field.innerHTML = ""; // Clear existing
    for (let i = 0; i < count; i++) {
      const p = document.createElement("span");
      p.className = "particle";
      const size = Math.random() * 4 + 2;
      p.style.width = `${size}px`;
      p.style.height = `${size}px`;
      p.style.left = `${Math.random() * 100}%`;
      p.style.animationDuration = `${Math.random() * 8 + 8}s`;
      p.style.animationDelay = `${Math.random() * 8}s`;
      field.appendChild(p);
    }
  });
}
