import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Section } from "@/components/site/Section";
import { MediaCarousel, MediaLightbox, type MediaItem } from "@/components/site/MediaCarousel";
import { Play } from "lucide-react";
import { useState } from "react";
import img1 from "@/assets/siya-1.png.asset.json";
import img2 from "@/assets/siya-2.png.asset.json";
import img3 from "@/assets/siya-3.png.asset.json";
import img4 from "@/assets/siya-4.png.asset.json";
import img5 from "@/assets/siya-5.png.asset.json";
import v1 from "@/assets/siya-video-1.mp4.asset.json";
import v2 from "@/assets/siya-video-2.mp4.asset.json";
import v3 from "@/assets/siya-video-3.mp4.asset.json";

export const Route = createFileRoute("/gallery")({
  component: Gallery,
  head: () => ({
    meta: [
      { title: "Gallery — Sessions & Sacred Space | Hidden Oracle" },
      { name: "description", content: "A glimpse into Siya's tarot practice — sessions, sacred tools, and moments from the reading table." },
      { property: "og:title", content: "Gallery | Hidden Oracle" },
      { property: "og:url", content: "/gallery" },
    ],
    links: [{ rel: "canonical", href: "/gallery" }],
  }),
});

const gallery: MediaItem[] = [
  { type: "image", src: img1.url, alt: "Siya at candle-lit tarot table" },
  { type: "image", src: img2.url, alt: "Siya with tarot cards fanned out" },
  { type: "image", src: img3.url, alt: "Reading with incense in library" },
  { type: "image", src: img4.url, alt: "Gold-backed tarot cards on white surface" },
  { type: "image", src: img5.url, alt: "Siya holding tarot cards" },
  { type: "video", src: v1.url, alt: "Reading reel one" },
  { type: "video", src: v2.url, alt: "Reading reel two" },
  { type: "video", src: v3.url, alt: "Reading reel three" },
];

function Gallery() {
  const [open, setOpen] = useState<MediaItem | null>(null);
  return (
    <>
      <Section
        eyebrow="Featured Reel"
        title="A glimpse into the practice"
        subtitle="Swipe through moments from the reading table — click to view full-screen with sound."
      >
        <MediaCarousel items={gallery.slice(0, 8)} />
      </Section>

      <Section eyebrow="Full Gallery" title="Sacred moments">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {gallery.map((item, i) => (
            <motion.button
              key={item.src}
              initial={{ opacity: 0, scale: 0.92 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: (i % 8) * 0.05, duration: 0.5 }}
              whileHover={{ y: -4 }}
              onClick={() => setOpen(item)}
              className="group relative aspect-[3/4] overflow-hidden rounded-3xl glass-gold"
            >
              {item.type === "image" ? (
                <img
                  src={item.src}
                  alt={item.alt}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              ) : (
                <>
                  <video
                    src={item.src}
                    muted
                    loop
                    autoPlay
                    playsInline
                    preload="metadata"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 grid place-items-center pointer-events-none">
                    <div className="grid place-items-center w-14 h-14 rounded-full bg-primary/95 text-primary-foreground glow-gold group-hover:scale-110 transition-transform">
                      <Play className="w-5 h-5 ml-0.5" fill="currentColor" />
                    </div>
                  </div>
                </>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent opacity-70 group-hover:opacity-40 transition-opacity" />
            </motion.button>
          ))}
        </div>

        <MediaLightbox item={open} onClose={() => setOpen(null)} />
      </Section>
    </>
  );
}
