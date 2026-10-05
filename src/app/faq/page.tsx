import React from 'react';
import { prisma } from '@/lib/prisma';
import FaqAccordion from '@/components/home/FaqAccordion';

export const metadata = {
  title: 'Frequently Asked Questions — VentZivo',
  description: 'Common questions and answers about booking and listing event vendors on VentZivo.',
};

const FALLBACK_FAQS = [
  {
    id: 'faq-1',
    question: 'How does VentZivo work for event hosts?',
    answer: 'VentZivo lets you discover verified vendors across 30+ event categories, inspect pricing and portfolios, and send direct enquiries without any middleman charges or commissions.',
    category: 'General',
  },
  {
    id: 'faq-2',
    question: 'Are all vendors on VentZivo verified?',
    answer: 'Yes, our team validates business credentials, past client reviews, and portfolio quality before awarding the Verified badge.',
    category: 'Trust & Safety',
  },
  {
    id: 'faq-3',
    question: 'Is VentZivo free to use for clients?',
    answer: 'Yes, 100% free! Clients can browse, shortlist, and contact vendors directly via Call, WhatsApp, and Send Enquiry.',
    category: 'Pricing',
  },
  {
    id: 'faq-4',
    question: 'How do I list my business on VentZivo?',
    answer: 'Click "List Your Business" or "Register as Vendor", complete your profile, upload your portfolio, and our admin team will review and approve your listing.',
    category: 'For Vendors',
  },
  {
    id: 'faq-5',
    question: 'What is the official contact number for VentZivo support?',
    answer: 'You can reach our official support desk directly at 7566145566 or chat via WhatsApp at +91 7566145566.',
    category: 'Support',
  },
];

export default async function FaqPage() {
  let faqs = FALLBACK_FAQS;

  try {
    const dbFaqs = await prisma.fAQ.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: 'asc' },
    });
    if (dbFaqs && dbFaqs.length > 0) {
      faqs = dbFaqs;
    }
  } catch (err) {
    console.warn('Prisma FAQ query failed, serving fallback:', err);
  }

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
