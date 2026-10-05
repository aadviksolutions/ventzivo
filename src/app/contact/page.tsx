'use client';

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="bg-slate-50 min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-xs font-bold text-brand-gold-600 uppercase tracking-widest block mb-2">
            ✦ We're Here to Help
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Contact VentZivo
          </h1>
          <p className="text-slate-600 text-sm mt-3">
            Have questions about vendor listing, event planning, or partnership inquiries?
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1 space-y-4">
            <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm flex items-start gap-3">
              <Mail className="w-5 h-5 text-brand-blue-800 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-slate-900 text-sm">Email Support</h4>
                <p className="text-xs text-slate-500 mt-1">support@ventzivo.com</p>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm flex items-start gap-3">
              <Phone className="w-5 h-5 text-brand-gold-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-slate-900 text-sm">Direct Phone</h4>
                <p className="text-xs text-slate-500 mt-1">+91 98765 43210</p>
                <p className="text-[11px] text-slate-400">Mon - Sat, 9am - 8pm IST</p>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm flex items-start gap-3">
              <MapPin className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-slate-900 text-sm">Headquarters</h4>
                <p className="text-xs text-slate-500 mt-1">Raipur, Chhattisgarh, India</p>
              </div>
            </div>
          </div>

          <div className="md:col-span-2 bg-white rounded-3xl p-8 border border-slate-200/80 shadow-sm">
            <h3 className="font-bold text-lg text-slate-900 mb-6">Send Us a Message</h3>

            {submitted ? (
              <div className="p-6 rounded-2xl bg-emerald-50 text-emerald-800 border border-emerald-200 text-center">
                <p className="font-bold">Thank you for reaching out!</p>
                <p className="text-xs mt-1">Our team will get back to you shortly.</p>
              </div>
            ) : (
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Your Name</label>
                    <input type="text" required placeholder="John Doe" className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-brand-blue-800" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Email Address</label>
                    <input type="email" required placeholder="john@example.com" className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-brand-blue-800" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Subject</label>
                  <input type="text" required placeholder="Vendor Inquiry / Support" className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-brand-blue-800" />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Message</label>
                  <textarea rows={4} required placeholder="How can we assist you?" className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-brand-blue-800" />
                </div>

                <button
                  type="submit"
                  className="px-8 py-3 rounded-xl bg-brand-blue-800 hover:bg-brand-blue-900 text-white font-bold text-sm shadow transition-colors flex items-center gap-2"
                >
                  <span>Send Message</span>
                  <Send className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
