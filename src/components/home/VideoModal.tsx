'use client';

import React from 'react';
import { X, Play, Sparkles } from 'lucide-react';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function VideoModal({ isOpen, onClose }: VideoModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-4xl bg-slate-950 rounded-3xl overflow-hidden border border-amber-400/30 shadow-2xl">
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/10 bg-[#06153B]">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-bold uppercase tracking-wider text-amber-300">
              VentZivo Event Experience
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video / Visual Teaser Frame */}
        <div className="relative aspect-video w-full bg-black flex items-center justify-center overflow-hidden">
          <img
            src="/hero-multievent-cinematic.jpg"
            alt="VentZivo Celebration Experience"
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent flex flex-col items-center justify-center text-center p-6">
            <div className="w-20 h-20 rounded-full bg-amber-500/20 border-2 border-amber-400 flex items-center justify-center text-amber-300 mb-4 animate-pulse shadow-xl shadow-amber-500/20">
              <Play className="w-8 h-8 fill-amber-400 text-amber-400 ml-1" />
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              One Platform. Every Event.
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-md mt-2">
              From grand royal weddings and high-profile corporate summits to arena concerts and intimate parties — welcome to VentZivo.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
