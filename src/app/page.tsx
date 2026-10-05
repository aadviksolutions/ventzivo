import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { prisma } from '@/lib/prisma';
import SmartSearchConsole from '@/components/home/SmartSearchConsole';
import EventWorldsCarousel from '@/components/home/EventWorldsCarousel';
import CategoryHoverShowcase from '@/components/home/CategoryHoverShowcase';
import VideoModalTrigger from '@/components/home/VideoModalTrigger';
import {
  Sparkles,
  ShieldCheck,
  Star,
  MapPin,
  ArrowRight,
  Heart,
  Calendar,
  Search,
  CheckCircle2,
  Users,
  Building,
  Award,
} from 'lucide-react';
import { formatPrice } from '@/lib/utils';

export const revalidate = 0; // Fresh database updates

export default async function HomePage() {
  const fallbackFeatured = [
    {
      id: 'fb-1',
      businessName: 'Dream Decor Events',
      slug: 'dream-decor-events',
      category: { name: 'Event Decoration' },
      city: 'Raipur',
      rating: 4.9,
      reviewCount: 128,
      startingPrice: 50000,
      isVerified: true,
      description: 'Luxury theme decorations, royal mandaps, corporate stages, and ambient fairy-light production.',
      coverImage: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'fb-2',
      businessName: 'Gulab Catering Services',
      slug: 'gulab-catering-services',
      category: { name: 'Catering Services' },
      city: 'Raipur',
      rating: 4.8,
      reviewCount: 96,
      startingPrice: 400,
      isVerified: true,
      description: 'Gourmet Indian, Mughlai, Continental, and specialized live counters for all celebrations.',
      coverImage: 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'fb-3',
      businessName: 'Studio Royale Cinema',
      slug: 'studio-royale-cinema',
      category: { name: 'Photography & Videography' },
      city: 'Raipur',
      rating: 4.9,
      reviewCount: 78,
      startingPrice: 25000,
      isVerified: true,
      description: 'Candid wedding photography, cinematic 4K videography, drone coverage, and pre-wedding shoots.',
      coverImage: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=800&q=80',
    },
  ];

  let eventTypes: any[] = [];
  let locations: any[] = [];
  let featuredVendors: any[] = [];
  let totalVendorsCount = 10000;
  let totalCitiesCount = 50;

  try {
    eventTypes = await prisma.eventType.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: 'asc' },
      take: 15,
    });

    locations = await prisma.location.findMany({
      where: { isPopular: true },
      orderBy: { sortOrder: 'asc' },
    });

    const dbVendors = await prisma.vendor.findMany({
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

    featuredVendors = dbVendors;
    if (featuredVendors.length < 3) {
      const additional = await prisma.vendor.findMany({
        where: {
          status: { in: ['APPROVED', 'VERIFIED'] },
          id: { notIn: dbVendors.map((v) => v.id) },
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

    const count = await prisma.vendor.count({ where: { status: { in: ['APPROVED', 'VERIFIED'] } } });
    if (count > 0) totalVendorsCount = count;
  } catch (err) {
    console.warn('Database query fallback triggered:', err);
  }

  if (!featuredVendors || featuredVendors.length === 0) {
    featuredVendors = fallbackFeatured;
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#FDFBF7]">
      
      {/* SECTION 2 — CINEMATIC HERO */}
      <section className="relative bg-[#06153B] text-white pt-10 sm:pt-16 pb-28 sm:pb-36 overflow-hidden">
        
        {/* Subtle Ambient Brand Glows */}
        <div className="absolute top-0 right-1/4 -mt-20 w-[500px] h-[500px] rounded-full bg-amber-500/10 blur-[130px] pointer-events-none" />
        <div className="absolute bottom-10 left-10 -ml-20 w-[450px] h-[450px] rounded-full bg-brand-blue-600/20 blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            
            {/* Left Hero Content */}
            <div className="lg:col-span-7 text-left space-y-6">
              
              {/* Eyebrow */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-400/10 border border-amber-400/25 backdrop-blur-md">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span className="text-[11px] font-black uppercase tracking-[0.2em] text-amber-300">
                  The Event Vendor Marketplace
                </span>
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.08] text-white">
                Plan Any Event.<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-200 to-amber-400">
                  Find Every Vendor.
                </span>
              </h1>

              {/* Supporting Text */}
              <p className="text-base sm:text-lg text-slate-300 font-normal max-w-xl leading-relaxed">
                From intimate celebrations to grand corporate events — discover trusted vendors, compare options and create unforgettable experiences with VentZivo.
              </p>

              {/* CTAs */}
              <div className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4">
                <Link
                  href="/vendors"
                  className="px-8 py-3.5 rounded-full bg-gradient-to-r from-amber-400 via-amber-500 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-sm tracking-wide shadow-xl shadow-amber-500/25 flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all"
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

              {/* Hero Dynamic Trust Indicators */}
              <div className="pt-6 border-t border-white/10 flex flex-wrap items-center gap-6 sm:gap-10 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-400/30">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-extrabold text-white">Verified Vendors</p>
                    <p className="text-[10px] text-slate-400">100% Admin Screened</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-400/30">
                    <Star className="w-4 h-4 fill-amber-400" />
                  </div>
                  <div>
                    <p className="font-extrabold text-white">4.9 Average</p>
                    <p className="text-[10px] text-slate-400">Rating Across Categories</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center border border-blue-400/30">
                    <Users className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-extrabold text-white">10K+ Services</p>
                    <p className="text-[10px] text-slate-400">Across 30+ Event Types</p>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Hero Cinematic Multi-Event Visual */}
            <div className="lg:col-span-5 relative mt-4 lg:mt-0">
              
              {/* Image Frame with Golden Curves */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-slate-950/80 border border-amber-400/30 aspect-[4/3] group bg-slate-950">
                <img
                  src="/hero-multievent-cinematic.jpg"
                  alt="VentZivo - One Platform. Every Event. Every Vendor."
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                
                {/* Gradient Vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent pointer-events-none" />

                {/* Script Accent: "Every Event Tells a Story" */}
                <div className="absolute top-4 right-4 z-20 text-right pointer-events-none">
                  <span className="font-serif italic text-amber-300 text-lg sm:text-xl drop-shadow-md">
                    Every Event Tells a Story
                  </span>
                </div>

                {/* Interactive "Watch Video" Teaser Trigger */}
                <div className="absolute bottom-4 right-4 z-20">
                  <VideoModalTrigger />
                </div>

                {/* Subtle Floating Verified Pill */}
                <div className="absolute bottom-4 left-4 z-20 px-3.5 py-1.5 rounded-2xl bg-slate-950/80 backdrop-blur-md border border-white/20 shadow-lg flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                  <span className="text-[11px] font-bold text-slate-200">
                    All-Event Marketplace
                  </span>
                </div>

              </div>

            </div>

          </div>
        </div>
      </section>

      {/* SECTION 4 — SMART SEARCH CONSOLE (Overlapping Hero) */}
      <div className="-mt-16 sm:-mt-20 relative z-30 mb-8 sm:mb-14">
        <SmartSearchConsole
          eventTypes={eventTypes.map((e) => e.name)}
          locations={locations.map((l) => l.city)}
        />
      </div>

      {/* SECTION 3 — EVENT DISCOVERY: "EVENT WORLDS" CAROUSEL */}
      <EventWorldsCarousel />

      {/* SECTION 5 — FEATURED VENDORS ("Trusted by Thousands") */}
      <section className="py-14 sm:py-20 bg-[#FDFBF7] border-t border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <span className="text-xs font-black text-brand-gold-600 uppercase tracking-widest block mb-1">
                ✦ FEATURED VENDORS
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                Trusted by Thousands
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Discover top-rated professionals for your next event.
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

          {/* Cards Grid: Desktop 3 columns / Mobile horizontal scroll */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {featuredVendors.map((vendor) => {
              const fallbackCover =
                'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=800&q=80';

              return (
                <div
                  key={vendor.id}
                  className="group bg-slate-950 text-white rounded-3xl overflow-hidden border border-white/10 shadow-lg hover:shadow-2xl hover:border-amber-400/60 transition-all duration-500 hover:-translate-y-1.5 flex flex-col"
                >
                  {/* Card Cover Image */}
                  <div className="relative h-60 w-full overflow-hidden bg-slate-900">
                    <img
                      src={vendor.coverImage || fallbackCover}
                      alt={vendor.businessName}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-black/30" />

                    {/* Top-Left Verified Badge */}
                    {vendor.isVerified && (
                      <div className="absolute top-3.5 left-3.5 z-10 px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-white/20 text-white flex items-center gap-1 text-[11px] font-bold">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Verified</span>
                      </div>
                    )}

                    {/* Top-Right Heart Favourite Icon */}
                    <div className="absolute top-3.5 right-3.5 z-10">
                      <Link
                        href="/shortlist"
                        className="p-2 rounded-full bg-slate-950/70 hover:bg-slate-950 text-slate-300 hover:text-rose-400 backdrop-blur-md border border-white/20 flex items-center justify-center transition-colors"
                        aria-label="Add to shortlist"
                      >
                        <Heart className="w-4 h-4" />
                      </Link>
                    </div>

                    {/* Rating Pill bottom overlay */}
                    <div className="absolute bottom-3 left-3.5 z-10 flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-950/80 backdrop-blur-md border border-white/20 text-xs font-black text-amber-300">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span>{vendor.rating > 0 ? vendor.rating.toFixed(1) : '4.9'}</span>
                      <span className="text-[10px] text-slate-400 font-normal">
                        ({vendor.reviewCount || 100})
                      </span>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <Link
                        href={`/vendor/${vendor.slug}`}
                        className="font-black text-lg sm:text-xl text-white group-hover:text-amber-300 transition-colors line-clamp-1 block"
                      >
                        {vendor.businessName}
                      </Link>

                      <div className="mt-1 flex items-center justify-between text-xs text-slate-400">
                        <span className="font-semibold text-amber-400/90 uppercase tracking-wide text-[11px]">
                          {vendor.category?.name || 'Curated Specialist'}
                        </span>
                        <div className="flex items-center gap-1 text-slate-400">
                          <MapPin className="w-3 h-3 text-slate-500" />
                          <span>{vendor.city}</span>
                        </div>
                      </div>
                    </div>

                    {/* Pricing & Arrow CTA Button */}
                    <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                          Starting Price
                        </span>
                        <span className="text-base font-black text-amber-400">
                          {vendor.startingPrice < 1000
                            ? `From ₹${vendor.startingPrice} per plate`
                            : `From ${formatPrice(vendor.startingPrice)}`}
                        </span>
                      </div>

                      <Link
                        href={`/vendor/${vendor.slug}`}
                        className="w-10 h-10 rounded-full bg-amber-400 hover:bg-amber-300 text-slate-950 flex items-center justify-center transition-all group-hover:scale-105 shadow-md shadow-amber-400/20"
                        aria-label={`View ${vendor.businessName} profile`}
                      >
                        <ArrowRight className="w-4 h-4 stroke-[2.5px]" />
                      </Link>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* SECTION 6 — CATEGORY DISCOVERY ("Find What You Need") */}
      <CategoryHoverShowcase />

      {/* SECTION 7 — HOW VENTZIVO WORKS */}
      <section className="py-14 sm:py-20 bg-[#06153B] text-white border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-black text-amber-400 uppercase tracking-widest block mb-1">
              ✦ HOW VENTZIVO WORKS
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Simple Steps to Your Perfect Event.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            
            {/* Step 1 */}
            <div className="p-8 rounded-3xl bg-white/5 border border-white/10 relative flex flex-col items-center text-center group hover:bg-white/10 transition-all">
              <div className="w-14 h-14 rounded-2xl bg-amber-400 text-slate-950 font-black text-xl flex items-center justify-center mb-6 shadow-lg shadow-amber-400/20 group-hover:scale-110 transition-transform">
                01
              </div>
              <h3 className="text-lg font-black text-white mb-2">Choose Your Event</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Tell us what you're planning — from weddings and birthdays to exhibitions, summits and concerts.
              </p>
            </div>

            {/* Step 2 */}
            <div className="p-8 rounded-3xl bg-white/5 border border-white/10 relative flex flex-col items-center text-center group hover:bg-white/10 transition-all">
              <div className="w-14 h-14 rounded-2xl bg-brand-blue-500 text-white font-black text-xl flex items-center justify-center mb-6 shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform">
                02
              </div>
              <h3 className="text-lg font-black text-white mb-2">Discover Vendors</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Explore, compare verified portfolios, reviews, track records and transparent starting prices.
              </p>
            </div>

            {/* Step 3 */}
            <div className="p-8 rounded-3xl bg-white/5 border border-white/10 relative flex flex-col items-center text-center group hover:bg-white/10 transition-all">
              <div className="w-14 h-14 rounded-2xl bg-emerald-500 text-white font-black text-xl flex items-center justify-center mb-6 shadow-lg shadow-emerald-500/20 group-hover:scale-110 transition-transform">
                03
              </div>
              <h3 className="text-lg font-black text-white mb-2">Connect & Celebrate</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Send direct enquiries, chat over WhatsApp, get custom quotes, and finalize bookings with 0% middleman fees.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* SECTION 8 — FINAL PREMIUM CTA BANNER */}
      <section className="relative py-16 sm:py-24 bg-slate-950 text-white overflow-hidden">
        
        {/* Background Image: Banquet Under Evening Fairy Lights */}
        <div className="absolute inset-0 z-0">
          <img
            src="/cta-banquet-evening.jpg"
            alt="VentZivo Luxury Banquet Dinner"
            className="w-full h-full object-cover opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-slate-950/60" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          
          {/* Dynamic Statistics Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 max-w-4xl mx-auto">
            <div className="p-4 rounded-2xl bg-slate-950/60 backdrop-blur-md border border-white/10">
              <p className="text-2xl sm:text-3xl font-black text-amber-400">{totalVendorsCount.toLocaleString()}+</p>
              <p className="text-xs font-semibold text-slate-300 uppercase tracking-wider mt-1">Vendors</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-950/60 backdrop-blur-md border border-white/10">
              <p className="text-2xl sm:text-3xl font-black text-white">{totalCitiesCount}+</p>
              <p className="text-xs font-semibold text-slate-300 uppercase tracking-wider mt-1">Cities</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-950/60 backdrop-blur-md border border-white/10">
              <p className="text-2xl sm:text-3xl font-black text-amber-400">1,00,000+</p>
              <p className="text-xs font-semibold text-slate-300 uppercase tracking-wider mt-1">Happy Clients</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-950/60 backdrop-blur-md border border-white/10">
              <p className="text-2xl sm:text-3xl font-black text-white">Unlimited</p>
              <p className="text-xs font-semibold text-slate-300 uppercase tracking-wider mt-1">Possibilities</p>
            </div>
          </div>

          <div className="max-w-2xl mx-auto space-y-4">
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              Your Event Deserves the Right People.
            </h2>
            <p className="text-sm sm:text-base text-slate-300">
              Find trusted vendors and create unforgettable experiences with VentZivo.
            </p>

            <div className="pt-6 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/vendors"
                className="px-8 py-3.5 rounded-full bg-gradient-to-r from-amber-400 via-amber-500 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-sm tracking-wide shadow-2xl shadow-amber-500/30 flex items-center justify-center gap-2 hover:scale-105 active:scale-95 transition-all"
              >
                <span>Find Vendors</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5px]" />
              </Link>

              <Link
                href="/vendor/register"
                className="px-8 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-sm border border-white/30 backdrop-blur-md transition-all hover:scale-105 active:scale-95"
              >
                <span>Join as a Vendor</span>
              </Link>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
