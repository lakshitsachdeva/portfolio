'use client';

import { useEffect, useRef } from 'react';

type Dot = {
  hx: number;
  hy: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  delay: number;
};

interface HalftonePortraitProps {
  src?: string;
  cols?: number;
  color?: string;
  hotColor?: string;
  className?: string;
}

const TAU = Math.PI * 2;

export default function HalftonePortrait({
  src = '/face-halftone.png',
  cols = 76,
  color = '#f4f4f5',
  hotColor = '#B19EEF',
  className,
}: HalftonePortraitProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!wrap || !canvas || !ctx) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const pointer = { x: -9999, y: -9999 };
    let dots: Dot[] = [];
    let w = 0;
    let h = 0;
    let step = 1;
    let pad = 0;
    let raf = 0;
    let start = 0;
    let visible = true;
    let built = false;
    let disposed = false;

    const img = new Image();
    img.decoding = 'async';
    img.src = src;

    const build = () => {
      const rect = wrap.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      w = rect.width;
      h = rect.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      pad = Math.round(w * 0.18);
      canvas.width = Math.round((w + pad * 2) * dpr);
      canvas.height = Math.round((h + pad * 2) * dpr);
      canvas.style.inset = `${-pad}px`;
      canvas.style.width = `${w + pad * 2}px`;
      canvas.style.height = `${h + pad * 2}px`;
      ctx.setTransform(dpr, 0, 0, dpr, pad * dpr, pad * dpr);

      const c = w < 340 ? Math.round(cols * 0.72) : cols;
      step = w / c;
      const rows = Math.max(1, Math.floor(h / step));
      const off = document.createElement('canvas');
      off.width = c;
      off.height = rows;
      const octx = off.getContext('2d', { willReadFrequently: true });
      if (!octx) return;
      octx.imageSmoothingQuality = 'high';
      octx.drawImage(img, 0, 0, c, rows);
      const data = octx.getImageData(0, 0, c, rows).data;

      const first = !built;
      const next: Dot[] = [];
      const span = Math.max(w, h);
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < c; x++) {
          const i = (y * c + x) * 4;
          const a = data[i + 3] / 255;
          if (a < 0.35) continue;
          const lum = (0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2]) / 255;
          const r = step * 0.47 * lum * a;
          if (r < step * 0.08) continue;
          const hx = (x + 0.5) * step;
          const hy = (y + 0.5) * step;
          const scatter = first && !reduce;
          const angle = Math.random() * TAU;
          const dist = step * (3 + Math.random() * 12);
          next.push({
            hx,
            hy,
            x: scatter ? hx + Math.cos(angle) * dist : hx,
            y: scatter ? hy + Math.sin(angle) * dist : hy,
            vx: 0,
            vy: 0,
            r,
            delay: scatter ? (Math.hypot(hx - w / 2, hy - h / 2) / span) * 700 + Math.random() * 260 : 0,
          });
        }
      }
      dots = next;
      built = true;
    };

    const draw = (now: number) => {
      if (!start) start = now;
      const t = now - start;
      ctx.clearRect(-pad, -pad, w + pad * 2, h + pad * 2);
      const R = Math.max(64, w * 0.2);
      const R2 = R * R;
      const push = step * 1.7;
      const base = new Path2D();
      const hot = new Path2D();

      for (let i = 0; i < dots.length; i++) {
        const p = dots[i];
        if (t < p.delay) continue;
        if (!reduce) {
          const dx = p.x - pointer.x;
          const dy = p.y - pointer.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < R2) {
            const d = Math.sqrt(d2) || 1;
            const f = (1 - d / R) ** 2;
            p.vx += (dx / d) * f * push;
            p.vy += (dy / d) * f * push;
          }
          p.vx = (p.vx + (p.hx - p.x) * 0.045) * 0.84;
          p.vy = (p.vy + (p.hy - p.y) * 0.045) * 0.84;
          p.x += p.vx;
          p.y += p.vy;
        }
        const drift = Math.abs(p.x - p.hx) + Math.abs(p.y - p.hy);
        const wave = reduce ? 1 : 1 + 0.13 * Math.sin(t * 0.0017 - (p.hx * 0.9 + p.hy) * 0.02);
        const r = p.r * wave * Math.min(1, (t - p.delay) / 450);
        const path = drift > 1.5 ? hot : base;
        path.moveTo(p.x + r, p.y);
        path.arc(p.x, p.y, r, 0, TAU);
      }
      ctx.fillStyle = color;
      ctx.fill(base);
      ctx.fillStyle = hotColor;
      ctx.fill(hot);
    };

    const loop = (now: number) => {
      draw(now);
      raf = visible && !reduce ? requestAnimationFrame(loop) : 0;
    };

    const kick = () => {
      if (!raf && built && !disposed) raf = requestAnimationFrame(loop);
    };

    const onMove = (e: PointerEvent) => {
      const rect = wrap.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
    };
    const onLeave = () => {
      pointer.x = -9999;
      pointer.y = -9999;
    };
    const onDown = (e: PointerEvent) => {
      if (reduce) return;
      const rect = wrap.getBoundingClientRect();
      const px = e.clientX - rect.left;
      const py = e.clientY - rect.top;
      if (px < -80 || py < -80 || px > w + 80 || py > h + 80) return;
      const reach = Math.max(w, h) * 0.6;
      for (const p of dots) {
        const dx = p.x - px;
        const dy = p.y - py;
        const d = Math.hypot(dx, dy) || 1;
        if (d > reach) continue;
        const f = (1 - d / reach) * step * 7;
        p.vx += (dx / d) * f;
        p.vy += (dy / d) * f;
      }
    };

    const ready = () => {
      if (disposed) return;
      build();
      kick();
    };
    if (img.complete && img.naturalWidth) ready();
    else img.addEventListener('load', ready);

    let lastW = 0;
    const ro = new ResizeObserver(() => {
      const nw = wrap.clientWidth;
      if (!built || Math.abs(nw - lastW) < 2) {
        lastW = nw || lastW;
        return;
      }
      lastW = nw;
      build();
      kick();
    });
    ro.observe(wrap);

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) kick();
    });
    io.observe(wrap);

    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerdown', onDown, { passive: true });
    const onUp = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') onLeave();
    };
    window.addEventListener('pointerup', onUp, { passive: true });
    document.documentElement.addEventListener('pointerleave', onLeave);

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      img.removeEventListener('load', ready);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointerup', onUp);
      document.documentElement.removeEventListener('pointerleave', onLeave);
    };
  }, [src, cols, color, hotColor]);

  return (
    <div ref={wrapRef} className={`relative ${className ?? ''}`} role="img" aria-label="halftone portrait of lakshit sachdeva">
      <canvas ref={canvasRef} className="pointer-events-none absolute" />
    </div>
  );
}
