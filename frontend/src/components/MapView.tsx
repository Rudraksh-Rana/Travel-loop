'use client';

import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';

// Fix for default marker icons in Leaflet with Next.js
const DefaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

interface MapViewProps {
  pickupCoord: [number, number] | null;
  destCoord: [number, number] | null;
}

function ChangeView({ coords }: { coords: [number, number][] }) {
  const map = useMap();
  useEffect(() => {
    if (coords.length === 1) {
      map.setView(coords[0], 8);
    } else if (coords.length > 1) {
      const bounds = L.latLngBounds(coords);
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [coords, map]);
  return null;
}

export default function MapView({ pickupCoord, destCoord }: MapViewProps) {
  useEffect(() => {
    // Apply icon fix only on client side
    L.Marker.prototype.options.icon = DefaultIcon;
  }, []);

  const activeCoords: [number, number][] = [];
  if (pickupCoord) activeCoords.push(pickupCoord);
  if (destCoord) activeCoords.push(destCoord);

  return (
    <MapContainer 
      center={[20.5937, 78.9629]} 
      zoom={5} 
      style={{ height: '100%', width: '100%', background: '#111' }}
      zoomControl={false}
      attributionControl={false}
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
      />
      
      {pickupCoord && (
        <Marker position={pickupCoord} />
      )}
      
      {destCoord && (
        <Marker position={destCoord} />
      )}
      
      {pickupCoord && destCoord && (
        <Polyline 
          positions={[pickupCoord, destCoord]} 
          pathOptions={{ color: '#C4521A', weight: 3, dashArray: '10, 10' }}
        />
      )}

      {activeCoords.length > 0 && <ChangeView coords={activeCoords} />}
    </MapContainer>
  );
}
