'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import {
  LayoutDashboard,
  User,
  Layers,
  PlusCircle,
  Image as ImageIcon,
  MessageSquare,
  TrendingUp,
  Star,
  Clock,
  MapPin,
  Bell,
  Settings,
  LogOut,
  ShieldCheck,
  AlertCircle,
  CheckCircle2,
  Eye,
  Heart,
  ChevronRight,
  Send,
  Building,
} from 'lucide-react';
import { formatPrice } from '@/lib/utils';

export default function VendorDashboardPage() {
  const router = useRouter();
  const { user, logout } = useAuth();

  const [activeTab, setActiveTab] = useState('overview');
  const [vendorData, setVendorData] = useState<any>(null);
  const [enquiries, setEnquiries] = useState<any[]>([]);
  const [services, setServices] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // New Service Modal State
  const [newServiceOpen, setNewServiceOpen] = useState(false);
  const [newServiceName, setNewServiceName] = useState('');
  const [newServicePrice, setNewServicePrice] = useState('25000');
  const [newServiceType, setNewServiceType] = useState('STARTING_FROM');
  const [newServiceDesc, setNewServiceDesc] = useState('');

  useEffect(() => {
    // If user is not vendor, prompt or redirect
    if (user && user.role !== 'VENDOR' && user.role !== 'ADMIN') {
      router.push('/login');
      return;
    }

    // Fetch initial vendor details
    const vendorEmail = user?.email || 'grandpalace@ventzivo.com';

    fetch('/api/vendors')
      .then((r) => r.json())
      .then((data) => {
        if (data.vendors && data.vendors.length > 0) {
          // Find matching vendor or fallback
          const v = data.vendors.find((item: any) => item.email === vendorEmail) || data.vendors[0];
          setVendorData(v);

          // Fetch enquiries for this vendor
          if (v) {
            fetch(`/api/enquiries?vendorId=${v.id}`)
              .then((r) => r.json())
              .then((eData) => {
                if (eData.enquiries) setEnquiries(eData.enquiries);
              });

            fetch(`/api/services?vendorId=${v.id}`)
              .then((r) => r.json())
              .then((sData) => {
                if (sData.services) setServices(sData.services);
              });
          }
        }
      })
      .finally(() => setIsLoading({} as any));
  }, [user, router]);

  const handleStatusChange = async (enquiryId: string, newStatus: string) => {
    try {
      await fetch('/api/enquiries', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: enquiryId, status: newStatus }),
      });

      setEnquiries((prev) =>
        prev.map((e) => (e.id === enquiryId ? { ...e, status: newStatus } : e))
      );
    } catch (e) {
      console.error(e);
    }
  };

  const handleAddService = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!vendorData) return;

    try {
      const res = await fetch('/api/services', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          vendorId: vendorData.id,
          categoryId: vendorData.categorySlug || 'venue',
          name: newServiceName,
          startingPrice: newServicePrice,
          pricingType: newServiceType,
          description: newServiceDesc,
        }),
      });

      const data = await res.json();
      if (data.service) {
        setServices([data.service, ...services]);
        setNewServiceOpen(false);
        setNewServiceName('');
        setNewServiceDesc('');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const isPending = user?.vendorStatus === 'PENDING_APPROVAL' || vendorData?.status === 'PENDING_APPROVAL';

  return (
    <div className="bg-slate-50 min-h-screen flex flex-col lg:flex-row">
      
      {/* VENDOR SIDEBAR */}
      <aside className="w-full lg:w-64 bg-slate-900 text-slate-300 p-5 flex flex-col justify-between flex-shrink-0 border-r border-slate-800">
        <div className="space-y-6">
          
          {/* Vendor Profile Mini Card */}
          <div className="p-3 bg-slate-800/80 rounded-2xl border border-slate-700/80 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 font-black flex items-center justify-center text-sm flex-shrink-0">
              {vendorData?.name?.charAt(0) || 'V'}
            </div>
            <div className="overflow-hidden">
              <h4 className="text-white font-bold text-xs truncate">
                {vendorData?.name || user?.businessName || 'My Vendor Business'}
              </h4>
              <span
                className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  isPending
                    ? 'bg-amber-500/20 text-amber-300'
                    : 'bg-emerald-500/20 text-emerald-300'
                }`}
              >
                {isPending ? 'Pending Approval' : 'Verified & Live'}
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1 text-xs font-semibold">
            {[
              { id: 'overview', label: 'Dashboard', icon: LayoutDashboard },
              { id: 'services', label: `My Services (${services.length})`, icon: Layers },
              { id: 'enquiries', label: `Enquiries & Leads (${enquiries.length})`, icon: MessageSquare },
              { id: 'profile', label: 'Business Profile', icon: User },
              { id: 'hours', label: 'Business Hours', icon: Clock },
              { id: 'areas', label: 'Service Areas', icon: MapPin },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-colors text-left ${
                    activeTab === item.id
                      ? 'bg-brand-blue-800 text-white font-bold'
                      : 'hover:bg-slate-800 text-slate-300'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="pt-6 border-t border-slate-800 space-y-2">
          {vendorData?.slug && (
            <Link
              href={`/vendor/${vendorData.slug}`}
              target="_blank"
              className="w-full flex items-center justify-center gap-1.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition-colors"
            >
              <span>View Public Profile</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          )}

          <button
            onClick={logout}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-rose-400 hover:bg-rose-500/10 text-xs font-semibold transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* MAIN DASHBOARD CONTENT */}
      <main className="flex-1 p-6 sm:p-8 lg:p-10 space-y-8 overflow-y-auto">
        
        {/* PENDING APPROVAL NOTICE BANNER (IF PENDING) */}
        {isPending && (
          <div className="p-5 rounded-3xl bg-amber-500/10 border border-amber-500/30 text-amber-900 flex items-start gap-4">
            <div className="w-10 h-10 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center flex-shrink-0 shadow">
              <Clock className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm sm:text-base text-amber-900">
                Application Under Admin Review ("PENDING APPROVAL")
              </h3>
              <p className="text-xs text-amber-800/90 mt-1 leading-relaxed">
                Your profile was successfully created and is waiting for administrator approval. Once verified, your listings and services will instantly appear to thousands of clients on the VentZivo marketplace. You can continue configuring your services and profile below!
              </p>
            </div>
          </div>
        )}

        {/* TOP STATS METRIC TILES */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-sm">
            <div className="flex items-center justify-between text-slate-500 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider">Profile Views</span>
              <Eye className="w-4 h-4 text-brand-blue-700" />
            </div>
            <p className="text-2xl font-black text-slate-900">
              {vendorData?.viewCount || 142}
            </p>
            <span className="text-[11px] text-emerald-600 font-bold">↑ +18% this week</span>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-sm">
            <div className="flex items-center justify-between text-slate-500 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider">Total Enquiries</span>
              <MessageSquare className="w-4 h-4 text-amber-500" />
            </div>
            <p className="text-2xl font-black text-slate-900">
              {enquiries.length > 0 ? enquiries.length : 12}
            </p>
            <span className="text-[11px] text-brand-blue-800 font-bold">Direct Client Leads</span>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-sm">
            <div className="flex items-center justify-between text-slate-500 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider">Shortlisted</span>
              <Heart className="w-4 h-4 text-rose-500" />
            </div>
            <p className="text-2xl font-black text-slate-900">
              {vendorData?.shortlistCount || 28}
            </p>
            <span className="text-[11px] text-slate-500 font-medium">Saved by clients</span>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-sm">
            <div className="flex items-center justify-between text-slate-500 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider">Rating & Reviews</span>
              <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
            </div>
            <p className="text-2xl font-black text-slate-900">
              {vendorData?.rating || 4.9} ★
            </p>
            <span className="text-[11px] text-slate-500 font-medium">
              {vendorData?.reviewCount || 48} verified reviews
            </span>
          </div>

        </div>

        {/* PROFILE COMPLETION PROGRESS BAR */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              Profile Completeness Score
            </span>
            <span className="text-xs font-extrabold text-brand-blue-800">85% Complete</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
            <div className="bg-gradient-to-r from-amber-500 to-brand-blue-800 h-2.5 rounded-full w-[85%]" />
          </div>
          <p className="text-[11px] text-slate-500 mt-2">
            Tip: Adding at least 3 services and 5 portfolio photos boosts your client enquiry rate by 4x.
          </p>
        </div>

        {/* RECENT ENQUIRIES & LEADS PIPELINE */}
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h3 className="font-extrabold text-base text-slate-900">
                Direct Enquiries & Leads Pipeline
              </h3>
              <p className="text-xs text-slate-500">Manage client conversations, event dates, and status</p>
            </div>
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-blue-50 text-brand-blue-800">
              {enquiries.length} Enquiries
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 uppercase font-semibold border-b border-slate-100">
                <tr>
                  <th className="px-6 py-3">Client</th>
                  <th className="px-6 py-3">Event & Date</th>
                  <th className="px-6 py-3">City & Guests</th>
                  <th className="px-6 py-3">Est. Budget</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {enquiries.length > 0 ? (
                  enquiries.map((enq) => (
                    <tr key={enq.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-bold text-slate-900 text-sm">{enq.name}</div>
                        <div className="text-slate-500 text-[11px]">{enq.mobile}</div>
                        {enq.email && <div className="text-slate-400 text-[10px]">{enq.email}</div>}
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-bold text-slate-800">{enq.eventType?.name || 'Wedding'}</span>
                        <div className="text-slate-500 text-[11px]">{enq.eventDate || 'Upcoming'}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div>{enq.location || 'Raipur'}</div>
                        <div className="text-slate-400 text-[10px]">{enq.guestCount ? `${enq.guestCount} Guests` : '-'}</div>
                      </td>
                      <td className="px-6 py-4 font-bold text-slate-900">
                        {enq.budget ? formatPrice(enq.budget) : 'Custom Quote'}
                      </td>
                      <td className="px-6 py-4">
                        <select
                          value={enq.status}
                          onChange={(e) => handleStatusChange(enq.id, e.target.value)}
                          className={`px-2.5 py-1 rounded-lg text-xs font-bold border focus:outline-none cursor-pointer ${
                            enq.status === 'NEW'
                              ? 'bg-blue-50 text-blue-700 border-blue-200'
                              : enq.status === 'CONTACTED'
                              ? 'bg-amber-50 text-amber-700 border-amber-200'
                              : enq.status === 'IN_DISCUSSION'
                              ? 'bg-purple-50 text-purple-700 border-purple-200'
                              : enq.status === 'CONVERTED'
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                              : 'bg-slate-100 text-slate-600 border-slate-200'
                          }`}
                        >
                          <option value="NEW">New</option>
                          <option value="CONTACTED">Contacted</option>
                          <option value="IN_DISCUSSION">In Discussion</option>
                          <option value="CONVERTED">Converted</option>
                          <option value="CLOSED">Closed</option>
                        </select>
                      </td>
                      <td className="px-6 py-4">
                        <a
                          href={`https://wa.me/${enq.mobile.replace(/[^0-9]/g, '')}`}
                          target="_blank"
                          rel="noreferrer"
                          className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white font-bold text-[11px] hover:bg-emerald-700 transition-colors shadow-sm inline-block"
                        >
                          WhatsApp
                        </a>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="px-6 py-8 text-center text-slate-400">
                      No enquiries received yet. As soon as clients contact you, they will appear here.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* SERVICES MANAGEMENT SECTION */}
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-extrabold text-base text-slate-900">
                Service Catalog & Pricing
              </h3>
              <p className="text-xs text-slate-500">List all individual packages and options clients can book</p>
            </div>
            <button
              onClick={() => setNewServiceOpen(true)}
              className="px-4 py-2 rounded-xl bg-brand-blue-800 text-white font-bold text-xs flex items-center gap-1.5 shadow"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Add Service</span>
            </button>
          </div>

          {/* Add Service Modal/Card */}
          {newServiceOpen && (
            <form onSubmit={handleAddService} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 text-xs animate-fade-in">
              <h4 className="font-bold text-slate-900 text-sm">Add New Service / Package</h4>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Service Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Candid Wedding Photography"
                    value={newServiceName}
                    onChange={(e) => setNewServiceName(e.target.value)}
                    className="w-full px-3 py-2 border rounded-xl bg-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Starting Price (₹) *</label>
                  <input
                    type="number"
                    required
                    value={newServicePrice}
                    onChange={(e) => setNewServicePrice(e.target.value)}
                    className="w-full px-3 py-2 border rounded-xl bg-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Pricing Model</label>
                  <select
                    value={newServiceType}
                    onChange={(e) => setNewServiceType(e.target.value)}
                    className="w-full px-3 py-2 border rounded-xl bg-white"
                  >
                    <option value="STARTING_FROM">Starting From</option>
                    <option value="FIXED">Fixed Price</option>
                    <option value="PER_DAY">Per Day</option>
                    <option value="PER_HOUR">Per Hour</option>
                    <option value="CUSTOM_QUOTE">Custom Quote</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-600 font-semibold mb-1">Description & Deliverables</label>
                <textarea
                  rows={2}
                  placeholder="Details of what is included in this package..."
                  value={newServiceDesc}
                  onChange={(e) => setNewServiceDesc(e.target.value)}
                  className="w-full px-3 py-2 border rounded-xl bg-white"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setNewServiceOpen(false)}
                  className="px-4 py-2 border rounded-xl text-slate-600 hover:bg-slate-100 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-brand-blue-800 text-white font-bold rounded-xl shadow"
                >
                  Save Service
                </button>
              </div>
            </form>
          )}

          {/* Service Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {services.map((s) => (
              <div key={s.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-bold text-amber-700 bg-amber-100/60 px-2 py-0.5 rounded">
                    {s.pricingType}
                  </span>
                  <h4 className="font-bold text-slate-900 text-sm mt-1">{s.name}</h4>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2">{s.description}</p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-200 flex items-center justify-between">
                  <span className="font-extrabold text-brand-blue-900 text-sm">
                    {formatPrice(s.startingPrice)}
                  </span>
                  <span className="text-[11px] text-emerald-600 font-bold">Active</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </main>
    </div>
  );
}
