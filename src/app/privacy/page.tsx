import React from 'react';

export const metadata = {
  title: 'Privacy Policy — VentZivo',
};

export default function PrivacyPage() {
  return (
    <div className="bg-slate-50 min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-extrabold text-slate-900 mb-6">Privacy Policy</h1>
        <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-sm text-sm text-slate-600 leading-relaxed space-y-4">
          <p>Last updated: October 2026</p>
          <p>
            At VentZivo Technologies Pvt. Ltd., accessible from ventzivo.com, one of our main priorities is the privacy of our visitors and registered users. This Privacy Policy document contains types of information that is collected and recorded by VentZivo and how we use it.
          </p>
          <h2 className="text-base font-bold text-slate-900 pt-4">1. Information We Collect</h2>
          <p>
            We collect personal information that you provide when you register as a vendor, submit event requirements, or contact vendors through enquiries (such as name, phone number, email address, city, and event preferences).
          </p>
          <h2 className="text-base font-bold text-slate-900 pt-4">2. How We Use Your Information</h2>
          <p>
            We use the information we collect to connect you directly with vendors, provide platform notifications, verify vendor business authenticity, and ensure secure communication.
          </p>
        </div>
      </div>
    </div>
  );
}
