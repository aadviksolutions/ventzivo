'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Logo from '@/components/brand/Logo';
import { useAuth } from '@/context/AuthContext';
import {
  Mail,
  Lock,
  ArrowRight,
  Shield,
  Building,
  User,
  Clock,
  CheckCircle,
} from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { login, loginAsDemo } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Invalid credentials');
      }

      login(data.user);

      // Route based on role
      if (data.user.role === 'ADMIN') {
        router.push('/admin');
      } else if (data.user.role === 'VENDOR') {
        router.push('/vendor/dashboard');
      } else {
        router.push('/client/dashboard');
      }
    } catch (err: any) {
      setError(err.message || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoClick = (role: 'ADMIN' | 'VENDOR' | 'CLIENT' | 'PENDING_VENDOR') => {
    loginAsDemo(role);
    if (role === 'ADMIN') router.push('/admin');
    else if (role === 'VENDOR' || role === 'PENDING_VENDOR') router.push('/vendor/dashboard');
    else router.push('/client/dashboard');
  };

  return (
    <div className="bg-slate-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-center">
      <div className="max-w-md w-full">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-block bg-white p-2.5 rounded-2xl shadow-sm border border-slate-200 mb-4">
            <Logo size="md" />
          </div>
          <h1 className="text-2xl font-black text-slate-900">Sign in to VentZivo</h1>
          <p className="text-slate-600 text-xs mt-1">
            Access your account as an Administrator, Vendor, or Event Client
          </p>
        </div>

        {/* Demo Fast-Login Cards */}
        <div className="bg-white rounded-3xl p-5 border border-amber-200 shadow-sm mb-6 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-700">
              ⚡ Instant One-Click Demo Logins:
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <button
              onClick={() => handleDemoClick('ADMIN')}
              className="p-2.5 rounded-xl border border-slate-200 hover:border-purple-400 bg-purple-50/50 hover:bg-purple-50 text-slate-800 font-bold flex items-center gap-2 text-left transition-colors"
            >
              <Shield className="w-4 h-4 text-purple-600 flex-shrink-0" />
              <div>
                <span className="block text-slate-900 leading-tight">Admin</span>
                <span className="text-[10px] text-purple-700 font-medium">Control Panel</span>
              </div>
            </button>

            <button
              onClick={() => handleDemoClick('VENDOR')}
              className="p-2.5 rounded-xl border border-slate-200 hover:border-amber-400 bg-amber-50/50 hover:bg-amber-50 text-slate-800 font-bold flex items-center gap-2 text-left transition-colors"
            >
              <Building className="w-4 h-4 text-amber-600 flex-shrink-0" />
              <div>
                <span className="block text-slate-900 leading-tight">Verified Vendor</span>
                <span className="text-[10px] text-amber-700 font-medium">Grand Palace</span>
              </div>
            </button>

            <button
              onClick={() => handleDemoClick('PENDING_VENDOR')}
              className="p-2.5 rounded-xl border border-slate-200 hover:border-orange-400 bg-orange-50/50 hover:bg-orange-50 text-slate-800 font-bold flex items-center gap-2 text-left transition-colors"
            >
              <Clock className="w-4 h-4 text-orange-600 flex-shrink-0" />
              <div>
                <span className="block text-slate-900 leading-tight">Pending Vendor</span>
                <span className="text-[10px] text-orange-700 font-medium">Awaiting Approval</span>
              </div>
            </button>

            <button
              onClick={() => handleDemoClick('CLIENT')}
              className="p-2.5 rounded-xl border border-slate-200 hover:border-blue-400 bg-blue-50/50 hover:bg-blue-50 text-slate-800 font-bold flex items-center gap-2 text-left transition-colors"
            >
              <User className="w-4 h-4 text-brand-blue-700 flex-shrink-0" />
              <div>
                <span className="block text-slate-900 leading-tight">Client</span>
                <span className="text-[10px] text-brand-blue-700 font-medium">Aarav Sharma</span>
              </div>
            </button>
          </div>
        </div>

        {/* Standard Email/Password Login Form */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xl space-y-4">
          {error && (
            <div className="p-3 rounded-xl bg-rose-50 text-rose-700 border border-rose-200 text-xs font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="email"
                  required
                  placeholder="admin@ventzivo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-3 py-2.5 border border-slate-300 rounded-xl text-xs sm:text-sm focus:ring-2 focus:ring-brand-blue-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-3 py-2.5 border border-slate-300 rounded-xl text-xs sm:text-sm focus:ring-2 focus:ring-brand-blue-500 focus:outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-xl bg-brand-blue-800 hover:bg-brand-blue-900 text-white font-bold text-xs uppercase tracking-wider shadow-md disabled:opacity-50 flex items-center justify-center gap-2 transition-all"
            >
              <span>{isLoading ? 'Signing in...' : 'Sign In'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="pt-4 border-t border-slate-100 text-center text-xs text-slate-600">
            Are you a service provider?{' '}
            <Link href="/vendor/register" className="font-bold text-brand-blue-800 hover:underline">
              Register as Vendor Free
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
