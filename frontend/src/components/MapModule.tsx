'use client';

import { useEffect, useRef } from 'react';
import { MapPin, Navigation, Info } from 'lucide-react';

interface MapModuleProps {
  pickup?: string;
  destination?: string;
}

export default function MapModule({ pickup, destination }: MapModuleProps) {
  const mapContainer = useRef<HTMLDivElement>(null);

  return (
    <div className="relative w-full h-[400px] rounded-[32px] overflow-hidden border border-white/10 group shadow-2xl">
      {/* Premium Map Overlay */}
      <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-t from-black/60 via-transparent to-black/20" />
      
      {/* Simulated Map View (High-Fidelity Placeholder) */}
      <div className="absolute inset-0 bg-[#111] overflow-hidden">
        <div className="absolute inset-0 opacity-40 mix-blend-overlay">
          {/* Simulated Grid lines */}
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle, #333 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        </div>
        
        {/* Animated Route Line */}
        {pickup && destination && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-3/4 h-[2px] bg-primary/20">
              <div className="absolute inset-0 bg-primary animate-pulse" style={{ width: '100%' }} />
              {/* Pickup Pulse */}
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-primary rounded-full shadow-[0_0_20px_rgba(0,136,204,0.8)] animate-ping" />
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-primary rounded-full" />
              
              {/* Destination Pulse */}
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-terracotta rounded-full shadow-[0_0_20px_rgba(210,105,30,0.8)] animate-ping" />
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-terracotta rounded-full" />
              
              {/* Animated Particle along the route */}
              <div className="absolute top-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full shadow-[0_0_10px_#fff] animate-routeFlow" />
            </div>
          </div>
        )}

        {!pickup && !destination && (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-12">
            <GlobeIcon className="w-20 h-20 text-white/5 mb-6 animate-floatY" />
            <p className="text-white/20 text-xs font-black uppercase tracking-[0.4em]">Awaiting Expedition Coordinates</p>
          </div>
        )}
      </div>

      {/* Map UI Elements */}
      <div className="absolute bottom-6 left-6 right-6 z-20 flex justify-between items-end">
        <div className="space-y-3">
          {pickup && (
            <div className="bg-black/80 backdrop-blur-xl border border-white/10 px-5 py-3 rounded-2xl flex items-center gap-3 animate-fadeInSlideLeft">
              <div className="w-2 h-2 rounded-full bg-primary" />
              <span className="text-[10px] font-black uppercase tracking-widest text-white/60">Origin:</span>
              <span className="text-xs font-bold text-white italic">{pickup}</span>
            </div>
          )}
          {destination && (
            <div className="bg-black/80 backdrop-blur-xl border border-white/10 px-5 py-3 rounded-2xl flex items-center gap-3 animate-fadeInSlideLeft" style={{ animationDelay: '100ms' }}>
              <div className="w-2 h-2 rounded-full bg-terracotta" />
              <span className="text-[10px] font-black uppercase tracking-widest text-white/60">Target:</span>
              <span className="text-xs font-bold text-white italic">{destination}</span>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-3 items-end">
          <div className="bg-primary/10 backdrop-blur-xl border border-primary/20 px-6 py-4 rounded-3xl flex flex-col items-end shadow-2xl animate-fadeIn">
            <span className="text-[8px] font-black uppercase tracking-[0.3em] text-primary mb-1">Global Precision</span>
            <span className="text-[10px] font-bold text-white">28.6139° N, 77.2090° E</span>
          </div>
        </div>
      </div>
      
      <style jsx global>{`
        @keyframes routeFlow {
          0% { left: 0; opacity: 0; }
          20% { opacity: 1; }
          80% { opacity: 1; }
          100% { left: 100%; opacity: 0; }
        }
        .animate-routeFlow {
          animation: routeFlow 3s linear infinite;
        }
      `}</style>
    </div>
  );
}

function GlobeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={0.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
    </svg>
  );
}
