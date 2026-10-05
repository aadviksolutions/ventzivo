import React from 'react';

export const metadata = {
  title: 'Terms of Service — VentZivo',
};

export default function TermsPage() {
  return (
    <div className="bg-slate-50 min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-extrabold text-slate-900 mb-6">Terms of Service</h1>
        <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-sm text-sm text-slate-600 leading-relaxed space-y-4">
          <p>Last updated: October 2026</p>
          <p>
            Welcome to VentZivo. By accessing or using our marketplace platform, you agree to comply with and be bound by the following terms and conditions of use.
          </p>
          <h2 className="text-base font-bold text-slate-900 pt-4">1. Platform Nature</h2>
          <p>
            VentZivo provides an online discovery platform connecting event organizers with third-party independent vendors. VentZivo acts as a facilitator and does not guarantee the performance of individual vendors.
          </p>
          <h2 className="text-base font-bold text-slate-900 pt-4">2. Vendor Listings</h2>
          <p>
            Vendors are responsible for the accuracy of their listings, pricing, credentials, and image copyright.
          </p>
        </div>
      </div>
    </div>
  );
}
