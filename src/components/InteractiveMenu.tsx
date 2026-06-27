"use client";

import React, { useState, useMemo } from "react";

interface MenuItem {
  id: string;
  name: string;
  category: string;
  rating: number;
  tag?: string;
  description: string;
  price: number;
}

const MENU_DATA: MenuItem[] = [
  {
    id: "m1",
    name: "KUZHIMANDI CHICKEN",
    category: "Mandi",
    rating: 4.9,
    tag: "BEST SELLER",
    description: "Slow-cooked, melt-in-your-mouth chicken over seasoned basmati rice. Served over sor with spicy tomato salata and garlic toum.",
    price: 380
  },
  {
    id: "m2",
    name: "MUTTON MANDI",
    category: "Mandi",
    rating: 4.8,
    tag: "CHEF'S SPECIAL",
    description: "Premium lamb slow-roasted to perfection, served over smoky, spiced long-grain rich with toasted nuts.",
    price: 520
  },
  {
    id: "m3",
    name: "FISH MANDI",
    category: "Mandi",
    rating: 4.7,
    description: "Fresh King Fish marinated in Yemeni spices, baked in clay oven, served on flavorful mandhy rice.",
    price: 460
  },
  {
    id: "af1",
    name: "AL-FAHM CHICKEN",
    category: "Al-farm",
    rating: 4.9,
    tag: "BEST SELLER",
    description: "Charcoal-grilled chicken marinated in secret Arabian spices, served with garlic paste, hummus, and khubz.",
    price: 390
  },
  {
    id: "af2",
    name: "AL-FAHM SPICY HONEY",
    category: "Al-farm",
    rating: 4.8,
    description: "Flame-grilled chicken glazed with a sweet and spicy honey chili sauce, cooked to tender perfection.",
    price: 410
  },
  {
    id: "b1",
    name: "OCHRE SIGNATURE BIRIYANI",
    category: "Biriyani",
    rating: 4.9,
    tag: "CHEF'S SPECIAL",
    description: "Aromatic basmati rice layered with tender marinated chicken, slow-cooked in a sealed clay pot with saffron.",
    price: 420
  },
  {
    id: "d1",
    name: "MINT LIME MOJITO",
    category: "Drinks",
    rating: 4.7,
    description: "Refreshing blend of fresh crushed mint, lime wedges, simple syrup, and sparkling soda over crushed ice.",
    price: 120
  },
  {
    id: "d2",
    name: "AVOCADO HONEY SHAKE",
    category: "Drinks",
    rating: 4.8,
    tag: "BEST SELLER",
    description: "Creamy fresh avocados blended with whole milk, wild honey, and topped with chopped dry fruits.",
    price: 180
  },
  {
    id: "n1",
    name: "SCHEZWAN CHICKEN NOODLES",
    category: "Noodles",
    rating: 4.6,
    description: "Wok-tossed noodles with shredded chicken, fresh bell peppers, cabbage, and a spicy homemade Schezwan sauce.",
    price: 240
  },
  {
    id: "fr1",
    name: "EGG FRIED RICE",
    category: "Fried Rice",
    rating: 4.5,
    description: "Classic stir-fried jasmine rice tossed with farm eggs, light soy sauce, toasted sesame oil, and spring onions.",
    price: 210
  },
  {
    id: "o1",
    name: "GARLIC TOUM DIP",
    category: "Others",
    rating: 4.8,
    description: "An intense, creamy Lebanese garlic sauce prepared fresh daily, perfect with grills and Mandi.",
    price: 40
  }
];

const CATEGORIES = ["All", "Mandi", "Al-farm", "Biriyani", "Drinks", "Noodles", "Fried Rice", "Others"];

export default function InteractiveMenu() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredItems = useMemo(() => {
    return MENU_DATA.filter((item) => {
      const matchesCategory =
        selectedCategory === "All" || item.category === selectedCategory;
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <section id="menu-section" className="w-full px-6 py-16 sm:px-12" style={{ backgroundColor: '#e8edf2' }}>
      <div className="mx-auto max-w-3xl">
        {/* Title Block */}
        <div className="flex flex-col items-center text-center">
          <h2 className="font-serif text-4xl font-bold tracking-[0.04em] text-[#1a1a1a] sm:text-5xl" style={{ fontVariant: 'small-caps' }}>
            Our Exquisite Menu
          </h2>
          <div className="my-4 h-[1.5px] w-14 bg-[#bda27e]" />
          <p className="max-w-xl font-sans text-[13px] sm:text-sm leading-relaxed text-[#3a3a3a]">
            Savor our traditional Yemeni Mandi and premium charcoal-grilled Al-Fahm, prepared with freshly ground spices.
          </p>
        </div>

        {/* Search Bar */}
        <div className="mt-6 flex justify-center">
          <div className="relative w-full max-w-md">
            <input
              type="text"
              placeholder="Search for Mandi, Grills, Mojitos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-full border border-[#c8d0d8] px-6 py-2.5 text-center font-sans text-xs text-[#1a1a1a] placeholder-[#8a9aaa] outline-none focus:border-[#bda27e]"
              style={{ backgroundColor: 'rgba(255,255,255,0.55)' }}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute top-1/2 right-4 -translate-y-1/2 font-sans text-[10px] text-zinc-400 hover:text-zinc-600"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Category Filter Horizontal Scroll */}
        <div className="no-scrollbar mt-6 overflow-x-auto pb-2">
          <div className="flex justify-start gap-3 sm:justify-center">
            {CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`shrink-0 rounded-full px-5 py-2 font-sans text-xs font-semibold tracking-wide transition-all duration-150 border ${
                    isActive
                      ? "bg-[#1a1a1a] text-white border-[#1a1a1a] shadow-md"
                      : "bg-white/60 text-[#3a3a3a] border-[#c8d0d8] hover:bg-white/90"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Menu Items List */}
        <div className="mt-10 flex flex-col">
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <div
                key={item.id}
                className="flex flex-col border-b border-zinc-200/70 py-6 font-sans"
              >
                {/* Row 1: Title (left) & Rating/Tag (right) */}
                <div className="flex items-center justify-between">
                  <h3 className="font-serif text-[18px] font-bold tracking-wide text-[#1a1a1a] sm:text-[20px]" style={{ fontVariant: 'small-caps' }}>
                    {item.name}
                  </h3>
                  <div className="flex items-center gap-1.5">
                    {/* Rating badge */}
                    <div className="flex items-center gap-1 rounded border border-[#cbd5e1] bg-white px-2 py-0.5 font-sans text-[10px] font-bold text-zinc-700">
                      <span className="text-[#d4af37] text-[11px]">★</span>
                      <span>{item.rating}</span>
                    </div>

                    {/* Tag badge (Best Seller / Chef's Special) */}
                    {item.tag && (
                      <span className="rounded bg-[#d4af37] px-2 py-0.5 font-sans text-[9px] font-bold tracking-wider text-zinc-950 uppercase">
                        {item.tag}
                      </span>
                    )}
                  </div>
                </div>

                {/* Row 2: Description (left) & Price (right) */}
                <div className="mt-2 flex items-start justify-between gap-4">
                  <p className="font-sans text-[13px] leading-relaxed text-[#444] max-w-[75%] sm:text-[14px]">
                    {item.description}
                  </p>
                  <div className="flex flex-col items-end shrink-0 font-sans">
                    <span className="text-[9px] font-bold tracking-widest text-zinc-400 uppercase">
                      PRICE
                    </span>
                    <span className="text-[20px] font-bold text-zinc-900 leading-tight">
                      ₹{item.price}
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="py-12 text-center">
              <p className="font-sans text-xs text-zinc-400">
                No exquisite items match your search or filter.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
