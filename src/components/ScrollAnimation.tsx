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

  // Center and draw image on canvas matching CSS "object-fit: cover"
  const drawImageCover = (
    ctx: CanvasRenderingContext2D,
    img: HTMLImageElement,
    canvasWidth: number,
    canvasHeight: number,
    clear: boolean = true
  ) => {
    if (!img) return;
    
    const imageWidth = img.width;
    const imageHeight = img.height;
    
    const ratio = Math.min(canvasWidth / imageWidth, canvasHeight / imageHeight);
    let newWidth = imageWidth * ratio;
    let newHeight = imageHeight * ratio;
    
    if (newWidth < canvasWidth) newWidth = canvasWidth;
    if (newHeight < canvasHeight) newHeight = canvasHeight;
    
    const sourceWidth = imageWidth / (newWidth / canvasWidth);
    const sourceHeight = imageHeight / (newHeight / canvasHeight);
    
    const sourceX = (imageWidth - sourceWidth) * 0.5;
    const sourceY = (imageHeight - sourceHeight) * 0.5;
    
    if (clear) {
      ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    }
    ctx.drawImage(
      img,
      sourceX,
      sourceY,
      sourceWidth,
      sourceHeight,
      0,
      0,
      canvasWidth,
      canvasHeight
    );
  };

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
      const newW = Math.round(w * pr);
      const newH = Math.round(h * pr);
      if (canvas.width !== newW || canvas.height !== newH) {
        canvas.width = newW;
        canvas.height = newH;
        canvas.style.width = `${w}px`;
        canvas.style.height = `${h}px`;
        ctx.setTransform(pr, 0, 0, pr, 0, 0);
        lastFrameRef.current = -1;
      }
    };

    // Handle high DPI screens
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const pixelRatio = window.devicePixelRatio || 1;
      
      canvas.width = width * pixelRatio;
      canvas.height = height * pixelRatio;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      
      ctx.scale(pixelRatio, pixelRatio);
      
      // Re-draw current frame
      const container = containerRef.current;
      if (container) {
        // force redraw on next frame
      }
      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);
    window.addEventListener('resize', setup);

    let animationFrameId: number;
    let targetScrollProgress = 0;
    let currentRenderProgress = 0;
    let lastDrawnIndex = -1;

    const renderLoop = () => {
      // Smoothly interpolate the rendering progress towards the actual scroll target
      currentRenderProgress += (targetScrollProgress - currentRenderProgress) * 0.08;

      const width = window.innerWidth;
      const height = window.innerHeight;

      let frameIndex = 0;
      if (currentRenderProgress > 0.15) {
        const animProgress = (currentRenderProgress - 0.15) / 0.85;
        const exactIndex = animProgress * (images.length - 1);
        // Snap to nearest frame to avoid "trippy" ghosting
        frameIndex = Math.min(images.length - 1, Math.max(0, Math.round(exactIndex)));
      }

      // Only draw if the frame actually changed (huge performance boost when resting)
      if (frameIndex !== lastDrawnIndex) {
        drawImageCover(ctx, images[frameIndex], width, height, true);
        lastDrawnIndex = frameIndex;
      }

      animationFrameId = requestAnimationFrame(renderLoop);
    };

  useEffect(() => {
    const onScroll = () => {
      const container = containerRef.current;
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const scrollDistance = container.offsetHeight - window.innerHeight;
      targetScrollProgress = Math.max(0, Math.min(1, -rect.top / (scrollDistance || 1)));
      
      setScrollProgress(targetScrollProgress);

      // Hero overlay opacity: starts at 1, goes to 0 by 15% scroll
      const currentHeroOpacity = Math.max(0, 1 - targetScrollProgress / 0.15);
      setHeroOpacity(currentHeroOpacity);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    
    // Initial calls
    handleScroll();
    currentRenderProgress = targetScrollProgress; // snap immediately on load
    animationFrameId = requestAnimationFrame(renderLoop);

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
