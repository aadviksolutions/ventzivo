'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Logo from '@/components/brand/Logo';
import { useAuth } from '@/context/AuthContext';
import {
  Building,
  User,
  Phone,
  Mail,
  Lock,
  MapPin,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Clock,
  CheckSquare,
  Square,
  ShieldCheck,
  IndianRupee,
} from 'lucide-react';

export default function VendorRegistrationPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [step, setStep] = useState(1);
  const [categories, setCategories] = useState<any[]>([]);
  const [eventTypes, setEventTypes] = useState<any[]>([]);
  const [isLoadingMeta, setIsLoadingMeta] = useState(true);

  // Form State
  const [formData, setFormData] = useState({
    businessName: '',
    ownerName: '',
    mobile: '',
    email: '',
    password: '',
    categoryId: '',
    subCategoryId: '',
    selectedEventTypes: [] as string[],
    city: 'Raipur',
    state: 'Chhattisgarh',
    address: '',
    serviceAreas: 'Raipur, Bhilai, Bilaspur',
    experienceYears: 3,
    teamSize: 5,
    startingPrice: 15000,
    description: '',
    whatsapp: '',
    website: '',
    gstNumber: '',
    businessRegNumber: '',
    logo: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=300&q=80',
    coverImage: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1600&q=80',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [createdVendor, setCreatedVendor] = useState<any>(null);
  const [error, setError] = useState('');

  // Fetch Categories & Event Types from DB
  useEffect(() => {
    Promise.all([
      fetch('/api/categories').then((r) => r.json()),
      fetch('/api/event-types').then((r) => r.json()),
    ])
      .then(([catData, etData]) => {
        if (catData.categories) {
          setCategories(catData.categories);
          if (catData.categories[0]) {
            setFormData((prev) => ({ ...prev, categoryId: catData.categories[0].id }));
          }
        }
        if (etData.eventTypes) {
          setEventTypes(etData.eventTypes);
          // Preselect first 3 event types
          setFormData((prev) => ({
            ...prev,
            selectedEventTypes: etData.eventTypes.slice(0, 4).map((et: any) => et.id),
          }));
        }
      })
      .catch((e) => console.error(e))
      .finally(() => setIsLoadingMeta(false));
  }, []);

  const toggleEventType = (id: string) => {
    setFormData((prev) => {
      const next = prev.selectedEventTypes.includes(id)
        ? prev.selectedEventTypes.filter((etId) => etId !== id)
        : [...prev.selectedEventTypes, id];
      return { ...prev, selectedEventTypes: next };
    });
  };

  const handleNext = () => {
    setError('');
    if (step === 1) {
      if (!formData.businessName || !formData.ownerName || !formData.mobile || !formData.email || !formData.password) {
        setError('Please fill in all required fields.');
        return;
      }
    }
    setStep((prev) => prev + 1);
  };

  const handlePrev = () => {
    setError('');
    setStep((prev) => Math.max(1, prev - 1));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const payload = {
        ...formData,
        serviceAreas: formData.serviceAreas.split(',').map((s) => s.trim()),
      };

      const res = await fetch('/api/vendors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit registration');
      }

      setCreatedVendor(data.vendor);
      setIsSubmitted(true);

      // Auto login as pending vendor so they can see their dashboard preview immediately
      login({
        id: data.vendor.id,
        name: formData.ownerName,
        email: formData.email,
        role: 'VENDOR',
        vendorId: data.vendor.id,
        businessName: data.vendor.businessName,
        vendorStatus: 'PENDING_APPROVAL',
      });
    } catch (err: any) {
      setError(err.message || 'Registration failed. Please check inputs.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-block bg-white p-2.5 rounded-2xl shadow-sm border border-slate-200 mb-4">
            <Logo size="md" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
            Register as a VentZivo Vendor
          </h1>
          <p className="text-slate-600 text-xs sm:text-sm mt-1">
            Grow your event business. Receive verified enquiries directly from clients across India.
          </p>
        </div>

        {isSubmitted ? (
          /* SUCCESS: PENDING APPROVAL NOTICE */
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-amber-200 shadow-xl text-center space-y-6 animate-fade-in">
            <div className="w-20 h-20 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center mx-auto shadow-inner border border-amber-200">
              <Clock className="w-10 h-10 animate-pulse" />
            </div>

            <div className="space-y-2">
              <span className="inline-block px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-amber-100 text-amber-800">
                Status: Pending Approval
              </span>
              <h2 className="text-2xl font-black text-slate-900">
                Application Submitted Successfully!
              </h2>
              <p className="text-sm text-slate-600 max-w-lg mx-auto leading-relaxed">
                Thank you for registering <span className="font-bold text-slate-900">{createdVendor?.businessName}</span>. Your application has been queued for review by the VentZivo verification team.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-left max-w-md mx-auto space-y-2">
              <p className="font-bold text-slate-800">What happens next?</p>
              <ul className="list-disc pl-4 text-slate-600 space-y-1">
                <li>Admin verification takes 24–48 business hours.</li>
                <li>You can access your vendor dashboard to add services and portfolio photos.</li>
                <li>Your profile will become publicly searchable as soon as admin approves it.</li>
              </ul>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/vendor/dashboard"
                className="w-full sm:w-auto px-8 py-3 rounded-xl bg-brand-blue-800 hover:bg-brand-blue-900 text-white font-bold text-xs uppercase tracking-wider shadow"
              >
                Go to Vendor Dashboard
              </Link>
              <Link
                href="/"
                className="w-full sm:w-auto px-6 py-3 rounded-xl border border-slate-200 text-slate-700 font-bold text-xs hover:bg-slate-50"
              >
                Return to Homepage
              </Link>
            </div>
          </div>
        ) : (
          /* MULTI-STEP REGISTRATION CARD */
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-xl">
            
            {/* Step Progress Indicators */}
            <div className="flex items-center justify-between mb-8 pb-6 border-b border-slate-100">
              {[
                { s: 1, label: 'Account' },
                { s: 2, label: 'Category & Events' },
                { s: 3, label: 'Location' },
                { s: 4, label: 'Pricing & Details' },
                { s: 5, label: 'Media & Verification' },
              ].map((item) => (
                <div key={item.s} className="flex flex-col items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                      step === item.s
                        ? 'bg-brand-blue-800 text-white ring-4 ring-brand-blue-100 shadow'
                        : step > item.s
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-100 text-slate-400'
                    }`}
                  >
                    {step > item.s ? '✓' : item.s}
                  </div>
                  <span className="hidden sm:block text-[10px] font-bold text-slate-500 mt-1">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>

            {error && (
              <div className="p-3 mb-6 rounded-xl bg-rose-50 text-rose-700 border border-rose-200 text-xs font-medium">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* STEP 1: BUSINESS & OWNER INFORMATION */}
              {step === 1 && (
                <div className="space-y-4 animate-fade-in">
                  <h3 className="text-base font-bold text-slate-900 border-l-4 border-brand-blue-800 pl-3">
                    Step 1: Business & Owner Credentials
                  </h3>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Business / Brand Name *
                    </label>
                    <div className="relative">
                      <Building className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                      <input
                        type="text"
                        required
                        placeholder="e.g. Royal Blooms Wedding Decor"
                        value={formData.businessName}
                        onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                        className="w-full pl-10 pr-3 py-2.5 border border-slate-300 rounded-xl text-xs sm:text-sm focus:ring-2 focus:ring-brand-blue-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Owner / Manager Full Name *
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                      <input
                        type="text"
                        required
                        placeholder="e.g. Rajesh Kumar"
                        value={formData.ownerName}
                        onChange={(e) => setFormData({ ...formData, ownerName: e.target.value })}
                        className="w-full pl-10 pr-3 py-2.5 border border-slate-300 rounded-xl text-xs sm:text-sm focus:ring-2 focus:ring-brand-blue-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Mobile Number *
                      </label>
                      <div className="relative">
                        <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                        <input
                          type="tel"
                          required
                          placeholder="e.g. 98260 12345"
                          value={formData.mobile}
                          onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                          className="w-full pl-10 pr-3 py-2.5 border border-slate-300 rounded-xl text-xs sm:text-sm focus:ring-2 focus:ring-brand-blue-500 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        WhatsApp Number
                      </label>
                      <div className="relative">
                        <Phone className="w-4 h-4 text-emerald-500 absolute left-3.5 top-3" />
                        <input
                          type="tel"
                          placeholder="e.g. 98260 12345"
                          value={formData.whatsapp}
                          onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                          className="w-full pl-10 pr-3 py-2.5 border border-slate-300 rounded-xl text-xs sm:text-sm focus:ring-2 focus:ring-brand-blue-500 focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Business Email Address *
                      </label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                        <input
                          type="email"
                          required
                          placeholder="e.g. info@royalblooms.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full pl-10 pr-3 py-2.5 border border-slate-300 rounded-xl text-xs sm:text-sm focus:ring-2 focus:ring-brand-blue-500 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Create Password *
                      </label>
                      <div className="relative">
                        <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                        <input
                          type="password"
                          required
                          placeholder="Min 6 characters"
                          value={formData.password}
                          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                          className="w-full pl-10 pr-3 py-2.5 border border-slate-300 rounded-xl text-xs sm:text-sm focus:ring-2 focus:ring-brand-blue-500 focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 2: CATEGORY & EVENTS */}
              {step === 2 && (
                <div className="space-y-4 animate-fade-in">
                  <h3 className="text-base font-bold text-slate-900 border-l-4 border-brand-blue-800 pl-3">
                    Step 2: Service Category & Events Served
                  </h3>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Primary Business Category *
                    </label>
                    <select
                      value={formData.categoryId}
                      onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                      className="w-full px-3 py-2.5 border border-slate-300 rounded-xl text-xs sm:text-sm font-semibold bg-white"
                    >
                      {categories.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-2">
                      Which Event Types Do You Cater To? (Select multiple) *
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 max-h-60 overflow-y-auto p-2 border border-slate-200 rounded-2xl bg-slate-50">
                      {eventTypes.map((et) => {
                        const isChecked = formData.selectedEventTypes.includes(et.id);
                        return (
                          <button
                            key={et.id}
                            type="button"
                            onClick={() => toggleEventType(et.id)}
                            className={`p-2.5 rounded-xl border flex items-center gap-2 text-left text-xs transition-all ${
                              isChecked
                                ? 'bg-amber-500 text-slate-950 font-bold border-amber-600 shadow-sm'
                                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
                            }`}
                          >
                            {isChecked ? (
                              <CheckSquare className="w-4 h-4 text-slate-950 flex-shrink-0" />
                            ) : (
                              <Square className="w-4 h-4 text-slate-400 flex-shrink-0" />
                            )}
                            <span className="truncate">{et.name}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3: LOCATION & COVERAGE */}
              {step === 3 && (
                <div className="space-y-4 animate-fade-in">
                  <h3 className="text-base font-bold text-slate-900 border-l-4 border-brand-blue-800 pl-3">
                    Step 3: Location & Service Areas
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Primary City *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Raipur"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="w-full px-3 py-2.5 border border-slate-300 rounded-xl text-xs sm:text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        State
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Chhattisgarh"
                        value={formData.state}
                        onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                        className="w-full px-3 py-2.5 border border-slate-300 rounded-xl text-xs sm:text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Business / Studio Address
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Office #104, VIP Road, Raipur"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="w-full px-3 py-2.5 border border-slate-300 rounded-xl text-xs sm:text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Service Areas (Comma separated cities/regions you travel to)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Raipur, Bhilai, Bilaspur, Durg, Pan-India"
                      value={formData.serviceAreas}
                      onChange={(e) => setFormData({ ...formData, serviceAreas: e.target.value })}
                      className="w-full px-3 py-2.5 border border-slate-300 rounded-xl text-xs sm:text-sm"
                    />
                  </div>
                </div>
              )}

              {/* STEP 4: PRICING & EXPERIENCE */}
              {step === 4 && (
                <div className="space-y-4 animate-fade-in">
                  <h3 className="text-base font-bold text-slate-900 border-l-4 border-brand-blue-800 pl-3">
                    Step 4: Experience, Pricing & About Business
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Experience (Years)
                      </label>
                      <input
                        type="number"
                        min="0"
                        value={formData.experienceYears}
                        onChange={(e) => setFormData({ ...formData, experienceYears: Number(e.target.value) })}
                        className="w-full px-3 py-2.5 border border-slate-300 rounded-xl text-xs sm:text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Team / Crew Size
                      </label>
                      <input
                        type="number"
                        min="1"
                        value={formData.teamSize}
                        onChange={(e) => setFormData({ ...formData, teamSize: Number(e.target.value) })}
                        className="w-full px-3 py-2.5 border border-slate-300 rounded-xl text-xs sm:text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Starting Price (₹) *
                      </label>
                      <input
                        type="number"
                        min="0"
                        required
                        value={formData.startingPrice}
                        onChange={(e) => setFormData({ ...formData, startingPrice: Number(e.target.value) })}
                        className="w-full px-3 py-2.5 border border-slate-300 rounded-xl text-xs sm:text-sm font-bold text-brand-blue-900"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Business Description & USPs
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Share details about your services, specialized equipment, past events, awards, and what makes your business unique..."
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="w-full px-3 py-2.5 border border-slate-300 rounded-xl text-xs sm:text-sm focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Website URL (Optional)
                    </label>
                    <input
                      type="url"
                      placeholder="https://yourbrand.com"
                      value={formData.website}
                      onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                      className="w-full px-3 py-2.5 border border-slate-300 rounded-xl text-xs sm:text-sm"
                    />
                  </div>
                </div>
              )}

              {/* STEP 5: MEDIA & GST / REGISTRATION */}
              {step === 5 && (
                <div className="space-y-4 animate-fade-in">
                  <h3 className="text-base font-bold text-slate-900 border-l-4 border-brand-blue-800 pl-3">
                    Step 5: Brand Media & Verification Details
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Logo Image URL
                      </label>
                      <input
                        type="url"
                        value={formData.logo}
                        onChange={(e) => setFormData({ ...formData, logo: e.target.value })}
                        className="w-full px-3 py-2.5 border border-slate-300 rounded-xl text-xs sm:text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Cover Image URL
                      </label>
                      <input
                        type="url"
                        value={formData.coverImage}
                        onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                        className="w-full px-3 py-2.5 border border-slate-300 rounded-xl text-xs sm:text-sm"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        GST Number (Optional - speeds up verification)
                      </label>
                      <input
                        type="text"
                        placeholder="22AAAAA0000A1Z5"
                        value={formData.gstNumber}
                        onChange={(e) => setFormData({ ...formData, gstNumber: e.target.value })}
                        className="w-full px-3 py-2.5 border border-slate-300 rounded-xl text-xs sm:text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Business Registration / MSME (Optional)
                      </label>
                      <input
                        type="text"
                        placeholder="UDYAM-CG-..."
                        value={formData.businessRegNumber}
                        onChange={(e) => setFormData({ ...formData, businessRegNumber: e.target.value })}
                        className="w-full px-3 py-2.5 border border-slate-300 rounded-xl text-xs sm:text-sm"
                      />
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 space-y-1">
                    <p className="font-bold flex items-center gap-1.5 text-amber-800">
                      <ShieldCheck className="w-4 h-4 text-amber-600" />
                      Verification Notice
                    </p>
                    <p>
                      Your account will initially have status <strong>"PENDING APPROVAL"</strong>. An admin will review and verify your business details before your listing becomes public.
                    </p>
                  </div>
                </div>
              )}

              {/* Navigation Actions */}
              <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={handlePrev}
                    className="px-5 py-2.5 rounded-xl border border-slate-300 font-bold text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-1.5"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Previous</span>
                  </button>
                ) : (
                  <div />
                )}

                {step < 5 ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="px-6 py-2.5 rounded-xl bg-brand-blue-800 hover:bg-brand-blue-900 text-white font-bold text-xs flex items-center gap-1.5 shadow"
                  >
                    <span>Next Step</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-8 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg disabled:opacity-50 flex items-center gap-2"
                  >
                    <span>{isSubmitting ? 'Registering...' : 'Submit Vendor Application'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>

            </form>
          </div>
        )}

      </div>
    </div>
  );
}
