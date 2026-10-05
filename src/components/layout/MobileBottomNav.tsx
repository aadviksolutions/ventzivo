'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useShortlist } from '@/context/ShortlistContext';
import { useAuth } from '@/context/AuthContext';
import {
  Home,
  Calendar,
  Users,
  Heart,
  User,
  LayoutDashboard,
  ShieldCheck,
} from 'lucide-react';

export default function MobileBottomNav() {
  const pathname = usePathname();
  const { count: shortlistCount } = useShortlist();
  const { user } = useAuth();

  const getProfileHref = () => {
    if (!user) return '/login';
    if (user.role === 'ADMIN') return '/admin';
    if (user.role === 'VENDOR') return '/vendor/dashboard';
    return '/client/dashboard';
  };

  const navItems = [
    { label: 'Home', href: '/', icon: Home },
    { label: 'Events', href: '/events', icon: Calendar },
    { label: 'Vendors', href: '/vendors', icon: Users },
    { label: 'Shortlist', href: '/shortlist', icon: Heart, badge: shortlistCount },
    {
      label: 'Profile',
      href: getProfileHref(),
      icon: user?.role === 'ADMIN' ? ShieldCheck : user?.role === 'VENDOR' ? LayoutDashboard : User,
    },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#06153B]/95 backdrop-blur-xl border-t border-white/10 py-2 px-3 shadow-2xl">
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.label}
              href={item.href}
              className={`relative flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all duration-300 ${
                isActive ? 'text-amber-400' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5px] scale-110' : 'stroke-[1.8px]'}`} />
                {item.badge !== undefined && item.badge > 0 && (
                  <span className="absolute -top-1 -right-2 bg-amber-400 text-slate-950 text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className={`text-[10px] mt-1 ${isActive ? 'font-black' : 'font-medium'}`}>
                {item.label}
              </span>

              {/* Active Indicator Dot */}
              {isActive && (
                <span className="w-1 h-1 rounded-full bg-amber-400 mt-0.5" />
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
