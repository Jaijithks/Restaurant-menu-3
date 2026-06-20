"use client";

import React from "react";

export default function ContactSection() {
  return (
    <section id="contact-section" className="w-full bg-[#f5f8f9] px-6 py-20 sm:px-12 border-t border-zinc-200/60">
      <div className="mx-auto max-w-3xl">
        {/* Title */}
        <div className="flex flex-col items-center text-center">
          <h2 className="font-serif text-3xl font-bold tracking-[0.05em] text-[#1c1c1c] sm:text-4xl">
            FIND US
          </h2>
          <div className="my-3 h-[1px] w-12 bg-[#bda27e]" />
          <p className="max-w-xl font-sans text-xs tracking-widest text-zinc-400 uppercase">
            Visit us or reach out to experience culinary luxury
          </p>
        </div>

        {/* Info Rows */}
        <div className="mt-12 flex flex-col">
          {/* Row 1: Hours */}
          <div className="flex flex-col border-b border-zinc-200/70 py-6 font-sans md:flex-row md:justify-between md:items-start">
            <h3 className="font-serif text-[17px] font-bold tracking-wide text-zinc-900 sm:text-[19px] uppercase md:w-[30%]">
              HOURS & TIMINGS
            </h3>
            <div className="mt-2 md:mt-0 md:w-[70%]">
              <p className="font-sans text-[13px] font-bold text-zinc-800 sm:text-[14px]">
                9:00 AM — 10:00 PM DAILY
              </p>
              <p className="mt-1 font-sans text-[12px] text-zinc-500">
                Open for Dine-in, Takeaway, and Premium Catering
              </p>
            </div>
          </div>

          {/* Row 2: Reservations */}
          <div className="flex flex-col border-b border-zinc-200/70 py-6 font-sans md:flex-row md:justify-between md:items-start">
            <h3 className="font-serif text-[17px] font-bold tracking-wide text-zinc-900 sm:text-[19px] uppercase md:w-[30%]">
              RESERVATIONS
            </h3>
            <div className="mt-2 md:mt-0 md:w-[70%]">
              <a
                href="tel:+919876543210"
                className="inline-block font-sans text-[14px] font-bold text-[#bda27e] hover:text-[#a18663] transition-colors"
              >
                +91 98765 43210
              </a>
              <p className="mt-1 font-sans text-[12px] text-zinc-500">
                Call us directly or email us at bookings@ochreandember.com
              </p>
            </div>
          </div>

          {/* Row 3: Address */}
          <div className="flex flex-col border-b border-zinc-200/70 py-6 font-sans md:flex-row md:justify-between md:items-start">
            <h3 className="font-serif text-[17px] font-bold tracking-wide text-zinc-900 sm:text-[19px] uppercase md:w-[30%]">
              OUR ADDRESS
            </h3>
            <div className="mt-2 md:mt-0 md:w-[70%] flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
              <p className="font-sans text-[13px] text-zinc-700 leading-relaxed sm:text-[14px] max-w-[70%]">
                123 Gourmet Boulevard, Food District, Kochi, Kerala — 682001
              </p>
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 rounded-full px-4 py-1.5 font-sans text-[11px] font-bold tracking-wide transition-all border border-[#dbe1e3] bg-[#eef2f3] text-zinc-800 hover:bg-zinc-200/50"
              >
                GET DIRECTIONS
              </a>
            </div>
          </div>
        </div>

        {/* Footer info (all rights reserved) */}
        <div className="mt-16 flex flex-col items-center pt-8 text-center">
          <h4 className="font-serif text-lg font-light tracking-[0.2em] text-[#bda27e]">
            OCHRE & EMBER
          </h4>
          <p className="mt-4 font-sans text-[10px] tracking-wider text-zinc-400 uppercase">
            © {new Date().getFullYear()} Ochre & Ember. All rights reserved.
          </p>
        </div>
      </div>
    </section>
  );
}
