import React, { useEffect, useRef } from 'react';

// Make TypeScript aware of the Leaflet library from the CDN
declare const L: any;

interface MapProps {
  coordinates: {
    lat: number;
    lng: number;
  };
  address: string;
}

const Map: React.FC<MapProps> = ({ coordinates, address }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const isMapInitialized = useRef(false);

  useEffect(() => {
    if (mapRef.current && !isMapInitialized.current) {
      const map = L.map(mapRef.current).setView([coordinates.lat, coordinates.lng], 13);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);

      L.marker([coordinates.lat, coordinates.lng]).addTo(map)
        .bindPopup(address)
        .openPopup();
        
      isMapInitialized.current = true;
    }
  }, [coordinates, address]);
  
  const openMaps = () => {
     window.open(`https://maps.google.com/?q=${encodeURIComponent(address)}`, '_blank');
  };

  return (
    <div 
        ref={mapRef} 
        style={{ height: '200px', width: '100%', cursor: 'pointer' }}
        onClick={openMaps}
        title="Click to open in Google Maps"
    ></div>
  );
};

export default Map;
