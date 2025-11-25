import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icon in React Leaflet
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

const DiseaseMap = () => {
    // Mock data for disease outbreaks
    const outbreaks = [
        { id: 1, lat: 28.6139, lng: 77.2090, disease: 'Tomato Blight', severity: 'High', location: 'New Delhi' },
        { id: 2, lat: 19.0760, lng: 72.8777, disease: 'Potato Virus', severity: 'Medium', location: 'Mumbai' },
        { id: 3, lat: 13.0827, lng: 80.2707, disease: 'Rice Blast', severity: 'High', location: 'Chennai' },
        { id: 4, lat: 22.5726, lng: 88.3639, disease: 'Wheat Rust', severity: 'Low', location: 'Kolkata' },
        { id: 5, lat: 12.9716, lng: 77.5946, disease: 'Corn Smut', severity: 'Medium', location: 'Bangalore' },
    ];

    return (
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden h-full flex flex-col">
            <div className="p-6 border-b border-gray-100">
                <h3 className="text-lg font-bold text-gray-800">Disease Outbreak Map</h3>
                <p className="text-sm text-gray-500">Real-time tracking of reported crop diseases</p>
            </div>
            <div className="flex-1 relative z-0">
                <MapContainer
                    center={[20.5937, 78.9629]}
                    zoom={5}
                    scrollWheelZoom={false}
                    style={{ height: '100%', width: '100%' }}
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {outbreaks.map((outbreak) => (
                        <Marker key={outbreak.id} position={[outbreak.lat, outbreak.lng]}>
                            <Popup>
                                <div className="p-1">
                                    <h4 className="font-bold text-gray-900">{outbreak.disease}</h4>
                                    <p className="text-sm text-gray-600">{outbreak.location}</p>
                                    <span className={`text-xs px-2 py-1 rounded-full mt-2 inline-block font-medium ${outbreak.severity === 'High' ? 'bg-red-100 text-red-700' :
                                            outbreak.severity === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                                                'bg-green-100 text-green-700'
                                        }`}>
                                        {outbreak.severity} Severity
                                    </span>
                                </div>
                            </Popup>
                        </Marker>
                    ))}
                </MapContainer>
            </div>
        </div>
    );
};

export default DiseaseMap;
