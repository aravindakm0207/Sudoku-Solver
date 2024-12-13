import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Card, CardContent, Typography, Box } from '@mui/material';

const MapComponent = ({ address }) => {
    const { latitude, longitude, city, state, country } = address;

    if (!latitude || !longitude) {
        return (
            <Box sx={{ padding: 2 }}>
                <Typography variant="body1" color="textSecondary">
                    Location not available.
                </Typography>
            </Box>
        );
    }

    return (
        <Card variant="outlined" sx={{ marginTop: 2 }}>
            <CardContent>
                <Typography variant="h6" gutterBottom>
                    Location Details
                </Typography>
                <MapContainer center={[latitude, longitude]} zoom={13} style={{ height: '400px', width: '100%' }}>
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    <Marker position={[latitude, longitude]}>
                        <Popup>
                            {city}, {state}, {country}
                        </Popup>
                    </Marker>
                </MapContainer>
            </CardContent>
        </Card>
    );
};

export default MapComponent;
