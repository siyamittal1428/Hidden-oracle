import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Hero } from "@/components/site/Hero";
import { Section, Reveal } from "@/components/site/Section";
import { services, ServiceCard } from "@/components/site/services-data";
import { Counter } from "@/components/site/Counter";
import { MagneticButton } from "@/components/site/MagneticButton";
import { PhotoFrame } from "@/components/site/PhotoFrame";
import aboutImg from "@/assets/siya-3.png.asset.json";
import { MediaCarousel, type MediaItem } from "@/components/site/MediaCarousel";
import img1 from "@/assets/siya-1.png.asset.json";
import img2 from "@/assets/siya-2.png.asset.json";
import img3 from "@/assets/siya-3.png.asset.json";
import img4 from "@/assets/siya-4.png.asset.json";
import img5 from "@/assets/siya-5.png.asset.json";
import v1 from "@/assets/siya-video-1.mp4.asset.json";
import v2 from "@/assets/siya-video-2.mp4.asset.json";
import v3 from "@/assets/siya-video-3.mp4.asset.json";
import { Shield, Sparkles, Heart, Users, Star, Video, CalendarDays, Lock } from "lucide-react";

const homeMedia: MediaItem[] = [
  { type: "image", src: img1.url, alt: "Latest reading portrait" },
  { type: "video", src: v1.url, alt: "Reading session clip" },
  { type: "image", src: img2.url, alt: "Sacred reading moment" },
  { type: "video", src: v2.url, alt: "Behind the scenes" },
  { type: "image", src: img3.url, alt: "Cards on the table" },
  { type: "video", src: v3.url, alt: "Client session clip" },
  { type: "image", src: img4.url, alt: "Tarot table detail" },
  { type: "image", src: img5.url, alt: "Reading in progress" },
];

export const Route = createFileRoute("/")({
  component: Home,
  head: () => ({
    meta: [
      { title: "Hidden Oracle — Tarot Readings & Spiritual Guidance by Siya" },
      { name: "description", content: "Book personalized tarot readings for love, career, finance, and life's questions. Trusted intuitive guidance from Siya, professional spiritual advisor." },
      { property: "og:title", content: "Hidden Oracle — Tarot Readings by Siya" },
      { property: "og:description", content: "Discover your path through the wisdom of Tarot." },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
});

const whyChoose = [
  { icon: Lock, title: "Confidential Sessions", text: "Your story is sacred. Every reading is completely private." },
  { icon: Sparkles, title: "Accurate Guidance", text: "Grounded intuitive insight backed by years of practice." },
  { icon: Heart, title: "Positive Energy", text: "Every session ends with clarity, hope, and empowerment." },
  { icon: Star, title: "Personalized Readings", text: "No two spreads alike — always shaped to your energy." },
  { icon: Shield, title: "Trusted Advice", text: "Thousands of readings, hundreds of five-star reviews." },
  { icon: Video, title: "Online Sessions", text: "Meet from anywhere — video, audio, or private chat." },
  { icon: CalendarDays, title: "Flexible Booking", text: "Weekend and evening slots available worldwide." },
  { icon: Users, title: "Secure Communication", text: "Encrypted channels for every conversation." },
];

function Home() {
  return (
    <>
      <Hero />

      {/* Intro / About preview */}
      <Section id="intro" eyebrow="Meet Your Guide" title={<>Guided by intuition. <em className="not-italic text-foreground/80">Rooted in truth.</em></>}>
        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-12 items-center">
          <PhotoFrame src={aboutImg.url} alt="Siya at her tarot table" />
          <div>
            <Reveal>
              <p className="text-lg text-foreground/85 leading-relaxed">
                I'm <span className="text-gradient-gold font-semibold">Siya</span> — a professional tarot reader and spiritual guide.
                For years I've helped seekers navigate love, career, and life transitions with clarity and compassion.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-5 text-muted-foreground leading-relaxed">
                My readings blend traditional tarot with intuitive channeling, energy work, and a deep respect for your free will.
                You'll leave every session grounded, seen, and ready to move forward.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="mt-8 flex flex-wrap gap-4">
                <MagneticButton to="/about">My Story</MagneticButton>
                <MagneticButton to="/booking" variant="ghost">Book a Session</MagneticButton>
              </div>
            </Reveal>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
          <Counter to={1200} suffix="+" label="Happy Clients" />
          <Counter to={2500} suffix="+" label="Successful Readings" />
          <Counter to={4} suffix="+" label="Years of Experience" />
          <Counter to={99} suffix="%" label="Positive Reviews" />

        </div>
      </Section>

      {/* Services preview */}
      <Section
        id="services"
        eyebrow="Sacred Offerings"
        title="Readings for every chapter of your life"
        subtitle="From matters of the heart to career and spiritual awakening — choose the reading that calls you."
      >
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.slice(0, 6).map((s, i) => <ServiceCard key={s.slug} s={s} index={i} />)}
        </div>
        <div className="mt-12 text-center">
          <MagneticButton to="/services" variant="ghost">View All Services</MagneticButton>
        </div>
      </Section>

      {/* Why choose */}
      <Section id="why" eyebrow="Why Choose Me" title="A reading that honors your journey">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {whyChoose.map(({ icon: Icon, title, text }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (i % 4) * 0.06, duration: 0.6 }}
              className="glass rounded-3xl p-6 hover:glass-gold transition-all group"
            >
              <div className="grid place-items-center w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 group-hover:animate-glow-pulse">
                <Icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="mt-4 font-display text-xl text-foreground">{title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{text}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Media carousel — latest gallery & videos */}
      <Section
        id="reel"
        eyebrow="✦ Latest From The Table ✦"
        title="Moments, readings & rituals"
        subtitle="Swipe or tap through the newest photos and videos from Siya's practice."
      >
        <MediaCarousel items={homeMedia} />
      </Section>

      {/* CTA */}
      <Section id="cta">
        <div className="relative overflow-hidden rounded-[2.5rem] glass-gold p-10 md:p-16 text-center glow-gold">
          <div className="absolute inset-0 opacity-30" style={{ background: "radial-gradient(ellipse at top, var(--primary), transparent 60%)" }} />
          <div className="relative">
            <span className="text-xs tracking-[0.3em] uppercase text-primary">✦ Your Answer Awaits ✦</span>
            <h2 className="mt-4 font-display text-4xl md:text-6xl text-gradient-gold">
              The cards are already turning.
            </h2>
            <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
              Book a private reading and receive personalized spiritual guidance from anywhere in the world.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <MagneticButton to="/booking">Book Your Reading</MagneticButton>
              <Link to="/contact" className="inline-flex items-center rounded-full glass px-7 py-3.5 text-sm border border-primary/30 hover:bg-primary/10">
                Ask a Question
              </Link>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
