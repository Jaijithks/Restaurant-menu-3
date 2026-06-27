"use client";

import React, { useEffect, useRef, useState } from "react";
import InteractiveMenu from "./InteractiveMenu";
import ContactSection from "./ContactSection";

interface ScrollAnimationProps {
  images: ImageBitmap[];
}

export default function ScrollAnimation({ images }: ScrollAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [heroOpacity, setHeroOpacity] = useState(1);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showMenu, setShowMenu] = useState(false);

  const bitmapsRef = useRef<ImageBitmap[]>([]);
  const frameIndexRef = useRef(1);
  const rafRef = useRef<number>(0);
  const lastFrameRef = useRef(-1);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);

  // Assign pre-decoded bitmaps immediately — no async gap after preloader
  useEffect(() => {
    bitmapsRef.current = images;
    lastFrameRef.current = -1;
  }, [images]);

  // Canvas setup + single persistent rAF loop (dirty-check: redraws only on frame change)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;
    ctxRef.current = ctx;

    const setup = () => {
      const pr = window.devicePixelRatio || 1;
      const w = window.innerWidth;
      const h = window.innerHeight;
      const nW = Math.round(w * pr);
      const nH = Math.round(h * pr);
      if (canvas.width !== nW || canvas.height !== nH) {
        canvas.width = nW;
        canvas.height = nH;
        canvas.style.width = `${w}px`;
        canvas.style.height = `${h}px`;
        ctx.setTransform(pr, 0, 0, pr, 0, 0);
        lastFrameRef.current = -1;
      }
    };

    setup();

    const loop = () => {
      const bitmaps = bitmapsRef.current;
      const idx = frameIndexRef.current;
      if (bitmaps.length > 0 && idx !== lastFrameRef.current) {
        lastFrameRef.current = idx;
        const bm = bitmaps[Math.min(idx, bitmaps.length - 1)];
        if (bm) {
          const w = window.innerWidth;
          const h = window.innerHeight;
          const scale = Math.max(w / bm.width, h / bm.height);
          const sw = w / scale;
          const sh = h / scale;
          const sx = (bm.width - sw) * 0.5;
          const sy = (bm.height - sh) * 0.5;
          ctx.drawImage(bm, sx, sy, sw, sh, 0, 0, w, h);
        }
      }
      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);
    window.addEventListener('resize', setup);

    return () => {
      window.removeEventListener('resize', setup);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // Scroll handler: only updates refs + state, never draws directly
  useEffect(() => {
    const onScroll = () => {
      const container = containerRef.current;
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const dist = container.offsetHeight - window.innerHeight;
      const progress = Math.max(0, Math.min(1, -rect.top / (dist || 1)));
      const opacity = Math.max(0, 1 - progress / 0.15);
      // index 0 = hero bitmap; sequence frames start at index 1
      let idx = 1;
      if (progress > 0.15) {
        const ap = (progress - 0.15) / 0.85;
        const total = Math.max(1, bitmapsRef.current.length - 1);
        idx = 1 + Math.min(total - 1, Math.floor(ap * total));
      }
      frameIndexRef.current = idx;
      setScrollProgress(progress);
      setHeroOpacity(opacity);
      setShowMenu(progress >= 0.99);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div ref={containerRef} className="relative h-[350vh] w-full bg-black">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <canvas ref={canvasRef} className="block h-full w-full" />

        {heroOpacity > 0 && (
          <div
            style={{ opacity: heroOpacity }}
            className="absolute inset-0 flex flex-col items-center justify-between bg-black/35 py-20 px-6 text-center pointer-events-none"
          >
            <div />
            <div className="flex flex-col items-center select-none">
              <span className="font-sans text-[10px] tracking-[0.4em] text-gold uppercase sm:text-xs">
                Welcome to
              </span>
              <h1 className="mt-4 font-serif text-[52px] font-extralight tracking-[0.2em] text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)] md:text-[76px]">
                Ochre & Ember
              </h1>
              <p className="mt-6 max-w-sm font-sans text-xs tracking-widest text-zinc-300 uppercase sm:text-sm">
                Authentic Yemeni Mandi &amp; Premium Grills
              </p>
              <div className="mt-8 h-[1px] w-20 bg-gold" />
            </div>
            <div className="flex flex-col items-center gap-2 select-none">
              <span className="font-sans text-[9px] tracking-[0.3em] text-gold/80 uppercase">
                Scroll to Begin
              </span>
              <div className="h-6 w-[1px] bg-gold/50 animate-bounce" />
            </div>
          </div>
        )}

        <div
          className="absolute top-0 left-0 h-[3px] bg-gold"
          style={{ width: `${scrollProgress * 100}%`, transition: 'width 80ms linear' }}
        />

        <div
          className="absolute inset-0 z-30 h-screen w-full overflow-y-auto"
          style={{ display: showMenu ? 'block' : 'none', backgroundColor: '#e8edf2' }}
        >
          <InteractiveMenu />
          <ContactSection />
        </div>
      </div>
    </div>
  );
}
