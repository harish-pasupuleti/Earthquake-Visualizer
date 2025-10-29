import React, { useMemo, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Popup,
  useMap,
  ScaleControl,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

// ✅ 1. Debounced Auto-fit Bounds
function FitBounds({ earthquakes }) {
  const map = useMap();

  useEffect(() => {
    if (!earthquakes.length) return;

    const validCoords = earthquakes
      .filter((eq) => eq.lat && eq.lng && !isNaN(eq.lat) && !isNaN(eq.lng))
      .map((eq) => [eq.lat, eq.lng]);

    if (validCoords.length > 0) {
      const timeout = setTimeout(() => {
        map.fitBounds(validCoords, { padding: [60, 60], maxZoom: 6 });
      }, 300);
      return () => clearTimeout(timeout);
    }
  }, [earthquakes, map]);

  return null;
}

// ✅ 2. Color scale
const getColor = (mag) => {
  if (mag >= 7) return "#8B0000";
  if (mag >= 6) return "#FF0000";
  if (mag >= 5) return "#FF4500";
  if (mag >= 4) return "#FFA500";
  if (mag >= 3) return "#FFD700";
  if (mag >= 2) return "#ADFF2F";
  return "#32CD32";
};

// ✅ 3. Radius helper
const getRadius = (mag) => Math.max(mag * 2.5, 3);

// ✅ 4. Locale-aware date
const formatDate = (timestamp) =>
  timestamp
    ? new Date(timestamp).toLocaleString(undefined, {
        dateStyle: "medium",
        timeStyle: "short",
      })
    : "Unknown time";

// ✅ 5. Marker (memoized)
const EarthquakeMarker = React.memo(({ eq }) => (
  <CircleMarker
    center={[eq.lat, eq.lng]}
    radius={getRadius(eq.magnitude)}
    pathOptions={{
      fillColor: getColor(eq.magnitude),
      color: "#333",
      weight: 1,
      opacity: 0.8,
      fillOpacity: 0.7,
    }}
  >
    <Popup>
      <div className="min-w-[250px]">
        <h3 className="font-bold text-lg mb-2 border-b pb-1">
          M{eq.magnitude?.toFixed(1) || "N/A"} Earthquake
        </h3>
        <div className="space-y-2 text-sm">
          <div>
            <strong>Location:</strong> {eq.place || "Unknown"}
          </div>
          <div>
            <strong>Time:</strong> {formatDate(eq.time)}
          </div>
          <div>
            <strong>Depth:</strong>{" "}
            {eq.depth ? `${eq.depth.toFixed(1)} km` : "N/A"}
          </div>
          <div>
            <strong>Coordinates:</strong> {eq.lat?.toFixed(3)},{" "}
            {eq.lng?.toFixed(3)}
          </div>
          {eq.felt && (
            <div>
              <strong>Felt Reports:</strong> {eq.felt.toLocaleString()}
            </div>
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
));

// ✅ 6. Main Map Component
function EarthquakeVisualizer({ earthquakes, darkMode = false }) {
  const validEarthquakes = useMemo(
    () =>
      earthquakes.filter(
        (eq) =>
          eq.id &&
          eq.lat &&
          eq.lng &&
          !isNaN(eq.lat) &&
          !isNaN(eq.lng) &&
          eq.magnitude != null
      ),
    [earthquakes]
  );

  return (
    <div
      className="relative w-full"
      style={{
        height: "calc(100vh - 64px)", // 👈 Adjust based on navbar height
        zIndex: 0, // keeps map below navbar
      }}
    >
      <MapContainer
        center={[20, 0]}
        zoom={2}
        className="h-full w-full"
        scrollWheelZoom
        worldCopyJump
        minZoom={2}
        maxZoom={10}
        // 👇 Allow gentle edge resistance, not hard lock
        maxBounds={[[-85, -180], [85, 180]]}
        maxBoundsViscosity={0.4}
      >
        {/* ✅ Dark / Light mode tiles */}
        <TileLayer
          url={
            darkMode
              ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
              : "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          }
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />

        <ScaleControl position="bottomleft" />

        <FitBounds earthquakes={validEarthquakes} />

        {validEarthquakes.map((eq) => (
          <EarthquakeMarker key={eq.id} eq={eq} />
        ))}
      </MapContainer>
    </div>
  );
}

export default React.memo(EarthquakeVisualizer);
