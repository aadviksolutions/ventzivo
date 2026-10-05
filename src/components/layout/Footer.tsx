import React from 'react';
import Link from 'next/link';
import Logo from '@/components/brand/Logo';
import {
  Instagram,
  Facebook,
  Linkedin,
  Youtube,
} from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#040C22] text-slate-400 border-t border-white/10 pt-14 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-10 pb-12 border-b border-white/10">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white px-3 py-1.5 rounded-xl shadow-md inline-block">
              <Logo size="sm" showTagline={false} />
            </div>
            <p className="text-xs sm:text-sm text-slate-400 max-w-sm leading-relaxed">
              Connecting people, ideas and services for every occasion. India's premier all-event vendor marketplace.
            </p>
            <p className="text-[11px] font-bold text-amber-400 tracking-wider uppercase">
              One Platform. Every Event. Every Vendor.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center gap-3 text-xs">
              <a 
                href="tel:7566145566" 
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-amber-400 hover:text-slate-950 text-slate-300 font-semibold transition-all border border-white/10"
              >
                <span>📞 Call: 7566145566</span>
              </a>
              <a 
                href="https://wa.me/917566145566?text=Hi%20VentZivo%2C%20I%20have%20an%20enquiry" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500 hover:text-white text-emerald-400 font-semibold transition-all border border-emerald-500/20"
              >
                <span>💬 WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/" className="hover:text-amber-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/events" className="hover:text-amber-400 transition-colors">
                  Events
                </Link>
              </li>
              <li>
                <Link href="/vendors" className="hover:text-amber-400 transition-colors">
                  Vendors
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="hover:text-amber-400 transition-colors">
                  How It Works
                </Link>
              </li>
            </ul>
          </div>

          {/* For Vendors */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              For Vendors
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/vendor/register" className="text-amber-300 font-bold hover:text-amber-200 transition-colors">
                  List Your Business
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-amber-400 transition-colors">
                  Vendor Login
                </Link>
              </li>
              <li>
                <Link href="/vendor/dashboard" className="hover:text-amber-400 transition-colors">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-amber-400 transition-colors">
                  Support & Help
                </Link>
              </li>
            </ul>
          </div>

          {/* Company & Social */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Company
            </h4>
            <ul className="space-y-2.5 text-xs mb-6">
              <li>
                <Link href="/about" className="hover:text-amber-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-amber-400 transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-amber-400 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-amber-400 transition-colors">
                  Terms & Conditions
                </Link>
              </li>
            </ul>

            <h5 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-3">
              Follow Us
            </h5>
            <div className="flex items-center space-x-3 text-slate-300">
              <a
                href="https://instagram.com/ventzivo"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-amber-400 hover:text-slate-950 flex items-center justify-center transition-all"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com/ventzivo"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-brand-blue-600 hover:text-white flex items-center justify-center transition-all"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com/ventzivo"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-red-600 hover:text-white flex items-center justify-center transition-all"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com/company/ventzivo"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-brand-blue-500 hover:text-white flex items-center justify-center transition-all"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {currentYear} VentZivo. All rights reserved.</p>
          <p className="text-[11px]">Crafted for extraordinary celebrations across India.</p>
        </div>

      </div>
    </footer>
  );
}
