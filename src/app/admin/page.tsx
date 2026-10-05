'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import {
  ShieldCheck,
  Building,
  Clock,
  CheckCircle2,
  XCircle,
  Users,
  MessageSquare,
  Sparkles,
  Layers,
  MapPin,
  FileText,
  Settings,
  HelpCircle,
  Star,
  Search,
  Filter,
  Check,
  X,
  Eye,
  LogOut,
  Edit,
  Save,
} from 'lucide-react';
import { formatPrice } from '@/lib/utils';

export default function AdminDashboardPage() {
  const router = useRouter();
  const { user, logout } = useAuth();

  const [activeTab, setActiveTab] = useState<'overview' | 'approvals' | 'vendors' | 'categories' | 'events' | 'cms' | 'enquiries'>('overview');
  
  // Data States
  const [vendors, setVendors] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [eventTypes, setEventTypes] = useState<any[]>([]);
  const [enquiries, setEnquiries] = useState<any[]>([]);
  const [cmsContent, setCmsContent] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Rejection Modal State
  const [rejectionModalOpen, setRejectionModalOpen] = useState(false);
  const [selectedVendorId, setSelectedVendorId] = useState<string | null>(null);
  const [rejectionReason, setRejectionReason] = useState('Missing business documentation or non-compliant images.');

  // Category Add State
  const [newCatName, setNewCatName] = useState('');
  const [newCatDesc, setNewCatDesc] = useState('');

  // Event Type Add State
  const [newEtName, setNewEtName] = useState('');
  const [newEtDesc, setNewEtDesc] = useState('');

  // Load Admin Data
  const loadData = async () => {
    setIsLoading(true);
    try {
      const [vRes, cRes, etRes, enqRes, cmsRes] = await Promise.all([
        fetch('/api/vendors?status=ALL').then((r) => r.json()),
        fetch('/api/categories').then((r) => r.json()),
        fetch('/api/event-types').then((r) => r.json()),
        fetch('/api/enquiries').then((r) => r.json()),
        fetch('/api/cms').then((r) => r.json()),
      ]);

      if (vRes.vendors) setVendors(vRes.vendors);
      if (cRes.categories) setCategories(cRes.categories);
      if (etRes.eventTypes) setEventTypes(etRes.eventTypes);
      if (enqRes.enquiries) setEnquiries(enqRes.enquiries);
      if (cmsRes.content) setCmsContent(cmsRes.content);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Vendor Action: Approve, Reject, Verify, Feature, Suspend
  const handleVendorAction = async (vendorId: string, action: string, reason?: string) => {
    try {
      await fetch(`/api/vendors/${vendorId}/approval`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action,
          rejectionReason: reason,
        }),
      });

      // Reload data
      loadData();
      setRejectionModalOpen(false);
    } catch (err) {
      console.error(err);
    }
  };

  // Add Category Handler
  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCatName) return;
    try {
      await fetch('/api/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newCatName, description: newCatDesc }),
      });
      setNewCatName('');
      setNewCatDesc('');
      loadData();
    } catch (e) {
      console.error(e);
    }
  };

  // Add Event Type Handler
  const handleAddEventType = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEtName) return;
    try {
      await fetch('/api/event-types', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newEtName, description: newEtDesc }),
      });
      setNewEtName('');
      setNewEtDesc('');
      loadData();
    } catch (e) {
      console.error(e);
    }
  };

  // Save CMS Content Handler
  const handleSaveCMS = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch('/api/cms', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cmsContent),
      });
      alert('Website Homepage & SEO Content Updated Successfully!');
    } catch (e) {
      console.error(e);
    }
  };

  // Calculate Metrics
  const totalVendors = vendors.length;
  const pendingVendors = vendors.filter((v) => v.status === 'PENDING_APPROVAL');
  const approvedVendors = vendors.filter((v) => v.status === 'APPROVED' || v.status === 'VERIFIED');
  const verifiedVendors = vendors.filter((v) => v.isVerified);

  return (
    <div className="bg-slate-50 min-h-screen flex flex-col lg:flex-row">
      
      {/* ADMIN SIDEBAR */}
      <aside className="w-full lg:w-64 bg-slate-950 text-slate-300 p-5 flex flex-col justify-between flex-shrink-0 border-r border-slate-800">
        <div className="space-y-6">
          <div className="flex items-center gap-3 px-2 py-1">
            <div className="w-9 h-9 rounded-xl bg-purple-600 text-white font-black flex items-center justify-center shadow">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-white font-extrabold text-sm">VentZivo Admin</h2>
              <span className="text-[10px] text-purple-400 font-bold tracking-widest uppercase">
                Master Control
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1 text-xs font-semibold">
            {[
              { id: 'overview', label: 'Dashboard Overview', icon: ShieldCheck },
              {
                id: 'approvals',
                label: `Vendor Approvals (${pendingVendors.length})`,
                icon: Clock,
                badge: pendingVendors.length > 0 ? pendingVendors.length : undefined,
              },
              { id: 'vendors', label: `All Vendors (${vendors.length})`, icon: Building },
              { id: 'enquiries', label: `Client Enquiries (${enquiries.length})`, icon: MessageSquare },
              { id: 'categories', label: `Categories (${categories.length})`, icon: Layers },
              { id: 'events', label: `Event Types (${eventTypes.length})`, icon: Sparkles },
              { id: 'cms', label: 'Homepage & CMS Editor', icon: FileText },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id as any)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-colors text-left ${
                    activeTab === item.id
                      ? 'bg-purple-700 text-white font-bold'
                      : 'hover:bg-slate-900 text-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="px-2 py-0.5 rounded-full bg-amber-500 text-slate-950 font-black text-[10px]">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="pt-6 border-t border-slate-900 space-y-2 text-xs">
          <Link
            href="/"
            className="w-full flex items-center justify-center gap-1.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white font-bold transition-colors"
          >
            <span>Back to Public Website</span>
          </Link>
          <button
            onClick={logout}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-rose-400 hover:bg-rose-500/10 font-semibold transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* MAIN ADMIN CONTENT AREA */}
      <main className="flex-1 p-6 sm:p-8 lg:p-10 space-y-8 overflow-y-auto">
        
        {/* 1. OVERVIEW TAB */}
        {activeTab === 'overview' && (
          <div className="space-y-8 animate-fade-in">
            <div>
              <span className="text-xs font-bold text-purple-700 uppercase tracking-wider block">
                Platform Statistics
              </span>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
                VentZivo Operations Dashboard
              </h1>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-sm">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  Total Vendors
                </span>
                <p className="text-3xl font-black text-slate-900">{totalVendors}</p>
                <span className="text-xs text-brand-blue-800 font-bold">Registered Businesses</span>
              </div>

              <div className="bg-white p-5 rounded-3xl border border-amber-200 shadow-sm bg-gradient-to-br from-amber-50/50 to-white">
                <span className="text-xs font-bold text-amber-700 uppercase tracking-wider block mb-1">
                  Pending Approvals
                </span>
                <p className="text-3xl font-black text-amber-600">{pendingVendors.length}</p>
                <button
                  onClick={() => setActiveTab('approvals')}
                  className="text-xs text-amber-800 font-bold hover:underline"
                >
                  Review Applications →
                </button>
              </div>

              <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-sm">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  Approved / Live
                </span>
                <p className="text-3xl font-black text-emerald-600">{approvedVendors.length}</p>
                <span className="text-xs text-emerald-700 font-bold">
                  {verifiedVendors.length} Verified Badges
                </span>
              </div>

              <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-sm">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  Client Enquiries
                </span>
                <p className="text-3xl font-black text-brand-blue-900">{enquiries.length}</p>
                <span className="text-xs text-slate-500 font-medium">Direct Leads</span>
              </div>
            </div>

            {/* Pending Approvals Quick Alert Card */}
            {pendingVendors.length > 0 && (
              <div className="p-6 rounded-3xl bg-amber-50 border border-amber-200 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-amber-600" />
                    <h3 className="font-extrabold text-sm sm:text-base text-amber-950">
                      {pendingVendors.length} Vendor Application(s) Awaiting Review
                    </h3>
                  </div>
                  <button
                    onClick={() => setActiveTab('approvals')}
                    className="text-xs font-bold text-amber-900 bg-amber-200/80 hover:bg-amber-200 px-3 py-1.5 rounded-xl transition-colors"
                  >
                    View All
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  {pendingVendors.slice(0, 2).map((v) => (
                    <div key={v.id} className="p-4 bg-white rounded-2xl border border-amber-200 flex items-center justify-between gap-3 shadow-sm">
                      <div>
                        <h4 className="font-bold text-slate-900 text-sm">{v.name}</h4>
                        <p className="text-slate-500 text-xs">{v.category} • {v.city}</p>
                        <p className="text-slate-400 text-[11px]">Owner: {v.ownerName} ({v.mobile})</p>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => handleVendorAction(v.id, 'APPROVE')}
                          className="px-3 py-1.5 rounded-xl bg-emerald-600 text-white font-bold hover:bg-emerald-700"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => {
                            setSelectedVendorId(v.id);
                            setRejectionModalOpen(true);
                          }}
                          className="px-3 py-1.5 rounded-xl bg-rose-50 text-rose-700 font-bold hover:bg-rose-100"
                        >
                          Reject
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Platform Health Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-3">
                <h3 className="font-extrabold text-slate-900 text-sm">Event Categories ({categories.length})</h3>
                <div className="flex flex-wrap gap-1.5">
                  {categories.map((c) => (
                    <span key={c.id} className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 font-semibold">
                      {c.name}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-3">
                <h3 className="font-extrabold text-slate-900 text-sm">Event Types ({eventTypes.length})</h3>
                <div className="flex flex-wrap gap-1.5 max-h-36 overflow-y-auto">
                  {eventTypes.map((et) => (
                    <span key={et.id} className="px-2.5 py-1 rounded-lg bg-amber-50 text-amber-800 font-semibold">
                      {et.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 2. VENDOR APPROVALS TAB */}
        {activeTab === 'approvals' && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <span className="text-xs font-bold text-amber-600 uppercase tracking-wider block">
                Verification Queue
              </span>
              <h2 className="text-2xl font-black text-slate-900">
                Vendor Account Approvals
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Vendors in this queue have registered but are not yet visible to clients. Review their business info and approve or reject.
              </p>
            </div>

            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-500 uppercase font-semibold border-b border-slate-100">
                  <tr>
                    <th className="px-6 py-3">Business / Owner</th>
                    <th className="px-6 py-3">Category & City</th>
                    <th className="px-6 py-3">Experience & Price</th>
                    <th className="px-6 py-3">Status</th>
                    <th className="px-6 py-3 text-right">Verification Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                  {pendingVendors.length > 0 ? (
                    pendingVendors.map((v) => (
                      <tr key={v.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="font-bold text-slate-900 text-sm">{v.name}</div>
                          <div className="text-slate-500 text-xs">Owner: {v.ownerName}</div>
                          <div className="text-slate-400 text-[10px]">{v.email} • {v.mobile}</div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="font-bold text-brand-blue-800">{v.category}</span>
                          <div className="text-slate-500 text-xs">{v.city}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div>{v.experienceYears}+ Years Exp</div>
                          <div className="font-extrabold text-slate-900">{formatPrice(v.startingPrice)}</div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-amber-100 text-amber-800">
                            Pending Approval
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => handleVendorAction(v.id, 'APPROVE')}
                              className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm flex items-center gap-1"
                            >
                              <Check className="w-3.5 h-3.5" />
                              <span>Approve</span>
                            </button>
                            <button
                              onClick={() => handleVendorAction(v.id, 'VERIFY')}
                              className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-sm flex items-center gap-1"
                            >
                              <ShieldCheck className="w-3.5 h-3.5" />
                              <span>Approve & Verify</span>
                            </button>
                            <button
                              onClick={() => {
                                setSelectedVendorId(v.id);
                                setRejectionModalOpen(true);
                              }}
                              className="px-3 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs flex items-center gap-1"
                            >
                              <X className="w-3.5 h-3.5" />
                              <span>Reject</span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="px-6 py-12 text-center text-slate-400">
                        No vendors currently pending approval. All applications are reviewed!
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 3. ALL VENDORS TAB */}
        {activeTab === 'vendors' && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold text-purple-700 uppercase tracking-wider block">
                  Vendor Directory
                </span>
                <h2 className="text-2xl font-black text-slate-900">
                  Manage All Registered Vendors ({vendors.length})
                </h2>
              </div>
            </div>

            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-500 uppercase font-semibold border-b border-slate-100">
                  <tr>
                    <th className="px-6 py-3">Business</th>
                    <th className="px-6 py-3">Category & City</th>
                    <th className="px-6 py-3">Status</th>
                    <th className="px-6 py-3">Featured / Verified</th>
                    <th className="px-6 py-3 text-right">Controls</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                  {vendors.map((v) => (
                    <tr key={v.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-bold text-slate-900 text-sm">{v.name}</div>
                        <div className="text-slate-500 text-xs">{v.ownerName} • {v.mobile}</div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-bold text-brand-blue-800">{v.category}</span>
                        <div className="text-slate-500 text-xs">{v.city}</div>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase ${
                            v.status === 'VERIFIED'
                              ? 'bg-emerald-100 text-emerald-800'
                              : v.status === 'APPROVED'
                              ? 'bg-blue-100 text-blue-800'
                              : v.status === 'PENDING_APPROVAL'
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-rose-100 text-rose-800'
                          }`}
                        >
                          {v.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleVendorAction(v.id, 'TOGGLE_FEATURED')}
                            className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              v.isFeatured
                                ? 'bg-amber-500 text-white'
                                : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                            }`}
                          >
                            {v.isFeatured ? '★ Featured' : 'Feature'}
                          </button>
                          <button
                            onClick={() => handleVendorAction(v.id, v.isVerified ? 'UNVERIFY' : 'VERIFY')}
                            className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              v.isVerified
                                ? 'bg-emerald-600 text-white'
                                : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                            }`}
                          >
                            {v.isVerified ? '✓ Verified' : 'Verify'}
                          </button>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            href={`/vendor/${v.slug}`}
                            target="_blank"
                            className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700"
                            title="View Public Profile"
                          >
                            <Eye className="w-4 h-4" />
                          </Link>
                          {v.status !== 'SUSPENDED' ? (
                            <button
                              onClick={() => handleVendorAction(v.id, 'SUSPEND')}
                              className="px-2 py-1 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-[10px]"
                            >
                              Suspend
                            </button>
                          ) : (
                            <button
                              onClick={() => handleVendorAction(v.id, 'ACTIVATE')}
                              className="px-2 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold text-[10px]"
                            >
                              Activate
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 4. DYNAMIC CATEGORIES MANAGEMENT TAB */}
        {activeTab === 'categories' && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <span className="text-xs font-bold text-purple-700 uppercase tracking-wider block">
                Database-Driven
              </span>
              <h2 className="text-2xl font-black text-slate-900">
                Manage Vendor Categories ({categories.length})
              </h2>
            </div>

            {/* Add Category Form */}
            <form onSubmit={handleAddCategory} className="p-5 bg-white rounded-3xl border border-slate-200 shadow-sm space-y-3">
              <h3 className="font-bold text-slate-900 text-sm">Add New Category</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Category Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Wedding Pandits & Purohits"
                    value={newCatName}
                    onChange={(e) => setNewCatName(e.target.value)}
                    className="w-full px-3 py-2 border rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Description</label>
                  <input
                    type="text"
                    placeholder="Short description for SEO and cards"
                    value={newCatDesc}
                    onChange={(e) => setNewCatDesc(e.target.value)}
                    className="w-full px-3 py-2 border rounded-xl"
                  />
                </div>
              </div>
              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-purple-700 text-white font-bold text-xs hover:bg-purple-800 shadow"
                >
                  + Add Category to Database
                </button>
              </div>
            </form>

            {/* Existing Categories Table */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-500 uppercase font-semibold border-b border-slate-100">
                  <tr>
                    <th className="px-6 py-3">Category Name</th>
                    <th className="px-6 py-3">Slug</th>
                    <th className="px-6 py-3">Subcategories</th>
                    <th className="px-6 py-3">Vendors</th>
                    <th className="px-6 py-3 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                  {categories.map((c) => (
                    <tr key={c.id}>
                      <td className="px-6 py-4 font-bold text-slate-900">{c.name}</td>
                      <td className="px-6 py-4 text-slate-500 font-mono text-[11px]">{c.slug}</td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-0.5 rounded bg-slate-100 font-bold">
                          {c.subCategories?.length || 0} Subcategories
                        </span>
                      </td>
                      <td className="px-6 py-4 font-extrabold text-brand-blue-800">
                        {c._count?.vendors || 0}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <span className="text-emerald-600 font-bold">Active</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 5. DYNAMIC EVENT TYPES TAB */}
        {activeTab === 'events' && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <span className="text-xs font-bold text-purple-700 uppercase tracking-wider block">
                Database-Driven
              </span>
              <h2 className="text-2xl font-black text-slate-900">
                Manage Event Types ({eventTypes.length})
              </h2>
            </div>

            {/* Add Event Type Form */}
            <form onSubmit={handleAddEventType} className="p-5 bg-white rounded-3xl border border-slate-200 shadow-sm space-y-3">
              <h3 className="font-bold text-slate-900 text-sm">Add New Event Type</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Event Type Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Kitty Party or Alumni Meet"
                    value={newEtName}
                    onChange={(e) => setNewEtName(e.target.value)}
                    className="w-full px-3 py-2 border rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Description</label>
                  <input
                    type="text"
                    placeholder="Description of the event"
                    value={newEtDesc}
                    onChange={(e) => setNewEtDesc(e.target.value)}
                    className="w-full px-3 py-2 border rounded-xl"
                  />
                </div>
              </div>
              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-purple-700 text-white font-bold text-xs hover:bg-purple-800 shadow"
                >
                  + Add Event Type to Database
                </button>
              </div>
            </form>

            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-500 uppercase font-semibold border-b border-slate-100">
                  <tr>
                    <th className="px-6 py-3">Event Type</th>
                    <th className="px-6 py-3">Slug</th>
                    <th className="px-6 py-3">Vendors Serving</th>
                    <th className="px-6 py-3 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                  {eventTypes.map((et) => (
                    <tr key={et.id}>
                      <td className="px-6 py-4 font-bold text-slate-900">{et.name}</td>
                      <td className="px-6 py-4 text-slate-500 font-mono text-[11px]">{et.slug}</td>
                      <td className="px-6 py-4 font-extrabold text-amber-700">
                        {et._count?.vendors || 0}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <span className="text-emerald-600 font-bold">Active</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 6. HOMEPAGE CMS & CONTENT EDITOR TAB */}
        {activeTab === 'cms' && cmsContent && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <span className="text-xs font-bold text-purple-700 uppercase tracking-wider block">
                Admin Content Control
              </span>
              <h2 className="text-2xl font-black text-slate-900">
                Homepage & SEO CMS Editor
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Edit website headlines, subheadings, contact numbers, and SEO metadata in real time without altering source code.
              </p>
            </div>

            <form onSubmit={handleSaveCMS} className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6 text-xs sm:text-sm">
              <div className="space-y-4">
                <h3 className="font-extrabold text-slate-900 text-sm border-l-4 border-purple-700 pl-3">
                  Hero Section Text
                </h3>
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Hero Main Heading</label>
                  <input
                    type="text"
                    value={cmsContent.heroHeading || ''}
                    onChange={(e) => setCmsContent({ ...cmsContent, heroHeading: e.target.value })}
                    className="w-full px-3 py-2 border rounded-xl font-bold text-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Hero Subheading</label>
                  <textarea
                    rows={2}
                    value={cmsContent.heroSubheading || ''}
                    onChange={(e) => setCmsContent({ ...cmsContent, heroSubheading: e.target.value })}
                    className="w-full px-3 py-2 border rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Top Announcement Banner</label>
                  <input
                    type="text"
                    value={cmsContent.bannerText || ''}
                    onChange={(e) => setCmsContent({ ...cmsContent, bannerText: e.target.value })}
                    className="w-full px-3 py-2 border rounded-xl"
                  />
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t border-slate-100">
                <h3 className="font-extrabold text-slate-900 text-sm border-l-4 border-brand-blue-800 pl-3">
                  SEO & Search Engine Metadata
                </h3>
                <div>
                  <label className="block text-slate-700 font-bold mb-1">SEO Title Tag</label>
                  <input
                    type="text"
                    value={cmsContent.seoTitle || ''}
                    onChange={(e) => setCmsContent({ ...cmsContent, seoTitle: e.target.value })}
                    className="w-full px-3 py-2 border rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1">SEO Meta Description</label>
                  <textarea
                    rows={2}
                    value={cmsContent.seoDescription || ''}
                    onChange={(e) => setCmsContent({ ...cmsContent, seoDescription: e.target.value })}
                    className="w-full px-3 py-2 border rounded-xl"
                  />
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t border-slate-100">
                <h3 className="font-extrabold text-slate-900 text-sm border-l-4 border-amber-600 pl-3">
                  Contact & Support Information
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Support Email</label>
                    <input
                      type="email"
                      value={cmsContent.contactEmail || ''}
                      onChange={(e) => setCmsContent({ ...cmsContent, contactEmail: e.target.value })}
                      className="w-full px-3 py-2 border rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Support Phone</label>
                    <input
                      type="text"
                      value={cmsContent.contactPhone || ''}
                      onChange={(e) => setCmsContent({ ...cmsContent, contactPhone: e.target.value })}
                      className="w-full px-3 py-2 border rounded-xl"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end">
                <button
                  type="submit"
                  className="px-8 py-3 rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs uppercase tracking-wider shadow-lg flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  <span>Save CMS Changes</span>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* 7. ALL ENQUIRIES TAB */}
        {activeTab === 'enquiries' && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <span className="text-xs font-bold text-purple-700 uppercase tracking-wider block">
                Platform Monitor
              </span>
              <h2 className="text-2xl font-black text-slate-900">
                All Marketplace Enquiries ({enquiries.length})
              </h2>
            </div>

            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-500 uppercase font-semibold border-b border-slate-100">
                  <tr>
                    <th className="px-6 py-3">Client</th>
                    <th className="px-6 py-3">Vendor</th>
                    <th className="px-6 py-3">Event</th>
                    <th className="px-6 py-3">Budget</th>
                    <th className="px-6 py-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                  {enquiries.map((enq) => (
                    <tr key={enq.id}>
                      <td className="px-6 py-4">
                        <div className="font-bold text-slate-900">{enq.name}</div>
                        <div className="text-slate-500 text-[11px]">{enq.mobile}</div>
                      </td>
                      <td className="px-6 py-4 font-bold text-brand-blue-800">
                        {enq.vendor?.businessName}
                      </td>
                      <td className="px-6 py-4">{enq.eventType?.name || 'Wedding'}</td>
                      <td className="px-6 py-4 font-extrabold text-slate-900">
                        {enq.budget ? formatPrice(enq.budget) : 'Custom'}
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-0.5 rounded font-bold bg-slate-100">
                          {enq.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </main>

      {/* REJECTION REASON MODAL */}
      {rejectionModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-slate-100 space-y-4">
            <h3 className="font-bold text-base text-slate-900">Provide Rejection Reason</h3>
            <p className="text-xs text-slate-500">
              This message will be recorded on the vendor profile and sent to the vendor via notification.
            </p>
            <textarea
              rows={3}
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              className="w-full p-3 border border-slate-300 rounded-xl text-xs focus:outline-none"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setRejectionModalOpen(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (selectedVendorId) {
                    handleVendorAction(selectedVendorId, 'REJECT', rejectionReason);
                  }
                }}
                className="px-5 py-2 text-xs font-bold bg-rose-600 text-white rounded-xl hover:bg-rose-700"
              >
                Confirm Rejection
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
