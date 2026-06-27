"use client";

import React from "react";
import Image from "next/image";

export default function ContactSection() {
  return (
    <section id="contact-section" className="w-full px-6 py-20 sm:px-12 border-t border-[#c8d0d8]/50" style={{ backgroundColor: '#e8edf2' }}>
      <div className="mx-auto max-w-4xl">
        {/* Title */}
        <div className="flex flex-col items-center text-center">
          <h2 className="font-serif text-3xl font-bold tracking-[0.05em] text-[#1c1c1c] sm:text-4xl">
            Find Us
          </h2>
          <div className="my-3 h-[1px] w-12 bg-[#bda27e]" />
          <p className="max-w-xl font-sans text-xs tracking-[0.15em] text-zinc-500 uppercase">
            Visit us or reach out to experience culinary luxury
          </p>
        </div>

        {/* Layout Grid */}
        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 items-stretch">
          
          {/* Left Column: Info Cards */}
          <div className="flex flex-col gap-6">
            
            {/* Card 1: Hours */}
            <div className="flex flex-col bg-white border border-[rgba(189,162,126,0.15)] rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden group">
              <div className="absolute top-0 left-0 h-[3px] w-0 bg-[#bda27e] transition-all duration-300 group-hover:w-full" />
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#f5f0e6] text-[#bda27e]">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-serif text-lg font-bold tracking-wide text-zinc-900">
                  Hours & Timings
                </h3>
              </div>
              <div className="mt-4 pl-[3.25rem]">
                <p className="font-sans text-[14px] font-bold text-zinc-800 tracking-wide">
                  9:00 AM — 10:00 PM DAILY
                </p>
                <p className="mt-1 font-sans text-[12px] text-zinc-500 leading-relaxed">
                  Open for Dine-in, Takeaway, and Premium Catering
                </p>
              </div>
            </div>

            {/* Card 2: Reservations */}
            <div className="flex flex-col bg-white border border-[rgba(189,162,126,0.15)] rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden group">
              <div className="absolute top-0 left-0 h-[3px] w-0 bg-[#bda27e] transition-all duration-300 group-hover:w-full" />
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#f5f0e6] text-[#bda27e]">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <h3 className="font-serif text-lg font-bold tracking-wide text-zinc-900">
                  Reservations
                </h3>
              </div>
              <div className="mt-4 pl-[3.25rem] flex flex-col gap-1">
                <a
                  href="tel:+919876543210"
                  className="font-sans text-[15px] font-bold text-[#bda27e] hover:text-[#a18663] transition-colors inline-block w-fit"
                >
                  +91 98765 43210
                </a>
                <a
                  href="mailto:bookings@ochreandember.com"
                  className="font-sans text-[12px] text-zinc-500 hover:text-[#bda27e] transition-colors inline-block w-fit animate-fade-in"
                >
                  bookings@ochreandember.com
                </a>
              </div>
            </div>

            {/* Card 3: Address */}
            <div className="flex flex-col bg-white border border-[rgba(189,162,126,0.15)] rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden group">
              <div className="absolute top-0 left-0 h-[3px] w-0 bg-[#bda27e] transition-all duration-300 group-hover:w-full" />
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#f5f0e6] text-[#bda27e]">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="font-serif text-lg font-bold tracking-wide text-zinc-900">
                  Our Address
                </h3>
              </div>
              <div className="mt-4 pl-[3.25rem]">
                <p className="font-sans text-[13px] text-zinc-700 leading-relaxed max-w-[90%]">
                  123 Gourmet Boulevard, Food District, Kochi, Kerala — 682001
                </p>
              </div>
            </div>

          </div>

          {/* Right Column: Styled Map Card */}
          <div className="relative overflow-hidden rounded-2xl border border-[rgba(189,162,126,0.15)] bg-white p-3 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col group min-h-[380px] h-full">
            <div className="relative w-full flex-grow overflow-hidden rounded-xl bg-zinc-950 min-h-[300px]">
              <Image
                src="/contact-map.png"
                alt="Ochre & Ember Location Map"
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              
              {/* Glassmorphic overlay card */}
              <div className="absolute bottom-4 left-4 right-4 bg-white/70 backdrop-blur-md border border-white/20 p-4 rounded-xl shadow-lg flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <div className="flex flex-col">
                  <span className="font-serif text-[13px] font-bold text-zinc-900 tracking-wide">
                    Ochre & Ember
                  </span>
                  <span className="font-sans text-[11px] text-zinc-600">
                    Kochi, Kerala
                  </span>
                </div>
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full px-5 py-2 font-sans text-[10px] font-bold tracking-wider transition-all duration-300 bg-[#bda27e] text-zinc-950 hover:bg-[#a18663] shadow-md hover:shadow-lg text-center cursor-pointer shrink-0 uppercase"
                >
                  Get Directions
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Footer info (all rights reserved) */}
        <div className="mt-20 flex flex-col items-center pt-8 text-center border-t border-zinc-200/50">
          <h4 className="font-serif text-lg font-light tracking-[0.2em] text-[#bda27e]">
            Ochre & Ember
          </h4>
          <p className="mt-4 font-sans text-[10px] tracking-wider text-zinc-400 uppercase">
            © {new Date().getFullYear()} Ochre & Ember. All rights reserved.
          </p>
        </div>
      </div>
    </section>
  );
}

