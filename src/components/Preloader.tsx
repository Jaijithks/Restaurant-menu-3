"use client";

import React, { useEffect, useState } from "react";

interface PreloaderProps {
  onComplete: (bitmaps: ImageBitmap[]) => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('Crafting the experience...');
  const [fadeAway, setFadeAway] = useState(false);

  useEffect(() => {
    const totalFrames = 120;
    
    // Detect mobile/tablet screen on load (using 1024px breakpoint)
    const isMobile = typeof window !== "undefined" && window.innerWidth <= 1024;
    const sequenceFolder = isMobile ? encodeURIComponent("sequence 2") : "sequence";
    const heroImage = isMobile ? "/backgroun_hero_2.webp" : "/background_hero.jpeg";
    
    const paths: string[] = [heroImage];
    
    // Generate sequence paths: skip alternate frames (load 50%)
    for (let i = 0; i < totalFrames; i += 2) {
      const frameIndex = i;
      if (frameIndex >= totalFrames) break;
      const paddedNum = String(frameIndex).padStart(3, "0");
      paths.push(`/${sequenceFolder}/${paddedNum}.webp`);
    }

    let loadedCount = 0;
    const totalCount = paths.length;
    const preloadedImages: HTMLImageElement[] = [];

    const loadImage = (src: string) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        loadedCount++;
        setProgress(Math.round((loadedCount / totalCount) * 100));
        preloadedImages.push(img);
        
        if (loadedCount === totalCount) {
          // Sort by frame index so sequence order is guaranteed
          const sorted = preloadedImages.sort((a, b) => {
            const getIndex = (url: string) => {
              if (url.includes("background_hero") || url.includes("backgroun_hero")) return -1;
              const match = url.match(/\/(\d+)\.webp/);
              return match ? parseInt(match[1]) : 999;
            };
            return getIndex(a.src) - getIndex(b.src);
          });

          // Convert all frames to ImageBitmaps (GPU-ready) BEFORE dismissing
          setStatusText('Preparing graphics...');
          Promise.all(
            sorted.map((img) => createImageBitmap(img).catch(() => null))
          ).then((bitmaps) => {
            const ready = bitmaps.filter(Boolean) as ImageBitmap[];
            // Now fade out and hand off — zero decode work left for ScrollAnimation
            setFadeAway(true);
            setTimeout(() => {
              onComplete(ready);
            }, 700); // matches fade-out transition duration
          });
        }
      };
      
      img.onerror = () => {
        // Continue even if a frame fails to load
        loadedCount++;
        setProgress(Math.round((loadedCount / totalCount) * 100));
        if (loadedCount === totalCount) {
          setStatusText('Preparing graphics...');
          Promise.all(
            preloadedImages.map((img) => createImageBitmap(img).catch(() => null))
          ).then((bitmaps) => {
            const ready = bitmaps.filter(Boolean) as ImageBitmap[];
            setFadeAway(true);
            setTimeout(() => onComplete(ready), 700);
          });
        }
      };
    };

    paths.forEach(src => loadImage(src));
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-black transition-opacity duration-700 ease-in-out ${
        fadeAway ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* Background glow effects */}
      <div className="absolute top-1/2 left-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/5 blur-[80px]" />
      
      <div className="relative flex flex-col items-center gap-8">
        {/* Title logo */}
        <div className="flex flex-col items-center text-center">
          <h1 className="font-serif text-[34px] font-extralight tracking-[0.25em] text-gold sm:text-[40px] animate-pulse">
            OCHRE & EMBER
          </h1>
          <p className="mt-2 font-sans text-[10px] tracking-[0.4em] text-gold/60 uppercase">
            Kitchen & Lounge
          </p>
        </div>

        {/* Circular progress loader */}
        <div className="relative flex h-24 w-24 items-center justify-center">
          <svg className="absolute inset-0 h-full w-full -rotate-90">
            <circle
              cx="48"
              cy="48"
              r="40"
              stroke="rgba(189, 162, 126, 0.1)"
              strokeWidth="2"
              fill="transparent"
              className="translate-x-[4px] translate-y-[4px]"
            />
            <circle
              cx="48"
              cy="48"
              r="40"
              stroke="#bda27e"
              strokeWidth="2"
              fill="transparent"
              strokeDasharray={251.2}
              strokeDashoffset={251.2 - (251.2 * progress) / 100}
              strokeLinecap="round"
              className="translate-x-[4px] translate-y-[4px] transition-all duration-300 ease-out"
            />
          </svg>
          <span className="font-serif text-lg font-light text-gold">{progress}%</span>
        </div>

        <p className="font-sans text-[11px] tracking-[0.15em] text-zinc-500 uppercase animate-pulse">
          {statusText}
        </p>
      </div>
    </div>
  );
}
