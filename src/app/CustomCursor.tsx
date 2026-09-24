"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dot = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const d = dot.current;
    if (!d) return;
    const move = (e: MouseEvent) => {
      d.style.transform = `translate(${e.clientX - 3}px, ${e.clientY - 3}px)`;
    };
    window.addEventListener("mousemove", move, { passive: true });
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <div
      ref={dot}
      className="hidden md:block fixed top-0 left-0 z-[99] pointer-events-none h-[6px] w-[6px] rounded-full bg-white mix-blend-difference"
    />
  );
}
