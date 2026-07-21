/* Hidden Oracle — Master JavaScript Engine */

document.addEventListener('DOMContentLoaded', () => {
  initCursorGlow();
  initHeaderScroll();
  initMobileMenu();
  initScrollProgress();
  initCounters();
  initAccordions();
  initLightboxes();
  initTestimonialsSlider();
  initServiceModals();
  initForms();
  initPhoneValidation();
  highlightActiveLink();
});

/* 0. Phone Number Country-Based Validation */
function initPhoneValidation() {
  const phoneInputs = document.querySelectorAll('input[type="tel"], input[name="phone"]');

  phoneInputs.forEach(input => {
    const parentContainer = input.closest('.flex') || input.parentElement;
    const countrySelect = parentContainer ? parentContainer.querySelector('select[name="countryCode"]') : null;

    const getMaxLength = () => {
      if (!countrySelect) return 10;
      const code = countrySelect.value;
      if (code === '+971' || code === '+61') return 9; // UAE & Australia 9 digits
      if (code === '+44') return 10; // UK 10 digits
      return 10; // India +91, US +1, CA +1 (10 digits)
    };

    const updateMaxLen = () => {
      const maxLen = getMaxLength();
      input.setAttribute('maxlength', maxLen);
      input.setAttribute('placeholder', `Phone (${maxLen} digits)`);
      let cleanVal = input.value.replace(/\D/g, '');
      if (cleanVal.length > maxLen) {
        cleanVal = cleanVal.slice(0, maxLen);
      }
      input.value = cleanVal;
    };

    if (countrySelect) {
      countrySelect.addEventListener('change', updateMaxLen);
    }

    input.addEventListener('input', (e) => {
      let cleanVal = e.target.value.replace(/\D/g, '');
      const maxLen = getMaxLength();
      if (cleanVal.length > maxLen) {
        cleanVal = cleanVal.slice(0, maxLen);
      }
      e.target.value = cleanVal;
    });

    updateMaxLen();
  });
}

/* 1. Active Navigation Link Highlighting */
function highlightActiveLink() {
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const links = document.querySelectorAll('.nav-link');
  links.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('text-primary');
      link.classList.remove('text-foreground/80');
      const indicator = link.querySelector('.nav-indicator');
      if (indicator) indicator.classList.remove('scale-x-0');
    }
  });
}

/* 2. Header Scroll Effect */
function initHeaderScroll() {
  const header = document.querySelector('header');
  const innerNav = document.getElementById('navbar-inner');
  if (!header || !innerNav) return;

  const onScroll = () => {
    if (window.scrollY > 20) {
      header.classList.remove('py-5');
      header.classList.add('py-3');
      innerNav.classList.remove('glass');
      innerNav.classList.add('glass-gold', 'glow-gold');
    } else {
      header.classList.remove('py-3');
      header.classList.add('py-5');
      innerNav.classList.remove('glass-gold', 'glow-gold');
      innerNav.classList.add('glass');
    }
  };

  window.addEventListener('scroll', onScroll);
  onScroll();
}

/* 3. Mobile Menu Toggle */
function initMobileMenu() {
  const toggleBtn = document.getElementById('mobile-menu-btn');
  const mobileNav = document.getElementById('mobile-nav');
  const menuIcon = document.getElementById('menu-icon');
  const closeIcon = document.getElementById('close-icon');

  if (!toggleBtn || !mobileNav) return;

  toggleBtn.addEventListener('click', () => {
    const isOpen = !mobileNav.classList.contains('hidden');
    if (isOpen) {
      mobileNav.classList.add('hidden');
      if (menuIcon) menuIcon.classList.remove('hidden');
      if (closeIcon) closeIcon.classList.add('hidden');
    } else {
      mobileNav.classList.remove('hidden');
      if (menuIcon) menuIcon.classList.add('hidden');
      if (closeIcon) closeIcon.classList.remove('hidden');
    }
  });
}

/* 4. Scroll Progress Indicator */
function initScrollProgress() {
  const progressBar = document.getElementById('scroll-progress');
  if (!progressBar) return;

  window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    progressBar.style.width = scrolled + '%';
  });
}

/* 5. Custom Cursor Glow */
function initCursorGlow() {
  let cursorGlow = document.getElementById('cursor-glow');
  if (!cursorGlow) {
    cursorGlow = document.createElement('div');
    cursorGlow.id = 'cursor-glow';
    document.body.appendChild(cursorGlow);
  }

  let mouseX = 0, mouseY = 0;
  let currentX = 0, currentY = 0;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animate() {
    currentX += (mouseX - currentX) * 0.15;
    currentY += (mouseY - currentY) * 0.15;
    cursorGlow.style.left = currentX + 'px';
    cursorGlow.style.top = currentY + 'px';
    requestAnimationFrame(animate);
  }
  animate();
}

/* 6. Animated Counters */
function initCounters() {
  const counters = document.querySelectorAll('.counter-val');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-target'), 10);
        const duration = 2000;
        const stepTime = 20;
        const steps = duration / stepTime;
        const increment = target / steps;
        let current = 0;

        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            el.innerText = target;
            clearInterval(timer);
          } else {
            el.innerText = Math.floor(current);
          }
        }, stepTime);

        obs.unobserve(el);
      }
    });
  }, { threshold: 0.3 });

  counters.forEach(c => observer.observe(c));
}

/* 7. Accordion Logic */
function initAccordions() {
  const headers = document.querySelectorAll('.accordion-header');
  headers.forEach(header => {
    header.addEventListener('click', () => {
      const item = header.parentElement;
      const isActive = item.classList.contains('active');

      // Close all active items in the same container if collapsible single mode
      const parent = item.parentElement;
      if (parent) {
        parent.querySelectorAll('.accordion-item').forEach(i => i.classList.remove('active'));
      }

      if (!isActive) {
        item.classList.add('active');
      }
    });
  });
}

/* 8. Lightbox Overlay for Gallery & Videos */
function initLightboxes() {
  const lightbox = document.getElementById('media-lightbox');
  const closeBtn = document.getElementById('lightbox-close');
  const container = document.getElementById('lightbox-content');

  if (!lightbox || !closeBtn || !container) return;

  const openLightbox = (contentHtml) => {
    container.innerHTML = contentHtml;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    lightbox.classList.remove('active');
    container.innerHTML = '';
    document.body.style.overflow = '';
  };

  closeBtn.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  // Attach to trigger buttons
  document.querySelectorAll('[data-lightbox-src]').forEach(btn => {
    btn.addEventListener('click', () => {
      const src = btn.getAttribute('data-lightbox-src');
      const type = btn.getAttribute('data-lightbox-type') || 'image';

      if (type === 'video') {
        openLightbox(`
          <video src="${src}" controls autoPlay playsInline class="w-full h-auto max-h-[85vh] rounded-2xl bg-black glow-gold"></video>
        `);
      } else {
        openLightbox(`
          <img src="${src}" alt="Gallery preview" class="w-full h-auto max-h-[85vh] object-contain rounded-2xl glow-gold" />
        `);
      }
    });
  });
}

/* 9. Testimonials Carousel Slider */
function initTestimonialsSlider() {
  const slider = document.getElementById('testimonials-slider');
  const dotsContainer = document.getElementById('testimonials-dots');
  if (!slider) return;

  const slides = Array.from(slider.children);
  if (!slides.length) return;

  let currentSlide = 0;

  const updateSlider = () => {
    slides.forEach((s, idx) => {
      if (idx === currentSlide) {
        s.classList.remove('hidden');
        s.classList.add('grid');
      } else {
        s.classList.add('hidden');
        s.classList.remove('grid');
      }
    });

    if (dotsContainer) {
      const dots = Array.from(dotsContainer.children);
      dots.forEach((d, idx) => {
        if (idx === currentSlide) {
          d.className = 'h-1.5 rounded-full transition-all w-10 bg-primary';
        } else {
          d.className = 'h-1.5 rounded-full transition-all w-2 bg-primary/30';
        }
      });
    }
  };

  // Render dots
  if (dotsContainer && slides.length > 1) {
    dotsContainer.innerHTML = '';
    slides.forEach((_, idx) => {
      const dot = document.createElement('button');
      dot.setAttribute('aria-label', `Slide ${idx + 1}`);
      dot.addEventListener('click', () => {
        currentSlide = idx;
        updateSlider();
      });
      dotsContainer.appendChild(dot);
    });
  }

  updateSlider();

  // Auto slide every 5.5s
  if (slides.length > 1) {
    setInterval(() => {
      currentSlide = (currentSlide + 1) % slides.length;
      updateSlider();
    }, 5500);
  }
}

/* 10. Service Details Modal Popup */
function initServiceModals() {
  const modal = document.getElementById('service-modal');
  const closeBtn = document.getElementById('service-modal-close');
  const body = document.getElementById('service-modal-body');

  if (!modal || !body) return;

  const close = () => {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  };

  if (closeBtn) closeBtn.addEventListener('click', close);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) close();
  });

  window.openServiceModal = function (title, iconSvg, desc, receiveList, benefitsList, idealList, howList) {
    body.innerHTML = `
      <div class="flex items-center gap-4">
        <div class="grid place-items-center w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/30 text-primary">
          ${iconSvg}
        </div>
        <div>
          <span class="text-[10px] uppercase tracking-[0.3em] text-primary/80">✦ Sacred Offering ✦</span>
          <h3 class="font-display text-3xl md:text-4xl text-gradient-gold">${title}</h3>
        </div>
      </div>

      <p className="mt-6 text-foreground/85 leading-relaxed" style="margin-top: 1.5rem;">${desc}</p>

      <div class="grid md:grid-cols-2 gap-6 mt-8" style="margin-top: 2rem;">
        <div class="glass rounded-2xl p-5 border border-primary/20">
          <h4 class="font-display text-lg text-gradient-gold mb-3">What You'll Receive</h4>
          <ul class="space-y-2 text-sm text-foreground/85">
            ${receiveList.map(i => `<li class="flex items-center gap-2"><span class="text-primary">✦</span> ${i}</li>`).join('')}
          </ul>
        </div>
        <div class="glass rounded-2xl p-5 border border-primary/20">
          <h4 class="font-display text-lg text-gradient-gold mb-3">Benefits</h4>
          <ul class="space-y-2 text-sm text-foreground/85">
            ${benefitsList.map(i => `<li class="flex items-center gap-2"><span class="text-primary">✓</span> ${i}</li>`).join('')}
          </ul>
        </div>
        <div class="glass rounded-2xl p-5 border border-primary/20">
          <h4 class="font-display text-lg text-gradient-gold mb-3">Who This Is For</h4>
          <ul class="space-y-2 text-sm text-foreground/85">
            ${idealList.map(i => `<li class="flex items-center gap-2"><span class="text-primary">✦</span> ${i}</li>`).join('')}
          </ul>
        </div>
        <div class="glass rounded-2xl p-5 border border-primary/20">
          <h4 class="font-display text-lg text-gradient-gold mb-3">How It Works</h4>
          <ul class="space-y-2 text-sm text-foreground/85">
            ${howList.map((i, idx) => `<li class="flex items-center gap-2"><span class="text-primary font-semibold">${idx+1}.</span> ${i}</li>`).join('')}
          </ul>
        </div>
      </div>

      <div class="mt-8 flex flex-wrap gap-3 justify-center" style="margin-top: 2rem;">
        <a href="booking.html?service=${encodeURIComponent(title)}" class="inline-flex items-center rounded-full bg-primary text-primary-foreground px-8 py-3 text-sm font-medium hover:scale-105 transition-transform glow-gold">
          Book This Reading
        </a>
      </div>
    `;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  };
}

/* 11. Booking & Contact Form Handlers */
function initForms() {
  const bookingForm = document.getElementById('booking-form');
  const contactForm = document.getElementById('contact-form');

  const TARGET_EMAIL = "siyamittal1428@gmail.com";

  if (bookingForm) {
    bookingForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const submitBtn = bookingForm.querySelector('button[type="submit"]');
      const originalText = submitBtn ? submitBtn.innerHTML : 'Request Booking';

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `Sending Request...`;
      }

      const formData = new FormData(bookingForm);
      const data = Object.fromEntries(formData.entries());

      const fullPhone = `${data.countryCode || ''} ${data.phone || ''}`.trim();
      
      const payload = {
        _subject: `New Tarot Consultation Booking — ${data.name}`,
        _template: "table",
        _captcha: "false",
        "Full Name": data.name,
        "Email Address": data.email,
        "Phone / WhatsApp": fullPhone,
        "Country": data.country || 'N/A',
        "Selected Reading": data.service,
        "Preferred Date": data.date || 'Flexible',
        "Preferred Time": data.time || 'Flexible',
        "Session Format": data.sessionType,
        "Message / Questions": data.message || 'N/A'
      };

      try {
        await fetch(`https://formsubmit.co/ajax/${TARGET_EMAIL}`, {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(payload)
        });
      } catch (err) {
        console.error("FormSubmit error:", err);
      }

      const successBox = document.getElementById('booking-success');
      if (successBox) {
        bookingForm.classList.add('hidden');
        successBox.classList.remove('hidden');
      }

      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
      }
    });
  }

  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn ? submitBtn.innerHTML : 'Send Message';

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `Sending Message...`;
      }

      const formData = new FormData(contactForm);
      const data = Object.fromEntries(formData.entries());

      const fullPhone = `${data.countryCode || ''} ${data.phone || ''}`.trim();

      const payload = {
        _subject: `New Contact Message — ${data.name}`,
        _template: "table",
        _captcha: "false",
        "Full Name": data.name,
        "Email Address": data.email,
        "Phone / WhatsApp": fullPhone,
        "Message": data.message
      };

      try {
        await fetch(`https://formsubmit.co/ajax/${TARGET_EMAIL}`, {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(payload)
        });
      } catch (err) {
        console.error("FormSubmit error:", err);
      }

      const successBox = document.getElementById('contact-success');
      if (successBox) {
        contactForm.classList.add('hidden');
        successBox.classList.remove('hidden');
      }

      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
      }
    });
  }
}
