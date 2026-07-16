import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Section, Reveal } from "@/components/site/Section";
import { Star, Play, Quote, X } from "lucide-react";
import video1 from "@/assets/siya-video-1.mp4.asset.json";
import video2 from "@/assets/siya-video-2.mp4.asset.json";
import video3 from "@/assets/siya-video-3.mp4.asset.json";

export const Route = createFileRoute("/testimonials")({
  component: Testimonials,
  head: () => ({
    meta: [
      { title: "Client Testimonials & Reviews | Hidden Oracle" },
      { name: "description", content: "Read heartfelt reviews from clients who found clarity through Siya's tarot readings and spiritual guidance." },
      { property: "og:title", content: "Testimonials | Hidden Oracle" },
      { property: "og:url", content: "/testimonials" },
    ],
    links: [{ rel: "canonical", href: "/testimonials" }],
  }),
});

const reviews = [
  { name: "Ananya R.", role: "Delhi, India", stars: 5, text: "Siya's reading gave me the courage to leave a relationship I'd been stuck in for years. Every word was accurate and gentle." },
  { name: "Priya M.", role: "London, UK", stars: 5, text: "I've had readings before, but Siya's felt different — grounded, ethical, and deeply intuitive. The career guidance was spot on." },
  { name: "Rohan K.", role: "Mumbai, India", stars: 5, text: "The clarity I received about my business direction was worth every moment. Booking again next month." },
  { name: "Sara T.", role: "Dubai, UAE", stars: 5, text: "Confidential, kind, and shockingly accurate. Siya has a real gift and uses it responsibly." },
  { name: "Michelle D.", role: "Toronto, Canada", stars: 5, text: "After my reading everything shifted. I felt seen for the first time in months. Highly recommend." },
  { name: "Aditya S.", role: "Bangalore, India", stars: 5, text: "The monthly forecast has become my ritual. Siya's insight is a compass I trust deeply." },
];

const videoReviews = [
  { src: video1.url, name: "A Journey of Clarity" },
  { src: video2.url, name: "Guidance That Landed" },
  { src: video3.url, name: "A Reading to Remember" },
];

function Stars({ n }: { n: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={`w-4 h-4 ${i < n ? "fill-primary text-primary" : "text-muted"}`} />
      ))}
    </div>
  );
}

function Testimonials() {
  const [idx, setIdx] = useState(0);
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const perPage = 3;
  const pages = Math.ceil(reviews.length / perPage);

  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % pages), 5500);
    return () => clearInterval(t);
  }, [pages]);

  const visible = reviews.slice(idx * perPage, idx * perPage + perPage);

  return (
    <>
      <Section
        eyebrow="Kind Words"
        title="Stories from those who've sat with the cards"
        subtitle="Real experiences from clients around the world."
      >
        <div className="relative overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -60 }}
              transition={{ duration: 0.6 }}
              className="grid md:grid-cols-3 gap-6"
            >
              {visible.map((r) => (
                <div key={r.name} className="glass-gold rounded-3xl p-7 flex flex-col relative">
                  <Quote className="w-8 h-8 text-primary/40 mb-3" />
                  <p className="text-foreground/90 leading-relaxed flex-1">"{r.text}"</p>
                  <div className="mt-5 pt-5 border-t border-border/40 flex items-center justify-between">
                    <div>
                      <div className="font-display text-lg text-gradient-gold">{r.name}</div>
                      <div className="text-xs text-muted-foreground">{r.role}</div>
                    </div>
                    <Stars n={r.stars} />
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>

          <div className="mt-8 flex justify-center gap-2">
            {Array.from({ length: pages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setIdx(i)}
                className={`h-1.5 rounded-full transition-all ${i === idx ? "w-10 bg-primary" : "w-2 bg-primary/30"}`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </Section>

      <Section eyebrow="Video Reviews" title="Hear it from them" subtitle="Tap any story to open a full-screen player with sound.">
        <div className="grid md:grid-cols-3 gap-6">
          {videoReviews.map((v, i) => (
            <Reveal key={v.name} delay={i * 0.1}>
              <motion.button
                whileHover={{ y: -6 }}
                onClick={() => setActiveVideo(v.src)}
                className="group relative aspect-[3/4] w-full rounded-3xl overflow-hidden glass-gold glow-gold"
              >
                <video
                  src={v.src}
                  muted
                  loop
                  autoPlay
                  playsInline
                  preload="metadata"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/85 via-background/20 to-transparent" />
                <div className="relative h-full flex flex-col items-center justify-end gap-3 p-6 pointer-events-none">
                  <div className="grid place-items-center w-16 h-16 rounded-full bg-primary text-primary-foreground glow-gold group-hover:scale-110 transition-transform">
                    <Play className="w-6 h-6 ml-1" fill="currentColor" />
                  </div>
                  <span className="font-display text-lg text-white/95 text-center">{v.name}</span>
                  <span className="text-[10px] uppercase tracking-[0.25em] text-primary/90">Tap to play with sound</span>
                </div>
              </motion.button>
            </Reveal>
          ))}
        </div>
      </Section>

      <VideoLightbox src={activeVideo} onClose={() => setActiveVideo(null)} />
    </>
  );
}

function VideoLightbox({ src, onClose }: { src: string | null; onClose: () => void }) {
  return (
    <AnimatePresence>
      {src && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[95] bg-background/90 backdrop-blur-xl grid place-items-center p-4 md:p-8"
        >
          <button
            onClick={onClose}
            aria-label="Close video"
            className="absolute top-6 right-6 grid place-items-center w-11 h-11 rounded-full glass hover:bg-primary/20 transition-colors z-10"
          >
            <X className="w-5 h-5" />
          </button>
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-3xl rounded-3xl overflow-hidden glow-gold border border-primary/40"
          >
            <video
              src={src}
              controls
              autoPlay
              playsInline
              className="w-full h-auto max-h-[85vh] bg-black"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
