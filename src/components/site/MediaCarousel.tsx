import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Play, X, Volume2, VolumeX } from "lucide-react";

export type MediaItem =
  | { type: "image"; src: string; alt: string }
  | { type: "video"; src: string; alt: string; poster?: string };

export function MediaCarousel({ items }: { items: MediaItem[]; autoplayMs?: number }) {
  const [open, setOpen] = useState<MediaItem | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  // Check scroll position to show/hide navigation arrows
  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setShowLeftArrow(scrollLeft > 10);
      setShowRightArrow(scrollLeft + clientWidth < scrollWidth - 15);
    }
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      el.addEventListener("scroll", checkScroll, { passive: true });
      checkScroll();
      window.addEventListener("resize", checkScroll, { passive: true });
    }
    return () => {
      if (el) el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, [items]);

  const handleScroll = (dir: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth * 0.75;
      const target = dir === "left" ? scrollLeft - scrollAmount : scrollLeft + scrollAmount;
      scrollRef.current.scrollTo({ left: target, behavior: "smooth" });
    }
  };

  return (
    <div className="relative group/carousel px-1">
      {/* Horizontal scrolling track */}
      <div
        ref={scrollRef}
        className="flex gap-5 overflow-x-auto scrollbar-none snap-x snap-mandatory scroll-smooth pb-4 px-1"
      >
        {items.map((item, i) => (
          <motion.button
            key={`${item.src}-${i}`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: Math.min(i * 0.05, 0.4), duration: 0.5 }}
            whileHover={{ y: -6, scale: 1.02 }}
            onClick={() => setOpen(item)}
            className="group relative flex-none w-[85%] sm:w-[45%] md:w-[31%] aspect-[3/4] rounded-3xl overflow-hidden glass-gold glow-gold snap-start cursor-pointer text-left transition-shadow duration-300"
            aria-label={`Open media ${i + 1}`}
          >
            {item.type === "image" ? (
              <img
                src={item.src}
                alt={item.alt}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
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
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 grid place-items-center pointer-events-none">
                  <div className="grid place-items-center w-14 h-14 rounded-full bg-primary/95 text-primary-foreground glow-gold group-hover:scale-110 transition-transform duration-300">
                    <Play className="w-5 h-5 ml-0.5" fill="currentColor" />
                  </div>
                </div>
              </>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent opacity-65 group-hover:opacity-40 transition-opacity duration-300" />
          </motion.button>
        ))}
      </div>

      {/* Chevron Navigation - Left */}
      <AnimatePresence>
        {showLeftArrow && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => handleScroll("left")}
            aria-label="Previous"
            className="absolute left-[-16px] md:left-[-24px] top-1/2 -translate-y-1/2 hidden md:grid place-items-center w-12 h-12 rounded-full glass hover:glass-gold hover:glow-gold transition-all duration-300 z-20 cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5 text-primary" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chevron Navigation - Right */}
      <AnimatePresence>
        {showRightArrow && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => handleScroll("right")}
            aria-label="Next"
            className="absolute right-[-16px] md:right-[-24px] top-1/2 -translate-y-1/2 hidden md:grid place-items-center w-12 h-12 rounded-full glass hover:glass-gold hover:glow-gold transition-all duration-300 z-20 cursor-pointer"
          >
            <ChevronRight className="w-5 h-5 text-primary" />
          </motion.button>
        )}
      </AnimatePresence>

      <MediaLightbox item={open} onClose={() => setOpen(null)} />
    </div>
  );
}

export function MediaLightbox({ item, onClose }: { item: MediaItem | null; onClose: () => void }) {
  const [muted, setMuted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!item) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [item, onClose]);

  return (
    <AnimatePresence>
      {item && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[95] bg-background/92 backdrop-blur-xl grid place-items-center p-4 md:p-8"
        >
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute top-5 right-5 grid place-items-center w-11 h-11 rounded-full glass hover:bg-primary/20 transition-colors z-10"
          >
            <X className="w-5 h-5" />
          </button>
          <motion.div
            initial={{ scale: 0.92, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.35 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-4xl rounded-3xl overflow-hidden glow-gold border border-primary/40"
          >
            {item.type === "image" ? (
              <img src={item.src} alt={item.alt} className="w-full h-auto max-h-[85vh] object-contain bg-black" />
            ) : (
              <>
                <video
                  ref={videoRef}
                  src={item.src}
                  controls
                  autoPlay
                  playsInline
                  muted={muted}
                  className="w-full h-auto max-h-[85vh] bg-black"
                />
                <button
                  onClick={() => setMuted((m) => !m)}
                  aria-label={muted ? "Unmute" : "Mute"}
                  className="absolute top-4 left-4 grid place-items-center w-11 h-11 rounded-full glass hover:bg-primary/20 transition-colors"
                >
                  {muted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                </button>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
