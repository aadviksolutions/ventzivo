'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from '@/components/brand/Logo';
import { useAuth } from '@/context/AuthContext';
import { useShortlist } from '@/context/ShortlistContext';
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
  PlusCircle,
  Calendar,
} from 'lucide-react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const { count: shortlistCount } = useShortlist();

  // Hide main navbar on full admin pages if preferred, or keep unified
  const isAdminRoute = pathname?.startsWith('/admin');
  const isVendorDashboardRoute = pathname?.startsWith('/vendor/dashboard');

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
    { name: 'Find Vendors', href: '/vendors' },
    { name: 'Become a Vendor', href: '/vendor/register' },
  ];

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm py-2 border-b border-slate-200/80'
          : 'bg-white py-2.5 border-b border-slate-100'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Logo size="sm" showTagline={false} />
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-3.5 py-1.5 rounded-lg text-sm font-semibold transition-colors flex items-center gap-1.5 ${
                    isActive
                      ? 'text-brand-blue-800 bg-brand-blue-50'
                      : 'text-slate-700 hover:text-brand-blue-800 hover:bg-slate-50'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Icons & Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            
            {/* Shortlist Counter */}
            <Link
              href="/shortlist"
              className="relative p-2 text-slate-600 hover:text-brand-blue-800 hover:bg-slate-100 rounded-full transition-colors"
              title="Saved & Shortlisted Vendors"
            >
              <Heart className="w-4 h-4" />
              {shortlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-amber-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow">
                  {shortlistCount}
                </span>
              )}
            </Link>

            {/* User Session Dropdown or Login */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 transition-colors"
                >
                  <div className="w-7 h-7 rounded-full bg-brand-blue-800 text-white font-bold flex items-center justify-center text-xs">
                    {user.name.charAt(0)}
                  </div>
                  <div className="text-left hidden lg:block">
                    <p className="text-xs font-bold text-slate-800 leading-tight truncate max-w-[100px]">
                      {user.name}
                    </p>
                    <span className="text-[10px] font-medium text-brand-gold-600 uppercase">
                      {user.role}
                    </span>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
                </button>

                {/* Dropdown Menu */}
                {userDropdownOpen && (
                  <div
                    className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-100 py-2 z-50"
                    onClick={() => setUserDropdownOpen(false)}
                  >
                    <div className="px-4 py-2 border-b border-slate-100">
                      <p className="text-xs text-slate-500">Signed in as</p>
                      <p className="text-sm font-bold text-slate-900 truncate">{user.email}</p>
                      <span className="inline-block mt-1 text-[10px] px-2 py-0.5 font-bold uppercase rounded bg-brand-blue-100 text-brand-blue-800">
                        {user.role} Account
                      </span>
                    </div>

                    {user.role === 'ADMIN' && (
                      <Link
                        href="/admin"
                        className="flex items-center gap-2 px-4 py-2.5 text-sm text-slate-700 hover:bg-brand-blue-50 hover:text-brand-blue-800"
                      >
                        <ShieldCheck className="w-4 h-4 text-brand-blue-700" />
                        Admin Control Panel
                      </Link>
                    )}

                    {user.role === 'VENDOR' && (
                      <>
                        <Link
                          href="/vendor/dashboard"
                          className="flex items-center gap-2 px-4 py-2.5 text-sm text-slate-700 hover:bg-brand-blue-50 hover:text-brand-blue-800"
                        >
                          <LayoutDashboard className="w-4 h-4 text-brand-blue-700" />
                          Vendor Dashboard
                        </Link>
                        <Link
                          href="/vendor/dashboard/services"
                          className="flex items-center gap-2 px-4 py-2.5 text-sm text-slate-700 hover:bg-brand-blue-50 hover:text-brand-blue-800"
                        >
                          <PlusCircle className="w-4 h-4 text-brand-gold-600" />
                          Manage Services
                        </Link>
                      </>
                    )}

                    {user.role === 'CLIENT' && (
                      <Link
                        href="/client/dashboard"
                        className="flex items-center gap-2 px-4 py-2.5 text-sm text-slate-700 hover:bg-brand-blue-50 hover:text-brand-blue-800"
                      >
                        <LayoutDashboard className="w-4 h-4 text-brand-blue-700" />
                        Client Dashboard
                      </Link>
                    )}

                    <Link
                      href="/shortlist"
                      className="flex items-center gap-2 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50"
                    >
                      <Heart className="w-4 h-4 text-rose-500" />
                      Shortlist & Compare ({shortlistCount})
                    </Link>

                    <div className="border-t border-slate-100 my-1"></div>

                    <button
                      onClick={logout}
                      className="w-full text-left flex items-center gap-2 px-4 py-2.5 text-sm text-rose-600 hover:bg-rose-50"
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
                  className="px-4 py-2 text-sm font-semibold text-slate-700 hover:text-brand-blue-800 transition-colors"
                >
                  Log In
                </Link>
                <Link
                  href="/vendor/register"
                  className="px-4 py-2 text-sm font-bold text-white bg-brand-blue-800 hover:bg-brand-blue-900 rounded-lg shadow-sm hover:shadow transition-all"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center space-x-2">
            <Link
              href="/shortlist"
              className="relative p-2 text-slate-600 rounded-full"
            >
              <Heart className="w-5 h-5" />
              {shortlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-amber-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {shortlistCount}
                </span>
              )}
            </Link>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:text-brand-blue-800 focus:outline-none"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-3">
          <nav className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2.5 rounded-lg text-base font-semibold text-slate-700 hover:bg-slate-50 flex items-center justify-between"
              >
                <span>{link.name}</span>
              </Link>
            ))}
          </nav>

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            {user ? (
              <>
                <div className="px-3 py-2 bg-slate-50 rounded-lg">
                  <p className="text-xs font-bold text-slate-900">{user.name}</p>
                  <p className="text-xs text-slate-500">{user.email} ({user.role})</p>
                </div>
                {user.role === 'ADMIN' && (
                  <Link
                    href="/admin"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full py-2.5 px-4 text-center rounded-lg bg-brand-blue-800 text-white font-bold text-sm"
                  >
                    Go to Admin Panel
                  </Link>
                )}
                {user.role === 'VENDOR' && (
                  <Link
                    href="/vendor/dashboard"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full py-2.5 px-4 text-center rounded-lg bg-brand-blue-800 text-white font-bold text-sm"
                  >
                    Vendor Dashboard
                  </Link>
                )}
                {user.role === 'CLIENT' && (
                  <Link
                    href="/client/dashboard"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full py-2.5 px-4 text-center rounded-lg bg-brand-blue-800 text-white font-bold text-sm"
                  >
                    Client Dashboard
                  </Link>
                )}
                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-2 px-4 text-center text-sm font-semibold text-rose-600 bg-rose-50 rounded-lg"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-2.5 px-4 text-center rounded-lg border border-slate-300 font-bold text-slate-800 text-sm"
                >
                  Log In
                </Link>
                <Link
                  href="/vendor/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-2.5 px-4 text-center rounded-lg bg-brand-blue-800 text-white font-bold text-sm shadow"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
