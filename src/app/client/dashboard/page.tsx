'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useShortlist } from '@/context/ShortlistContext';
import {
  User,
  Heart,
  MessageSquare,
  Sparkles,
  Calendar,
  MapPin,
  Clock,
  ArrowRight,
  LogOut,
  Building,
  CheckCircle2,
} from 'lucide-react';
import { formatPrice } from '@/lib/utils';

export default function ClientDashboardPage() {
  const { user, logout } = useAuth();
  const { count: shortlistCount } = useShortlist();

  const [enquiries, setEnquiries] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('/api/enquiries')
      .then((r) => r.json())
      .then((data) => {
        if (data.enquiries) {
          // If logged in, filter or show all recent for demo
          setEnquiries(data.enquiries.slice(0, 5));
        }
      })
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className="bg-slate-50 min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Welcome Header */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-brand-blue-800 text-white font-extrabold flex items-center justify-center text-xl shadow-md">
              {user?.name?.charAt(0) || 'A'}
            </div>
            <div>
              <span className="text-xs font-bold text-brand-gold-600 uppercase tracking-wider block">
                Event Client Portal
              </span>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
                Welcome back, {user?.name || 'Aarav'}!
              </h1>
              <p className="text-xs text-slate-500">{user?.email || 'client@ventzivo.com'}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/plan-event"
              className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs uppercase tracking-wider shadow flex items-center gap-1.5 transition-colors"
            >
              <Sparkles className="w-4 h-4" />
              <span>Plan New Event</span>
            </Link>
            <button
              onClick={logout}
              className="p-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100 transition-colors"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Quick Stat Tiles */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-brand-blue-50 text-brand-blue-800 flex items-center justify-center flex-shrink-0">
              <MessageSquare className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                Sent Enquiries
              </span>
              <p className="text-2xl font-black text-slate-900">{enquiries.length}</p>
              <span className="text-[11px] text-emerald-600 font-bold">Active conversations</span>
            </div>
          </div>

          <Link
            href="/shortlist"
            className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm flex items-center gap-4 hover:border-rose-300 transition-colors group"
          >
            <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-500 flex items-center justify-center flex-shrink-0">
              <Heart className="w-6 h-6 group-hover:scale-110 transition-transform" />
            </div>
            <div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                Saved Favourites
              </span>
              <p className="text-2xl font-black text-slate-900">{shortlistCount}</p>
              <span className="text-[11px] text-brand-blue-800 font-bold">Compare vendors →</span>
            </div>
          </Link>

          <Link
            href="/vendors"
            className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm flex items-center gap-4 hover:border-amber-300 transition-colors"
          >
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center flex-shrink-0">
              <Building className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                Explore Vendors
              </span>
              <p className="text-2xl font-black text-slate-900">30+ Categories</p>
              <span className="text-[11px] text-amber-700 font-bold">Find more services →</span>
            </div>
          </Link>
        </div>

        {/* My Enquiries Table */}
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h3 className="font-extrabold text-base text-slate-900">My Recent Enquiries</h3>
              <p className="text-xs text-slate-500">Track responses from vendors you contacted</p>
            </div>
            <Link href="/vendors" className="text-xs font-bold text-brand-blue-800 hover:underline">
              Browse More Vendors
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 uppercase font-semibold border-b border-slate-100">
                <tr>
                  <th className="px-6 py-3">Vendor</th>
                  <th className="px-6 py-3">Event & Date</th>
                  <th className="px-6 py-3">City</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3 text-right">Direct Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {enquiries.length > 0 ? (
                  enquiries.map((enq) => (
                    <tr key={enq.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4">
                        <Link
                          href={`/vendor/${enq.vendor?.slug}`}
                          className="font-bold text-slate-900 text-sm hover:text-brand-blue-800"
                        >
                          {enq.vendor?.businessName}
                        </Link>
                        <div className="text-slate-500 text-xs">
                          {enq.vendor?.category?.name || 'Event Vendor'}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-bold text-slate-800">
                          {enq.eventType?.name || 'Wedding'}
                        </span>
                        <div className="text-slate-500 text-[11px]">{enq.eventDate || 'Upcoming'}</div>
                      </td>
                      <td className="px-6 py-4">{enq.location}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase ${
                            enq.status === 'CONVERTED'
                              ? 'bg-emerald-100 text-emerald-800'
                              : enq.status === 'CONTACTED'
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-blue-100 text-blue-800'
                          }`}
                        >
                          {enq.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <Link
                          href={`/vendor/${enq.vendor?.slug}`}
                          className="px-3.5 py-1.5 rounded-xl bg-brand-blue-800 text-white font-bold text-xs hover:bg-brand-blue-900 inline-block shadow-sm"
                        >
                          View Profile
                        </Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="px-6 py-8 text-center text-slate-400">
                      You haven't sent any enquiries yet.{' '}
                      <Link href="/vendors" className="text-brand-blue-800 font-bold hover:underline">
                        Find vendors here!
                      </Link>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
