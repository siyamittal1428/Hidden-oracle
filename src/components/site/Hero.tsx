import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { ArrowDown, Sparkles } from "lucide-react";
import { StarField, ParticleField, Moon, Fog } from "./Cosmic";
import { MagneticButton } from "./MagneticButton";
import { PhotoFrame } from "./PhotoFrame";
import heroImg from "@/assets/siya-1.png.asset.json";

// Floating tarot card silhouettes
function FloatingCards() {
  const cards = [
    { top: "12%", left: "8%", rotate: -18, delay: 0, size: "w-20 h-32 md:w-28 md:h-44" },
    { top: "22%", right: "10%", rotate: 15, delay: 2, size: "w-24 h-36 md:w-32 md:h-48" },
    { bottom: "18%", left: "12%", rotate: -8, delay: 1, size: "w-16 h-24 md:w-24 md:h-36" },
    { bottom: "26%", right: "14%", rotate: 22, delay: 3, size: "w-20 h-32 md:w-28 md:h-44" },
  ];
  return (
    <div aria-hidden className="absolute inset-0 pointer-events-none overflow-hidden">
      {cards.map((c, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 0.7, y: 0 }}
          transition={{ delay: 0.5 + i * 0.2, duration: 1 }}
          style={{ top: c.top, left: c.left, right: c.right, bottom: c.bottom, rotate: `${c.rotate}deg` }}
          className={`absolute ${c.size}`}
        >
          <motion.div
            animate={{ y: [0, -25, 0], rotate: [c.rotate, c.rotate + 6, c.rotate] }}
            transition={{ duration: 7 + i, repeat: Infinity, ease: "easeInOut", delay: c.delay }}
            className="w-full h-full rounded-xl relative overflow-hidden"
            style={{
              background: "linear-gradient(135deg, var(--mystic-deep), oklch(0.25 0.1 300))",
              border: "2px solid oklch(0.82 0.14 85 / 0.6)",
              boxShadow: "0 0 30px oklch(0.82 0.14 85 / 0.3), inset 0 0 30px oklch(0.55 0.18 300 / 0.3)",
            }}
          >
            <div className="absolute inset-2 rounded-lg border border-primary/40 flex items-center justify-center">
              <Sparkles className="w-6 h-6 md:w-10 md:h-10 text-primary/80 animate-twinkle" />
            </div>
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
}

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-24"
      style={{ background: "var(--gradient-hero)" }}
    >
      <StarField density={80} />
      <ParticleField count={25} />
      <Fog />
      <FloatingCards />

      <Moon className="absolute top-20 right-4 md:right-16 opacity-80 hidden sm:block" />

      <div className="relative mx-auto max-w-7xl px-6 grid lg:grid-cols-[1.2fr_1fr] gap-12 items-center py-16">
        <div className="text-center lg:text-left">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 rounded-full glass-gold px-4 py-1.5 text-xs tracking-[0.3em] uppercase text-primary"
          >
            <Sparkles className="w-3 h-3" /> The Hidden Oracle
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.9 }}
            className="mt-6 font-display text-5xl sm:text-6xl md:text-7xl leading-[1.05] tracking-tight"
          >
            <span className="text-foreground/95">Discover Your Path</span>
            <br />
            <span className="text-foreground/70">Through the Wisdom of</span>{" "}
            <span className="text-gradient-gold italic">Tarot</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="mt-6 text-base sm:text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0"
          >
            Receive personalized Tarot readings for love, relationships, career, finance,
            family, and spiritual guidance — from a trusted intuitive advisor.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="mt-9 flex flex-wrap gap-4 justify-center lg:justify-start"
          >
            <MagneticButton to="/booking">Book a Reading →</MagneticButton>
            <MagneticButton to="/services" variant="ghost">Explore Services</MagneticButton>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="mt-10 flex gap-6 items-center justify-center lg:justify-start text-xs text-muted-foreground"
          >
            <div>✦ 100% Confidential</div>
            <div>✦ Online Sessions</div>
            <div className="hidden sm:block">✦ Trusted Guidance</div>
          </motion.div>
        </div>

        <div className="relative">
          <PhotoFrame src={heroImg.url} alt="Siya — Tarot Reader" aspect="aspect-[4/5]" />
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="absolute -bottom-4 -left-4 md:-left-8 glass-gold rounded-2xl px-5 py-3 glow-gold"
          >
            <div className="text-xs uppercase tracking-widest text-primary">Trusted by</div>
            <div className="font-display text-2xl text-gradient-gold">1,200+ Souls</div>
          </motion.div>
        </div>
      </div>

      <Link to="/services" className="absolute bottom-8 left-1/2 -translate-x-1/2 group">
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2 text-primary/70 group-hover:text-primary"
        >
          <span className="text-[10px] tracking-[0.3em] uppercase">Scroll to explore</span>
          <ArrowDown className="w-4 h-4" />
        </motion.div>
      </Link>
    </section>
  );
}
