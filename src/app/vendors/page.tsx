'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import VendorCard, { VendorCardData } from '@/components/cards/VendorCard';
import {
  Search,
  Filter,
  X,
  Star,
  ShieldCheck,
  MapPin,
  ChevronDown,
  RotateCcw,
  SlidersHorizontal,
} from 'lucide-react';

function VendorsSearchContent() {
  const searchParams = useSearchParams();

  // Search and Filter States
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [eventType, setEventType] = useState(searchParams.get('eventType') || '');
  const [category, setCategory] = useState(searchParams.get('category') || '');
  const [subCategory, setSubCategory] = useState(searchParams.get('subCategory') || '');
  const [city, setCity] = useState(searchParams.get('city') || '');
  const [maxPrice, setMaxPrice] = useState(searchParams.get('maxPrice') || '');
  const [minRating, setMinRating] = useState(searchParams.get('minRating') || '');
  const [experience, setExperience] = useState(searchParams.get('experience') || '');
  const [verifiedOnly, setVerifiedOnly] = useState(searchParams.get('verified') === 'true');
  const [sort, setSort] = useState(searchParams.get('sort') || 'recommended');

  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [vendors, setVendors] = useState<VendorCardData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [allCategories, setAllCategories] = useState<any[]>([]);
  const [allEventTypes, setAllEventTypes] = useState<any[]>([]);

  // Load Metadata (Categories & Event Types)
  useEffect(() => {
    fetch('/api/categories')
      .then((res) => res.json())
      .then((data) => {
        if (data.categories) setAllCategories(data.categories);
      })
      .catch((e) => console.error(e));

    fetch('/api/event-types')
      .then((res) => res.json())
      .then((data) => {
        if (data.eventTypes) setAllEventTypes(data.eventTypes);
      })
      .catch((e) => console.error(e));
  }, []);

  // Fetch Vendors whenever filters or sort change
  useEffect(() => {
    const fetchVendors = async () => {
      setIsLoading(true);
      try {
        const params = new URLSearchParams();
        if (search) params.set('search', search);
        if (eventType) params.set('eventType', eventType);
        if (category) params.set('category', category);
        if (subCategory) params.set('subCategory', subCategory);
        if (city && city !== 'All') params.set('city', city);
        if (maxPrice) params.set('maxPrice', maxPrice);
        if (minRating) params.set('minRating', minRating);
        if (experience) params.set('experience', experience);
        if (verifiedOnly) params.set('verified', 'true');
        if (sort) params.set('sort', sort);

        const res = await fetch(`/api/vendors?${params.toString()}`);
        const data = await res.json();
        if (data.vendors) {
          setVendors(data.vendors);
        }
      } catch (err) {
        console.error('Error fetching vendors:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchVendors();
  }, [
    search,
    eventType,
    category,
    subCategory,
    city,
    maxPrice,
    minRating,
    experience,
    verifiedOnly,
    sort,
  ]);

  const clearAllFilters = () => {
    setSearch('');
    setEventType('');
    setCategory('');
    setSubCategory('');
    setCity('');
    setMaxPrice('');
    setMinRating('');
    setExperience('');
    setVerifiedOnly(false);
    setSort('recommended');
  };

  const citiesList = [
    'Raipur',
    'Bilaspur',
    'Bhilai',
    'Delhi NCR',
    'Mumbai',
    'Jaipur',
    'Bengaluru',
    'Hyderabad',
  ];

  return (
    <div className="bg-slate-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header & Search Bar */}
        <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-sm mb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-brand-gold-600 uppercase tracking-wider">
                VentZivo Event Marketplace
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                Discover Verified Event Vendors
              </h1>
            </div>

            {/* Quick Live Search Input */}
            <div className="relative w-full md:w-96">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                placeholder="Search vendor name, service, or keyword..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue-500 font-medium"
              />
              {search && (
                <button
                  onClick={() => setSearch('')}
                  className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Active Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 mt-4 pt-4 border-t border-slate-100 text-xs">
            <span className="text-slate-400 font-semibold">Active:</span>
            {eventType && (
              <span className="px-2.5 py-1 rounded-lg bg-amber-50 text-amber-800 border border-amber-200 flex items-center gap-1 font-semibold">
                Event: {eventType}
                <button onClick={() => setEventType('')}>
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {category && (
              <span className="px-2.5 py-1 rounded-lg bg-blue-50 text-blue-800 border border-blue-200 flex items-center gap-1 font-semibold">
                Category: {category}
                <button onClick={() => setCategory('')}>
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {city && (
              <span className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center gap-1 font-semibold">
                City: {city}
                <button onClick={() => setCity('')}>
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {verifiedOnly && (
              <span className="px-2.5 py-1 rounded-lg bg-emerald-100 text-emerald-900 border border-emerald-300 flex items-center gap-1 font-bold">
                ✓ Verified Only
                <button onClick={() => setVerifiedOnly(false)}>
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {(eventType || category || city || verifiedOnly || search || maxPrice || minRating) && (
              <button
                onClick={clearAllFilters}
                className="text-rose-600 hover:text-rose-700 font-bold ml-auto flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" />
                Clear All
              </button>
            )}
          </div>
        </div>

        {/* Results Bar & Mobile Filter Toggle */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileFilterOpen(true)}
              className="lg:hidden px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-800 font-bold text-xs flex items-center gap-2 shadow-sm"
            >
              <SlidersHorizontal className="w-4 h-4 text-brand-blue-800" />
              <span>Filters</span>
            </button>
            <p className="text-sm font-semibold text-slate-700">
              Showing <span className="font-extrabold text-brand-blue-800">{vendors.length}</span>{' '}
              verified vendors
            </p>
          </div>

          {/* Sort By Dropdown */}
          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-500 font-medium hidden sm:inline">Sort By:</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-blue-500 shadow-sm cursor-pointer"
            >
              <option value="recommended">Recommended & Featured</option>
              <option value="rating">Rating (Highest First)</option>
              <option value="price_low">Price: Low to High</option>
              <option value="price_high">Price: High to Low</option>
              <option value="experience">Experience (Years)</option>
              <option value="popular">Most Popular (Views)</option>
            </select>
          </div>
        </div>

        {/* Main Content Layout: Sidebar + Vendor Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Desktop Left Filter Sidebar */}
          <aside className="hidden lg:block lg:col-span-1 space-y-6">
            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-6 sticky top-24">
              
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="font-extrabold text-slate-900 text-base flex items-center gap-2">
                  <Filter className="w-4 h-4 text-brand-blue-800" />
                  <span>Filters</span>
                </h3>
                <button
                  onClick={clearAllFilters}
                  className="text-xs font-bold text-rose-600 hover:text-rose-700"
                >
                  Reset
                </button>
              </div>

              {/* Verified Vendors Only Toggle */}
              <div className="flex items-center justify-between p-3 rounded-2xl bg-emerald-50/70 border border-emerald-200">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span className="text-xs font-bold text-emerald-900">Verified Vendors Only</span>
                </div>
                <input
                  type="checkbox"
                  checked={verifiedOnly}
                  onChange={(e) => setVerifiedOnly(e.target.checked)}
                  className="w-4 h-4 accent-emerald-600 rounded cursor-pointer"
                />
              </div>

              {/* Event Type Filter */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  Event Type
                </label>
                <select
                  value={eventType}
                  onChange={(e) => setEventType(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none cursor-pointer"
                >
                  <option value="">All Event Types</option>
                  {allEventTypes.map((et) => (
                    <option key={et.id} value={et.slug}>
                      {et.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Category Filter */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none cursor-pointer"
                >
                  <option value="">All Categories</option>
                  {allCategories.map((c) => (
                    <option key={c.id} value={c.slug}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Location / City Filter */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  City / Location
                </label>
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none cursor-pointer"
                >
                  <option value="">All Cities</option>
                  {citiesList.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              {/* Minimum Rating */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  Rating
                </label>
                <div className="space-y-1.5 text-xs">
                  {[
                    { label: '4.5 & Above (Exceptional)', val: '4.5' },
                    { label: '4.0 & Above (Very Good)', val: '4.0' },
                    { label: '3.5 & Above (Good)', val: '3.5' },
                  ].map((r) => (
                    <label
                      key={r.val}
                      className="flex items-center gap-2 cursor-pointer hover:text-brand-blue-800"
                    >
                      <input
                        type="radio"
                        name="rating"
                        checked={minRating === r.val}
                        onChange={() => setMinRating(minRating === r.val ? '' : r.val)}
                        className="accent-amber-500"
                      />
                      <span className="flex items-center gap-1 font-medium">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        {r.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Max Budget / Starting Price */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  Max Starting Price (₹)
                </label>
                <input
                  type="number"
                  placeholder="e.g. 50000"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none"
                />
              </div>

              {/* Minimum Experience */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  Min Experience
                </label>
                <select
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none cursor-pointer"
                >
                  <option value="">Any Experience</option>
                  <option value="3">3+ Years</option>
                  <option value="5">5+ Years</option>
                  <option value="10">10+ Years</option>
                </select>
              </div>

            </div>
          </aside>

          {/* Vendors Grid */}
          <main className="lg:col-span-3">
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="h-80 rounded-2xl bg-white border border-slate-200 p-4 animate-pulse flex flex-col justify-between"
                  >
                    <div className="h-44 bg-slate-200 rounded-xl mb-3" />
                    <div className="h-4 bg-slate-200 rounded w-3/4 mb-2" />
                    <div className="h-4 bg-slate-200 rounded w-1/2" />
                  </div>
                ))}
              </div>
            ) : vendors.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {vendors.map((vendor) => (
                  <VendorCard key={vendor.id} vendor={vendor} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-sm max-w-lg mx-auto">
                <div className="w-16 h-16 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">No Matching Vendors Found</h3>
                <p className="text-xs sm:text-sm text-slate-500 mb-6 leading-relaxed">
                  Try adjusting your event type, city, or price filters to see more results across India.
                </p>
                <button
                  onClick={clearAllFilters}
                  className="px-6 py-2.5 rounded-xl bg-brand-blue-800 text-white font-bold text-sm hover:bg-brand-blue-900 transition-colors shadow"
                >
                  Reset All Filters
                </button>
              </div>
            )}
          </main>

        </div>

      </div>

      {/* Mobile Filter Drawer */}
      {mobileFilterOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white w-4/5 max-w-sm h-full p-6 overflow-y-auto ml-auto flex flex-col justify-between shadow-2xl">
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="font-extrabold text-slate-900 text-base">Filter Vendors</h3>
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="p-1 rounded-full text-slate-500 hover:bg-slate-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 mb-1.5">
                  Event Type
                </label>
                <select
                  value={eventType}
                  onChange={(e) => setEventType(e.target.value)}
                  className="w-full px-3 py-2 border rounded-xl text-xs font-semibold"
                >
                  <option value="">All Event Types</option>
                  {allEventTypes.map((et) => (
                    <option key={et.id} value={et.slug}>
                      {et.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 mb-1.5">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3 py-2 border rounded-xl text-xs font-semibold"
                >
                  <option value="">All Categories</option>
                  {allCategories.map((c) => (
                    <option key={c.id} value={c.slug}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 mb-1.5">
                  City
                </label>
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full px-3 py-2 border rounded-xl text-xs font-semibold"
                >
                  <option value="">All Cities</option>
                  {citiesList.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-50">
                <span className="text-xs font-bold text-emerald-900">Verified Vendors Only</span>
                <input
                  type="checkbox"
                  checked={verifiedOnly}
                  onChange={(e) => setVerifiedOnly(e.target.checked)}
                  className="w-4 h-4 accent-emerald-600"
                />
              </div>
            </div>

            <div className="pt-6 border-t border-slate-100 flex gap-2">
              <button
                onClick={() => {
                  clearAllFilters();
                  setMobileFilterOpen(false);
                }}
                className="w-1/2 py-2.5 rounded-xl border border-slate-300 font-bold text-xs"
              >
                Reset
              </button>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="w-1/2 py-2.5 rounded-xl bg-brand-blue-800 text-white font-bold text-xs shadow"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default function VendorsSearchPage() {
  return (
    <React.Suspense
      fallback={
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-8">
          <div className="w-8 h-8 rounded-full border-4 border-brand-blue-800 border-t-transparent animate-spin" />
        </div>
      }
    >
      <VendorsSearchContent />
    </React.Suspense>
  );
}
