'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface ShortlistContextType {
  shortlist: string[]; // vendor IDs
  toggleShortlist: (vendorId: string) => void;
  isShortlisted: (vendorId: string) => boolean;
  count: number;
}

const ShortlistContext = createContext<ShortlistContextType | undefined>(undefined);

export function ShortlistProvider({ children }: { children: React.ReactNode }) {
  const [shortlist, setShortlist] = useState<string[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('ventzivo_shortlist');
      if (stored) {
        setShortlist(JSON.parse(stored));
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const toggleShortlist = (vendorId: string) => {
    setShortlist((prev) => {
      let next: string[];
      if (prev.includes(vendorId)) {
        next = prev.filter((id) => id !== vendorId);
      } else {
        next = [...prev, vendorId];
      }
      localStorage.setItem('ventzivo_shortlist', JSON.stringify(next));
      return next;
    });
  };

  const isShortlisted = (vendorId: string) => shortlist.includes(vendorId);

  return (
    <ShortlistContext.Provider
      value={{
        shortlist,
        toggleShortlist,
        isShortlisted,
        count: shortlist.length,
      }}
    >
      {children}
    </ShortlistContext.Provider>
  );
}

export function useShortlist() {
  const context = useContext(ShortlistContext);
  if (!context) {
    throw new Error('useShortlist must be used within ShortlistProvider');
  }
  return context;
}
