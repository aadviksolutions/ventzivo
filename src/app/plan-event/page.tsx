import React from 'react';
import { prisma } from '@/lib/prisma';
import SmartEventWizard from '@/components/home/SmartEventWizard';
import { Sparkles, ShieldCheck, HeartHandshake, CheckCircle2 } from 'lucide-react';

export const revalidate = 0;

export default async function PlanEventPage() {
  const eventTypes = await prisma.eventType.findMany({
    where: { isActive: true },
    orderBy: { sortOrder: 'asc' },
  });

  const locations = await prisma.location.findMany({
    orderBy: { sortOrder: 'asc' },
  });

  return (
    <div className="bg-slate-900 text-white min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-12">
        
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI-Assisted Smart Vendor Matching</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            Plan Your Event with VentZivo
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Fill in your event specifications below. Our algorithm matches your budget, guest count, and service requirements with the best-rated available vendors.
          </p>
        </div>

        {/* Wizard Card */}
        <SmartEventWizard
          eventTypes={eventTypes.map((e) => e.name)}
          locations={locations.map((l) => l.city)}
        />

        {/* Value Proposition Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-10 border-t border-slate-800 text-xs">
          <div className="p-5 rounded-2xl bg-slate-800/50 border border-slate-800 space-y-2">
            <ShieldCheck className="w-6 h-6 text-emerald-400" />
            <h4 className="font-bold text-white text-sm">Verified Professionals</h4>
            <p className="text-slate-400 leading-relaxed">
              Every vendor profile is manually screened for authenticity, portfolio track record, and commercial reliability.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-800/50 border border-slate-800 space-y-2">
            <HeartHandshake className="w-6 h-6 text-amber-400" />
            <h4 className="font-bold text-white text-sm">Direct Transparent Pricing</h4>
            <p className="text-slate-400 leading-relaxed">
              No hidden margins or booking cuts. You communicate directly with business owners.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-800/50 border border-slate-800 space-y-2">
            <CheckCircle2 className="w-6 h-6 text-blue-400" />
            <h4 className="font-bold text-white text-sm">Every Event Covered</h4>
            <p className="text-slate-400 leading-relaxed">
              From intimate house parties and 50th anniversaries to large corporate summits and concerts.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
