'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Shield, Building, Clock, User, ChevronUp, ChevronDown, Check } from 'lucide-react';

export default function DemoBar() {
  const { user, loginAsDemo, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-16 md:bottom-4 right-4 z-50">
      <div className="bg-slate-900/95 text-white backdrop-blur-md border border-slate-700 rounded-2xl shadow-2xl p-2.5 max-w-sm transition-all">
        
        {/* Toggle Header */}
        <div
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-between gap-3 cursor-pointer select-none px-2 py-1"
        >
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-xs font-bold tracking-wide uppercase text-amber-400">
              Role Switcher
            </span>
            <span className="text-[11px] text-slate-300 bg-slate-800 px-2 py-0.5 rounded-full">
              {user ? `${user.role}: ${user.name.split(' ')[0]}` : 'Guest / Not Logged In'}
            </span>
          </div>
          <button className="text-slate-400 hover:text-white">
            {isOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
          </button>
        </div>

        {/* Expandable Menu */}
        {isOpen && (
          <div className="mt-2 pt-2 border-t border-slate-800 space-y-1.5 text-xs">
            <p className="text-[10px] text-slate-400 px-2">Instant demo switch to test any user journey:</p>

            <button
              onClick={() => {
                loginAsDemo('ADMIN');
                setIsOpen(false);
              }}
              className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-left transition-colors ${
                user?.role === 'ADMIN'
                  ? 'bg-brand-blue-700 text-white font-bold'
                  : 'hover:bg-slate-800 text-slate-200'
              }`}
            >
              <div className="flex items-center gap-2">
                <Shield className="w-3.5 h-3.5 text-purple-400" />
                <span>Admin (Control Panel)</span>
              </div>
              {user?.role === 'ADMIN' && <Check className="w-3.5 h-3.5" />}
            </button>

            <button
              onClick={() => {
                loginAsDemo('VENDOR');
                setIsOpen(false);
              }}
              className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-left transition-colors ${
                user?.role === 'VENDOR' && user?.vendorStatus === 'VERIFIED'
                  ? 'bg-amber-600 text-white font-bold'
                  : 'hover:bg-slate-800 text-slate-200'
              }`}
            >
              <div className="flex items-center gap-2">
                <Building className="w-3.5 h-3.5 text-amber-400" />
                <span>Verified Vendor (The Grand Palace)</span>
              </div>
              {user?.role === 'VENDOR' && user?.vendorStatus === 'VERIFIED' && <Check className="w-3.5 h-3.5" />}
            </button>

            <button
              onClick={() => {
                loginAsDemo('PENDING_VENDOR');
                setIsOpen(false);
              }}
              className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-left transition-colors ${
                user?.role === 'VENDOR' && user?.vendorStatus === 'PENDING_APPROVAL'
                  ? 'bg-orange-600 text-white font-bold'
                  : 'hover:bg-slate-800 text-slate-200'
              }`}
            >
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-orange-400" />
                <span>Pending Vendor (Awaiting Approval)</span>
              </div>
              {user?.role === 'VENDOR' && user?.vendorStatus === 'PENDING_APPROVAL' && <Check className="w-3.5 h-3.5" />}
            </button>

            <button
              onClick={() => {
                loginAsDemo('CLIENT');
                setIsOpen(false);
              }}
              className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-left transition-colors ${
                user?.role === 'CLIENT'
                  ? 'bg-blue-600 text-white font-bold'
                  : 'hover:bg-slate-800 text-slate-200'
              }`}
            >
              <div className="flex items-center gap-2">
                <User className="w-3.5 h-3.5 text-blue-400" />
                <span>Client (Aarav Sharma)</span>
              </div>
              {user?.role === 'CLIENT' && <Check className="w-3.5 h-3.5" />}
            </button>

            {user && (
              <button
                onClick={() => {
                  logout();
                  setIsOpen(false);
                }}
                className="w-full text-center py-1 text-[11px] text-rose-400 hover:text-rose-300 font-semibold pt-1 border-t border-slate-800"
              >
                Log Out to Guest Mode
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
