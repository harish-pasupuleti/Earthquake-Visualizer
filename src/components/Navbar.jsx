import React, { useState } from "react";

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

          {/* Toggle button (mobile) */}
          <div className="sm:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 rounded-lg hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-colors duration-200"
            >
              <span className="text-lg">☰</span>
            </button>
          </div>

          {/* Menu (desktop) */}
          <div className="hidden sm:flex sm:space-x-8 sm:items-center">
            {/* Time window selector */}
            <div className="flex items-center space-x-3 bg-white/10 rounded-lg px-4 py-2 backdrop-blur-sm">
              <label className="font-semibold text-purple-100">Time:</label>
              <select
                value={timeWindow}
                onChange={(e) => setTimeWindow(e.target.value)}
                className="text-gray-800 bg-white rounded-md px-3 py-1.5 font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-200 hover:shadow-md"
              >
                <option value="day">Past Day</option>
                <option value="week">Past Week</option>
                <option value="custom">Past Month</option>
              </select>
            </div>

            {/* Magnitude slider */}
            <div className="flex items-center space-x-3 bg-white/10 rounded-lg px-4 py-2 backdrop-blur-sm">
              <label className="font-semibold text-purple-100 whitespace-nowrap">Min Mag:</label>
              <div className="flex items-center space-x-2">
                <input
                  type="range"
                  min="0"
                  max="10"
                  step="0.1"
                  value={magnitude}
                  onChange={(e) => setMagnitude(Number(e.target.value))}
                  className="w-24 h-2 bg-purple-300 rounded-lg appearance-none cursor-pointer slider"
                />
                <span className="font-bold text-white bg-purple-800 px-2 py-1 rounded-md min-w-[2.5rem] text-center">
                  {magnitude}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <div className="sm:hidden px-4 pb-6 space-y-6 bg-gradient-to-b from-slate-800 to-slate-900 shadow-inner">
          {/* Time window selector */}
          <div className="flex flex-col space-y-2">
            <label className="font-semibold text-blue-100">Time Window:</label>
            <select
              value={timeWindow}
              onChange={(e) => setTimeWindow(e.target.value)}
              className="text-gray-800 bg-white rounded-lg px-3 py-2.5 font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200"
            >
              <option value="day">Past Day</option>
              <option value="week">Past Week</option>
              <option value="custom">Custom</option>
            </select>
          </div>

          {/* Magnitude slider */}
          <div className="flex flex-col space-y-3">
            <label className="font-semibold text-blue-100">
              Minimum Magnitude: <span className="font-bold text-white">{magnitude}</span>
            </label>
            <div className="flex items-center space-x-3">
              <span className="text-sm text-blue-200">0</span>
              <input
                type="range"
                min="0"
                max="10"
                step="0.1"
                value={magnitude}
                onChange={(e) => setMagnitude(Number(e.target.value))}
                className="flex-1 h-3 bg-blue-300 rounded-lg appearance-none cursor-pointer slider"
              />
              <span className="text-sm text-blue-200">10</span>
            </div>
          </div>
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