'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import {
  ChevronLeft,
  ChevronRight,
  Sparkles,
  ArrowRight,
  HeartHandshake,
  Briefcase,
  Cake,
  Music,
  LayoutGrid,
  Sun,
  GlassWater,
  Trophy,
  Camera,
  Layers,
} from 'lucide-react';

interface EventWorldItem {
  id: string;
  title: string;
  slug: string;
  tagline: string;
  description: string;
  icon: any;
  image: string;
}

export default function EventWorldsCarousel() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const eventWorlds: EventWorldItem[] = [
    {
      id: 'wedding',
      title: 'Wedding',
      slug: 'wedding',
      tagline: 'Royal Traditions & Luxury',
      description: 'Find mandaps, royal banquet halls, luxury caterers, candid photographers and bridal stylists.',
      icon: HeartHandshake,
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'corporate',
      title: 'Corporate',
      slug: 'corporate-event',
      tagline: 'Summits, Galas & AGMs',
      description: 'Find venues, production teams, caterers, LED walls, audio-visual rigs and stage managers.',
      icon: Briefcase,
      image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'birthday',
      title: 'Birthday',
      slug: 'birthday',
      tagline: 'Milestones & Themes',
      description: 'Kids theme decors, customized bakeries, live entertainment, magicians and DJ sound setups.',
      icon: Cake,
      image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'religious',
      title: 'Religious',
      slug: 'religious-event',
      tagline: 'Puja, Katha & Functions',
      description: 'Pandit ji, flower garlands, traditional bhajan singers, shamiana tents and pure veg catering.',
      icon: Sun,
      image: 'https://images.unsplash.com/photo-1609137144813-7d9921338f24?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'concert',
      title: 'Concert',
      slug: 'concert',
      tagline: 'Live Shows & Arenas',
      description: 'Stadium sound, truss lighting, line-array speakers, LED displays and celebrity artist bookings.',
      icon: Music,
      image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'exhibition',
      title: 'Exhibition',
      slug: 'exhibition',
      tagline: 'Trade Expos & Fairs',
      description: 'Octanorm stall fabricators, German hangar domes, registration desks and directional signage.',
      icon: LayoutGrid,
      image: 'https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'party',
      title: 'Private Party',
      slug: 'private-party',
      tagline: 'Terrace & Social Gatherings',
      description: 'Intimate terrace lighting, mocktail bars, barbecue grills and acoustic solo musicians.',
      icon: GlassWater,
      image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'sports',
      title: 'Sports & Fest',
      slug: 'college-event',
      tagline: 'Tournaments & College Days',
      description: 'Trophies, stadium PA systems, sports event coordinators, drone cameras and live streamers.',
      icon: Trophy,
      image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'fashion',
      title: 'Fashion Show',
      slug: 'fashion-show',
      tagline: 'Runway & Designer Launches',
      description: 'Ramp fabrication, follow spotlights, backstage styling teams and red carpet photo-ops.',
      icon: Camera,
      image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80',
    },
  ];

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const offset = direction === 'left' ? -380 : 380;
      scrollContainerRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-14 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-black text-brand-gold-600 uppercase tracking-widest block mb-1">
              ✦ EXPLORE
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Event Worlds
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-xl">
              Discover verified vendors for every occasion and create memorable experiences with VentZivo.
            </p>
          </div>

          <div className="flex items-center gap-3 self-start sm:self-end">
            <Link
              href="/events"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-extrabold text-brand-blue-800 hover:text-brand-blue-900 transition-colors group mr-2"
            >
              <span>View All Events</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            {/* Desktop Navigation Arrows */}
            <div className="hidden sm:flex items-center gap-1.5">
              <button
                onClick={() => scroll('left')}
                className="w-9 h-9 rounded-full border border-slate-200 hover:border-brand-blue-800 hover:bg-brand-blue-50 text-slate-700 flex items-center justify-center transition-all shadow-sm active:scale-95"
                aria-label="Scroll left"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => scroll('right')}
                className="w-9 h-9 rounded-full border border-slate-200 hover:border-brand-blue-800 hover:bg-brand-blue-50 text-slate-700 flex items-center justify-center transition-all shadow-sm active:scale-95"
                aria-label="Scroll right"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Carousel Container: Smooth horizontal swipe on mobile, expandable on desktop */}
        <div
          ref={scrollContainerRef}
          className="flex gap-4 sm:gap-5 overflow-x-auto pb-4 pt-1 snap-x snap-mandatory scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0 scroll-smooth"
        >
          {eventWorlds.map((world) => {
            const IconComponent = world.icon;

            return (
              <Link
                key={world.id}
                href={`/vendors?eventType=${world.slug}`}
                className="group relative flex-shrink-0 w-64 sm:w-72 h-80 sm:h-96 rounded-3xl overflow-hidden shadow-md hover:shadow-2xl border border-slate-200/90 hover:border-amber-400/80 snap-start transition-all duration-500 hover:-translate-y-1.5"
              >
                {/* Event Image */}
                <img
                  src={world.image}
                  alt={world.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />

                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent" />

                {/* Top Pill Icon */}
                <div className="absolute top-4 left-4 z-10 w-10 h-10 rounded-full bg-slate-950/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-amber-300 group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors shadow">
                  <IconComponent className="w-5 h-5" />
                </div>

                {/* Bottom Card Content */}
                <div className="absolute inset-x-0 bottom-0 p-5 text-left z-10">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-amber-400 block mb-1">
                    {world.tagline}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-white group-hover:text-amber-200 transition-colors leading-tight">
                    {world.title}
                  </h3>

                  {/* Expandable info on desktop hover */}
                  <div className="max-h-0 sm:group-hover:max-h-24 overflow-hidden transition-all duration-500 ease-in-out">
                    <p className="text-xs text-slate-300 line-clamp-2 mt-2 leading-relaxed">
                      {world.description}
                    </p>
                  </div>

                  <div className="mt-3 flex items-center gap-1.5 text-xs font-extrabold text-amber-300 group-hover:translate-x-1 transition-transform">
                    <span>Explore Vendors</span>
                    <ArrowRight className="w-3.5 h-3.5 stroke-[2.5px]" />
                  </div>
                </div>

              </Link>
            );
          })}

          {/* Final "More Events" Card in the carousel */}
          <Link
            href="/events"
            className="group relative flex-shrink-0 w-64 sm:w-72 h-80 sm:h-96 rounded-3xl overflow-hidden shadow-md hover:shadow-2xl border border-amber-400/40 bg-gradient-to-br from-[#06153B] via-[#0A2560] to-[#0B3B95] text-white p-6 flex flex-col justify-between text-left snap-start transition-all duration-500 hover:-translate-y-1.5"
          >
            <div className="w-12 h-12 rounded-2xl bg-white/10 group-hover:bg-amber-400 group-hover:text-slate-950 flex items-center justify-center transition-colors">
              <Layers className="w-6 h-6" />
            </div>

            <div>
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-amber-400">
                All Celebrations
              </span>
              <h3 className="text-2xl font-black text-white mt-1 group-hover:text-amber-200 transition-colors">
                Explore 30+ Event Worlds
              </h3>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                From intimate baby showers and anniversaries to massive college fests, political rallies and festivals.
              </p>
            </div>

            <div className="inline-flex items-center gap-2 text-xs font-black text-amber-300 group-hover:translate-x-1 transition-transform">
              <span>View All Event Worlds</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </Link>

        </div>

      </div>
    </section>
  );
}
