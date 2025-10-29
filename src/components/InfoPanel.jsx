import React, { useState } from "react";

export default function InfoPanel({ earthquakes = [], loading }) {
  const [collapsed, setCollapsed] = useState(false);

  const magnitudeRanges = [
    { range: "7.0+", color: "#8B0000", label: "Major" },
    { range: "6.0-6.9", color: "#FF0000", label: "Strong" },
    { range: "5.0-5.9", color: "#FF4500", label: "Moderate" },
    { range: "4.0-4.9", color: "#FFA500", label: "Light" },
    { range: "3.0-3.9", color: "#FFD700", label: "Minor" },
    { range: "2.0-2.9", color: "#ADFF2F", label: "Very Minor" },
    { range: "<2.0", color: "#32CD32", label: "Micro" },
  ];

  if (loading) return null;
  if (!earthquakes?.length)
    return (
      <div className="absolute bottom-4 left-4 bg-white p-4 rounded-lg shadow-lg border text-sm text-gray-600">
        No earthquake data available.
      </div>
    );

  const validMagnitudes = earthquakes
    .map((eq) => eq.magnitude)
    .filter((mag) => typeof mag === "number" && !isNaN(mag));

  const totalCount = validMagnitudes.length;
  const significantCount = validMagnitudes.filter((mag) => mag >= 4.0).length;
  const maxMag = validMagnitudes.length
    ? Math.max(...validMagnitudes)
    : null;

  return (
    <>
      {/* Statistics */}
      <div className="absolute bottom-4 left-2 sm:left-4 bg-white p-4 rounded-xl shadow-lg border z-[1000] w-60 sm:w-72 transition-all duration-200">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute top-1 right-2 text-xs text-gray-500 hover:text-black"
        >
          {collapsed ? "▲" : "▼"}
        </button>

        {!collapsed && (
          <>
            <h3 className="font-bold mb-2 text-sm">Statistics</h3>
            <div className="text-xs space-y-1">
              <div>
                Total Earthquakes:{" "}
                <span className="font-semibold">{totalCount}</span>
              </div>
              <div>
                Significant (4.0+):{" "}
                <span className="font-semibold">{significantCount}</span>
              </div>
              <div>
                Largest Magnitude:{" "}
                <span className="font-semibold">
                  M{maxMag ? maxMag.toFixed(1) : "—"}
                </span>
              </div>
              <div className="text-gray-600 mt-2">
                Data from USGS — updates every few minutes
              </div>
            </div>
          </>
        )}
      </div>

      {/* Legend */}
      <div className="absolute bottom-4 right-2 sm:right-4 bg-gray-50 p-4 rounded-xl shadow-lg border z-[1000] w-48 sm:w-56 transition-all duration-200">
        <h3 className="font-bold mb-2 text-sm">Magnitude Scale</h3>
        {magnitudeRanges.map((item) => (
          <div key={item.range} className="flex items-center mb-1">
            <div
              className="w-4 h-4 rounded-full mr-2 border border-gray-400"
              style={{ backgroundColor: item.color }}
            ></div>
            <span className="text-xs">
              {item.range} - {item.label}
            </span>
          </div>
        ))}
      </div>
    </>
  );
}
