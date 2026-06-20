"use client";

import React, { useState } from "react";
import Preloader from "@/components/Preloader";
import ScrollAnimation from "@/components/ScrollAnimation";

export default function Home() {
  const [loadedImages, setLoadedImages] = useState<HTMLImageElement[] | null>(null);

  return (
    <main className="min-h-screen w-full flex flex-col">
      {!loadedImages ? (
        <Preloader onComplete={(images) => setLoadedImages(images)} />
      ) : (
        <ScrollAnimation images={loadedImages} />
      )}
    </main>
  );
}

