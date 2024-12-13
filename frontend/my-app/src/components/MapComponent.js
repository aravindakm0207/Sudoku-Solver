import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'; // Example with Leaflet
import 'leaflet/dist/leaflet.css';

const MapComponent = ({ address }) => {
    const { latitude, longitude } = address;

    if (!latitude || !longitude) {
        return <p>Location not available</p>;
    }

    return (
        <MapContainer center={[latitude, longitude]} zoom={13} style={{ height: '400px', width: '100%' }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker position={[latitude, longitude]}>
                <Popup>
                    {address.city}, {address.state}, {address.country}
                </Popup>
            </Marker>
        </MapContainer>
    );
};

export default MapComponent;
