import React from 'react';
import Link from 'next/link';
import { Sparkles, ShieldCheck, HeartHandshake, ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'About VentZivo — India’s Premier Event Vendor Marketplace',
  description: 'VentZivo is dedicated to bringing transparency, trust, and luxury to event planning.',
};

export default function AboutPage() {
  return (
    <div className="bg-slate-50 min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-xs font-bold text-brand-gold-600 uppercase tracking-widest block mb-2">
            ✦ Our Mission
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            About VentZivo
          </h1>
          <p className="text-slate-600 text-sm sm:text-base mt-4 max-w-2xl mx-auto leading-relaxed">
            VentZivo is an all-in-one curated marketplace connecting families, corporations, and event planners with top-tier, verified event professionals across India.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/80 shadow-sm space-y-8">
          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-3">Our Vision</h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              Planning celebrations shouldn't be stressful or opaque. VentZivo was born out of a desire to give every host access to transparent vendor pricing, genuine portfolios, verified business credentials, and direct communication without unnecessary middlemen fees.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-slate-100">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 text-center">
              <ShieldCheck className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
              <h3 className="font-bold text-sm text-slate-900">Verified Vendors</h3>
              <p className="text-xs text-slate-500 mt-1">Background checked credentials and verified work experience.</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 text-center">
              <Sparkles className="w-8 h-8 text-amber-500 mx-auto mb-2" />
              <h3 className="font-bold text-sm text-slate-900">Curated Quality</h3>
              <p className="text-xs text-slate-500 mt-1">From intimate gatherings to royal luxury weddings.</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 text-center">
              <HeartHandshake className="w-8 h-8 text-brand-blue-800 mx-auto mb-2" />
              <h3 className="font-bold text-sm text-slate-900">Direct Deals</h3>
              <p className="text-xs text-slate-500 mt-1">Talk directly with vendor owners with 0% commission markups.</p>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <p className="font-bold text-slate-900 text-sm">Are you an event professional?</p>
              <p className="text-xs text-slate-500">Join thousands of businesses growing on VentZivo.</p>
            </div>
            <Link
              href="/vendor/register"
              className="px-6 py-2.5 rounded-xl bg-brand-blue-800 hover:bg-brand-blue-900 text-white font-bold text-xs shadow"
            >
              List Your Business Free
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
