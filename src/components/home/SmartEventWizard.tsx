'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Calendar,
  MapPin,
  Users,
  IndianRupee,
  Sparkles,
  CheckSquare,
  Square,
  ArrowRight,
} from 'lucide-react';

interface SmartEventWizardProps {
  eventTypes: string[];
  locations: string[];
}

export default function SmartEventWizard({ eventTypes, locations }: SmartEventWizardProps) {
  const router = useRouter();

  const [selectedEventType, setSelectedEventType] = useState(eventTypes[0] || 'Wedding');
  const [selectedCity, setSelectedCity] = useState(locations[0] || 'Raipur');
  const [guestCount, setGuestCount] = useState(250);
  const [budgetRange, setBudgetRange] = useState('₹1L - ₹5L');
  const [selectedServices, setSelectedServices] = useState<string[]>([
    'Venue',
    'Decoration',
    'Catering & Food',
    'Photography & Video',
  ]);

  const serviceOptions = [
    'Venue',
    'Catering & Food',
    'Decoration',
    'Photography & Video',
    'Entertainment & Music',
    'Beauty & Styling',
    'Event Production',
    'Transportation',
  ];

  const toggleService = (srv: string) => {
    setSelectedServices((prev) =>
      prev.includes(srv) ? prev.filter((s) => s !== srv) : [...prev, srv]
    );
  };

  const handleMatch = () => {
    const params = new URLSearchParams();
    if (selectedEventType) params.set('eventType', selectedEventType);
    if (selectedCity) params.set('city', selectedCity);

    // Map first selected service as category filter
    if (selectedServices.length > 0) {
      params.set('category', selectedServices[0]);
    }

    router.push(`/vendors?${params.toString()}`);
  };

  return (
    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-6 sm:p-8 max-w-4xl mx-auto shadow-2xl text-white">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Left Column: Event Type, City, Guests, Budget */}
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-amber-300 mb-1.5 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>1. Choose Event Type</span>
            </label>
            <select
              value={selectedEventType}
              onChange={(e) => setSelectedEventType(e.target.value)}
              className="w-full bg-slate-900/80 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-white focus:outline-none focus:border-amber-400"
            >
              {eventTypes.map((et) => (
                <option key={et} value={et} className="bg-slate-900 text-white">
                  {et}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5 flex items-center gap-1">
                <MapPin className="w-3 h-3 text-amber-400" />
                <span>2. City</span>
              </label>
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full bg-slate-900/80 border border-slate-700 rounded-xl px-3 py-2 text-xs sm:text-sm font-semibold text-white focus:outline-none focus:border-amber-400"
              >
                {locations.map((loc) => (
                  <option key={loc} value={loc} className="bg-slate-900 text-white">
                    {loc}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5 flex items-center gap-1">
                <Users className="w-3 h-3 text-amber-400" />
                <span>3. Guest Count ({guestCount})</span>
              </label>
              <input
                type="range"
                min="50"
                max="2000"
                step="50"
                value={guestCount}
                onChange={(e) => setGuestCount(Number(e.target.value))}
                className="w-full accent-amber-500 mt-2 cursor-pointer"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5 flex items-center gap-1">
              <IndianRupee className="w-3 h-3 text-amber-400" />
              <span>4. Approximate Event Budget</span>
            </label>
            <div className="grid grid-cols-3 gap-2 text-xs">
              {['Under ₹1L', '₹1L - ₹5L', '₹5L - ₹15L', '₹15L - ₹30L', '₹30L - ₹50L', '₹50L+'].map(
                (b) => (
                  <button
                    key={b}
                    type="button"
                    onClick={() => setBudgetRange(b)}
                    className={`py-1.5 px-2 rounded-lg border text-center font-semibold transition-all ${
                      budgetRange === b
                        ? 'bg-amber-500 border-amber-400 text-slate-950 font-bold'
                        : 'bg-slate-900/50 border-slate-700 text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    {b}
                  </button>
                )
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Required Services Multi-Select */}
        <div className="flex flex-col justify-between">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-amber-300 mb-2">
              5. Select Services You Need:
            </label>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {serviceOptions.map((srv) => {
                const isChecked = selectedServices.includes(srv);
                return (
                  <button
                    key={srv}
                    type="button"
                    onClick={() => toggleService(srv)}
                    className={`p-2.5 rounded-xl border flex items-center gap-2 text-left transition-all ${
                      isChecked
                        ? 'bg-brand-blue-800/80 border-amber-400 text-white shadow-sm'
                        : 'bg-slate-900/40 border-slate-700/80 text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    {isChecked ? (
                      <CheckSquare className="w-4 h-4 text-amber-400 flex-shrink-0" />
                    ) : (
                      <Square className="w-4 h-4 text-slate-500 flex-shrink-0" />
                    )}
                    <span className="font-semibold">{srv}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Action CTA */}
          <div className="pt-6">
            <button
              onClick={handleMatch}
              className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-black text-sm tracking-wide shadow-xl flex items-center justify-center gap-2 transform active:scale-98 transition-all"
            >
              <span>FIND MY MATCHED VENDORS</span>
              <ArrowRight className="w-4 h-4 stroke-[3px]" />
            </button>
            <p className="text-[11px] text-slate-300 text-center mt-2">
              Free enquiry matching • No fees or commissions • Direct vendor phone & WhatsApp
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
