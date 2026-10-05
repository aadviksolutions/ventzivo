'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { X, Search, Calendar, MapPin, Sparkles, ArrowRight, Check } from 'lucide-react';

interface MobileSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileSearchModal({ isOpen, onClose }: MobileSearchModalProps) {
  const router = useRouter();

  const [step, setStep] = useState<number>(1);
  const [selectedEvent, setSelectedEvent] = useState<string>('');
  const [selectedService, setSelectedService] = useState<string>('');
  const [selectedCity, setSelectedCity] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<string>('');

  if (!isOpen) return null;

  const eventOptions = [
    'Wedding',
    'Corporate Event',
    'Birthday',
    'Engagement',
    'Exhibition',
    'Concert & Live Show',
    'Private Party',
    'Religious Event',
    'Conference',
    'Fashion Show',
  ];

  const serviceOptions = [
    'Venue & Banquet',
    'Catering & Food',
    'Decoration & Stage',
    'Photography & Cinema',
    'Entertainment & DJ',
    'Bridal HD Makeup',
    'Event Production & AV',
    'Event Planner',
  ];

  const cityOptions = [
    'Raipur',
    'Bilaspur',
    'Bhilai',
    'Delhi NCR',
    'Mumbai',
    'Bengaluru',
    'Jaipur',
    'Hyderabad',
  ];

  const handleFinishSearch = () => {
    const params = new URLSearchParams();
    if (selectedEvent) params.set('eventType', selectedEvent);
    if (selectedService) params.set('search', selectedService);
    if (selectedCity) params.set('city', selectedCity);
    if (selectedDate) params.set('date', selectedDate);

    onClose();
    router.push(`/vendors?${params.toString()}`);
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-end bg-black/80 backdrop-blur-md animate-fade-in md:hidden">
      
      {/* Bottom Sheet Drawer */}
      <div className="w-full bg-[#06153B] text-white rounded-t-3xl max-h-[92vh] flex flex-col overflow-hidden border-t border-amber-400/30 shadow-2xl">
        
        {/* Drawer Header */}
        <div className="p-4 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-amber-400 text-slate-950 font-black text-xs flex items-center justify-center">
              0{step}
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-300">
              {step === 1 && 'Select Your Event'}
              {step === 2 && 'Select Service Needed'}
              {step === 3 && 'Select Location'}
              {step === 4 && 'Select Event Date'}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-white/10 text-white hover:bg-white/20"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Progress Bar */}
        <div className="w-full bg-white/10 h-1">
          <div
            className="bg-amber-400 h-1 transition-all duration-300"
            style={{ width: `${(step / 4) * 100}%` }}
          />
        </div>

        {/* Step Body */}
        <div className="p-5 flex-1 overflow-y-auto space-y-4">
          
          {/* STEP 1: EVENT TYPE */}
          {step === 1 && (
            <div className="space-y-3">
              <h3 className="text-lg font-black text-white">What event are you planning?</h3>
              <div className="grid grid-cols-2 gap-2.5">
                {eventOptions.map((evt) => {
                  const active = selectedEvent === evt;
                  return (
                    <button
                      key={evt}
                      onClick={() => {
                        setSelectedEvent(evt);
                        setStep(2);
                      }}
                      className={`p-3 rounded-2xl border text-left text-xs font-bold transition-all flex items-center justify-between ${
                        active
                          ? 'bg-amber-400 text-slate-950 border-amber-400'
                          : 'bg-white/5 border-white/10 text-slate-200 hover:bg-white/10'
                      }`}
                    >
                      <span>{evt}</span>
                      {active && <Check className="w-3.5 h-3.5" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 2: SERVICE */}
          {step === 2 && (
            <div className="space-y-3">
              <h3 className="text-lg font-black text-white">What service do you need?</h3>
              <div className="grid grid-cols-2 gap-2.5">
                {serviceOptions.map((srv) => {
                  const active = selectedService === srv;
                  return (
                    <button
                      key={srv}
                      onClick={() => {
                        setSelectedService(srv);
                        setStep(3);
                      }}
                      className={`p-3 rounded-2xl border text-left text-xs font-bold transition-all flex items-center justify-between ${
                        active
                          ? 'bg-amber-400 text-slate-950 border-amber-400'
                          : 'bg-white/5 border-white/10 text-slate-200 hover:bg-white/10'
                      }`}
                    >
                      <span>{srv}</span>
                      {active && <Check className="w-3.5 h-3.5" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 3: LOCATION */}
          {step === 3 && (
            <div className="space-y-3">
              <h3 className="text-lg font-black text-white">Where is your event?</h3>
              <div className="grid grid-cols-2 gap-2.5">
                {cityOptions.map((ct) => {
                  const active = selectedCity === ct;
                  return (
                    <button
                      key={ct}
                      onClick={() => {
                        setSelectedCity(ct);
                        setStep(4);
                      }}
                      className={`p-3 rounded-2xl border text-left text-xs font-bold transition-all flex items-center justify-between ${
                        active
                          ? 'bg-amber-400 text-slate-950 border-amber-400'
                          : 'bg-white/5 border-white/10 text-slate-200 hover:bg-white/10'
                      }`}
                    >
                      <span>{ct}</span>
                      {active && <Check className="w-3.5 h-3.5" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 4: DATE */}
          {step === 4 && (
            <div className="space-y-4">
              <h3 className="text-lg font-black text-white">When is your event date?</h3>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full p-4 rounded-2xl bg-white/10 border border-white/20 text-white font-bold text-sm focus:outline-none focus:border-amber-400 [color-scheme:dark]"
              />

              {/* Summary of selections */}
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1.5 text-xs">
                <p className="text-slate-400">Planning: <span className="text-white font-bold">{selectedEvent || 'Any Event'}</span></p>
                <p className="text-slate-400">Need: <span className="text-white font-bold">{selectedService || 'All Services'}</span></p>
                <p className="text-slate-400">City: <span className="text-white font-bold">{selectedCity || 'All Cities'}</span></p>
              </div>
            </div>
          )}

        </div>

        {/* Drawer Footer Actions */}
        <div className="p-4 border-t border-white/10 bg-[#06153B] flex items-center justify-between gap-3">
          {step > 1 ? (
            <button
              onClick={() => setStep(step - 1)}
              className="px-4 py-2.5 rounded-xl border border-white/20 text-slate-300 font-bold text-xs"
            >
              Back
            </button>
          ) : (
            <div />
          )}

          {step < 4 ? (
            <button
              onClick={() => setStep(step + 1)}
              className="px-6 py-2.5 rounded-xl bg-amber-400 text-slate-950 font-black text-xs shadow flex items-center gap-1.5"
            >
              <span>Next</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              onClick={handleFinishSearch}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-black text-sm shadow-xl flex items-center justify-center gap-2"
            >
              <Search className="w-4 h-4" />
              <span>Show Verified Vendors</span>
            </button>
          )}
        </div>

      </div>

    </div>
  );
}
