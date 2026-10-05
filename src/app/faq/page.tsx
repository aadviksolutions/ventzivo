import React from 'react';
import { prisma } from '@/lib/prisma';
import FaqAccordion from '@/components/home/FaqAccordion';

export const metadata = {
  title: 'Frequently Asked Questions — VentZivo',
  description: 'Common questions and answers about booking and listing event vendors on VentZivo.',
};

export const revalidate = 0;

export default async function FaqPage() {
  const faqs = await prisma.fAQ.findMany({
    where: { isActive: true },
    orderBy: { sortOrder: 'asc' },
  });

  return (
    <div className="bg-slate-50 min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-xs font-bold text-brand-gold-600 uppercase tracking-widest block mb-2">
            ✦ Got Questions?
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Frequently Asked Questions
          </h1>
          <p className="text-slate-600 text-sm mt-3">
            Find answers to common queries about finding vendors, booking events, and listing your services.
          </p>
        </div>

        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm">
          {faqs.length > 0 ? (
            <FaqAccordion faqs={faqs} />
          ) : (
            <p className="text-center text-slate-500 py-8">No FAQ items found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
