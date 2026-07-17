import { motion } from "framer-motion";
import type { ReactNode } from "react";

/** Glowing golden frame for portrait photos */
export function PhotoFrame({
  src,
  alt,
  className = "",
  aspect = "aspect-[4/5]",
  children,
}: {
  src: string;
  alt: string;
  className?: string;
  aspect?: string;
  children?: ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.9, ease: "easeOut" }}
      className={`relative ${className}`}
    >
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="relative"
      >
        {/* glowing gold ring */}
        <div className="absolute -inset-1 rounded-[2rem] bg-gradient-to-br from-primary via-accent to-primary opacity-70 blur-lg animate-glow-pulse" />
        <div className="absolute -inset-0.5 rounded-[2rem] bg-gradient-to-br from-primary via-gold-soft to-accent" />
        <div className={`relative overflow-hidden rounded-[1.9rem] ${aspect}`}>
          <img
            src={src}
            alt={alt}
            loading="lazy"
            className="w-full h-full object-cover"
          />
          {/* mystical overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent pointer-events-none" />
          <div className="absolute inset-0 opacity-20 mix-blend-overlay pointer-events-none" style={{ background: "radial-gradient(circle at 30% 20%, var(--primary), transparent 60%)" }} />
        </div>
        {children}
      </motion.div>
    </motion.div>
  );
}
