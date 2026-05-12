'use client';

import { useEffect, useState, useMemo } from 'react';
import { Globe } from 'lucide-react';
import dynamic from 'next/dynamic';

// Simple city to coordinate lookup for Indian destinations
const CITY_COORDS: Record<string, [number, number]> = {
  'Delhi': [28.6139, 77.2090],
  'New Delhi': [28.6139, 77.2090],
  'Mumbai': [19.0760, 72.8777],
  'Jaipur': [26.9124, 75.7873],
  'Udaipur': [24.5854, 73.7125],
  'Varanasi': [25.3176, 82.9739],
  'Agra': [27.1767, 78.0081],
  'Munnar': [10.0889, 77.0595],
  'Leh': [34.1526, 77.5770],
  'Goa': [15.2993, 74.1240],
  'Bangalore': [12.9716, 77.5946],
  'Bengaluru': [12.9716, 77.5946],
  'Chennai': [13.0827, 80.2707],
  'Kolkata': [22.5726, 88.3639],
  'Jodhpur': [26.2389, 73.0243],
  'Jaisalmer': [26.9157, 70.9160],
  'Rishikesh': [30.0869, 78.2676],
  'Amritsar': [31.6340, 74.8723],
  'Manali': [32.2432, 77.1892],
  'Hampi': [15.3350, 76.4600],
  'Shimla': [31.1048, 77.1734],
  'Alleppey': [9.4981, 76.3388],
  'Kochi': [9.9312, 76.2673],
  'Darjeeling': [27.0410, 88.2627],
  'Srinagar': [34.0837, 74.7973],
};

interface MapModuleProps {
  pickup?: string;
  destination?: string;
}

// Dynamically import the entire Leaflet logic to prevent any SSR issues
const MapView = dynamic(() => import('@/components/MapView').then(mod => mod.default), { 
  ssr: false,
  loading: () => <div className="w-full h-full bg-black/20 animate-pulse" />
});

export default function MapModule({ pickup, destination }: MapModuleProps) {
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
    // Load Leaflet CSS globally once
    if (!document.getElementById('leaflet-css')) {
      const link = document.createElement('link');
      link.id = 'leaflet-css';
      link.rel = 'stylesheet';
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      document.head.appendChild(link);
    }
  }, []);

  const pickupCoord = useMemo(() => pickup ? CITY_COORDS[pickup] : null, [pickup]);
  const destCoord = useMemo(() => destination ? CITY_COORDS[destination] : null, [destination]);
  
  if (!isMounted) return <div className="w-full h-[400px] bg-black/20 rounded-[32px] animate-pulse" />;

  return (
    <div className="relative w-full h-[400px] rounded-[32px] overflow-hidden border border-white/10 group shadow-2xl">
      <div className="absolute inset-0 z-[1000] pointer-events-none bg-gradient-to-t from-black/40 via-transparent to-black/20" />
      
      <div className="absolute inset-0 bg-[#111]">
        <MapView pickupCoord={pickupCoord} destCoord={destCoord} />

        {!pickup && !destination && (
          <div className="absolute inset-0 z-[1001] flex flex-col items-center justify-center text-center p-12 bg-black/60 backdrop-blur-sm pointer-events-none">
            <Globe className="w-20 h-20 text-white/5 mb-6 animate-floatY" />
            <p className="text-white/20 text-[10px] font-black uppercase tracking-[0.4em]">Awaiting Expedition Coordinates</p>
          </div>
        )}
      </div>

      <div className="absolute bottom-6 left-6 right-6 z-[1002] flex justify-between items-end pointer-events-none">
        <div className="space-y-3 pointer-events-auto">
          {pickup && (
            <div className="bg-black/80 backdrop-blur-xl border border-white/10 px-5 py-3 rounded-2xl flex items-center gap-3 animate-fadeInSlideLeft">
              <div className="w-2 h-2 rounded-full bg-primary" />
              <span className="text-[10px] font-black uppercase tracking-widest text-white/60">Origin:</span>
              <span className="text-xs font-bold text-white italic">{pickup}</span>
              {pickupCoord && <span className="text-[8px] text-white/30 ml-auto">{pickupCoord[0].toFixed(2)}° N, {pickupCoord[1].toFixed(2)}° E</span>}
            </div>
          )}
          {destination && (
            <div className="bg-black/80 backdrop-blur-xl border border-white/10 px-5 py-3 rounded-2xl flex items-center gap-3 animate-fadeInSlideLeft" style={{ animationDelay: '100ms' }}>
              <div className="w-2 h-2 rounded-full bg-terracotta" />
              <span className="text-[10px] font-black uppercase tracking-widest text-white/60">Target:</span>
              <span className="text-xs font-bold text-white italic">{destination}</span>
              {destCoord && <span className="text-[8px] text-white/30 ml-auto">{destCoord[0].toFixed(2)}° N, {destCoord[1].toFixed(2)}° E</span>}
            </div>
          )}
        </div>

        <div className="flex flex-col gap-3 items-end pointer-events-auto">
          <div className="bg-primary/10 backdrop-blur-xl border border-primary/20 px-6 py-4 rounded-3xl flex flex-col items-end shadow-2xl animate-fadeIn">
            <span className="text-[8px] font-black uppercase tracking-[0.3em] text-primary mb-1">Heritage Grid System</span>
            <span className="text-[10px] font-bold text-white">Registry: Active</span>
          </div>
        </div>
      </div>
      
      <style jsx global>{`
        .leaflet-container {
          filter: grayscale(1) invert(1) contrast(1.2) brightness(0.8);
          background: #111 !important;
        }
        .leaflet-marker-icon {
          filter: grayscale(0) invert(0) !important;
        }
        .leaflet-pane {
          z-index: 1 !important;
        }
        .leaflet-top, .leaflet-bottom {
          z-index: 2 !important;
        }
      `}</style>
    </div>
  );
}
