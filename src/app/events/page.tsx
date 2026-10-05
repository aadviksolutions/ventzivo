import React from 'react';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { Sparkles, ArrowRight } from 'lucide-react';

export const revalidate = 0;

export default async function EventsDirectoryPage() {
  const eventTypes = await prisma.eventType.findMany({
    where: { isActive: true },
    orderBy: { sortOrder: 'asc' },
    include: {
      _count: { select: { vendors: true } },
    },
  });

  return (
    <div className="bg-slate-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold text-brand-gold-600 uppercase tracking-widest block">
            One Platform. Every Celebration.
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900">
            Browse All Event Types
          </h1>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            VentZivo caters to every event imaginable. Select your celebration type to discover vendors specialized in that domain.
          </p>
        </div>

        {/* Event Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {eventTypes.map((et) => (
            <Link
              key={et.id}
              href={`/vendors?eventType=${encodeURIComponent(et.slug)}`}
              className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:shadow-card-hover hover:border-brand-blue-300 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 group-hover:bg-brand-blue-800 group-hover:text-white flex items-center justify-center mb-3 transition-colors shadow-sm">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-slate-900 text-sm sm:text-base group-hover:text-brand-blue-800 mb-1 leading-snug">
                  {et.name}
                </h3>
                <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                  {et.description || 'Verified vendors ready to deliver extraordinary experiences.'}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-500 font-medium">
                  {et._count.vendors} Vendors
                </span>
                <ArrowRight className="w-4 h-4 text-brand-blue-800 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>

      </div>
    </div>
  );
}
