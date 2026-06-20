"use client";

import React, { useEffect, useRef, useState } from "react";
import InteractiveMenu from "./InteractiveMenu";
import ContactSection from "./ContactSection";

interface ScrollAnimationProps {
  images: HTMLImageElement[];
}

export default function ScrollAnimation({ images }: ScrollAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [heroOpacity, setHeroOpacity] = useState(1);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Center and draw image on canvas matching CSS "object-fit: cover"
  const drawImageCover = (
    ctx: CanvasRenderingContext2D,
    img: HTMLImageElement,
    canvasWidth: number,
    canvasHeight: number
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
    
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
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
    if (!canvas || !images.length) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

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
        const rect = container.getBoundingClientRect();
        const scrollDistance = container.offsetHeight - window.innerHeight;
        const currentProgress = Math.max(0, Math.min(1, -rect.top / (scrollDistance || 1)));
        
        let frameIndex = 0;
        if (currentProgress > 0.15) {
          const animProgress = (currentProgress - 0.15) / 0.85;
          frameIndex = Math.min(images.length - 1, Math.floor(animProgress * images.length));
        }
        
        drawImageCover(ctx, images[frameIndex], width, height);
      }
    };

    window.addEventListener("resize", handleResize);
    // Initialize sizing
    handleResize();

    let animationFrameId: number;

    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const scrollDistance = container.offsetHeight - window.innerHeight;
      const currentProgress = Math.max(0, Math.min(1, -rect.top / (scrollDistance || 1)));
      
      setScrollProgress(currentProgress);

      // Hero overlay opacity: starts at 1, goes to 0 by 15% scroll
      const currentHeroOpacity = Math.max(0, 1 - currentProgress / 0.15);
      setHeroOpacity(currentHeroOpacity);

      // Frame Index: stays on frame 0 during the first 15% scroll, then plays from 0 to 119
      let frameIndex = 0;
      if (currentProgress > 0.15) {
        const animProgress = (currentProgress - 0.15) / 0.85;
        frameIndex = Math.min(images.length - 1, Math.floor(animProgress * images.length));
      }

      // Draw the computed frame
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      cancelAnimationFrame(animationFrameId);
      animationFrameId = requestAnimationFrame(() => {
        drawImageCover(ctx, images[frameIndex], width, height);
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    
    // Initial draw
    handleScroll();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, [images]);

  return (
    <div ref={containerRef} className="relative h-[350vh] w-full bg-black">
      {/* Sticky Canvas Container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <canvas ref={canvasRef} className="block h-full w-full object-cover" />

        {/* Hero Welcome Text Overlay (Fades out on scroll) */}
        {heroOpacity > 0 && (
          <div
            style={{ opacity: heroOpacity }}
            className="absolute inset-0 flex flex-col items-center justify-between bg-black/35 py-20 px-6 text-center transition-opacity duration-75 ease-out pointer-events-none"
          >
            {/* Top Empty Space to Balance Layout */}
            <div />

            {/* Center Restaurant Info */}
            <div className="flex flex-col items-center select-none">
              <span className="font-sans text-[10px] tracking-[0.4em] text-gold uppercase sm:text-xs">
                Welcome to
              </span>
              <h1 className="mt-4 font-serif text-5xl font-extralight tracking-[0.2em] text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)] md:text-7xl">
                OCHRE & EMBER
              </h1>
              <p className="mt-6 max-w-sm font-sans text-xs tracking-widest text-zinc-300 uppercase sm:text-sm">
                Authentic Yemeni Mandi & Premium Grills
              </p>
              <div className="mt-8 h-[1px] w-20 bg-gold" />
            </div>

            {/* Bottom Scroll Prompt */}
            <div className="flex flex-col items-center gap-2 select-none">
              <span className="font-sans text-[9px] tracking-[0.3em] text-gold/80 uppercase">
                Scroll to Begin
              </span>
              <div className="h-6 w-[1px] bg-gold/50 animate-bounce" />
            </div>
          </div>
        )}

        {/* Subtle Scroll Progress Indicator (Gold line on top of screen) */}
        <div 
          className="absolute top-0 left-0 h-[3px] bg-gold transition-all duration-100" 
          style={{ width: `${scrollProgress * 100}%` }}
        />

        {/* Functional Menu overlay shown instantly at the end frame */}
        <div
          className="absolute inset-0 z-30 h-screen w-full overflow-y-auto bg-[#f5f8f9]"
          style={{ display: scrollProgress >= 0.99 ? "block" : "none" }}
        >
          <InteractiveMenu />
          <ContactSection />
        </div>
      </div>
    </div>
  );
}
