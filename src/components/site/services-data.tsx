import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Heart, Users, Gem, Briefcase, TrendingUp, Coins, Home as HomeIcon,
  Sparkles, Zap, HelpCircle, CalendarDays, X, Check
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type ServiceDetails = {
  fullDescription: string;
  receive: string[];
  benefits: string[];
  idealFor: string[];
  howItWorks: string[];
  faqs: { q: string; a: string }[];
};

export type Service = {
  slug: string;
  title: string;
  icon: LucideIcon;
  description: string;
  details: ServiceDetails;
};

const baseHow = [
  "Book your session through the booking page and share your question.",
  "Siya tunes into your energy and shuffles the deck with intention.",
  "Cards are drawn, interpreted, and channeled with intuitive insight.",
  "You receive clarity, guidance, and gentle next steps — recorded if online.",
];

const baseFaqs = [
  { q: "How is the session conducted?", a: "Sessions happen online via video, audio, or private chat — whatever feels most comfortable to you." },
  { q: "Is my reading confidential?", a: "Absolutely. Every session is completely private. Your story stays sacred." },
  { q: "Do I need to prepare anything?", a: "Just come with an open heart and a clear question. Siya guides the rest." },
];

function make(title: string, focus: string): ServiceDetails {
  return {
    fullDescription: `A deeply personal ${title.toLowerCase()} designed to bring you clarity, honest insight, and empowered next steps around ${focus}. Blending traditional tarot, intuitive channeling, and gentle energy work — every reading is shaped uniquely to your energy.`,
    receive: [
      "A fully personalized tarot spread",
      "Recorded audio/video of your session",
      "Written summary with key insights",
      "Follow-up guidance for your next steps",
    ],
    benefits: [
      "Clarity around confusing situations",
      "Confidence to make grounded decisions",
      "Emotional release and healing",
      "A calm, empowered path forward",
    ],
    idealFor: [
      "Anyone at a crossroads seeking honest guidance",
      "Souls ready to release confusion and move forward",
      "Those craving spiritual perspective on real-life questions",
    ],
    howItWorks: baseHow,
    faqs: baseFaqs,
  };
}

export const services: Service[] = [
  { slug: "love", title: "Love Reading", icon: Heart, description: "Uncover the truth about your romantic path, twin flames, and heart's deepest desires.", details: make("Love Reading", "love, romance, and matters of the heart") },
  { slug: "relationship", title: "Relationship Reading", icon: Users, description: "Clarity for partnerships — communication, alignment, and the way forward.", details: make("Relationship Reading", "your partnership dynamics and communication") },
  { slug: "marriage", title: "Marriage Guidance", icon: Gem, description: "Timing, compatibility, and spiritual insight for lifelong bonds.", details: make("Marriage Guidance", "marriage timing, compatibility, and lifelong bonds") },
  { slug: "career", title: "Career Reading", icon: Briefcase, description: "Discover your calling, next moves, and the doors ready to open.", details: make("Career Reading", "your career path, calling, and next opportunities") },
  { slug: "business", title: "Business Reading", icon: TrendingUp, description: "Strategic tarot insight for founders, decisions, and growth cycles.", details: make("Business Reading", "business strategy, founder decisions, and growth") },
  { slug: "finance", title: "Finance Reading", icon: Coins, description: "Money mindset, abundance blocks, and the flow of prosperity.", details: make("Finance Reading", "money mindset, abundance, and financial flow") },
  { slug: "family", title: "Family Reading", icon: HomeIcon, description: "Heal generational patterns and restore harmony at home.", details: make("Family Reading", "family harmony and generational healing") },
  { slug: "spiritual", title: "Spiritual Reading", icon: Sparkles, description: "Soul purpose, life path, and the wisdom your guides are sharing.", details: make("Spiritual Reading", "soul purpose, life path, and spiritual awakening") },
  { slug: "energy-healing", title: "Energy Healing", icon: Zap, description: "Clear stagnant energy and align your chakras with intention.", details: make("Energy Healing", "energy clearing and chakra alignment") },
  { slug: "yes-no", title: "Yes / No Reading", icon: HelpCircle, description: "A quick, focused answer to your most pressing question.", details: make("Yes / No Reading", "one focused, pressing question") },
  { slug: "monthly-forecast", title: "Monthly Tarot Forecast", icon: CalendarDays, description: "Your month ahead — themes, warnings, and opportunities.", details: make("Monthly Tarot Forecast", "the themes and opportunities of your month ahead") },
];

export function ServiceCard({ s, index }: { s: Service; index: number }) {
  const Icon = s.icon;
  const [open, setOpen] = useState(false);
  return (
    <>
      <motion.article
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, delay: (index % 4) * 0.08 }}
        whileHover={{ y: -8, rotateX: 3, rotateY: -3 }}
        style={{ transformStyle: "preserve-3d" }}
        className="group relative glass rounded-3xl p-7 hover:glass-gold transition-all duration-500"
      >
        <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none glow-gold" />
        <div className="relative flex flex-col h-full">
          <div className="grid place-items-center w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/30 group-hover:animate-glow-pulse">
            <Icon className="w-7 h-7 text-primary" />
          </div>
          <h3 className="mt-5 font-display text-2xl text-gradient-gold">{s.title}</h3>
          <p className="mt-2 text-sm text-muted-foreground leading-relaxed flex-1">{s.description}</p>
          <div className="mt-6 flex gap-2">
            <a href={`/booking?service=${s.slug}`} className="flex-1 text-center rounded-full bg-primary text-primary-foreground text-sm font-medium py-2.5 hover:scale-105 transition-transform">
              Book Now
            </a>
            <button
              onClick={() => setOpen(true)}
              className="rounded-full glass border border-primary/30 text-primary text-sm px-4 py-2.5 hover:bg-primary/10 transition-colors"
            >
              Learn More
            </button>
          </div>
        </div>
      </motion.article>

      <ServiceDetailsModal open={open} onClose={() => setOpen(false)} service={s} />
    </>
  );
}

function ServiceDetailsModal({ open, onClose, service }: { open: boolean; onClose: () => void; service: Service }) {
  const Icon = service.icon;
  const d = service.details;
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[90] bg-background/85 backdrop-blur-xl grid place-items-center p-4 md:p-8 overflow-y-auto"
        >
          <motion.div
            initial={{ scale: 0.92, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-3xl my-auto glass-gold rounded-3xl p-6 md:p-10 glow-gold max-h-[90vh] overflow-y-auto"
          >
            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute top-4 right-4 grid place-items-center w-10 h-10 rounded-full glass hover:bg-primary/20 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-4">
              <div className="grid place-items-center w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/30">
                <Icon className="w-7 h-7 text-primary" />
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-[0.3em] text-primary/80">✦ Sacred Offering ✦</span>
                <h3 className="font-display text-3xl md:text-4xl text-gradient-gold">{service.title}</h3>
              </div>
            </div>

            <p className="mt-6 text-foreground/85 leading-relaxed">{d.fullDescription}</p>

            <div className="grid md:grid-cols-2 gap-6 mt-8">
              <DetailBlock title="What You'll Receive" items={d.receive} />
              <DetailBlock title="Benefits" items={d.benefits} />
              <DetailBlock title="Who This Reading Is For" items={d.idealFor} />
              <DetailBlock title="How The Session Works" items={d.howItWorks} ordered />
            </div>

            <div className="mt-8">
              <h4 className="font-display text-xl text-gradient-gold mb-3">Frequently Asked Questions</h4>
              <div className="space-y-3">
                {d.faqs.map((f, i) => (
                  <div key={i} className="glass rounded-2xl p-4 border border-primary/20">
                    <div className="text-sm font-semibold text-foreground">{f.q}</div>
                    <div className="mt-1 text-sm text-muted-foreground">{f.a}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-3 justify-center">
              <a
                href={`/booking?service=${service.slug}`}
                className="inline-flex items-center rounded-full bg-primary text-primary-foreground px-8 py-3 text-sm font-medium hover:scale-105 transition-transform glow-gold"
              >
                Book This Reading
              </a>
              <button
                onClick={onClose}
                className="inline-flex items-center rounded-full glass border border-primary/30 px-8 py-3 text-sm hover:bg-primary/10 transition-colors"
              >
                Close
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function DetailBlock({ title, items, ordered = false }: { title: string; items: string[]; ordered?: boolean }) {
  return (
    <div className="glass rounded-2xl p-5 border border-primary/20">
      <h4 className="font-display text-lg text-gradient-gold mb-3">{title}</h4>
      <ul className="space-y-2">
        {items.map((it, i) => (
          <li key={i} className="flex gap-2 text-sm text-foreground/85">
            {ordered ? (
              <span className="text-primary font-semibold min-w-[1.25rem]">{i + 1}.</span>
            ) : (
              <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
            )}
            <span>{it}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
