import React from "react";

export default function InfoPanel({ earthquakes, loading }) {
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

  const totalCount = earthquakes.length;
  const significant = earthquakes.filter((eq) => eq.magnitude >= 4.0).length;
  const maxMag = earthquakes.reduce(
    (max, eq) => Math.max(max, eq.magnitude),
    0
  );

  return (
    <>
      {/* Statistics - bottom-left */}
      <div className="absolute bottom-4 left-4 bg-white p-4 rounded-lg shadow-lg z-[1000] border max-w-xs w-64 sm:w-72">
        <h3 className="font-bold mb-2 text-sm">Statistics</h3>
        <div className="text-xs space-y-1">
          <div>
            Total Earthquakes:{" "}
            <span className="font-semibold">{totalCount}</span>
          </div>
          <div>
            Significant (4.0+):{" "}
            <span className="font-semibold">{significant}</span>
          </div>
          <div>
            Largest Magnitude:{" "}
            <span className="font-semibold">M{maxMag.toFixed(1)}</span>
          </div>
          <div className="text-gray-600 mt-2">
            Data from USGS - Updates every few minutes
          </div>
        </div>
      </div>

      {/* Legend - bottom-right */}
      <div className="absolute bottom-4 right-4 bg-white p-4 rounded-lg shadow-lg z-[1000] border w-48 sm:w-56">
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
