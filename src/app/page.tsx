import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { prisma } from '@/lib/prisma';
import HeroSearch from '@/components/home/HeroSearch';
import {
  Sparkles,
  ShieldCheck,
  Star,
  MapPin,
  ArrowRight,
  Check,
  HeartHandshake,
  Layers,
  IndianRupee,
} from 'lucide-react';
import { formatPrice } from '@/lib/utils';

export const revalidate = 0; // Fresh database updates

export default async function HomePage() {
  // Fetch Event Types for search dropdown
  const eventTypes = await prisma.eventType.findMany({
    where: { isActive: true },
    orderBy: { sortOrder: 'asc' },
    take: 12,
  });

  // Fetch Locations for search dropdown
  const locations = await prisma.location.findMany({
    where: { isPopular: true },
    orderBy: { sortOrder: 'asc' },
  });

  // Fetch Exactly 3 Featured & Verified Vendors
  const vendorsRaw = await prisma.vendor.findMany({
    where: {
      status: { in: ['APPROVED', 'VERIFIED'] },
      isFeatured: true,
    },
    take: 3,
    include: {
      category: true,
      eventTypes: {
        include: { eventType: true },
      },
    },
    orderBy: [{ rating: 'desc' }, { reviewCount: 'desc' }],
  });

  // Fallback to top rated vendors if fewer than 3 featured
  let featuredVendors = vendorsRaw;
  if (featuredVendors.length < 3) {
    const additional = await prisma.vendor.findMany({
      where: {
        status: { in: ['APPROVED', 'VERIFIED'] },
        id: { notIn: vendorsRaw.map((v) => v.id) },
      },
      take: 3 - featuredVendors.length,
      include: {
        category: true,
        eventTypes: {
          include: { eventType: true },
        },
      },
      orderBy: { rating: 'desc' },
    });
    featuredVendors = [...featuredVendors, ...additional];
  }

  // Curated 6 Event Cards
  const popularEvents = [
    {
      title: 'Wedding',
      tag: 'Grand & Traditional',
      href: '/vendors?eventType=wedding',
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=80',
    },
    {
      title: 'Birthday',
      tag: 'Milestones & Themes',
      href: '/vendors?eventType=birthday',
      image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=600&q=80',
    },
    {
      title: 'Corporate',
      tag: 'Summits & Galas',
      href: '/vendors?eventType=corporate-event',
      image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=600&q=80',
    },
    {
      title: 'Engagement',
      tag: 'Ring & Cocktail',
      href: '/vendors?eventType=engagement',
      image: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=600&q=80',
    },
    {
      title: 'Party',
      tag: 'Private Celebrations',
      href: '/vendors?eventType=private-party',
      image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=600&q=80',
    },
    {
      title: 'More Events',
      tag: 'Explore 30+ Types',
      href: '/events',
      isMoreCard: true,
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC]">
      
      {/* 2. HERO SECTION — MAIN FOCUS */}
      <section className="relative bg-gradient-to-b from-[#06153B] via-[#0A2560] to-[#0B3B95] text-white pt-10 sm:pt-14 pb-20 sm:pb-28 overflow-hidden">
        {/* Subtle Ambient Brand Glows matching VentZivo Gold & Blue */}
        <div className="absolute top-0 right-1/4 -mt-24 w-96 h-96 rounded-full bg-brand-gold-500/10 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-10 left-10 -ml-20 w-80 h-80 rounded-full bg-brand-blue-600/20 blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            
            {/* Left Hero Content */}
            <div className="lg:col-span-7 text-left space-y-6">
              
              {/* Eyebrow */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-400/10 border border-amber-400/25 backdrop-blur-md">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-amber-300">
                  The Event Vendor Marketplace
                </span>
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.08] text-white">
                Every Event.<br />
                Every Vendor.<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-200 to-amber-400">
                  One Place.
                </span>
              </h1>

              {/* Supporting Text */}
              <p className="text-base sm:text-lg text-slate-300 font-normal max-w-xl leading-relaxed">
                Discover trusted vendors for weddings, celebrations, corporate events and every occasion.
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4">
                <Link
                  href="/vendors"
                  className="px-8 py-3.5 rounded-full bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-slate-950 font-black text-sm tracking-wide shadow-lg shadow-amber-500/25 flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  <span>Find Vendors</span>
                  <ArrowRight className="w-4 h-4 stroke-[2.5px]" />
                </Link>

                <Link
                  href="/vendor/register"
                  className="px-8 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-sm border border-white/20 hover:border-white/40 backdrop-blur-md transition-all flex items-center justify-center hover:scale-[1.02] active:scale-[0.98]"
                >
                  <span>Become a Vendor</span>
                </Link>
              </div>

            </div>

            {/* Right Hero Visual / Editorial Composition */}
            <div className="lg:col-span-5 relative mt-4 lg:mt-0">
              
              {/* Image Frame */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-slate-950/60 border border-white/15 aspect-[4/3] group">
                <img
                  src="/hero-luxury-event.jpg"
                  alt="VentZivo Luxury Event & Vendor Marketplace"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#06153B]/70 via-transparent to-black/20 pointer-events-none" />

                {/* Subtle Floating UI Element 1: Verified Vendors */}
                <div className="absolute top-4 left-4 z-20 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-white/40 shadow-lg flex items-center gap-1.5 text-slate-900 animate-fade-in">
                  <div className="w-4 h-4 rounded-full bg-emerald-500 text-white flex items-center justify-center flex-shrink-0">
                    <Check className="w-2.5 h-2.5 stroke-[3px]" />
                  </div>
                  <span className="text-[11px] font-extrabold tracking-wide">
                    Verified Vendors
                  </span>
                </div>

                {/* Subtle Floating UI Element 2: 4.9 Rated */}
                <div className="absolute top-4 right-4 z-20 px-3 py-1.5 rounded-full bg-slate-950/80 backdrop-blur-md border border-white/20 shadow-lg flex items-center gap-1.5 text-white">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span className="text-[11px] font-extrabold text-amber-300">
                    4.9 Rated
                  </span>
                </div>

                {/* Subtle Floating UI Element 3: 10K+ Services */}
                <div className="absolute bottom-4 left-4 z-20 px-3.5 py-1.5 rounded-2xl bg-white/95 backdrop-blur-md border border-white/50 shadow-xl flex items-center gap-2 text-slate-900">
                  <Sparkles className="w-4 h-4 text-brand-gold-600 flex-shrink-0" />
                  <div>
                    <p className="text-xs font-black text-slate-900 leading-tight">10K+ Services</p>
                    <p className="text-[10px] text-slate-500 font-semibold leading-tight">30+ Event Types</p>
                  </div>
                </div>

              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 3. SMART SEARCH — INTEGRATED & OVERLAPPING WITH HERO */}
      <div className="-mt-9 sm:-mt-10 relative z-30 mb-8 sm:mb-12">
        <HeroSearch
          eventTypes={eventTypes.map((e) => e.name)}
          locations={locations.map((l) => l.city)}
        />
      </div>

      {/* 4. POPULAR EVENTS — 6 ATTRACTIVE CATEGORIES */}
      <section className="py-8 sm:py-12 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
            <span className="text-xs font-extrabold text-brand-gold-600 uppercase tracking-widest block mb-1">
              ✦ Curated Celebrations
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Explore Events
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Choose your celebration to discover specialist vendors with verified expertise.
            </p>
          </div>

          {/* 6 Event Cards Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            {popularEvents.map((evt) => {
              if (evt.isMoreCard) {
                return (
                  <Link
                    key={evt.title}
                    href={evt.href}
                    className="group relative h-48 sm:h-56 rounded-2xl p-4 flex flex-col items-center justify-between text-center overflow-hidden bg-gradient-to-br from-[#06153B] via-[#0A2560] to-[#0B3B95] text-white border border-amber-400/30 hover:border-amber-400 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                  >
                    <div className="w-10 h-10 rounded-full bg-white/10 group-hover:bg-amber-400 group-hover:text-slate-950 flex items-center justify-center transition-colors mt-4">
                      <Layers className="w-5 h-5" />
                    </div>

                    <div className="mb-3">
                      <h3 className="font-extrabold text-sm sm:text-base text-white group-hover:text-amber-300 transition-colors">
                        {evt.title}
                      </h3>
                      <p className="text-[11px] text-amber-200/80 font-medium mt-0.5">
                        {evt.tag}
                      </p>
                    </div>

                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-300 group-hover:translate-x-0.5 transition-transform">
                      <span>View All</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </Link>
                );
              }

              return (
                <Link
                  key={evt.title}
                  href={evt.href}
                  className="group relative h-48 sm:h-56 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-slate-200/80 hover:border-brand-blue-400 hover:-translate-y-1 transition-all duration-300"
                >
                  {/* Event Background Image */}
                  <img
                    src={evt.image}
                    alt={evt.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {/* Subtle Dark Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-900/30 to-black/10" />

                  {/* Card Content at bottom */}
                  <div className="absolute inset-x-0 bottom-0 p-3.5 sm:p-4 text-left">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300 drop-shadow-sm block">
                      {evt.tag}
                    </span>
                    <h3 className="font-extrabold text-base sm:text-lg text-white group-hover:text-amber-200 transition-colors leading-snug">
                      {evt.title}
                    </h3>
                  </div>
                </Link>
              );
            })}
          </div>

        </div>
      </section>

      {/* 5. FEATURED VENDORS — EXACTLY 3 PREMIERE CARDS */}
      <section className="py-12 sm:py-16 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <span className="text-xs font-extrabold text-brand-gold-600 uppercase tracking-widest block mb-1">
                ✦ Verified Excellence
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Featured Vendors
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Discover trusted professionals for your next event.
              </p>
            </div>

            <Link
              href="/vendors"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-extrabold text-brand-blue-800 hover:text-brand-blue-900 transition-colors group self-start sm:self-end"
            >
              <span>View All Vendors</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* 3 Premium Vendor Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {featuredVendors.map((vendor) => {
              const fallbackCover =
                'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=800&q=80';

              return (
                <div
                  key={vendor.id}
                  className="group bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-brand-blue-300 transition-all duration-300 overflow-hidden flex flex-col"
                >
                  {/* Card Image */}
                  <div className="relative h-52 sm:h-56 w-full overflow-hidden bg-slate-100">
                    <img
                      src={vendor.coverImage || fallbackCover}
                      alt={vendor.businessName}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-black/20" />

                    {/* Verified Badge */}
                    {vendor.isVerified && (
                      <div className="absolute top-3 left-3 z-10 px-2.5 py-1 rounded-full bg-emerald-600/90 text-white backdrop-blur-md shadow-sm flex items-center gap-1 text-[11px] font-bold">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span>Verified</span>
                      </div>
                    )}

                    {/* Category Overlay */}
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white z-10">
                      <span className="text-[11px] font-extrabold uppercase tracking-wider text-amber-300 bg-slate-950/60 px-2.5 py-0.5 rounded-md backdrop-blur-sm">
                        {vendor.category?.name || 'Specialist'}
                      </span>
                      <div className="flex items-center gap-1 text-xs text-slate-200 font-medium bg-slate-950/60 px-2 py-0.5 rounded-md backdrop-blur-sm">
                        <MapPin className="w-3 h-3 text-amber-400" />
                        <span>{vendor.city}</span>
                      </div>
                    </div>
                  </div>

                  {/* Card Details */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Name & Rating */}
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <Link
                          href={`/vendor/${vendor.slug}`}
                          className="font-extrabold text-base sm:text-lg text-slate-900 group-hover:text-brand-blue-800 transition-colors line-clamp-1"
                        >
                          {vendor.businessName}
                        </Link>
                        
                        <div className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-50 text-amber-900 font-extrabold text-xs flex-shrink-0">
                          <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                          <span>{vendor.rating > 0 ? vendor.rating.toFixed(1) : '4.9'}</span>
                        </div>
                      </div>

                      {/* Short Description */}
                      <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-4">
                        {vendor.description ||
                          `Trusted professional event vendor offering premium services for celebrations in ${vendor.city}.`}
                      </p>
                    </div>

                    {/* Bottom Pricing & CTA */}
                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                      <div>
                        <span className="text-[10px] text-slate-400 font-bold uppercase block tracking-wider">
                          Starting price
                        </span>
                        <span className="text-base font-black text-brand-blue-900">
                          {formatPrice(vendor.startingPrice)}
                        </span>
                      </div>

                      <Link
                        href={`/vendor/${vendor.slug}`}
                        className="px-5 py-2.5 rounded-xl bg-brand-blue-800 hover:bg-brand-blue-900 text-white font-bold text-xs shadow-sm hover:shadow transition-all flex items-center gap-1"
                      >
                        <span>View Vendor</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 6. FINAL CTA SECTION — ONE ELEGANT SECTION */}
      <section className="py-12 sm:py-16 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl bg-gradient-to-r from-[#06153B] via-[#0A2560] to-[#0B3B95] text-white p-8 sm:p-14 overflow-hidden shadow-2xl border border-white/10 text-center">
            
            {/* Ambient Gold Halo */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-brand-gold-500/10 blur-[100px] pointer-events-none" />

            <div className="relative z-10 max-w-2xl mx-auto space-y-4">
              <span className="text-xs font-extrabold text-amber-300 uppercase tracking-widest inline-block">
                ✦ Start Planning Today
              </span>

              <h2 className="text-2xl sm:text-4xl font-black tracking-tight leading-snug">
                Your Event Deserves the Right Vendors.
              </h2>

              <p className="text-sm sm:text-base text-slate-300 max-w-lg mx-auto">
                Find the professionals who can make it unforgettable.
              </p>

              <div className="pt-4 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
                <Link
                  href="/vendors"
                  className="px-8 py-3.5 rounded-full bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-slate-950 font-black text-sm tracking-wide shadow-lg shadow-amber-500/25 flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  <span>Find Vendors</span>
                  <ArrowRight className="w-4 h-4 stroke-[2.5px]" />
                </Link>

                <Link
                  href="/vendor/register"
                  className="px-8 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-sm border border-white/20 hover:border-white/40 backdrop-blur-md transition-all flex items-center justify-center hover:scale-[1.02] active:scale-[0.98]"
                >
                  <span>Join VentZivo</span>
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
