'use client';

import React, { useState } from 'react';
import { Play } from 'lucide-react';
import VideoModal from './VideoModal';

export default function VideoModalTrigger() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="group flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-slate-950/80 hover:bg-slate-950 backdrop-blur-md border border-amber-400/40 hover:border-amber-400 transition-all shadow-xl"
        title="Watch Celebration Video"
      >
        <div className="w-7 h-7 rounded-full bg-amber-400 group-hover:bg-amber-300 text-slate-950 flex items-center justify-center transition-transform group-hover:scale-110 shadow">
          <Play className="w-3.5 h-3.5 fill-slate-950 ml-0.5" />
        </div>
        <span className="text-xs font-black text-amber-300 group-hover:text-amber-200 tracking-wide pr-1">
          Watch Video
        </span>
      </button>

      <VideoModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
