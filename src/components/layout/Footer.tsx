import React from 'react';
import Link from 'next/link';
import Logo from '@/components/brand/Logo';
import {
  Instagram,
  Facebook,
  Linkedin,
  Twitter,
  Youtube,
  Sparkles,
} from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#06153B] text-slate-400 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 pb-8 border-b border-slate-800/60">
          
          {/* Left: VentZivo Logo + One-line description */}
          <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
            <div className="bg-white px-3 py-1.5 rounded-xl shadow-sm">
              <Logo size="sm" showTagline={false} />
            </div>
            <div className="sm:border-l sm:border-slate-700/80 sm:pl-4 max-w-md">
              <p className="text-xs text-slate-300 font-medium leading-relaxed">
                India's premier curated event vendor marketplace connecting you with verified professionals.
              </p>
            </div>
          </div>

          {/* Center: Quick Links */}
          <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-semibold text-slate-300">
            <Link href="/events" className="hover:text-amber-400 transition-colors">
              Events
            </Link>
            <Link href="/vendors" className="hover:text-amber-400 transition-colors">
              Find Vendors
            </Link>
            <Link href="/vendor/register" className="hover:text-amber-400 transition-colors text-amber-300 font-bold">
              Become a Vendor
            </Link>
            <Link href="/about" className="hover:text-amber-400 transition-colors">
              About
            </Link>
            <Link href="/contact" className="hover:text-amber-400 transition-colors">
              Contact
            </Link>
          </nav>

          {/* Right: Social Icons */}
          <div className="flex items-center space-x-3 text-slate-400">
            <a
              href="https://instagram.com/ventzivo"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full bg-slate-800/80 hover:bg-amber-500 hover:text-slate-950 flex items-center justify-center transition-all"
              aria-label="Instagram"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a
              href="https://facebook.com/ventzivo"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full bg-slate-800/80 hover:bg-brand-blue-600 hover:text-white flex items-center justify-center transition-all"
              aria-label="Facebook"
            >
              <Facebook className="w-4 h-4" />
            </a>
            <a
              href="https://linkedin.com/company/ventzivo"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full bg-slate-800/80 hover:bg-brand-blue-500 hover:text-white flex items-center justify-center transition-all"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href="https://youtube.com/ventzivo"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full bg-slate-800/80 hover:bg-red-600 hover:text-white flex items-center justify-center transition-all"
              aria-label="YouTube"
            >
              <Youtube className="w-4 h-4" />
            </a>
          </div>

        </div>

        {/* Bottom Bar: Legal + Copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {currentYear} VentZivo Technologies Pvt. Ltd. All rights reserved.</p>

          <div className="flex items-center space-x-6 text-xs">
            <Link href="/privacy" className="hover:text-slate-200 transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-slate-200 transition-colors">
              Terms
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
