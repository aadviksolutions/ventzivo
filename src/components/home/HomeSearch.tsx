'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, MapPin, Calendar, Sparkles, ChevronDown } from 'lucide-react';

interface HomeSearchProps {
  eventTypes: string[];
  locations: string[];
}

export default function HomeSearch({ eventTypes, locations }: HomeSearchProps) {
  const router = useRouter();

  const [eventType, setEventType] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('');
  const [eventDate, setEventDate] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    const params = new URLSearchParams();
    if (eventType) params.set('eventType', eventType);
    if (searchQuery) params.set('search', searchQuery);
    if (location && location !== 'All Locations') params.set('city', location);
    if (eventDate) params.set('date', eventDate);

    router.push(`/vendors?${params.toString()}`);
  };

  return (
    <form
      onSubmit={handleSearch}
      className="bg-white rounded-3xl p-3 sm:p-4 shadow-2xl border border-slate-100/90 text-slate-800"
    >
      <div className="grid grid-cols-1 md:grid-cols-4 gap-2 sm:gap-3 items-center">
        
        {/* Field 1: WHAT ARE YOU PLANNING? */}
        <div className="p-3 rounded-2xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-200">
          <label className="block text-[11px] font-bold uppercase tracking-wider text-brand-gold-700 flex items-center gap-1 mb-1">
            <Sparkles className="w-3 h-3 text-amber-500" />
            <span>Planning What?</span>
          </label>
          <div className="relative">
            <select
              value={eventType}
              onChange={(e) => setEventType(e.target.value)}
              className="w-full bg-transparent font-bold text-slate-900 text-sm focus:outline-none appearance-none cursor-pointer pr-6 truncate"
            >
              <option value="">Any Event Type</option>
              {eventTypes.map((et) => (
                <option key={et} value={et}>
                  {et}
                </option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 text-slate-400 absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* Field 2: WHAT DO YOU NEED? */}
        <div className="p-3 rounded-2xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-200">
          <label className="block text-[11px] font-bold uppercase tracking-wider text-brand-blue-800 flex items-center gap-1 mb-1">
            <Search className="w-3 h-3 text-brand-blue-600" />
            <span>What Do You Need?</span>
          </label>
          <input
            type="text"
            placeholder="Photographer, Decor, Venue..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-transparent font-bold text-slate-900 text-sm focus:outline-none placeholder:font-normal placeholder:text-slate-400"
          />
        </div>

        {/* Field 3: WHERE? (LOCATION) */}
        <div className="p-3 rounded-2xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-200">
          <label className="block text-[11px] font-bold uppercase tracking-wider text-brand-blue-800 flex items-center gap-1 mb-1">
            <MapPin className="w-3 h-3 text-brand-blue-600" />
            <span>Where (City)?</span>
          </label>
          <div className="relative">
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full bg-transparent font-bold text-slate-900 text-sm focus:outline-none appearance-none cursor-pointer pr-6 truncate"
            >
              <option value="">All Locations</option>
              {locations.map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 text-slate-400 absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* Field 4: DATE & SEARCH BUTTON */}
        <div className="flex flex-col sm:flex-row items-center gap-2">
          <div className="w-full p-3 rounded-2xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-200">
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1 mb-1">
              <Calendar className="w-3 h-3 text-slate-400" />
              <span>Event Date</span>
            </label>
            <input
              type="date"
              value={eventDate}
              onChange={(e) => setEventDate(e.target.value)}
              className="w-full bg-transparent text-xs font-semibold text-slate-800 focus:outline-none cursor-pointer"
            />
          </div>

          <button
            type="submit"
            className="w-full sm:w-auto h-14 px-8 rounded-2xl bg-gradient-to-r from-brand-blue-800 to-brand-blue-700 hover:from-brand-blue-900 hover:to-brand-blue-800 text-white font-black text-sm tracking-wide shadow-lg shadow-brand-blue-900/30 flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 transition-all flex-shrink-0"
          >
            <Search className="w-4 h-4 stroke-[3px]" />
            <span className="whitespace-nowrap">FIND VENDORS</span>
          </button>
        </div>

      </div>
    </form>
  );
}
