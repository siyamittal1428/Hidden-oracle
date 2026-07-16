import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

export function Counter({ to, suffix = "", label }: { to: number; suffix?: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const duration = 1800;
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      setN(Math.floor(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-center glass-gold rounded-3xl p-6 md:p-8"
    >
      <div className="font-display text-4xl md:text-5xl text-gradient-gold">
        {n.toLocaleString()}{suffix}
      </div>
      <div className="mt-2 text-xs md:text-sm uppercase tracking-[0.25em] text-muted-foreground">{label}</div>
    </motion.div>
  );
}
