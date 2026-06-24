"use client";

import React, { useState, useMemo } from "react";

interface MenuItem {
  id: string;
  name: string; // ✅ Standard valid TypeScript type string
  category: string;
  rating: number;
  tag?: string;
  description: string;
  price: number;
}

const MENU_DATA: MenuItem[] = [
  {
    id: "m1",
    name: "Kuzhimandi Chicken",
    category: "Mandi",
    rating: 4.9,
    tag: "BEST SELLER",
    description: "Slow-cooked, melt-in-your-mouth chicken over seasoned basmati rice. Served with spicy tomato salata and garlic toum.",
    price: 380
  },
  {
    id: "m2",
    name: "Mutton Mandi",
    category: "Mandi",
    rating: 4.8,
    tag: "CHEF'S SPECIAL",
    description: "Premium lamb slow-roasted to perfection, served over smoky, spiced long-grain rice with toasted nuts.",
    price: 520
  },
  {
    id: "m3",
    name: "Fish Mandi",
    category: "Mandi",
    rating: 4.7,
    description: "Fresh King Fish marinated in Yemeni spices, baked in clay oven, served on flavorful mandhi rice.",
    price: 460
  },
  {
    id: "af1",
    name: "Al-Fahm Signature",
    category: "Al-Fahm",
    rating: 4.9,
    tag: "BEST SELLER",
    description: "Charcoal-grilled chicken marinated in secret Arabian spices, served with garlic paste, hummus, and khubz.",
    price: 390
  },
  {
    id: "af2",
    name: "Al-Fahm Spicy Honey",
    category: "Al-Fahm",
    rating: 4.8,
    description: "Flame-grilled chicken glazed with a sweet and spicy honey chili sauce, cooked to tender perfection.",
    price: 410
  },
  {
    id: "b1",
    name: "Ochre Biriyani",
    category: "Biriyani",
    rating: 4.9,
    tag: "CHEF'S SPECIAL",
    description: "Aromatic basmati rice layered with tender marinated chicken, slow-cooked in a sealed clay pot with saffron.",
    price: 420
  },
  {
    id: "d1",
    name: "Mint Lime Mojito",
    category: "Drinks",
    rating: 4.7,
    description: "Refreshing blend of fresh crushed mint, lime wedges, simple syrup, and sparkling soda over crushed ice.",
    price: 120
  },
  {
    id: "d2",
    name: "Avocado Honey Shake",
    category: "Drinks",
    rating: 4.8,
    tag: "BEST SELLER",
    description: "Creamy fresh avocados blended with whole milk, wild honey, and topped with chopped dry fruits.",
    price: 180
  },
  {
    id: "n1",
    name: "Schezwan Chicken Noodles",
    category: "Noodles",
    rating: 4.6,
    description: "Wok-tossed noodles with shredded chicken, fresh bell peppers, cabbage, and a spicy homemade Schezwan sauce.",
    price: 240
  },
  {
    id: "fr1",
    name: "Egg Fried Rice",
    category: "Fried Rice",
    rating: 4.5,
    description: "Classic stir-fried jasmine rice tossed with farm eggs, light soy sauce, toasted sesame oil, and spring onions.",
    price: 210
  },
  {
    id: "o1",
    name: "Garlic Toum Dip",
    category: "Others",
    rating: 4.8,
    description: "An intense, creamy Lebanese garlic sauce prepared fresh daily, perfect with grills and Mandi.",
    price: 40
  }
];

const CATEGORIES = ["All", "Mandi", "Al-Fahm", "Biriyani", "Drinks", "Noodles", "Fried Rice", "Others"];

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
    <section id="menu-section" className="w-full bg-[#f5f8f9] px-6 pt-4 pb-16 sm:px-12 sm:pt-8">
      <div className="mx-auto max-w-5xl">
        {/* Title Block */}
        <div className="flex flex-col items-center text-center">
          <h2 className="font-serif text-6xl font-bold tracking-[0.05em] text-[#1c1c1c] sm:text-4xl">
            Our Exquisite Menu
          </h2>
          <div className="my-4 h-[1px] w-12 bg-[#bda27e]" />
          <p className="max-w-2xl font-sans text-base sm:text-lg leading-relaxed text-[#1c1c1c] font-medium">
            Savour our traditional Yemeni Mandi and premium charcoal-grilled Al-Fahm, prepared with freshly ground spices.
          </p>
        </div>

        {/* Search Bar */}
        <div className="mt-8 flex justify-center">
          <div className="relative w-full max-w-xl">
            <input
              type="text"
              placeholder="Search for Mandi, Grills, Mojitos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-full border border-[#dbe1e3] px-8 py-4 text-center font-sans text-base text-[#1c1c1c] placeholder-zinc-400 outline-none focus:border-zinc-300"
              style={{ backgroundColor: "#eef2f3" }}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute top-1/2 right-5 -translate-y-1/2 font-sans text-xs text-zinc-400 hover:text-zinc-600"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Category Filter Horizontal Scroll */}
        <div className="no-scrollbar mt-8 overflow-x-auto pb-2">
          <div className="flex justify-start gap-4 sm:justify-center">
            {CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`shrink-0 rounded-full px-7 py-3 font-sans text-sm sm:text-base font-bold tracking-wide transition-all duration-150 border border-[#dbe1e3] ${
                    isActive
                      ? "bg-[#3cdbc9] text-zinc-950 shadow-[0_0_15px_rgba(60,219,201,0.6)] border-[#3cdbc9]"
                      : "bg-[#eef2f3] text-zinc-800 hover:bg-zinc-200/50"
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
                className="flex flex-col border-b border-zinc-200/70 py-8 font-sans"
              >
                {/* Row 1: Title (left) & Rating/Tag (right) */}
                <div className="flex items-center justify-between">
                  {/* Removed lowercase class */}
                  <h3 className="font-serif text-2xl font-bold tracking-wide text-zinc-900 sm:text-3xl">
                    {item.name}
                  </h3>
                  <div className="flex items-center gap-2.5">
                    {/* Rating badge */}
                    <div className="flex items-center gap-1.5 rounded border border-[#cbd5e1] bg-white px-3 py-1 font-sans text-sm font-bold text-zinc-700">
                      <span className="text-[#d4af37] text-base">★</span>
                      <span>{item.rating}</span>
                    </div>

                    {/* Tag badge (Best Seller / Chef's Special) */}
                    {item.tag && (
                      <span className="rounded bg-[#d4af37] px-3 py-1 font-sans text-xs font-bold tracking-wider text-zinc-950 uppercase">
                        {item.tag}
                      </span>
                    )}
                  </div>
                </div>

                {/* Row 2: Description (left) & Price (right) */}
                <div className="mt-3 flex items-start justify-between gap-4">
                  <p className="font-sans text-base leading-relaxed text-zinc-700 max-w-[75%] sm:text-lg">
                    {item.description}
                  </p>
                  <div className="flex flex-col items-end shrink-0 font-sans">
                    <span className="text-xs font-bold tracking-widest text-zinc-400 uppercase">
                      PRICE
                    </span>
                    <span className="text-xl font-bold text-zinc-900 mt-0.5">
                      ₹{item.price}
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12 font-sans text-zinc-500">
              No menu items match your search.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
