import React from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

function Map({ scenes, center = { lat: 40.7128, lng: -74.006 }, zoom = 12, onMarkerClick }) {

  return (
    <MapContainer center={center} zoom={zoom} scrollWheelZoom={true} className="w-full h-full rounded-lg">
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      />

      {scenes.map(scene => (
        <Marker
          key={scene.id}
          position={[scene.lat, scene.lng]}
          eventHandlers={{
            click: () => onMarkerClick?.(scene),
          }}
        >
          <Popup>
            <div className="text-sm">
              <div className="font-bold">{scene.movieTitle}</div>
              <div>{scene.description}</div>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  )
}

export default Map