import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'light' | 'dark' | 'default';
  showTagline?: boolean;
  className?: string;
  asLink?: boolean;
}

export default function Logo({
  size = 'md',
  variant = 'default',
  showTagline = false,
  className = '',
  asLink = true,
}: LogoProps) {
  // Height definitions
  const heights = {
    sm: 'h-8 sm:h-9',
    md: 'h-10 sm:h-12',
    lg: 'h-14 sm:h-16',
    xl: 'h-20 sm:h-24',
  };

  const content = (
    <div className={`inline-flex items-center gap-2 group ${className}`}>
      <div className={`relative ${heights[size]} w-auto aspect-[1000/667] flex items-center justify-center`}>
        <img
          src="/ventzivo-logo.jpg"
          alt="VentZivo — Plan. Connect. Celebrate. India's Event Marketplace"
          className="h-full w-auto object-contain rounded-md transition-transform duration-300 group-hover:scale-[1.02]"
        />
      </div>
      {showTagline && (
        <div className="hidden lg:flex flex-col border-l border-slate-200 pl-3">
          <span className="text-[10px] font-bold tracking-wider text-brand-gold-600 uppercase">
            Plan. Connect. Celebrate.
          </span>
          <span className="text-[9px] font-semibold tracking-tight text-brand-blue-800">
            India's Event Marketplace
          </span>
        </div>
      )}
    </div>
  );

  if (!asLink) {
    return content;
  }

  return (
    <Link href="/" className="inline-block cursor-pointer focus:outline-none">
      {content}
    </Link>
  );
}
