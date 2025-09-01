import React, { useMemo } from "react";
import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Popup,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

// 🔹 Auto-fit bounds helper
function FitBounds({ earthquakes }) {
  const map = useMap();
  
  useMemo(() => {
    if (earthquakes.length === 0) return;

    // Filter out invalid coordinates
    const validCoordinates = earthquakes
      .filter((eq) => eq.lat && eq.lng && !isNaN(eq.lat) && !isNaN(eq.lng))
      .map((eq) => [eq.lat, eq.lng]);

    if (validCoordinates.length > 0) {
      map.fitBounds(validCoordinates, { 
        padding: [50, 50],
        maxZoom: 8 // Prevent zooming in too much for single points
      });
    }
  }, [earthquakes, map]);
  
  return null;
}

// 🔹 Color scale helper
function getColor(mag) {
  if (mag >= 7) return "#8B0000"; // Dark Red
  if (mag >= 6) return "#FF0000"; // Red
  if (mag >= 5) return "#FF4500"; // Orange Red
  if (mag >= 4) return "#FFA500"; // Orange
  if (mag >= 3) return "#FFD700"; // Gold
  if (mag >= 2) return "#ADFF2F"; // Green-Yellow
  return "#32CD32"; // Lime Green
}

// 🔹 Helper to get radius based on magnitude
function getRadius(mag) {
  // Ensure minimum visibility for small earthquakes
  return Math.max(mag * 2.5, 3);
}

// 🔹 Helper to format date safely
function formatDate(timestamp) {
  try {
    return new Date(timestamp).toLocaleString();
  } catch (error) {
    return "Unknown time";
  }
}

// 🔹 Main Component
export default function EarthquakeVisualizer({ earthquakes }) {
  // Filter out invalid earthquakes and memoize for performance
  const validEarthquakes = useMemo(() => {
    return earthquakes.filter((eq) => 
      eq.id && 
      eq.lat && 
      eq.lng && 
      !isNaN(eq.lat) && 
      !isNaN(eq.lng) &&
      eq.magnitude !== null &&
      eq.magnitude !== undefined
    );
  }, [earthquakes]);

  return (
    <div className="flex-1 w-full relative">
      <MapContainer
        center={[20, 0]} // Default world center
        zoom={2}
        className="h-full w-full"
        scrollWheelZoom={true}
        worldCopyJump={true}
        maxBounds={[[-90, -180], [90, 180]]}
        maxBoundsViscosity={1.0}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        
        {/* Auto-fit to bounds */}
        <FitBounds earthquakes={validEarthquakes} />
        
        {/* Earthquake Markers */}
        {validEarthquakes.map((eq) => (
          <CircleMarker
            key={eq.id}
            center={[eq.lat, eq.lng]}
            radius={getRadius(eq.magnitude)}
            pathOptions={{
              fillColor: getColor(eq.magnitude),
              color: '#333',
              weight: 1,
              opacity: 0.8,
              fillOpacity: 0.7
            }}
          >
            <Popup>
              <div className="min-w-[250px]">
                <h3 className="font-bold text-lg mb-2 border-b pb-1">
                  M{eq.magnitude?.toFixed(1) || 'N/A'} Earthquake
                </h3>
                <div className="space-y-2 text-sm">
                  <div><strong>Location:</strong> {eq.place || "Unknown location"}</div>
                  <div><strong>Time:</strong> {formatDate(eq.time)}</div>
                  <div><strong>Depth:</strong> {eq.depth ? `${eq.depth.toFixed(1)} km` : 'N/A'}</div>
                  <div><strong>Coordinates:</strong> {eq.lat?.toFixed(3) || 'N/A'}, {eq.lng?.toFixed(3) || 'N/A'}</div>
                  {eq.felt && eq.felt > 0 && (
                    <div><strong>Felt Reports:</strong> {eq.felt.toLocaleString()}</div>
                  )}
                  {eq.significance && eq.significance > 0 && (
                    <div><strong>Significance:</strong> {eq.significance}</div>
                  )}
                  {eq.tsunami === 1 && (
                    <div className="text-red-600 font-bold bg-red-50 p-2 rounded">
                      🌊 Tsunami Warning
                    </div>
                  )}
                  {eq.url && (
                    <div className="pt-2 border-t">
                      <a 
                        href={eq.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 underline font-medium"
                      >
                        📄 View Details →
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </Popup>
          </CircleMarker>
        ))}
      </MapContainer>

      
    </div>
  );
}