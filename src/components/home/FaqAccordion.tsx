'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

export default function FaqAccordion({ faqs }: { faqs: FAQItem[] }) {
  const [openId, setOpenId] = useState<string | null>(faqs[0]?.id || null);

  const toggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="space-y-3">
      {faqs.map((faq) => {
        const isOpen = openId === faq.id;
        return (
          <div
            key={faq.id}
            className="border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-sm transition-all"
          >
            <button
              onClick={() => toggle(faq.id)}
              className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 hover:bg-slate-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <HelpCircle className="w-5 h-5 text-amber-500 flex-shrink-0" />
                <span className="font-bold text-slate-900 text-sm sm:text-base">
                  {faq.question}
                </span>
              </div>
              <ChevronDown
                className={`w-5 h-5 text-slate-400 flex-shrink-0 transition-transform duration-200 ${
                  isOpen ? 'transform rotate-180 text-brand-blue-800' : ''
                }`}
              />
            </button>
            {isOpen && (
              <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100">
                {faq.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
