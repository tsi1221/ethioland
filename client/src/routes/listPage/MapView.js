import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// ✅ Custom location icon using public folder asset
const locationIcon = new L.Icon({
  iconUrl: "/images/location-icon.png", // must be inside public/images/
  iconSize: [30, 35],
  iconAnchor: [15, 35],
  popupAnchor: [0, -30],
});

const MapView = ({ properties }) => {
  return (
    <MapContainer center={[51.505, -0.09]} zoom={6} style={{ height: "100%", width: "100%" }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {properties.map((prop) => (
        <Marker key={prop.id} position={prop.coords} icon={locationIcon}>
          <Popup>
            <strong>{prop.title}</strong><br />
            {prop.address}<br />
            {prop.price}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapView;
