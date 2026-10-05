'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, Building, Utensils, Palette, Camera, Music, Sparkle, Truck, Clapperboard, Printer, Award } from 'lucide-react';

interface CategoryItem {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  startingPrice: string;
  vendorCount: string;
  image: string;
}

export default function CategoryHoverShowcase() {
  const categories: CategoryItem[] = [
    {
      id: 'venue',
      name: 'Venues & Banquets',
      slug: 'venue',
      tagline: 'Palaces, Luxury Resorts, 5-Star Ballrooms & Farmhouses',
      startingPrice: '₹50,000',
      vendorCount: '1,200+ listed',
      image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1000&q=80',
    },
    {
      id: 'catering',
      name: 'Catering & Food Stalls',
      slug: 'catering-food',
      tagline: 'Gourmet Indian, Mughlai, Continental & Artisanal Counters',
      startingPrice: '₹400 / plate',
      vendorCount: '850+ listed',
      image: 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=1000&q=80',
    },
    {
      id: 'decoration',
      name: 'Floral & Theme Decor',
      slug: 'decoration',
      tagline: 'Grand Mandaps, Fairy Light Tunnels & Modern Stage Art',
      startingPrice: '₹25,000',
      vendorCount: '980+ listed',
      image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1000&q=80',
    },
    {
      id: 'photography',
      name: 'Photography & 4K Cinema',
      slug: 'photography-video',
      tagline: 'Candid Shoots, Drone Cinematography & Same-Day Edits',
      startingPrice: '₹30,000',
      vendorCount: '1,450+ listed',
      image: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=1000&q=80',
    },
    {
      id: 'entertainment',
      name: 'Entertainment, DJs & Artists',
      slug: 'entertainment-music',
      tagline: 'Celebrity Singers, Live Bands, Symphony & Club DJs',
      startingPrice: '₹15,000',
      vendorCount: '650+ listed',
      image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1000&q=80',
    },
    {
      id: 'beauty',
      name: 'Bridal & Groom Styling',
      slug: 'beauty-styling',
      tagline: 'Airbrush HD Makeup, Draping & Celebrity Hairstylists',
      startingPrice: '₹10,000',
      vendorCount: '720+ listed',
      image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=1000&q=80',
    },
    {
      id: 'production',
      name: 'Event Production & AV Rigs',
      slug: 'event-production',
      tagline: 'German Hangars, P3 LED Screens & Line-Array Sound',
      startingPrice: '₹40,000',
      vendorCount: '430+ listed',
      image: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1000&q=80',
    },
    {
      id: 'planning',
      name: 'Event Planners & Managers',
      slug: 'event-production',
      tagline: 'Turnkey Execution, Hospitality & End-to-End Coordination',
      startingPrice: '₹75,000',
      vendorCount: '580+ listed',
      image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1000&q=80',
    },
  ];

  const [activeCategory, setActiveCategory] = useState<CategoryItem>(categories[0]);

  return (
    <section className="py-14 sm:py-20 bg-slate-900 text-white relative overflow-hidden">
      
      {/* Background Ambient Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-brand-blue-700/20 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-amber-500/10 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 pb-6 border-b border-white/10">
          <div>
            <span className="text-xs font-black text-brand-gold-400 uppercase tracking-widest block mb-1">
              ✦ CURATED SERVICES
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Find What You Need
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-lg">
              Explore specialized event services across categories with transparent pricing and verified portfolios.
            </p>
          </div>

          <Link
            href="/categories"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-extrabold text-amber-400 hover:text-amber-300 transition-colors group"
          >
            <span>Explore All Categories</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Editorial Layout: Desktop 2 Columns with Dynamic Image Hover Preview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Interactive Editorial Category List */}
          <div className="lg:col-span-7 space-y-1">
            {categories.map((cat, idx) => {
              const isSelected = activeCategory.id === cat.id;

              return (
                <div
                  key={cat.id}
                  onMouseEnter={() => setActiveCategory(cat)}
                  className={`group p-3.5 sm:p-4 rounded-2xl transition-all duration-300 cursor-pointer flex items-center justify-between border ${
                    isSelected
                      ? 'bg-white/10 border-amber-400/60 shadow-lg translate-x-2'
                      : 'bg-transparent border-transparent hover:bg-white/5 hover:border-white/10'
                  }`}
                >
                  <div className="flex items-center gap-3 sm:gap-4">
                    <span className="text-xs font-mono font-bold text-amber-400/80">
                      0{idx + 1}
                    </span>
                    <div>
                      <h3
                        className={`text-base sm:text-lg font-black transition-colors ${
                          isSelected ? 'text-amber-300' : 'text-slate-200 group-hover:text-white'
                        }`}
                      >
                        {cat.name}
                      </h3>
                      <p className="text-[11px] text-slate-400 hidden sm:block">
                        {cat.tagline}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-right hidden sm:block">
                      <span className="text-[10px] text-slate-400 block">From</span>
                      <span className="text-xs font-extrabold text-amber-400">
                        {cat.startingPrice}
                      </span>
                    </div>

                    <Link
                      href={`/vendors?category=${cat.slug}`}
                      className={`p-2 rounded-xl transition-all ${
                        isSelected
                          ? 'bg-amber-400 text-slate-950 scale-105'
                          : 'bg-white/10 text-slate-300 group-hover:bg-white/20 group-hover:text-white'
                      }`}
                      aria-label={`Browse ${cat.name}`}
                    >
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Dynamic Preview Panel on Desktop */}
          <div className="lg:col-span-5 hidden lg:block">
            <div className="relative rounded-3xl overflow-hidden border border-white/15 shadow-2xl aspect-[4/5] group bg-slate-950">
              {/* Category Live Image */}
              <img
                src={activeCategory.image}
                alt={activeCategory.name}
                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

              {/* Overlay Details */}
              <div className="absolute inset-x-0 bottom-0 p-6 z-10 space-y-3">
                <span className="inline-block px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/40 text-[10px] font-extrabold uppercase tracking-wider text-amber-300">
                  {activeCategory.vendorCount}
                </span>

                <h3 className="text-2xl font-black text-white">
                  {activeCategory.name}
                </h3>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {activeCategory.tagline}
                </p>

                <div className="pt-2 flex items-center justify-between border-t border-white/10">
                  <div>
                    <span className="text-[10px] text-slate-400 block font-medium">Starting from</span>
                    <span className="text-base font-black text-amber-400">
                      {activeCategory.startingPrice}
                    </span>
                  </div>

                  <Link
                    href={`/vendors?category=${activeCategory.slug}`}
                    className="px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-xs shadow-lg flex items-center gap-1.5 transition-all"
                  >
                    <span>Browse Category</span>
                    <ArrowRight className="w-3.5 h-3.5 stroke-[2.5px]" />
                  </Link>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
