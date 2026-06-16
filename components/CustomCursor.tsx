"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const ring = useRef({ x: 0, y: 0 });
  const rafId = useRef<number>(0);

  useEffect(() => {
    const ringEl = ringRef.current;
    const dotEl = dotRef.current;
    if (!ringEl || !dotEl) return;

    const onMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      dotEl.style.transform = `translate(calc(${e.clientX}px - 50%), calc(${e.clientY}px - 50%))`;
    };

    const animate = () => {
      ring.current.x += (mouse.current.x - ring.current.x) * 0.13;
      ring.current.y += (mouse.current.y - ring.current.y) * 0.13;
      ringEl.style.transform = `translate(calc(${ring.current.x}px - 50%), calc(${ring.current.y}px - 50%))`;
      rafId.current = requestAnimationFrame(animate);
    };

    const setHovered = (on: boolean) => {
      ringEl.style.width = on ? "60px" : "44px";
      ringEl.style.height = on ? "60px" : "44px";
      ringEl.style.opacity = on ? "0.5" : "1";
    };

    const onEnter = (e: MouseEvent) => {
      if ((e.target as Element).closest("a, button, [role=button]")) setHovered(true);
    };
    const onLeave = (e: MouseEvent) => {
      if ((e.target as Element).closest("a, button, [role=button]")) setHovered(false);
    };

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onEnter);
    document.addEventListener("mouseout", onLeave);
    rafId.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onEnter);
      document.removeEventListener("mouseout", onLeave);
      cancelAnimationFrame(rafId.current);
    };
  }, []);

  return (
    <>
      <div
        ref={ringRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 44,
          height: 44,
          borderRadius: "50%",
          border: "1.5px solid var(--cursor-ring)",
          pointerEvents: "none",
          zIndex: 9999,
          transition: "width 0.2s ease, height 0.2s ease, opacity 0.2s ease",
          willChange: "transform",
        }}
      />
      <div
        ref={dotRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 6,
          height: 6,
          borderRadius: "50%",
          backgroundColor: "var(--cursor-dot)",
          pointerEvents: "none",
          zIndex: 9999,
          transition: "opacity 0.2s ease",
          willChange: "transform",
        }}
      />
    </>
  );
}
