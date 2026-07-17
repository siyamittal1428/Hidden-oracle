// Services data and interactive modal rendering
const servicesList = [
  { slug: "love", title: "Love Reading", icon: "heart", description: "Uncover the truth about your romantic path, twin flames, and heart's deepest desires." },
  { slug: "relationship", title: "Relationship Reading", icon: "users", description: "Clarity for partnerships — communication, alignment, and the way forward." },
  { slug: "marriage", title: "Marriage Guidance", icon: "gem", description: "Timing, compatibility, and spiritual insight for lifelong bonds." },
  { slug: "career", title: "Career Reading", icon: "briefcase", description: "Discover your calling, next moves, and the doors ready to open." },
  { slug: "business", title: "Business Reading", icon: "trending-up", description: "Strategic tarot insight for founders, decisions, and growth cycles." },
  { slug: "finance", title: "Finance Reading", icon: "coins", description: "Money mindset, abundance blocks, and the flow of prosperity." },
  { slug: "family", title: "Family Reading", icon: "home", description: "Heal generational patterns and restore harmony at home." },
  { slug: "spiritual", title: "Spiritual Reading", icon: "sparkles", description: "Soul purpose, life path, and the wisdom your guides are sharing." },
  { slug: "energy-healing", title: "Energy Healing", icon: "zap", description: "Clear stagnant energy and align your chakras with intention." },
  { slug: "yes-no", title: "Yes / No Reading", icon: "help-circle", description: "A quick, focused answer to your most pressing question." },
  { slug: "monthly-forecast", title: "Monthly Tarot Forecast", icon: "calendar-days", description: "Your month ahead — themes, warnings, and opportunities." }
];

const baseHow = [
  "Book your session through the booking page and share your question.",
  "Siya tunes into your energy and shuffles the deck with intention.",
  "Cards are drawn, interpreted, and channeled with intuitive insight.",
  "You receive clarity, guidance, and gentle next steps — recorded if online."
];

const baseFaqs = [
  { q: "How is the session conducted?", a: "Sessions happen online via video, audio, or private chat — whatever feels most comfortable to you." },
  { q: "Is my reading confidential?", a: "Absolutely. Every session is completely private. Your story stays sacred." },
  { q: "Do I need to prepare anything?", a: "Just come with an open heart and a clear question. Siya guides the rest." }
];

function getServiceDetails(title, focus) {
  return {
    fullDescription: `A deeply personal ${title.toLowerCase()} designed to bring you clarity, honest insight, and empowered next steps around ${focus}. Blending traditional tarot, intuitive channeling, and gentle energy work — every reading is shaped uniquely to your energy.`,
    receive: [
      "A fully personalized tarot spread",
      "Recorded audio/video of your session",
      "Written summary with key insights",
      "Follow-up guidance for your next steps"
    ],
    benefits: [
      "Clarity around confusing situations",
      "Confidence to make grounded decisions",
      "Emotional release and healing",
      "A calm, empowered path forward"
    ],
    idealFor: [
      "Anyone at a crossroads seeking honest guidance",
      "Souls ready to release confusion and move forward",
      "Those craving spiritual perspective on real-life questions"
    ],
    howItWorks: baseHow,
    faqs: baseFaqs
  };
}

const serviceDetailsMap = {
  love: getServiceDetails("Love Reading", "love, romance, and matters of the heart"),
  relationship: getServiceDetails("Relationship Reading", "your partnership dynamics and communication"),
  marriage: getServiceDetails("Marriage Guidance", "marriage timing, compatibility, and lifelong bonds"),
  career: getServiceDetails("Career Reading", "your career path, calling, and next opportunities"),
  business: getServiceDetails("Business Reading", "business strategy, founder decisions, and growth"),
  finance: getServiceDetails("Finance Reading", "money mindset, abundance, and financial flow"),
  family: getServiceDetails("Family Reading", "family harmony and generational healing"),
  spiritual: getServiceDetails("Spiritual Reading", "soul purpose, life path, and spiritual awakening"),
  "energy-healing": getServiceDetails("Energy Healing", "energy clearing and chakra alignment"),
  "yes-no": getServiceDetails("Yes / No Reading", "one focused, pressing question"),
  "monthly-forecast": getServiceDetails("Monthly Tarot Forecast", "the themes and opportunities of your month ahead")
};

document.addEventListener("DOMContentLoaded", () => {
  renderServices();
  initServiceSelect();
});

function renderServices() {
  const grid = document.getElementById("services-grid");
  if (!grid) return;

  const limit = parseInt(grid.getAttribute("data-limit")) || servicesList.length;
  const itemsToRender = servicesList.slice(0, limit);

  grid.innerHTML = "";

  itemsToRender.forEach((s, index) => {
    const card = document.createElement("article");
    card.className = "reveal group relative glass rounded-3xl p-7 hover:glass-gold transition-all duration-500 hover:-translate-y-2 cursor-default";
    card.setAttribute("data-delay", (index % 3) * 0.08);
    card.style.transformStyle = "preserve-3d";

    card.innerHTML = `
      <div class="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none glow-gold"></div>
      <div class="relative flex flex-col h-full">
        <div class="grid place-items-center w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/30 group-hover:animate-glow-pulse">
          <i data-lucide="${s.icon}" class="w-7 h-7 text-primary"></i>
        </div>
        <h3 class="mt-5 font-display text-2xl text-gradient-gold">${s.title}</h3>
        <p class="mt-2 text-sm text-muted-foreground leading-relaxed flex-1">${s.description}</p>
        <div class="mt-6 flex gap-2">
          <a href="booking.html?service=${s.slug}" class="flex-1 text-center rounded-full bg-primary text-primary-foreground text-sm font-medium py-2.5 hover:scale-105 transition-transform">
            Book Now
          </a>
          <button class="learn-more-btn rounded-full glass border border-primary/30 text-primary text-sm px-4 py-2.5 hover:bg-primary/10 transition-colors cursor-pointer">
            Learn More
          </button>
        </div>
      </div>
    `;

    // Learn more button click handler
    card.querySelector(".learn-more-btn").addEventListener("click", () => {
      openDetailsModal(s);
    });

    grid.appendChild(card);
  });

  if (typeof lucide !== "undefined") {
    lucide.createIcons();
  }
}

// Dynamically open details modal popup
function openDetailsModal(service) {
  const d = serviceDetailsMap[service.slug];
  if (!d) return;

  const overlay = document.createElement("div");
  overlay.className = "fixed inset-0 z-[99] bg-background/85 backdrop-blur-xl grid place-items-center p-4 md:p-8 overflow-y-auto animate-fade-in";

  // Create card container
  const container = document.createElement("div");
  container.className = "relative w-full max-w-3xl my-auto glass-gold rounded-3xl p-6 md:p-10 glow-gold max-h-[90vh] overflow-y-auto scale-95 transition-all duration-300";
  
  // Close button
  const closeBtn = document.createElement("button");
  closeBtn.setAttribute("aria-label", "Close");
  closeBtn.className = "absolute top-4 right-4 grid place-items-center w-10 h-10 rounded-full glass hover:bg-primary/20 transition-colors cursor-pointer";
  closeBtn.innerHTML = '<i data-lucide="x" class="w-4 h-4 text-foreground"></i>';

  // Modal header content
  const headerContent = `
    <div class="flex items-center gap-4">
      <div class="grid place-items-center w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/30">
        <i data-lucide="${service.icon}" class="w-7 h-7 text-primary"></i>
      </div>
      <div>
        <span class="text-[10px] uppercase tracking-[0.3em] text-primary/80">✦ Sacred Offering ✦</span>
        <h3 class="font-display text-3xl md:text-4xl text-gradient-gold">${service.title}</h3>
      </div>
    </div>
    <p class="mt-6 text-foreground/85 leading-relaxed">${d.fullDescription}</p>
  `;

  // Blocks
  const buildBlock = (title, items, ordered = false) => {
    const listItems = items.map((it, idx) => `
      <li class="flex gap-2 text-sm text-foreground/85">
        ${ordered 
          ? `<span class="text-primary font-semibold min-w-[1.25rem]">${idx + 1}.</span>`
          : `<i data-lucide="check" class="w-4 h-4 text-primary mt-0.5 shrink-0"></i>`
        }
        <span>${it}</span>
      </li>
    `).join("");

    return `
      <div class="glass rounded-2xl p-5 border border-primary/20">
        <h4 class="font-display text-lg text-gradient-gold mb-3">${title}</h4>
        <ul class="space-y-2">${listItems}</ul>
      </div>
    `;
  };

  const blocksHtml = `
    <div class="grid md:grid-cols-2 gap-6 mt-8">
      ${buildBlock("What You'll Receive", d.receive)}
      ${buildBlock("Benefits", d.benefits)}
      ${buildBlock("Who This Reading Is For", d.idealFor)}
      ${buildBlock("How The Session Works", d.howItWorks, true)}
    </div>
  `;

  // FAQs
  const faqsHtml = `
    <div class="mt-8">
      <h4 class="font-display text-xl text-gradient-gold mb-3">Frequently Asked Questions</h4>
      <div class="space-y-3">
        ${d.faqs.map(f => `
          <div class="glass rounded-2xl p-4 border border-primary/20">
            <div class="text-sm font-semibold text-foreground">${f.q}</div>
            <div class="mt-1 text-sm text-muted-foreground">${f.a}</div>
          </div>
        `).join("")}
      </div>
    </div>
  `;

  // Footer Buttons
  const footerBtns = `
    <div class="mt-8 flex flex-wrap gap-3 justify-center">
      <a href="booking.html?service=${service.slug}" class="inline-flex items-center rounded-full bg-primary text-primary-foreground px-8 py-3 text-sm font-medium hover:scale-105 transition-transform glow-gold">
        Book This Reading
      </a>
      <button class="modal-close-btn inline-flex items-center rounded-full glass border border-primary/30 px-8 py-3 text-sm hover:bg-primary/10 transition-colors cursor-pointer">
        Close
      </button>
    </div>
  `;

  container.innerHTML = headerContent + blocksHtml + faqsHtml + footerBtns;
  container.appendChild(closeBtn);
  overlay.appendChild(container);
  document.body.appendChild(overlay);
  document.body.style.overflow = "hidden"; // Prevent page scroll

  setTimeout(() => {
    container.classList.remove("scale-95");
    container.classList.add("scale-100");
  }, 10);

  if (typeof lucide !== "undefined") {
    lucide.createIcons();
  }

  // Close function
  const close = () => {
    container.classList.remove("scale-100");
    container.classList.add("scale-95");
    overlay.classList.add("opacity-0");
    setTimeout(() => {
      document.body.removeChild(overlay);
      document.body.style.overflow = "";
    }, 300);
  };

  overlay.addEventListener("click", close);
  closeBtn.addEventListener("click", close);
  container.querySelector(".modal-close-btn").addEventListener("click", close);
  container.addEventListener("click", (e) => e.stopPropagation());

  const handleKeydown = (e) => {
    if (e.key === "Escape") {
      close();
      window.removeEventListener("keydown", handleKeydown);
    }
  };
  window.addEventListener("keydown", handleKeydown);
}

// Auto-fill query parameter service selection for booking.html page dropdown
function initServiceSelect() {
  const urlParams = new URLSearchParams(window.location.search);
  const serviceSlug = urlParams.get("service");
  if (!serviceSlug) return;

  const select = document.querySelector("select[name='service']");
  if (select) {
    select.value = serviceSlug;
    select.dispatchEvent(new Event("change"));
  }
}
