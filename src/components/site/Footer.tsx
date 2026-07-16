import { Link } from "@tanstack/react-router";
import { Instagram, Youtube, ArrowUp, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export function Footer() {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  return (
    <footer className="relative mt-24 border-t border-border/50 bg-gradient-to-b from-transparent to-mystic-deep/60">
      <div className="pointer-events-none absolute inset-0 opacity-30" style={{ background: "radial-gradient(ellipse at top, var(--gold) 0%, transparent 50%)" }} />
      <div className="relative mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-10 md:grid-cols-3 text-center md:text-left">
          <div className="flex flex-col items-center md:items-start">
            <Link to="/" className="flex items-center gap-2">
              <div className="grid place-items-center w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent glow-gold">
                <Sparkles className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-display text-2xl text-gradient-gold">Hidden Oracle</span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed max-w-xs">
              Personalized tarot readings and spiritual guidance for love, career, and life's deeper questions — by Siya.
            </p>
            <div className="mt-5 flex gap-3">
              {[
                { icon: Instagram, href: "https://www.instagram.com/hiddenoracle._14?igsh=MWRoeGtyZnB6eHpuYw%3D%3D&utm_source=qr", label: "Instagram" },
                { icon: Youtube, href: "https://youtube.com/@hiddenoracle_14?si=BO3w8mPCdGvCEXf8", label: "YouTube" },
              ].map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  whileHover={{ scale: 1.15, y: -3 }}
                  className="grid place-items-center w-11 h-11 rounded-full glass hover:glass-gold hover:glow-gold transition-all"
                >
                  <Icon className="w-4 h-4 text-primary" />
                </motion.a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-display text-lg text-gradient-gold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              {["/about","/services","/gallery","/faq","/contact"].map((p) => (
                <li key={p}><Link to={p} className="text-muted-foreground hover:text-primary transition-colors">{p.replace("/", "").replace(/^./, (c) => c.toUpperCase()) || "Home"}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-lg text-gradient-gold mb-4">Services</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Love & Relationships</li>
              <li>Career & Business</li>
              <li>Finance Guidance</li>
              <li>Spiritual Growth</li>
              <li>Monthly Forecast</li>
              <li>Energy Healing</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-border/40 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Hidden Oracle by Siya. All readings confidential.</p>
          <div className="flex gap-5">
            <a href="#" className="hover:text-primary">Privacy Policy</a>
            <a href="#" className="hover:text-primary">Terms & Conditions</a>
          </div>
          <button onClick={scrollTop} className="inline-flex items-center gap-1 hover:text-primary transition-colors">
            <ArrowUp className="w-3 h-3" /> Back to top
          </button>
        </div>
      </div>
    </footer>
  );
}
