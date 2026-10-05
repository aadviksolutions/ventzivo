'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from '@/components/brand/Logo';
import { useAuth } from '@/context/AuthContext';
import { useShortlist } from '@/context/ShortlistContext';
import MobileSearchModal from '@/components/modals/MobileSearchModal';
import {
  Search,
  Heart,
  User as UserIcon,
  Menu,
  X,
  ChevronDown,
  Sparkles,
  LayoutDashboard,
  ShieldCheck,
  Building,
  LogOut,
  Bell,
  ArrowRight,
} from 'lucide-react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

  const pathname = usePathname();
  const { user, logout } = useAuth();
  const { count: shortlistCount } = useShortlist();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Events', href: '/events' },
    { name: 'Vendors', href: '/vendors' },
    { name: 'How It Works', href: '/how-it-works' },
    { name: 'For Businesses', href: '/vendor/register' },
  ];

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#06153B]/95 backdrop-blur-xl shadow-xl py-2 sm:py-2.5 border-b border-white/10 text-white'
            : 'bg-[#06153B] sm:bg-[#06153B]/90 backdrop-blur-md py-3 border-b border-white/10 text-white'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            
            {/* Desktop Left: VentZivo Logo */}
            <div className="flex items-center gap-3">
              {/* Mobile Hamburger on Left */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-1.5 md:hidden text-slate-300 hover:text-white focus:outline-none"
                aria-label="Toggle mobile menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>

              <div className="bg-white px-2.5 py-1 rounded-xl shadow-md inline-block">
                <Logo size="sm" showTagline={false} />
              </div>
            </div>

            {/* Desktop Center: Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                      isActive
                        ? 'text-amber-300 bg-white/10'
                        : 'text-slate-300 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>

            {/* Desktop Right: Search Trigger, Shortlist, Auth & Get Started */}
            <div className="flex items-center space-x-2 sm:space-x-3">
              
              {/* Search Trigger Icon (desktop & mobile) */}
              <button
                onClick={() => setIsSearchModalOpen(true)}
                className="p-2 rounded-full text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
                title="Search Events & Vendors"
                aria-label="Search"
              >
                <Search className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
              </button>

              {/* Shortlist Counter */}
              <Link
                href="/shortlist"
                className="relative p-2 text-slate-300 hover:text-white hover:bg-white/10 rounded-full transition-colors"
                title="Saved & Shortlisted Vendors"
              >
                <Heart className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                {shortlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-amber-400 text-slate-950 text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow">
                    {shortlistCount}
                  </span>
                )}
              </Link>

              {/* Notification icon for app-feel */}
              <div className="hidden sm:block">
                <button
                  onClick={() => setIsSearchModalOpen(true)}
                  className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-full transition-colors"
                  title="Notifications"
                >
                  <Bell className="w-4 h-4" />
                </button>
              </div>

              {/* User Dropdown or Login & Get Started */}
              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/20 bg-white/10 hover:bg-white/15 transition-colors"
                  >
                    <div className="w-6 h-6 rounded-full bg-amber-400 text-slate-950 font-black flex items-center justify-center text-xs">
                      {user.name.charAt(0)}
                    </div>
                    <span className="text-xs font-bold text-slate-200 hidden sm:inline-block max-w-[100px] truncate">
                      {user.name}
                    </span>
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                  </button>

                  {userDropdownOpen && (
                    <div
                      className="absolute right-0 mt-2 w-56 bg-slate-900 text-white rounded-2xl shadow-2xl border border-white/10 py-2 z-50 animate-fade-in"
                      onClick={() => setUserDropdownOpen(false)}
                    >
                      <div className="px-4 py-2 border-b border-white/10">
                        <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Signed in as</p>
                        <p className="text-xs font-bold text-white truncate">{user.email}</p>
                        <span className="inline-block mt-1 text-[9px] px-2 py-0.5 font-bold uppercase rounded bg-amber-400 text-slate-950">
                          {user.role}
                        </span>
                      </div>

                      {user.role === 'ADMIN' && (
                        <Link
                          href="/admin"
                          className="flex items-center gap-2 px-4 py-2.5 text-xs text-slate-200 hover:bg-white/10 hover:text-amber-300"
                        >
                          <ShieldCheck className="w-4 h-4 text-brand-blue-400" />
                          Admin Control Panel
                        </Link>
                      )}

                      {user.role === 'VENDOR' && (
                        <Link
                          href="/vendor/dashboard"
                          className="flex items-center gap-2 px-4 py-2.5 text-xs text-slate-200 hover:bg-white/10 hover:text-amber-300"
                        >
                          <LayoutDashboard className="w-4 h-4 text-amber-400" />
                          Vendor Dashboard
                        </Link>
                      )}

                      {user.role === 'CLIENT' && (
                        <Link
                          href="/client/dashboard"
                          className="flex items-center gap-2 px-4 py-2.5 text-xs text-slate-200 hover:bg-white/10 hover:text-amber-300"
                        >
                          <LayoutDashboard className="w-4 h-4 text-amber-400" />
                          Client Dashboard
                        </Link>
                      )}

                      <Link
                        href="/shortlist"
                        className="flex items-center gap-2 px-4 py-2.5 text-xs text-slate-200 hover:bg-white/10"
                      >
                        <Heart className="w-4 h-4 text-rose-400" />
                        My Shortlist ({shortlistCount})
                      </Link>

                      <div className="border-t border-white/10 my-1"></div>

                      <button
                        onClick={logout}
                        className="w-full text-left flex items-center gap-2 px-4 py-2 text-xs text-rose-400 hover:bg-rose-500/10"
                      >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Link
                    href="/login"
                    className="px-3.5 py-1.5 text-xs font-bold text-slate-300 hover:text-white transition-colors"
                  >
                    Login
                  </Link>

                  <Link
                    href="/vendor/register"
                    className="px-4 py-1.5 text-xs font-black text-slate-950 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-500 hover:from-amber-300 hover:to-amber-400 rounded-full shadow-lg shadow-amber-500/20 transition-all hover:scale-[1.02] active:scale-95"
                  >
                    Get Started
                  </Link>
                </div>
              )}

            </div>

          </div>
        </div>

        {/* Mobile Drawer Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#06153B] border-b border-white/10 px-5 pt-3 pb-6 space-y-3 animate-fade-in">
            <nav className="flex flex-col space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2.5 rounded-xl text-sm font-bold text-slate-200 hover:bg-white/10 flex items-center justify-between"
                >
                  <span>{link.name}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
                </Link>
              ))}
            </nav>

            <div className="pt-3 border-t border-white/10 flex flex-col gap-2">
              <Link
                href="/vendors"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-2.5 px-4 text-center rounded-xl bg-amber-400 text-slate-950 font-black text-xs shadow"
              >
                Find Vendors
              </Link>
              <Link
                href="/vendor/register"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-2.5 px-4 text-center rounded-xl border border-white/20 text-white font-bold text-xs"
              >
                For Businesses
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Mobile Step-by-Step Search Bottom Sheet Modal */}
      <MobileSearchModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
      />
    </>
  );
}
