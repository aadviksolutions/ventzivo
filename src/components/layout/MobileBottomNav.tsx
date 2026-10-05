'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useShortlist } from '@/context/ShortlistContext';
import { useAuth } from '@/context/AuthContext';
import {
  Compass,
  Search,
  Sparkles,
  Heart,
  User,
  LayoutDashboard,
  ShieldCheck,
} from 'lucide-react';

export default function MobileBottomNav() {
  const pathname = usePathname();
  const { count: shortlistCount } = useShortlist();
  const { user } = useAuth();

  const getAccountHref = () => {
    if (!user) return '/login';
    if (user.role === 'ADMIN') return '/admin';
    if (user.role === 'VENDOR') return '/vendor/dashboard';
    return '/client/dashboard';
  };

  const navItems = [
    { label: 'Explore', href: '/', icon: Compass },
    { label: 'Search', href: '/vendors', icon: Search },
    { label: 'Plan', href: '/plan-event', icon: Sparkles, highlight: true },
    { label: 'Shortlist', href: '/shortlist', icon: Heart, badge: shortlistCount },
    {
      label: user ? user.role : 'Account',
      href: getAccountHref(),
      icon: user?.role === 'ADMIN' ? ShieldCheck : user?.role === 'VENDOR' ? LayoutDashboard : User,
    },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 py-1.5 px-3 shadow-lg">
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          if (item.highlight) {
            return (
              <Link
                key={item.label}
                href={item.href}
                className="flex flex-col items-center justify-center -mt-5"
              >
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-amber-500 via-amber-600 to-amber-400 text-white flex items-center justify-center shadow-lg shadow-amber-500/30 transform active:scale-95 transition-transform">
                  <Icon className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-bold text-amber-600 mt-1">
                  {item.label}
                </span>
              </Link>
            );
          }

          return (
            <Link
              key={item.label}
              href={item.href}
              className={`relative flex flex-col items-center justify-center py-1 px-2 rounded-lg transition-colors ${
                isActive ? 'text-brand-blue-800' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5px]' : 'stroke-[1.8px]'}`} />
                {item.badge !== undefined && item.badge > 0 && (
                  <span className="absolute -top-1 -right-2 bg-rose-500 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className={`text-[10px] mt-0.5 ${isActive ? 'font-bold' : 'font-medium'}`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
