'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Calendar,
  Search,
  MapPin,
  Sparkles,
  ChevronDown,
  ArrowRight,
} from 'lucide-react';

interface SmartSearchConsoleProps {
  eventTypes: string[];
  locations: string[];
}

export default function SmartSearchConsole({
  eventTypes,
  locations,
}: SmartSearchConsoleProps) {
  const router = useRouter();

  const [eventType, setEventType] = useState('');
  const [query, setQuery] = useState('');
  const [city, setCity] = useState('');
  const [eventDate, setEventDate] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (eventType && eventType !== 'All Events') params.set('eventType', eventType);
    if (query.trim()) params.set('search', query.trim());
    if (city && city !== 'All Cities') params.set('city', city);
    if (eventDate) params.set('date', eventDate);

    router.push(`/vendors?${params.toString()}`);
  };

  const popularTags = [
    { label: 'Wedding', param: 'eventType=wedding' },
    { label: 'Corporate Event', param: 'eventType=corporate-event' },
    { label: 'Birthday Party', param: 'eventType=birthday' },
    { label: 'Exhibition', param: 'eventType=exhibition' },
    { label: 'DJ & Sound', param: 'search=DJ' },
    { label: 'Catering', param: 'search=Catering' },
    { label: 'Photographer', param: 'search=Photographer' },
    { label: 'Event Planner', param: 'search=Planner' },
  ];

  const defaultEventList = [
    'Wedding',
    'Corporate Event',
    'Birthday',
    'Exhibition',
    'Concert & Live Show',
    'Engagement',
    'Private Party',
    'Religious Event',
    'Conference',
    'Fashion Show',
  ];

  const defaultCities = [
    'Raipur',
    'Bilaspur',
    'Bhilai',
    'Delhi NCR',
    'Mumbai',
    'Bengaluru',
    'Jaipur',
    'Hyderabad',
  ];

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6">
      
      {/* Console Outer Card */}
      <div className="relative rounded-3xl bg-[#06153B]/90 backdrop-blur-2xl border border-white/20 p-4 sm:p-5 shadow-2xl shadow-slate-950/50">
        
        {/* Subtle Ambient Gold Line Top */}
        <div className="absolute inset-x-8 -top-px h-px bg-gradient-to-r from-transparent via-amber-400/60 to-transparent" />

        <form onSubmit={handleSearch}>
          {/* Desktop Single Row / Mobile Stacked Fields */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-2 sm:gap-3 items-center">
            
            {/* Field 1: What are you planning? */}
            <div className="md:col-span-3 bg-white/10 hover:bg-white/15 border border-white/15 focus-within:border-amber-400/80 rounded-2xl p-3 transition-all group">
              <label className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-amber-300 mb-1">
                <Calendar className="w-3.5 h-3.5 text-amber-400" />
                <span>What are you planning?</span>
              </label>
              <div className="relative">
                <select
                  value={eventType}
                  onChange={(e) => setEventType(e.target.value)}
                  className="w-full bg-transparent text-sm font-semibold text-white focus:outline-none appearance-none cursor-pointer pr-6 truncate"
                >
                  <option value="" className="text-slate-900 bg-white">
                    Select event type
                  </option>
                  {(eventTypes.length > 0 ? eventTypes : defaultEventList).map((et) => (
                    <option key={et} value={et} className="text-slate-900 bg-white">
                      {et}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-4 h-4 text-slate-400 absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* Field 2: What do you need? */}
            <div className="md:col-span-3 bg-white/10 hover:bg-white/15 border border-white/15 focus-within:border-amber-400/80 rounded-2xl p-3 transition-all group">
              <label className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-300 mb-1">
                <Search className="w-3.5 h-3.5 text-brand-gold-400" />
                <span>What do you need?</span>
              </label>
              <input
                type="text"
                placeholder="Search vendor or service"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full bg-transparent text-sm font-semibold text-white placeholder:text-slate-400 placeholder:font-normal focus:outline-none"
              />
            </div>

            {/* Field 3: Where? (Location) */}
            <div className="md:col-span-2 bg-white/10 hover:bg-white/15 border border-white/15 focus-within:border-amber-400/80 rounded-2xl p-3 transition-all group">
              <label className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-300 mb-1">
                <MapPin className="w-3.5 h-3.5 text-brand-gold-400" />
                <span>Where?</span>
              </label>
              <div className="relative">
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full bg-transparent text-sm font-semibold text-white focus:outline-none appearance-none cursor-pointer pr-6 truncate"
                >
                  <option value="" className="text-slate-900 bg-white">
                    Select city
                  </option>
                  {(locations.length > 0 ? locations : defaultCities).map((c) => (
                    <option key={c} value={c} className="text-slate-900 bg-white">
                      {c}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-4 h-4 text-slate-400 absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* Field 4: Event Date */}
            <div className="md:col-span-2 bg-white/10 hover:bg-white/15 border border-white/15 focus-within:border-amber-400/80 rounded-2xl p-3 transition-all group">
              <label className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-300 mb-1">
                <Calendar className="w-3.5 h-3.5 text-brand-gold-400" />
                <span>Event Date</span>
              </label>
              <input
                type="date"
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
                className="w-full bg-transparent text-xs font-semibold text-white focus:outline-none cursor-pointer [color-scheme:dark]"
              />
            </div>

            {/* Search Button */}
            <div className="md:col-span-2">
              <button
                type="submit"
                className="w-full h-14 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-600 to-amber-500 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-sm tracking-wide shadow-xl shadow-amber-500/25 flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                <Search className="w-4 h-4 stroke-[3px]" />
                <span>Search</span>
              </button>
            </div>

          </div>
        </form>

        {/* Popular Searches Pills */}
        <div className="mt-4 pt-3 border-t border-white/10 flex flex-wrap items-center gap-2 text-xs">
          <span className="text-slate-400 font-medium text-[11px] mr-1">
            Popular Searches:
          </span>
          {popularTags.map((tag) => (
            <Link
              key={tag.label}
              href={`/vendors?${tag.param}`}
              className="px-3 py-1 rounded-full bg-white/10 hover:bg-amber-400 hover:text-slate-950 text-slate-200 border border-white/10 text-[11px] font-medium transition-all"
            >
              {tag.label}
            </Link>
          ))}
        </div>

      </div>

    </div>
  );
}
