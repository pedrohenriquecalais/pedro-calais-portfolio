"use client";

import { useEffect, useRef } from "react";

type Ring = [number, number][];

const LAND: Ring[] = [
  [[-165,65],[-140,70],[-120,55],[-125,45],[-110,25],[-90,15],[-80,8],[-65,10],[-60,25],[-60,45],[-65,50],[-75,65],[-90,70],[-150,75],[-165,65]],
  [[-80,12],[-55,-5],[-40,-5],[-35,-10],[-40,-22],[-65,-55],[-75,-50],[-60,-40],[-45,-25],[-40,-15],[-80,12]],
  [[-10,36],[0,37],[15,37],[25,38],[30,42],[30,62],[15,62],[0,58],[-5,48],[-8,44],[-10,36]],
  [[-18,15],[-5,37],[15,38],[40,22],[50,12],[42,0],[35,-25],[28,-35],[12,-38],[0,-35],[-15,-12],[-20,5],[-18,15]],
  [[30,42],[60,25],[80,22],[100,5],[115,5],[130,32],[140,45],[138,60],[120,70],[90,74],[55,72],[30,65],[30,42]],
  [[105,5],[115,0],[125,-8],[128,-3],[125,5],[115,8],[105,5]],
  [[115,-22],[135,-12],[148,-20],[152,-27],[150,-38],[140,-38],[125,-34],[115,-30],[115,-22]],
  [[-55,72],[-40,80],[-20,83],[-15,75],[-30,65],[-50,62],[-55,72]],
  [[130,31],[132,34],[135,35],[141,40],[142,42],[140,44],[134,34],[130,31]],
  [[-5,50],[0,51],[2,53],[0,58],[-5,58],[-7,55],[-5,50]],
];

interface Props {
  size?: number;
  rings?: boolean;
  theme?: "dark" | "light";
}

export default function GlobeIcon({ size = 28, rings = true, theme = "dark" }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rotRef = useRef(0);
  const rafRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    canvas.style.width = `${size}px`;
    canvas.style.height = `${size}px`;
    ctx.scale(dpr, dpr);

    const R = size * 0.42;
    const cx = size / 2;
    const cy = size / 2;

    // Color helpers based on theme
    const base = theme === "dark" ? "255,255,255" : "26,20,16";

    function c(a: number) { return `rgba(${base},${a})`; }

    function project(lon: number, lat: number) {
      const l = ((lon + rotRef.current) * Math.PI) / 180;
      const p = (lat * Math.PI) / 180;
      const cosP = Math.cos(p);
      return {
        x: cx + R * cosP * Math.sin(l),
        y: cy - R * Math.sin(p),
        v: cosP * Math.cos(l) > 0,
      };
    }

    function drawRingSegments(ring: Ring, front: boolean) {
      ctx.beginPath();
      let first = true;
      let wasTarget = false;
      for (const [lon, lat] of ring) {
        const p = project(lon, lat);
        const isTarget = front ? p.v : !p.v;
        if (isTarget) {
          if (first || !wasTarget) ctx.moveTo(p.x, p.y);
          else ctx.lineTo(p.x, p.y);
          first = false;
        }
        wasTarget = isTarget;
      }
    }

    function draw() {
      ctx.clearRect(0, 0, size, size);

      // Sphere fill
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.fillStyle = c(0.04);
      ctx.fill();

      // Clip everything inside sphere
      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.clip();

      const glw = Math.max(0.3, size * 0.012);

      // Back-face grid
      ctx.lineWidth = glw;
      for (let lat = -60; lat <= 60; lat += 30) {
        ctx.beginPath();
        ctx.strokeStyle = c(0.03);
        let first = true;
        for (let lon = -180; lon <= 180; lon += 2) {
          const p = project(lon, lat);
          if (!p.v) { first ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y); first = false; }
          else first = true;
        }
        ctx.stroke();
      }
      for (let lon = 0; lon < 360; lon += 30) {
        ctx.beginPath();
        ctx.strokeStyle = c(0.03);
        let first = true;
        for (let lat = -85; lat <= 85; lat += 2) {
          const p = project(lon, lat);
          if (!p.v) { first ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y); first = false; }
          else first = true;
        }
        ctx.stroke();
      }

      // Back-face land (faint — visible through the globe)
      const lwBack = Math.max(0.3, size * 0.013);
      for (const ring of LAND) {
        drawRingSegments(ring, false);
        ctx.fillStyle = c(0.04);
        ctx.fill();
        ctx.strokeStyle = c(0.14);
        ctx.lineWidth = lwBack;
        ctx.stroke();
      }

      // Front-face grid
      for (let lat = -60; lat <= 60; lat += 30) {
        ctx.beginPath();
        ctx.strokeStyle = lat === 0 ? c(0.12) : c(0.06);
        ctx.lineWidth = glw;
        let first = true;
        for (let lon = -180; lon <= 180; lon += 2) {
          const p = project(lon, lat);
          if (p.v) { first ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y); first = false; }
          else first = true;
        }
        ctx.stroke();
      }
      ctx.strokeStyle = c(0.06);
      ctx.lineWidth = glw;
      for (let lon = 0; lon < 360; lon += 30) {
        ctx.beginPath();
        let first = true;
        for (let lat = -85; lat <= 85; lat += 2) {
          const p = project(lon, lat);
          if (p.v) { first ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y); first = false; }
          else first = true;
        }
        ctx.stroke();
      }

      // Front-face land (solid)
      const lw = Math.max(0.4, size * 0.018);
      for (const ring of LAND) {
        drawRingSegments(ring, true);
        ctx.fillStyle = c(0.10);
        ctx.fill();
        ctx.strokeStyle = c(0.45);
        ctx.lineWidth = lw;
        ctx.stroke();
      }

      ctx.restore();

      // Sphere outline on top
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.strokeStyle = c(0.25);
      ctx.lineWidth = 0.5;
      ctx.stroke();

      rotRef.current = (rotRef.current + 0.18) % 360;
      rafRef.current = requestAnimationFrame(draw);
    }

    draw();
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [size, theme]);

  const orbit = size * 1.75;
  const off = (orbit - size) / 2;
  const base = theme === "dark" ? "255,255,255" : "26,20,16";

  return (
    <div className="relative inline-flex items-center justify-center shrink-0" style={{ width: size, height: size }}>
      {rings && (
        <>
          <svg
            className="absolute animate-spin pointer-events-none"
            style={{ width: orbit, height: orbit, top: -off, left: -off, animationDuration: "7s" }}
            viewBox="0 0 100 100"
          >
            <ellipse cx="50" cy="50" rx="47" ry="13" fill="none" stroke={`rgba(${base},0.22)`} strokeWidth="0.8" strokeDasharray="3 4" />
          </svg>
          <svg
            className="absolute animate-spin pointer-events-none"
            style={{ width: orbit * 1.12, height: orbit * 1.12, top: -(orbit * 1.12 - size) / 2, left: -(orbit * 1.12 - size) / 2, animationDuration: "11s", animationDirection: "reverse" }}
            viewBox="0 0 100 100"
          >
            <ellipse cx="50" cy="50" rx="47" ry="9" fill="none" stroke={`rgba(${base},0.14)`} strokeWidth="0.6" strokeDasharray="2 7" />
          </svg>
        </>
      )}
      <canvas ref={canvasRef} width={size} height={size} style={{ position: "relative", zIndex: 1 }} />
    </div>
  );
}
