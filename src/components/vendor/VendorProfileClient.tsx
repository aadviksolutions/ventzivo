'use client';

import React, { useState } from 'react';
import Link from 'next/link';
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
  Phone,
  MessageCircle,
  Globe,
  Award,
  Users,
  CheckCircle,
  Share2,
  Calendar,
  IndianRupee,
} from 'lucide-react';
import { formatPrice } from '@/lib/utils';

export default function VendorProfileClient({ vendor }: { vendor: any }) {
  const { isShortlisted, toggleShortlist } = useShortlist();
  const [activeTab, setActiveTab] = useState<'about' | 'services' | 'events' | 'gallery' | 'reviews' | 'hours'>('about');
  const [isEnquiryModalOpen, setIsEnquiryModalOpen] = useState(false);
  
  // Review submission state
  const [reviewFormOpen, setReviewFormOpen] = useState(false);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewName, setReviewName] = useState('');
  const [reviewComment, setReviewComment] = useState('');
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  const shortlisted = isShortlisted(vendor.id);

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          vendorId: vendor.id,
          clientName: reviewName,
          rating: reviewRating,
          comment: reviewComment,
        }),
      });
      setReviewSubmitted(true);
      setReviewComment('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${vendor.businessName} on VentZivo`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Profile link copied to clipboard!');
    }
  };

  const pricingTypeLabels: Record<string, string> = {
    FIXED: 'Fixed Price',
    STARTING_FROM: 'Starting From',
    PER_HOUR: 'Per Hour',
    PER_DAY: 'Per Day',
    CUSTOM_QUOTE: 'Custom Quote',
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-24 lg:pb-12">
      
      {/* 1. HERO COVER BANNER */}
      <div className="relative h-64 sm:h-80 lg:h-96 w-full bg-slate-900 overflow-hidden">
        <img
          src={vendor.coverImage || 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1600&q=80'}
          alt={vendor.businessName}
          className="w-full h-full object-cover opacity-85"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

        {/* Back Link & Share Buttons */}
        <div className="absolute top-4 left-4 right-4 max-w-7xl mx-auto flex items-center justify-between z-10 text-white">
          <Link
            href="/vendors"
            className="px-3.5 py-1.5 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-md text-xs font-semibold flex items-center gap-1.5 transition-colors border border-white/10"
          >
            ← Back to Marketplace
          </Link>
          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="p-2 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-md text-white transition-colors border border-white/10"
              title="Share Profile"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => toggleShortlist(vendor.id)}
              className={`p-2 rounded-full backdrop-blur-md transition-colors border border-white/10 ${
                shortlisted ? 'bg-rose-500 text-white' : 'bg-black/40 hover:bg-black/60 text-white'
              }`}
              title={shortlisted ? 'Remove from Shortlist' : 'Add to Shortlist'}
            >
              <Heart className={`w-4 h-4 ${shortlisted ? 'fill-current' : ''}`} />
            </button>
          </div>
        </div>
      </div>

      {/* 2. VENDOR INFO HEADER CARD */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-20 mb-8">
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xl flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            {/* Logo */}
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-white p-1 border-2 border-white shadow-xl overflow-hidden flex-shrink-0">
              <img
                src={vendor.logo || 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=300&q=80'}
                alt={vendor.businessName}
                className="w-full h-full object-cover rounded-xl"
              />
            </div>

            {/* Name, Badges, Category */}
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <span className="text-xs font-bold uppercase tracking-wider text-brand-blue-800 bg-blue-50 px-2.5 py-0.5 rounded-full">
                  {vendor.category}
                </span>
                {vendor.subCategory && (
                  <span className="text-xs font-semibold text-slate-500">
                    • {vendor.subCategory}
                  </span>
                )}
                {vendor.isVerified && (
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    Verified Vendor
                  </span>
                )}
                {vendor.isFeatured && (
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                    <Sparkles className="w-3 h-3 text-amber-500" />
                    Featured
                  </span>
                )}
              </div>

              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
                {vendor.businessName}
              </h1>

              <div className="flex flex-wrap items-center gap-3 sm:gap-5 mt-2 text-xs sm:text-sm text-slate-600">
                <div className="flex items-center gap-1 font-bold text-emerald-700">
                  <Star className="w-4 h-4 fill-emerald-600 text-emerald-600" />
                  <span>{vendor.rating > 0 ? vendor.rating.toFixed(1) : '5.0'}</span>
                  <span className="text-slate-400 font-normal">({vendor.reviewCount} reviews)</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4 text-slate-400" />
                  <span>{vendor.city}, {vendor.state}</span>
                </div>
                {vendor.experienceYears > 0 && (
                  <div className="flex items-center gap-1">
                    <Award className="w-4 h-4 text-amber-500" />
                    <span>{vendor.experienceYears}+ Years Experience</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Quick Pricing & CTAs */}
          <div className="flex flex-col sm:flex-row lg:flex-col items-start lg:items-end justify-between gap-4 pt-4 lg:pt-0 border-t lg:border-t-0 border-slate-100">
            <div>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                Starting Package
              </span>
              <span className="text-2xl sm:text-3xl font-black text-brand-blue-900">
                {formatPrice(vendor.startingPrice)}
              </span>
            </div>

            <div className="flex items-center gap-2.5 w-full sm:w-auto">
              {vendor.whatsapp && (
                <a
                  href={`https://wa.me/${vendor.whatsapp.replace(/[^0-9]/g, '')}?text=Hi%20${encodeURIComponent(vendor.businessName)},%20I%20found%20your%20profile%20on%20VentZivo%20and%20wanted%20to%20enquire%20about%20your%20services.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span className="hidden sm:inline">WhatsApp</span>
                </a>
              )}

              <button
                onClick={() => setIsEnquiryModalOpen(true)}
                className="flex-1 sm:flex-initial px-6 py-3 rounded-2xl bg-brand-blue-800 hover:bg-brand-blue-900 text-white font-black text-xs uppercase tracking-wider shadow-lg shadow-brand-blue-900/20 flex items-center justify-center gap-2 transition-transform active:scale-95"
              >
                <Send className="w-4 h-4" />
                <span>Send Enquiry</span>
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* 3. NAVIGATION TABS */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="flex overflow-x-auto no-scrollbar gap-2 p-1.5 bg-white rounded-2xl border border-slate-200 shadow-sm">
          {[
            { id: 'about', label: 'About & Overview' },
            { id: 'services', label: `Services & Pricing (${vendor.services.length})` },
            { id: 'events', label: `Events Served (${vendor.eventTypes.length})` },
            { id: 'gallery', label: 'Portfolio Gallery' },
            { id: 'reviews', label: `Reviews (${vendor.reviewCount})` },
            { id: 'hours', label: 'Hours & Locations' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? 'bg-brand-blue-800 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* 4. MAIN BODY TAB CONTENT */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main 2-column Content Area */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* TAB: ABOUT */}
            {activeTab === 'about' && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-3">About {vendor.businessName}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">
                    {vendor.description ||
                      `${vendor.businessName} is a premier event vendor based in ${vendor.city}, specializing in extraordinary celebrations with top-notch professional reliability.`}
                  </p>
                </div>

                {/* Key Business Highlights */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-6 border-t border-slate-100 text-xs">
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                    <span className="text-slate-400 block font-semibold mb-1">Owner / Manager</span>
                    <span className="text-slate-900 font-extrabold text-sm">{vendor.ownerName}</span>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                    <span className="text-slate-400 block font-semibold mb-1">Industry Experience</span>
                    <span className="text-slate-900 font-extrabold text-sm">{vendor.experienceYears}+ Years</span>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                    <span className="text-slate-400 block font-semibold mb-1">Professional Team</span>
                    <span className="text-slate-900 font-extrabold text-sm">{vendor.teamSize} Crew Members</span>
                  </div>
                </div>

                {/* Events Served Preview */}
                <div>
                  <h4 className="font-bold text-slate-900 text-sm mb-3">Events We Cater To:</h4>
                  <div className="flex flex-wrap gap-2">
                    {vendor.eventTypes.map((et: string) => (
                      <span
                        key={et}
                        className="px-3 py-1 rounded-xl bg-amber-50 text-amber-800 border border-amber-200/80 text-xs font-semibold flex items-center gap-1.5"
                      >
                        <CheckCircle className="w-3.5 h-3.5 text-amber-600" />
                        {et}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB: SERVICES */}
            {activeTab === 'services' && (
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-slate-900 mb-2">Available Services & Packages</h3>
                {vendor.services.length > 0 ? (
                  vendor.services.map((s: any) => (
                    <div
                      key={s.id}
                      className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                    >
                      <div className="space-y-1.5 max-w-md">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
                          {pricingTypeLabels[s.pricingType] || 'Service'}
                        </span>
                        <h4 className="text-base font-bold text-slate-900">{s.name}</h4>
                        <p className="text-xs text-slate-600 leading-relaxed">{s.description}</p>
                        {s.availability && (
                          <span className="inline-block text-[11px] text-slate-400">
                            Availability: {s.availability}
                          </span>
                        )}
                      </div>

                      <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2 pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                        <div className="text-left sm:text-right">
                          <span className="text-[10px] text-slate-400 block uppercase font-semibold">
                            Price
                          </span>
                          <span className="text-lg font-extrabold text-brand-blue-900">
                            {formatPrice(s.startingPrice)}
                          </span>
                        </div>
                        <button
                          onClick={() => setIsEnquiryModalOpen(true)}
                          className="px-4 py-2 rounded-xl bg-brand-blue-800 text-white font-bold text-xs hover:bg-brand-blue-900 transition-colors shadow-sm"
                        >
                          Book / Enquire
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="bg-white rounded-3xl p-8 text-center border border-slate-200">
                    <p className="text-sm text-slate-500">Contact vendor for custom package quotes.</p>
                  </div>
                )}
              </div>
            )}

            {/* TAB: EVENTS SERVED */}
            {activeTab === 'events' && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm">
                <h3 className="text-lg font-bold text-slate-900 mb-2">Events We Specialize In</h3>
                <p className="text-xs text-slate-500 mb-6">
                  {vendor.businessName} is fully equipped with personnel, equipment, and production logistics to handle these events:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {vendor.eventTypes.map((et: string) => (
                    <div
                      key={et}
                      className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center gap-3"
                    >
                      <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                      <div>
                        <h4 className="font-bold text-slate-800 text-sm">{et}</h4>
                        <span className="text-[11px] text-slate-500">Full end-to-end service available</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB: GALLERY */}
            {activeTab === 'gallery' && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm">
                <h3 className="text-lg font-bold text-slate-900 mb-4">Past Work & Event Portfolio</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {[
                    vendor.coverImage,
                    'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=80',
                    'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=600&q=80',
                    'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=600&q=80',
                    'https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=600&q=80',
                    'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=600&q=80',
                  ].map((img, i) => (
                    <div key={i} className="h-44 rounded-2xl overflow-hidden bg-slate-100 shadow-sm group relative">
                      <img
                        src={img}
                        alt="Portfolio"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB: REVIEWS */}
            {activeTab === 'reviews' && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">Client Reviews & Testimonials</h3>
                    <p className="text-xs text-slate-500">Verified feedback from event hosts</p>
                  </div>
                  <button
                    onClick={() => setReviewFormOpen(!reviewFormOpen)}
                    className="px-4 py-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 font-bold text-xs border border-amber-200 transition-colors"
                  >
                    + Write a Review
                  </button>
                </div>

                {/* Review Form Drawer */}
                {reviewFormOpen && (
                  <form onSubmit={handleReviewSubmit} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                    <h4 className="font-bold text-sm text-slate-800">Submit Your Review</h4>
                    {reviewSubmitted ? (
                      <div className="p-3 bg-emerald-50 text-emerald-700 text-xs rounded-lg font-medium">
                        Thank you! Your review has been submitted and is pending admin approval before publishing.
                      </div>
                    ) : (
                      <>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-semibold text-slate-600">Your Rating:</span>
                          <div className="flex gap-1 text-amber-400 cursor-pointer">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                onClick={() => setReviewRating(star)}
                                className={`w-5 h-5 ${star <= reviewRating ? 'fill-amber-400' : 'text-slate-300'}`}
                              />
                            ))}
                          </div>
                        </div>

                        <input
                          type="text"
                          required
                          placeholder="Your Name *"
                          value={reviewName}
                          onChange={(e) => setReviewName(e.target.value)}
                          className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none"
                        />

                        <textarea
                          rows={3}
                          required
                          placeholder="Describe your event experience with this vendor..."
                          value={reviewComment}
                          onChange={(e) => setReviewComment(e.target.value)}
                          className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none"
                        />

                        <button
                          type="submit"
                          className="px-5 py-2 rounded-xl bg-brand-blue-800 text-white font-bold text-xs"
                        >
                          Submit Review
                        </button>
                      </>
                    )}
                  </form>
                )}

                {/* Reviews List */}
                <div className="space-y-4">
                  {vendor.reviews.length > 0 ? (
                    vendor.reviews.map((r: any) => (
                      <div key={r.id} className="p-4 rounded-2xl border border-slate-100 bg-slate-50/60 space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-brand-blue-100 text-brand-blue-800 font-bold flex items-center justify-center text-xs">
                              {r.clientName.charAt(0)}
                            </div>
                            <span className="font-bold text-xs sm:text-sm text-slate-900">{r.clientName}</span>
                          </div>
                          <div className="flex text-amber-400">
                            {[...Array(r.rating)].map((_, i) => (
                              <Star key={i} className="w-3.5 h-3.5 fill-current" />
                            ))}
                          </div>
                        </div>
                        <p className="text-xs text-slate-600 leading-relaxed italic">"{r.comment}"</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-xs text-slate-500 italic py-4">No reviews yet. Be the first to review this vendor!</p>
                  )}
                </div>
              </div>
            )}

            {/* TAB: HOURS & LOCATIONS */}
            {activeTab === 'hours' && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">Service Areas Covered</h3>
                  <p className="text-xs text-slate-500 mb-3">This vendor readily travels to and operates in:</p>
                  <div className="flex flex-wrap gap-2">
                    {vendor.serviceAreas.map((area: string) => (
                      <span key={area} className="px-3 py-1 rounded-xl bg-slate-100 text-slate-800 font-semibold text-xs flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-brand-blue-700" />
                        {area}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-100">
                  <h3 className="text-lg font-bold text-slate-900 mb-3">Business Hours</h3>
                  <div className="divide-y divide-slate-100 text-xs">
                    {vendor.businessHours.map((bh: any) => (
                      <div key={bh.dayOfWeek} className="py-2.5 flex items-center justify-between">
                        <span className="font-semibold text-slate-700">{bh.dayOfWeek}</span>
                        <span className="text-slate-500 font-medium">
                          {bh.isClosed ? 'Closed' : `${bh.openTime} – ${bh.closeTime}`}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

          </div>

          {/* Right Column: Quick Contact & Security Card */}
          <div className="space-y-6">
            
            {/* Quick Enquiry Card */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-4">
              <h3 className="font-extrabold text-slate-900 text-base">Direct Vendor Contact</h3>
              
              <div className="space-y-2.5 text-xs text-slate-600">
                <a 
                  href={`tel:${vendor.mobile || '7566145566'}`} 
                  className="flex items-center gap-2.5 hover:text-brand-blue-800 transition-colors group p-2 rounded-xl bg-slate-50 hover:bg-slate-100"
                >
                  <Phone className="w-4 h-4 text-brand-blue-700 group-hover:scale-110 transition-transform" />
                  <span className="font-bold text-slate-800">{vendor.mobile || '7566145566'}</span>
                  <span className="text-[10px] text-brand-blue-800 bg-blue-50 px-2 py-0.5 rounded-md font-bold ml-auto">Tap to Call</span>
                </a>
                <a 
                  href={`https://wa.me/${(vendor.whatsapp || vendor.mobile || '7566145566').replace(/[^0-9]/g, '')}?text=Hi%2C%20I%20found%20you%20on%20VentZivo`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-emerald-700 hover:text-emerald-800 transition-colors group p-2 rounded-xl bg-emerald-50/60 hover:bg-emerald-50"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-600 group-hover:scale-110 transition-transform" />
                  <span className="font-semibold text-emerald-950">Chat on WhatsApp</span>
                  <span className="text-[10px] text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md font-bold ml-auto">Direct Chat</span>
                </a>
                {vendor.website && (
                  <div className="flex items-center gap-2.5">
                    <Globe className="w-4 h-4 text-slate-500" />
                    <a href={vendor.website} target="_blank" rel="noreferrer" className="text-brand-blue-800 hover:underline">
                      {vendor.website}
                    </a>
                  </div>
                )}
                <div className="flex items-center gap-2.5">
                  <MapPin className="w-4 h-4 text-slate-500" />
                  <span>{vendor.address || `${vendor.city}, ${vendor.state}`}</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => setIsEnquiryModalOpen(true)}
                  className="w-full py-3.5 rounded-2xl bg-brand-blue-800 hover:bg-brand-blue-900 text-white font-black text-xs uppercase tracking-wider shadow-md shadow-brand-blue-800/20 flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Free Enquiry</span>
                </button>
              </div>
            </div>

            {/* VentZivo Trust Card */}
            <div className="p-6 rounded-3xl bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200/80 space-y-3">
              <div className="flex items-center gap-2 text-amber-800 font-extrabold text-sm">
                <ShieldCheck className="w-5 h-5 text-amber-600" />
                <span>VentZivo Buyer Protection</span>
              </div>
              <ul className="text-xs text-amber-900/80 space-y-1.5 list-disc pl-4">
                <li>Direct transparent quotation from vendor</li>
                <li>Zero middleman platform fee</li>
                <li>Verified contact details & portfolio check</li>
              </ul>
            </div>

          </div>

        </div>
      </div>

      {/* 5. STICKY MOBILE BOTTOM CTA */}
      <div className="lg:hidden fixed bottom-14 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-4 py-2.5 shadow-2xl flex items-center justify-between gap-2">
        <div className="min-w-0 pr-1">
          <span className="text-[10px] text-slate-400 block font-semibold leading-tight">Starting from</span>
          <span className="text-sm sm:text-base font-extrabold text-brand-blue-900 truncate block">
            {formatPrice(vendor.startingPrice)}
          </span>
        </div>
        <div className="flex items-center gap-1.5 flex-shrink-0">
          <a
            href={`tel:${vendor.mobile || '7566145566'}`}
            className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 transition-colors flex items-center justify-center border border-slate-200"
            aria-label="Call Vendor"
          >
            <Phone className="w-4 h-4 text-brand-blue-800" />
          </a>
          <a
            href={`https://wa.me/${(vendor.whatsapp || vendor.mobile || '7566145566').replace(/[^0-9]/g, '')}?text=Hi%2C%20I%20found%20you%20on%20VentZivo`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white transition-colors flex items-center justify-center"
            aria-label="WhatsApp Vendor"
          >
            <MessageCircle className="w-4 h-4" />
          </a>
          <button
            onClick={() => setIsEnquiryModalOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs shadow-md transition-all active:scale-95 flex items-center gap-1.5"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Send Enquiry</span>
          </button>
        </div>
      </div>

      {/* Enquiry Modal */}
      <EnquiryModal
        isOpen={isEnquiryModalOpen}
        onClose={() => setIsEnquiryModalOpen(false)}
        vendorId={vendor.id}
        vendorName={vendor.businessName}
        vendorCategory={vendor.category}
        vendorCity={vendor.city}
      />

    </div>
  );
}
