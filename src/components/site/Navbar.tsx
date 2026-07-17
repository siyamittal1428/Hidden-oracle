import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sparkles } from "lucide-react";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/gallery", label: "Gallery" },
  { to: "/testimonials", label: "Testimonials" },
  { to: "/faq", label: "FAQ" },
  { to: "/contact", label: "Contact" },
] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { location } = useRouterState();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [location.pathname]);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled ? "py-3" : "py-5"
      }`}
    >
      <div className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8`}>
        <div className={`flex items-center justify-between rounded-full px-5 py-3 transition-all duration-500 ${
          scrolled ? "glass-gold glow-gold" : "glass"
        }`}>
          <Link to="/" className="flex items-center gap-2 group">
            <motion.div
              whileHover={{ rotate: 180 }}
              transition={{ duration: 0.6 }}
              className="grid place-items-center w-9 h-9 rounded-full bg-gradient-to-br from-primary to-accent glow-gold"
            >
              <Sparkles className="w-4 h-4 text-primary-foreground" />
            </motion.div>
            <span className="font-display text-lg sm:text-xl tracking-wide text-gradient-gold">
              Hidden Oracle
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="relative px-3 py-2 text-sm text-foreground/80 hover:text-primary transition-colors group"
                activeProps={{ className: "text-primary" }}
                activeOptions={{ exact: true }}
              >
                <span className="relative z-10">{l.label}</span>
                <span className="absolute inset-x-3 -bottom-0.5 h-px bg-gradient-to-r from-transparent via-primary to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              to="/booking"
              className="hidden sm:inline-flex items-center rounded-full bg-gradient-to-r from-primary to-gold-soft px-5 py-2 text-sm font-medium text-primary-foreground hover:scale-105 transition-transform glow-gold"
            >
              Book Reading
            </Link>
            <button
              onClick={() => setOpen((v) => !v)}
              className="lg:hidden grid place-items-center w-10 h-10 rounded-full glass"
              aria-label="Menu"
            >
              {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {open && (
            <motion.nav
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="lg:hidden mt-2 glass-gold rounded-3xl p-4 flex flex-col gap-1"
            >
              {links.map((l) => (
                <Link key={l.to} to={l.to} className="px-4 py-3 rounded-2xl hover:bg-primary/10 text-foreground/90">
                  {l.label}
                </Link>
              ))}
              <Link to="/booking" className="mt-2 text-center rounded-full bg-primary px-4 py-3 text-primary-foreground font-medium">
                Book Reading
              </Link>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}
