'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useShortlist } from '@/context/ShortlistContext';
import EnquiryModal from '@/components/modals/EnquiryModal';
import {
  Star,
  ShieldCheck,
  MapPin,
  Clock,
  Sparkles,
  Heart,
  Send,
  ArrowRight,
  IndianRupee,
} from 'lucide-react';
import { formatPrice } from '@/lib/utils';

export interface VendorCardData {
  id: string;
  name: string;
  slug: string;
  category: string;
  subCategory?: string;
  city: string;
  state?: string;
  rating: number;
  reviewCount: number;
  startingPrice: number;
  experienceYears: number;
  description?: string;
  isVerified?: boolean;
  isFeatured?: boolean;
  coverImage?: string;
  logo?: string;
  eventTypes?: string[];
}

export default function VendorCard({ vendor }: { vendor: VendorCardData }) {
  const { isShortlisted, toggleShortlist } = useShortlist();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const shortlisted = isShortlisted(vendor.id);

  const fallbackCover =
    'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=800&q=80';
  const fallbackLogo =
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80';

  return (
    <>
      <div className="group bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-card-hover hover:border-brand-blue-200 transition-all duration-300 flex flex-col overflow-hidden relative">
        
        {/* Card Header / Image Section */}
        <div className="relative h-48 w-full overflow-hidden bg-slate-100">
          <img
            src={vendor.coverImage || fallbackCover}
            alt={vendor.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent to-black/30" />

          {/* Featured / Verified Badges */}
          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
            {vendor.isFeatured && (
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold tracking-wide uppercase bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-sm flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                Featured
              </span>
            )}
            {vendor.isVerified && (
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold tracking-wide bg-emerald-600/90 text-white backdrop-blur-md shadow-sm flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                Verified
              </span>
            )}
          </div>

          {/* Favourite / Heart Toggle */}
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleShortlist(vendor.id);
            }}
            className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all z-10 ${
              shortlisted
                ? 'bg-rose-500 text-white shadow-md scale-110'
                : 'bg-white/80 hover:bg-white text-slate-700 hover:text-rose-500 shadow'
            }`}
            title={shortlisted ? 'Remove from Shortlist' : 'Add to Shortlist'}
          >
            <Heart className={`w-4 h-4 ${shortlisted ? 'fill-current' : ''}`} />
          </button>

          {/* Vendor Logo & Category Overlay */}
          <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between z-10">
            <div className="flex items-center gap-2.5">
              <div className="w-11 h-11 rounded-xl bg-white p-0.5 shadow-md overflow-hidden border border-white/80 flex-shrink-0">
                <img
                  src={vendor.logo || fallbackLogo}
                  alt={vendor.name}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <div className="text-white">
                <span className="text-[11px] font-semibold text-amber-300 uppercase tracking-wide drop-shadow-sm">
                  {vendor.category}
                </span>
                <div className="flex items-center gap-1 text-xs text-slate-200">
                  <MapPin className="w-3 h-3" />
                  <span>{vendor.city}</span>
                </div>
              </div>
            </div>

            {/* Experience Pill */}
            {vendor.experienceYears > 0 && (
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-black/50 text-slate-200 backdrop-blur-sm border border-white/20">
                {vendor.experienceYears}+ Yrs Exp
              </span>
            )}
          </div>
        </div>

        {/* Card Body */}
        <div className="p-4 flex-1 flex flex-col justify-between">
          <div>
            <div className="flex items-start justify-between gap-2 mb-1.5">
              <Link href={`/vendor/${vendor.slug}`} className="hover:text-brand-blue-800 transition-colors">
                <h3 className="font-bold text-slate-900 text-base leading-snug line-clamp-1 group-hover:text-brand-blue-800">
                  {vendor.name}
                </h3>
              </Link>
            </div>

            {/* Rating & Reviews */}
            <div className="flex items-center gap-2 mb-2 text-xs">
              <div className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 font-bold border border-emerald-200">
                <Star className="w-3.5 h-3.5 fill-emerald-600 text-emerald-600" />
                <span>{vendor.rating > 0 ? vendor.rating.toFixed(1) : 'New'}</span>
              </div>
              <span className="text-slate-500 font-medium">
                ({vendor.reviewCount} {vendor.reviewCount === 1 ? 'review' : 'reviews'})
              </span>
            </div>

            {/* Short Description */}
            <p className="text-xs text-slate-600 line-clamp-2 mb-3 leading-relaxed">
              {vendor.description ||
                `Experienced professional event vendor offering exceptional service for weddings, parties and celebrations in ${vendor.city}.`}
            </p>

            {/* Event Types Served Tags */}
            {vendor.eventTypes && vendor.eventTypes.length > 0 && (
              <div className="flex flex-wrap gap-1 mb-3">
                {vendor.eventTypes.slice(0, 3).map((et) => (
                  <span
                    key={et}
                    className="text-[10px] px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 font-medium"
                  >
                    {et}
                  </span>
                ))}
                {vendor.eventTypes.length > 3 && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-amber-50 text-amber-700 font-bold">
                    +{vendor.eventTypes.length - 3} more
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Pricing & CTA Actions */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
            <div>
              <span className="text-[10px] text-slate-500 block uppercase font-medium">
                Starting from
              </span>
              <span className="text-base font-extrabold text-brand-blue-900">
                {formatPrice(vendor.startingPrice)}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsModalOpen(true)}
                className="px-3 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 font-bold text-xs flex items-center gap-1.5 border border-amber-200/80 transition-all active:scale-95 shadow-sm"
              >
                <Send className="w-3 h-3 text-amber-700" />
                <span>Enquire</span>
              </button>

              <Link
                href={`/vendor/${vendor.slug}`}
                className="px-3 py-1.5 rounded-xl bg-brand-blue-800 hover:bg-brand-blue-900 text-white font-bold text-xs flex items-center gap-1 transition-all active:scale-95 shadow-sm"
              >
                <span>View</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>

        </div>

      </div>

      {/* Enquiry Modal */}
      <EnquiryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        vendorId={vendor.id}
        vendorName={vendor.name}
        vendorCategory={vendor.category}
        vendorCity={vendor.city}
      />
    </>
  );
}
