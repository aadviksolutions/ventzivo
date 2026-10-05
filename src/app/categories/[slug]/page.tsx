import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { FALLBACK_CATEGORIES, FALLBACK_VENDORS } from '@/lib/mockData';
import VendorCard, { VendorCardData } from '@/components/cards/VendorCard';
import { Building, Filter, Sparkles, MapPin, ArrowRight } from 'lucide-react';

export const revalidate = 0;

export default async function CategoryDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;

  let category: any = null;
  let relevantVendors: any[] = [];

  try {
    category = await prisma.category.findUnique({
      where: { slug },
      include: {
        subCategories: {
          where: { isActive: true },
          orderBy: { sortOrder: 'asc' },
        },
        vendors: {
          where: { status: { in: ['APPROVED', 'VERIFIED'] } },
          include: {
            category: true,
            subCategory: true,
            eventTypes: { include: { eventType: true } },
          },
        },
      },
    });

    if (category && category.vendors) {
      relevantVendors = category.vendors;
    }
  } catch (err) {
    console.warn('Prisma category detail lookup failed, serving fallback:', err);
  }

  // Fallback if not found in DB
  if (!category) {
    category = FALLBACK_CATEGORIES.find((c) => c.slug === slug || c.id === slug);
  }

  if (!category) {
    category = FALLBACK_CATEGORIES.find((c) => c.name.toLowerCase().includes(slug.toLowerCase()));
  }

  if (!category) {
    notFound();
  }

  // If DB returned 0 vendors, grab from fallback matching this category
  if (relevantVendors.length === 0) {
    relevantVendors = FALLBACK_VENDORS.filter(
      (v) => v.category?.slug === slug || v.category?.name.toLowerCase().includes(category.name.toLowerCase())
    );
  }

  // Format vendor cards
  const formattedVendors: VendorCardData[] = relevantVendors.map((v: any) => ({
    id: v.id,
    name: v.businessName || v.name,
    slug: v.slug,
    category: v.category?.name || category.name,
    categorySlug: v.category?.slug || category.slug,
    subCategory: v.subCategory?.name,
    city: v.city || 'Raipur',
    rating: v.rating || 4.9,
    reviewCount: v.reviewCount || 12,
    startingPrice: v.startingPrice || 25000,
    isVerified: v.isVerified ?? true,
    isFeatured: v.isFeatured ?? true,
    coverImage: v.coverImage || 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=800&q=80',
    logo: v.logo || '/ventzivo-logo.jpg',
    description: v.description,
    eventTypes: v.eventTypes ? v.eventTypes.map((et: any) => et.eventType?.name || et) : ['All Events'],
  }));

  const subCategories = category.subCategories || [];

  return (
    <div className="bg-slate-50 min-h-screen pb-16">
      
      {/* 1. HERO BANNER */}
      <section className="relative bg-[#06153B] text-white pt-10 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#06153B] via-[#0A2560] to-[#06153B]" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-slate-300 font-medium">
            <Link href="/" className="hover:text-amber-400 transition-colors">Home</Link>
            <span>/</span>
            <Link href="/categories" className="hover:text-amber-400 transition-colors">Categories</Link>
            <span>/</span>
            <span className="text-amber-400 font-bold">{category.name}</span>
          </div>

          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-bold tracking-wider uppercase">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Service Category Directory</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight font-editorial leading-tight">
              {category.name}
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
              {category.description || 'Discover and hire verified service professionals for your event.'}
            </p>
          </div>

          {/* Quick Stats */}
          <div className="flex flex-wrap items-center gap-4 pt-2 text-xs">
            <div className="px-4 py-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 flex items-center gap-2">
              <Building className="w-4 h-4 text-amber-400" />
              <span className="font-bold text-white">{formattedVendors.length} Verified Vendors</span>
            </div>
            <div className="px-4 py-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-emerald-400" />
              <span className="font-bold text-white">Direct Quotation & Contact</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SUBCATEGORIES FILTER PILLS */}
      {subCategories.length > 0 && (
        <section className="bg-white border-b border-slate-200/80 sticky top-16 z-20 shadow-xs">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center gap-3 overflow-x-auto no-scrollbar">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex-shrink-0 flex items-center gap-1.5 mr-1">
              <Filter className="w-3.5 h-3.5 text-slate-500" />
              Sub-Services:
            </span>
            <Link
              href={`/vendors?category=${encodeURIComponent(category.slug)}`}
              className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-brand-blue-800 text-white flex-shrink-0 shadow-sm"
            >
              All {category.name}
            </Link>
            {subCategories.map((sub: any) => (
              <Link
                key={sub.id}
                href={`/vendors?category=${encodeURIComponent(category.slug)}&subCategory=${encodeURIComponent(sub.slug)}`}
                className="px-3.5 py-1.5 rounded-full text-xs font-medium bg-slate-100 hover:bg-amber-100 hover:text-amber-900 text-slate-700 flex-shrink-0 border border-slate-200/60 transition-colors"
              >
                {sub.name}
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* 3. VENDOR RESULTS */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl font-black text-slate-900 font-editorial">
              Top {category.name} Specialists
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Compare ratings, starting prices, portfolios, and send direct enquiries
            </p>
          </div>
          
          <Link
            href={`/vendors?category=${encodeURIComponent(category.slug)}`}
            className="text-xs font-bold text-brand-blue-800 hover:text-amber-600 flex items-center gap-1 transition-colors"
          >
            <span>Filter by Price, Rating & City →</span>
          </Link>
        </div>

        {/* Vendors Grid or Empty State */}
        {formattedVendors.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {formattedVendors.map((vendor) => (
              <VendorCard key={vendor.id} vendor={vendor} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-sm max-w-xl mx-auto space-y-4">
            <div className="w-16 h-16 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center mx-auto">
              <Building className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">No vendors found in this category yet</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Try exploring other categories or submit your event request and our vendor team will connect with you.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row justify-center gap-3">
              <Link
                href="/vendors"
                className="px-6 py-2.5 rounded-xl bg-brand-blue-800 hover:bg-brand-blue-900 text-white font-bold text-xs shadow-md transition-colors"
              >
                Explore All Vendors
              </Link>
              <Link
                href="/categories"
                className="px-6 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition-colors"
              >
                Browse All Categories
              </Link>
            </div>
          </div>
        )}
      </main>

    </div>
  );
}
