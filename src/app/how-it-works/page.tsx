import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, ShieldCheck, Zap, Award } from 'lucide-react';

export const metadata = {
  title: 'How VentZivo Works — Plan, Connect, Celebrate',
  description: 'Learn how VentZivo connects event hosts with top-rated, verified event vendors across India.',
};

export default function HowItWorksPage() {
  return (
    <div className="bg-slate-50 min-h-screen py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold text-brand-gold-600 uppercase tracking-widest block mb-2">
            ✦ Simple 3-Step Process
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            How VentZivo Works
          </h1>
          <p className="text-slate-600 text-sm sm:text-base mt-3">
            Whether you are hosting an intimate birthday party or a 1,000-guest royal wedding, finding vendors is seamless and direct.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <div className="p-8 rounded-3xl bg-white border border-slate-200/80 shadow-sm flex flex-col items-center text-center">
            <div className="w-14 h-14 rounded-2xl bg-brand-blue-800 text-white font-extrabold text-xl flex items-center justify-center mb-6 shadow-md shadow-brand-blue-900/20">
              01
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Choose Your Event</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Select from weddings, birthdays, corporate summits, engagements, or private gatherings.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white border border-slate-200/80 shadow-sm flex flex-col items-center text-center">
            <div className="w-14 h-14 rounded-2xl bg-amber-500 text-white font-extrabold text-xl flex items-center justify-center mb-6 shadow-md shadow-amber-500/20">
              02
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Discover & Compare</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Filter by location, price, rating, and verified credentials. Inspect high-resolution portfolios.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white border border-slate-200/80 shadow-sm flex flex-col items-center text-center">
            <div className="w-14 h-14 rounded-2xl bg-emerald-600 text-white font-extrabold text-xl flex items-center justify-center mb-6 shadow-md shadow-emerald-600/20">
              03
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Connect Directly</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Send free enquiries, talk on WhatsApp or call the vendor directly with zero middleman commissions.
            </p>
          </div>
        </div>

        {/* Advantage Section */}
        <div className="rounded-3xl bg-white border border-slate-200 p-8 sm:p-12 mb-16 shadow-sm">
          <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">The VentZivo Advantage</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center sm:text-left">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-base mb-1">100% Verified</h4>
                <p className="text-xs text-slate-600">Manual verification of business records, GST, and track records.</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center flex-shrink-0">
                <Zap className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-base mb-1">Direct Quotes</h4>
                <p className="text-xs text-slate-600">No inflated prices or markups. Direct contact with business owners.</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-base mb-1">Curated Specialists</h4>
                <p className="text-xs text-slate-600">Handpicked vendors who specialize in specific event styles.</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            href="/vendors"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-brand-blue-800 text-white font-bold text-sm hover:bg-brand-blue-900 transition-colors shadow-lg"
          >
            <span>Start Exploring Vendors</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </div>
  );
}
