import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import type { ReactNode, ComponentPropsWithoutRef } from "react";

type Props = {
  children: ReactNode;
  variant?: "primary" | "ghost";
  to?: string;
  href?: string;
} & Omit<ComponentPropsWithoutRef<"button">, "ref">;

export function MagneticButton({ children, variant = "primary", to, href, ...rest }: Props) {
  const base =
    "relative inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium tracking-wide overflow-hidden transition-all";
  const styles =
    variant === "primary"
      ? "text-primary-foreground bg-gradient-to-r from-primary via-gold-soft to-primary bg-[length:200%_100%] hover:bg-[position:100%_0] glow-gold"
      : "text-foreground glass hover:glass-gold border border-primary/40";

  const inner = (
    <motion.span
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.97 }}
      className={`${base} ${styles}`}
    >
      <span className="relative z-10 flex items-center gap-2">{children}</span>
      <span className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity" style={{ background: "radial-gradient(circle at var(--x,50%) var(--y,50%), oklch(1 0 0 / 0.2), transparent 40%)" }} />
    </motion.span>
  );

  if (to) return <Link to={to}>{inner}</Link>;
  if (href) return <a href={href}>{inner}</a>;
  return <button {...rest}>{inner}</button>;
}
