'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Sparkles, MapPin, ChevronDown } from 'lucide-react';

interface HeroSearchProps {
  eventTypes: string[];
  locations: string[];
}

export default function HeroSearch({ eventTypes, locations }: HeroSearchProps) {
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEvent, setSelectedEvent] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    const params = new URLSearchParams();
    if (searchQuery.trim()) params.set('search', searchQuery.trim());
    if (selectedEvent && selectedEvent !== 'All Events') params.set('eventType', selectedEvent);
    if (selectedLocation && selectedLocation !== 'All Cities') params.set('city', selectedLocation);

    router.push(`/vendors?${params.toString()}`);
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6">
      <form
        onSubmit={handleSearch}
        className="bg-white rounded-2xl sm:rounded-full p-2.5 sm:p-2 shadow-2xl shadow-slate-950/20 border border-slate-200/90 hover:border-amber-400/50 transition-all duration-300"
      >
        <div className="flex flex-col sm:flex-row items-center divide-y sm:divide-y-0 sm:divide-x divide-slate-100 gap-2 sm:gap-0">
          
          {/* Field 1: What are you looking for? */}
          <div className="w-full sm:flex-1 px-4 py-2 text-left group">
            <label className="block text-[10px] font-extrabold tracking-wider uppercase text-slate-400 group-focus-within:text-brand-blue-800 transition-colors">
              What are you looking for?
            </label>
            <div className="flex items-center gap-2 mt-0.5">
              <Search className="w-4 h-4 text-brand-blue-800 flex-shrink-0" />
              <input
                type="text"
                placeholder="Vendor or Service (e.g. Photographer, Decor)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent text-sm font-semibold text-slate-900 placeholder:text-slate-400 placeholder:font-normal focus:outline-none"
              />
            </div>
          </div>

          {/* Field 2: Event */}
          <div className="w-full sm:w-56 px-4 py-2 text-left group">
            <label className="block text-[10px] font-extrabold tracking-wider uppercase text-slate-400 group-focus-within:text-brand-gold-600 transition-colors">
              Event
            </label>
            <div className="flex items-center gap-2 mt-0.5 relative">
              <Sparkles className="w-4 h-4 text-brand-gold-600 flex-shrink-0" />
              <select
                value={selectedEvent}
                onChange={(e) => setSelectedEvent(e.target.value)}
                className="w-full bg-transparent text-sm font-semibold text-slate-900 focus:outline-none appearance-none cursor-pointer pr-6 truncate"
              >
                <option value="">All Events</option>
                {eventTypes && eventTypes.length > 0 ? (
                  eventTypes.map((et) => (
                    <option key={et} value={et}>
                      {et}
                    </option>
                  ))
                ) : (
                  <>
                    <option value="Wedding">Wedding</option>
                    <option value="Birthday">Birthday</option>
                    <option value="Corporate Event">Corporate Event</option>
                    <option value="Engagement">Engagement</option>
                    <option value="Private Party">Private Party</option>
                  </>
                )}
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-0 pointer-events-none" />
            </div>
          </div>

          {/* Field 3: Location */}
          <div className="w-full sm:w-52 px-4 py-2 text-left group">
            <label className="block text-[10px] font-extrabold tracking-wider uppercase text-slate-400 group-focus-within:text-brand-blue-800 transition-colors">
              Location
            </label>
            <div className="flex items-center gap-2 mt-0.5 relative">
              <MapPin className="w-4 h-4 text-brand-blue-800 flex-shrink-0" />
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full bg-transparent text-sm font-semibold text-slate-900 focus:outline-none appearance-none cursor-pointer pr-6 truncate"
              >
                <option value="">All Cities</option>
                {locations && locations.length > 0 ? (
                  locations.map((loc) => (
                    <option key={loc} value={loc}>
                      {loc}
                    </option>
                  ))
                ) : (
                  <>
                    <option value="Raipur">Raipur</option>
                    <option value="Bilaspur">Bilaspur</option>
                    <option value="Bhilai">Bhilai</option>
                    <option value="Delhi NCR">Delhi NCR</option>
                    <option value="Mumbai">Mumbai</option>
                  </>
                )}
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-0 pointer-events-none" />
            </div>
          </div>

          {/* Search CTA Button */}
          <div className="w-full sm:w-auto p-1">
            <button
              type="submit"
              className="w-full sm:w-auto h-12 px-7 rounded-xl sm:rounded-full bg-gradient-to-r from-brand-blue-900 via-brand-blue-800 to-brand-blue-700 hover:from-brand-blue-950 hover:to-brand-blue-800 text-white font-bold text-sm tracking-wide shadow-lg shadow-brand-blue-900/25 flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <Search className="w-4 h-4 stroke-[2.5px]" />
              <span>Search</span>
            </button>
          </div>

        </div>
      </form>
    </div>
  );
}
