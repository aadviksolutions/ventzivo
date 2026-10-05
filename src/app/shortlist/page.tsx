'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useShortlist } from '@/context/ShortlistContext';
import VendorCard, { VendorCardData } from '@/components/cards/VendorCard';
import EnquiryModal from '@/components/modals/EnquiryModal';
import {
  Heart,
  SlidersHorizontal,
  Trash2,
  Send,
  Star,
  ShieldCheck,
  MapPin,
  CheckCircle,
  ArrowRight,
} from 'lucide-react';
import { formatPrice } from '@/lib/utils';

export default function ShortlistPage() {
  const { shortlist, toggleShortlist } = useShortlist();
  const [vendors, setVendors] = useState<VendorCardData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'cards' | 'compare'>('compare');
  const [modalVendor, setModalVendor] = useState<any>(null);

  useEffect(() => {
    fetch('/api/vendors')
      .then((r) => r.json())
      .then((data) => {
        if (data.vendors) {
          const matched = data.vendors.filter((v: any) => shortlist.includes(v.id));
          setVendors(matched);
        }
      })
      .finally(() => setIsLoading(false));
  }, [shortlist]);

  return (
    <div className="bg-slate-50 min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold text-rose-500 uppercase tracking-wider block mb-1">
              My Saved Favourites
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
              Shortlisted Vendors ({vendors.length})
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Compare your saved options side-by-side to make the best choice for your celebration.
            </p>
          </div>

          {vendors.length > 1 && (
            <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-2xl">
              <button
                onClick={() => setViewMode('compare')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  viewMode === 'compare' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600'
                }`}
              >
                Side-by-Side Compare
              </button>
              <button
                onClick={() => setViewMode('cards')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  viewMode === 'cards' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600'
                }`}
              >
                Cards View
              </button>
            </div>
          )}
        </div>

        {vendors.length === 0 ? (
          /* Empty State */
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-sm max-w-lg mx-auto space-y-4">
            <div className="w-16 h-16 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center mx-auto">
              <Heart className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Your Shortlist is Empty</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Browse vendors and tap the heart icon on any card to save your top choices and compare their prices and reviews.
            </p>
            <div className="pt-2">
              <Link
                href="/vendors"
                className="px-6 py-2.5 rounded-xl bg-brand-blue-800 text-white font-bold text-xs uppercase tracking-wider shadow inline-block"
              >
                Explore Vendors
              </Link>
            </div>
          </div>
        ) : viewMode === 'compare' ? (
          /* SIDE-BY-SIDE COMPARISON TABLE */
          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden">
            <div className="p-4 bg-slate-50 border-b border-slate-100 flex items-center justify-between text-xs">
              <span className="font-bold text-slate-700">Vendor Comparison Matrix</span>
              <span className="text-slate-500">{vendors.length} vendors in comparison</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <tbody>
                  
                  {/* Row 1: Header / Vendor Card Info */}
                  <tr className="border-b border-slate-100">
                    <td className="p-5 font-bold text-slate-500 w-44 bg-slate-50/50">Vendor</td>
                    {vendors.map((v) => (
                      <td key={v.id} className="p-5 min-w-[240px]">
                        <div className="flex items-center gap-3 mb-2">
                          <img
                            src={v.logo || 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=200&q=80'}
                            alt={v.name}
                            className="w-10 h-10 rounded-xl object-cover border"
                          />
                          <div>
                            <Link href={`/vendor/${v.slug}`} className="font-bold text-slate-900 hover:text-brand-blue-800">
                              {v.name}
                            </Link>
                            <span className="block text-[11px] text-amber-600 font-semibold">{v.category}</span>
                          </div>
                        </div>
                        <button
                          onClick={() => toggleShortlist(v.id)}
                          className="text-[10px] text-rose-600 hover:underline flex items-center gap-1 font-semibold"
                        >
                          <Trash2 className="w-3 h-3" />
                          Remove
                        </button>
                      </td>
                    ))}
                  </tr>

                  {/* Row 2: Starting Price */}
                  <tr className="border-b border-slate-100">
                    <td className="p-5 font-bold text-slate-500 bg-slate-50/50">Starting Price</td>
                    {vendors.map((v) => (
                      <td key={v.id} className="p-5 font-black text-base text-brand-blue-900">
                        {formatPrice(v.startingPrice)}
                      </td>
                    ))}
                  </tr>

                  {/* Row 3: Rating & Reviews */}
                  <tr className="border-b border-slate-100">
                    <td className="p-5 font-bold text-slate-500 bg-slate-50/50">Rating & Reviews</td>
                    {vendors.map((v) => (
                      <td key={v.id} className="p-5">
                        <div className="flex items-center gap-1.5 font-bold text-emerald-700">
                          <Star className="w-4 h-4 fill-emerald-600 text-emerald-600" />
                          <span>{v.rating > 0 ? v.rating.toFixed(1) : '5.0'}</span>
                          <span className="text-slate-400 font-normal">({v.reviewCount} reviews)</span>
                        </div>
                      </td>
                    ))}
                  </tr>

                  {/* Row 4: Experience */}
                  <tr className="border-b border-slate-100">
                    <td className="p-5 font-bold text-slate-500 bg-slate-50/50">Experience</td>
                    {vendors.map((v) => (
                      <td key={v.id} className="p-5 font-bold text-slate-800">
                        {v.experienceYears}+ Years in Industry
                      </td>
                    ))}
                  </tr>

                  {/* Row 5: City / Location */}
                  <tr className="border-b border-slate-100">
                    <td className="p-5 font-bold text-slate-500 bg-slate-50/50">City Hub</td>
                    {vendors.map((v) => (
                      <td key={v.id} className="p-5">
                        <span className="font-semibold text-slate-700 flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-slate-400" />
                          {v.city}
                        </span>
                      </td>
                    ))}
                  </tr>

                  {/* Row 6: Events Served */}
                  <tr className="border-b border-slate-100">
                    <td className="p-5 font-bold text-slate-500 bg-slate-50/50">Events Served</td>
                    {vendors.map((v) => (
                      <td key={v.id} className="p-5">
                        <div className="flex flex-wrap gap-1">
                          {v.eventTypes && v.eventTypes.length > 0 ? (
                            v.eventTypes.map((et) => (
                              <span key={et} className="text-[10px] px-2 py-0.5 rounded bg-slate-100 font-medium">
                                {et}
                              </span>
                            ))
                          ) : (
                            <span className="text-slate-400">All events</span>
                          )}
                        </div>
                      </td>
                    ))}
                  </tr>

                  {/* Row 7: Action CTA */}
                  <tr>
                    <td className="p-5 font-bold text-slate-500 bg-slate-50/50">Enquire</td>
                    {vendors.map((v) => (
                      <td key={v.id} className="p-5">
                        <button
                          onClick={() => setModalVendor(v)}
                          className="w-full py-2.5 px-4 rounded-xl bg-brand-blue-800 hover:bg-brand-blue-900 text-white font-bold text-xs uppercase tracking-wider shadow flex items-center justify-center gap-1.5"
                        >
                          <Send className="w-3.5 h-3.5" />
                          <span>Send Enquiry</span>
                        </button>
                      </td>
                    ))}
                  </tr>

                </tbody>
              </table>
            </div>
          </div>
        ) : (
          /* Cards View */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {vendors.map((v) => (
              <VendorCard key={v.id} vendor={v} />
            ))}
          </div>
        )}

      </div>

      {modalVendor && (
        <EnquiryModal
          isOpen={!!modalVendor}
          onClose={() => setModalVendor(null)}
          vendorId={modalVendor.id}
          vendorName={modalVendor.name}
          vendorCategory={modalVendor.category}
          vendorCity={modalVendor.city}
        />
      )}
    </div>
  );
}
