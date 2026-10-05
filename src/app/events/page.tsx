import React from 'react';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { FALLBACK_EVENT_TYPES } from '@/lib/mockData';
import { Sparkles, ArrowRight, Calendar, Users, ShieldCheck } from 'lucide-react';

export const revalidate = 0;

export default async function EventsDirectoryPage() {
  let eventTypes = FALLBACK_EVENT_TYPES;

  try {
    const dbEvents = await prisma.eventType.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: 'asc' },
      include: {
        _count: { select: { vendors: true } },
      },
    });

    if (dbEvents && dbEvents.length > 0) {
      eventTypes = dbEvents as any;
    }
  } catch (err) {
    console.warn('Prisma eventType query failed, serving resilient fallback data:', err);
  }

  return (
    <div className="bg-slate-50 min-h-screen py-14 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-400/30 text-amber-700 text-xs font-bold tracking-wider uppercase">
            <Sparkles className="w-3.5 h-3.5 text-brand-gold-600" />
            <span>One Platform. Every Celebration.</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight font-editorial">
            Browse All Event Worlds
          </h1>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            VentZivo caters to every event imaginable across India. Select your celebration type to explore verified specialists, venues, caterers, and decor teams dedicated to that domain.
          </p>
        </div>

        {/* Event Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {eventTypes.map((et: any) => {
            const vendorCount = et._count?.vendors ?? 15;
            return (
              <Link
                key={et.id}
                href={`/events/${et.slug}`}
                className="group relative rounded-3xl bg-white border border-slate-200/80 shadow-sm hover:shadow-card-hover hover:border-amber-400 transition-all duration-300 overflow-hidden flex flex-col justify-between"
              >
                <div className="relative h-44 w-full overflow-hidden bg-slate-900">
                  <img
                    src={et.image || 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80'}
                    alt={et.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-[11px] font-bold text-amber-300 border border-amber-400/20">
                    {vendorCount} Vendors
                  </div>
                  <div className="absolute bottom-3 left-4 right-4">
                    <h3 className="font-bold text-white text-base sm:text-lg drop-shadow-md group-hover:text-amber-300 transition-colors">
                      {et.name}
                    </h3>
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
                    {et.description || 'Verified vendors ready to deliver extraordinary experiences.'}
                  </p>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-brand-blue-800 group-hover:text-amber-600 transition-colors">
                    <span>View Specialist Vendors</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

      </div>
    </div>
  );
}
