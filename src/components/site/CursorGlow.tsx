import { useEffect, useState } from "react";

export function CursorGlow() {
  const [pos, setPos] = useState({ x: -200, y: -200 });
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    setHydrated(true);
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const onMove = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);
  if (!hydrated) return null;
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed z-[100] w-[400px] h-[400px] rounded-full -translate-x-1/2 -translate-y-1/2 transition-transform duration-100 ease-out mix-blend-screen"
      style={{
        left: pos.x, top: pos.y,
        background: "radial-gradient(circle, oklch(0.82 0.14 85 / 0.12), transparent 60%)",
      }}
    />
  );
}
