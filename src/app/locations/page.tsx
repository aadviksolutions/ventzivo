import React from 'react';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { MapPin, ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'Event Vendor Cities & Locations — VentZivo',
  description: 'Find trusted event vendors in your city across India.',
};

const FALLBACK_LOCATIONS = [
  { id: 'loc-1', city: 'Raipur', state: 'Chhattisgarh' },
  { id: 'loc-2', city: 'Mumbai', state: 'Maharashtra' },
  { id: 'loc-3', city: 'Delhi NCR', state: 'Delhi' },
  { id: 'loc-4', city: 'Bengaluru', state: 'Karnataka' },
  { id: 'loc-5', city: 'Jaipur', state: 'Rajasthan' },
  { id: 'loc-6', city: 'Goa', state: 'Goa' },
  { id: 'loc-7', city: 'Indore', state: 'Madhya Pradesh' },
  { id: 'loc-8', city: 'Hyderabad', state: 'Telangana' },
  { id: 'loc-9', city: 'Bhilai', state: 'Chhattisgarh' },
  { id: 'loc-10', city: 'Bilaspur', state: 'Chhattisgarh' },
  { id: 'loc-11', city: 'Pune', state: 'Maharashtra' },
  { id: 'loc-12', city: 'Ahmedabad', state: 'Gujarat' },
];

export default async function LocationsPage() {
  let locations = FALLBACK_LOCATIONS;

  try {
    const dbLocations = await prisma.location.findMany({
      orderBy: { sortOrder: 'asc' },
    });
    if (dbLocations && dbLocations.length > 0) {
      locations = dbLocations as any;
    }
  } catch (err) {
    console.warn('Prisma locations query failed, serving fallback:', err);
  }

  return (
    <div className="bg-slate-50 min-h-screen py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold text-brand-gold-600 uppercase tracking-widest block mb-2">
            ✦ Pan-India Presence
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Explore Vendors by Location
          </h1>
          <p className="text-slate-600 text-sm mt-3">
            Find local and destination event professionals in major hubs and cities.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {locations.map((loc) => (
            <Link
              key={loc.id}
              href={`/vendors?city=${encodeURIComponent(loc.city)}`}
              className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-brand-blue-800 hover:shadow-md transition-all flex items-center justify-between group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-brand-blue-50 text-brand-blue-800 flex items-center justify-center group-hover:bg-brand-blue-800 group-hover:text-white transition-colors">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">{loc.city}</h3>
                  <span className="text-[11px] text-slate-400">{loc.state}</span>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-brand-blue-800 group-hover:translate-x-1 transition-all" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
