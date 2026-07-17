import { useMemo } from "react";
import { motion } from "framer-motion";

export function StarField({ density = 60 }: { density?: number }) {
  const stars = useMemo(
    () => Array.from({ length: density }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 0.5,
      delay: Math.random() * 3,
      duration: Math.random() * 3 + 2,
    })),
    [density]
  );
  return (
    <div aria-hidden className="absolute inset-0 overflow-hidden pointer-events-none">
      {stars.map((s) => (
        <span
          key={s.id}
          className="absolute rounded-full bg-white animate-twinkle"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: s.size,
            height: s.size,
            animationDelay: `${s.delay}s`,
            animationDuration: `${s.duration}s`,
            boxShadow: `0 0 ${s.size * 3}px oklch(1 0 0 / 0.8)`,
          }}
        />
      ))}
      {/* shooting stars */}
      {[0, 1, 2].map((i) => (
        <span
          key={`shoot-${i}`}
          className="absolute h-0.5 w-24 bg-gradient-to-r from-transparent via-white to-transparent"
          style={{
            top: `${10 + i * 20}%`,
            right: `${-20 + i * 5}%`,
            animation: `shooting-star ${6 + i * 2}s ${i * 3}s linear infinite`,
          }}
        />
      ))}
    </div>
  );
}

export function ParticleField({ count = 20 }: { count?: number }) {
  const particles = useMemo(
    () => Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 8,
      duration: Math.random() * 8 + 8,
      size: Math.random() * 4 + 2,
    })),
    [count]
  );
  return (
    <div aria-hidden className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="absolute rounded-full bg-primary/40 blur-sm"
          style={{ left: `${p.x}%`, bottom: 0, width: p.size, height: p.size }}
          animate={{ y: [0, -800], opacity: [0, 0.8, 0], x: [0, 30, -30, 0] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

export function Moon({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden className={`pointer-events-none ${className}`}>
      <motion.div
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="relative"
      >
        <div className="w-40 h-40 md:w-56 md:h-56 rounded-full bg-gradient-to-br from-gold-soft via-primary to-accent/70 animate-moon-glow" />
        <div className="absolute inset-2 rounded-full bg-gradient-to-br from-background/40 to-transparent mix-blend-overlay" />
        <div className="absolute inset-0 rounded-full opacity-20"
          style={{ background: "radial-gradient(circle at 30% 30%, transparent 20%, oklch(0.5 0.1 300 / 0.4) 40%, transparent 60%)" }}
        />
      </motion.div>
    </div>
  );
}

export function Fog() {
  return (
    <div aria-hidden className="absolute inset-0 pointer-events-none overflow-hidden">
      <div className="absolute -bottom-20 -left-20 w-[60vw] h-[40vh] rounded-full blur-3xl opacity-30" style={{ background: "radial-gradient(circle, var(--accent), transparent 70%)" }} />
      <div className="absolute -top-20 -right-20 w-[50vw] h-[40vh] rounded-full blur-3xl opacity-20" style={{ background: "radial-gradient(circle, var(--primary), transparent 70%)" }} />
    </div>
  );
}
