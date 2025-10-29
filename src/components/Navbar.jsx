import React, { useState } from "react";

const TimeWindowSelector = ({ value, onChange, variant = "desktop" }) => {
  const baseClasses =
    "rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all duration-200";

  return (
    <div
      className={`${
        variant === "desktop"
          ? "flex items-center space-x-3 bg-white/10 px-4 py-2 backdrop-blur-sm"
          : "flex flex-col space-y-2"
      }`}
    >
      <label
        className={`font-semibold ${
          variant === "desktop" ? "text-purple-100" : "text-blue-100"
        }`}
      >
        Time {variant === "mobile" && "Window"}:
      </label>

      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`bg-white text-gray-800 shadow-sm hover:shadow-md ${
          variant === "desktop"
            ? `${baseClasses} px-3 py-1.5`
            : `${baseClasses} px-3 py-2.5 focus:ring-blue-400`
        }`}
      >
        <option value="day">Past Day</option>
        <option value="week">Past Week</option>
        <option value="custom">Past Month</option>
      </select>
    </div>
  );
};

const MagnitudeSlider = ({ value, onChange, variant = "desktop" }) => {
  return (
    <div
      className={`${
        variant === "desktop"
          ? "flex items-center space-x-3 bg-white/10 px-4 py-2 backdrop-blur-sm"
          : "flex flex-col space-y-3"
      }`}
    >
      <label
        className={`font-semibold ${
          variant === "desktop" ? "text-purple-100" : "text-blue-100"
        }`}
      >
        {variant === "desktop"
          ? "Min Mag:"
          : `Minimum Magnitude: `}
        {variant === "mobile" && (
          <span className="font-bold text-white">{value}</span>
        )}
      </label>

      <div
        className={`${
          variant === "desktop" ? "flex items-center space-x-2" : "flex items-center space-x-3"
        }`}
      >
        {variant === "mobile" && (
          <span className="text-sm text-blue-200">0</span>
        )}
        <input
          type="range"
          min="0"
          max="10"
          step="0.1"
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className={`slider ${
            variant === "desktop"
              ? "w-24 h-2 bg-purple-300"
              : "flex-1 h-3 bg-blue-300"
          } rounded-lg appearance-none cursor-pointer`}
        />
        {variant === "desktop" ? (
          <span className="font-bold text-white bg-purple-800 px-2 py-1 rounded-md min-w-[2.5rem] text-center">
            {value}
          </span>
        ) : (
          <span className="text-sm text-blue-200">10</span>
        )}
      </div>
    </div>
  );
};

export default function Navbar({ timeWindow, setTimeWindow, magnitude, setMagnitude }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 text-white shadow-lg sticky top-0 z-50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Title */}
          <div className="flex-shrink-0 text-xl font-bold tracking-wide bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent hover:from-purple-200 hover:to-white transition-all duration-300">
            🌍 Earthquake Visualizer
          </div>

          {/* Toggle (mobile) */}
          <div className="sm:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 rounded-lg hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-colors duration-200"
            >
              <span className="text-lg">☰</span>
            </button>
          </div>

          {/* Desktop Menu */}
          <div className="hidden sm:flex sm:space-x-8 sm:items-center">
            <TimeWindowSelector value={timeWindow} onChange={setTimeWindow} />
            <MagnitudeSlider value={magnitude} onChange={setMagnitude} />
          </div>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="sm:hidden px-4 pb-6 space-y-6 bg-gradient-to-b from-slate-800 to-slate-900 shadow-inner">
          <TimeWindowSelector
            value={timeWindow}
            onChange={setTimeWindow}
            variant="mobile"
          />
          <MagnitudeSlider
            value={magnitude}
            onChange={setMagnitude}
            variant="mobile"
          />
        </div>
      )}

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 20px;
          height: 20px;
          background: white;
          border: 2px solid #1e40af;
          border-radius: 50%;
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
          transition: all 0.2s ease;
        }
        .slider::-webkit-slider-thumb:hover {
          transform: scale(1.1);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
        }
        .slider::-moz-range-thumb {
          width: 20px;
          height: 20px;
          background: white;
          border: 2px solid #1e40af;
          border-radius: 50%;
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }
      `}</style>
    </nav>
  );
}
