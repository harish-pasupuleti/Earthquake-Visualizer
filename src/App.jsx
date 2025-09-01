import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import EarthquakeVisualizer from "./EarthquakeVisualizer";
import InfoPanel from "./components/InfoPanel";

function App() {
  const [earthquakes, setEarthquakes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Navbar state
  const [timeWindow, setTimeWindow] = useState("day");
  const [magnitude, setMagnitude] = useState(0);
  
  // Generate API URL based on navbar selections
  const getApiUrl = (timeWindow) => {
    const baseUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_";
    switch (timeWindow) {
      case "day":
        return `${baseUrl}day.geojson`;
      case "week":
        return `${baseUrl}week.geojson`;
      case "custom":
        // For now, default to month - you can extend this later
        return `${baseUrl}month.geojson`;
      default:
        return `${baseUrl}day.geojson`;
    }
  };

  useEffect(() => {
    const fetchEarthquakes = async () => {
      setLoading(true);
      setError(null);
      try {
        const apiUrl = getApiUrl(timeWindow);
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        const processedData = data.features
          .map((feature) => ({
            id: feature.id,
            magnitude: feature.properties.mag || 0,
            place: feature.properties.place || "Unknown location",
            time: feature.properties.time,
            lat: feature.geometry.coordinates[1],
            lng: feature.geometry.coordinates[0],
            depth: feature.geometry.coordinates[2],
            url: feature.properties.url,
            felt: feature.properties.felt,
            tsunami: feature.properties.tsunami,
            significance: feature.properties.sig || 0,
          }))
          // Filter by minimum magnitude
          .filter((earthquake) => earthquake.magnitude >= magnitude);
        
        setEarthquakes(processedData);
      } catch (err) {
        setError(err.message || "Something went wrong while fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchEarthquakes();
  }, [timeWindow, magnitude]); // Re-fetch when timeWindow or magnitude changes

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar 
        timeWindow={timeWindow}
        setTimeWindow={setTimeWindow}
        magnitude={magnitude}
        setMagnitude={setMagnitude}
      />
      
      {error && (
        <div className="bg-red-200 text-red-800 p-2 text-center">
          {error}
        </div>
      )}
   
      {loading && (
        <div className="text-center p-4 bg-gray-100">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
          <span className="ml-2">Loading earthquake data...</span>
        </div>
      )}
     
      {!loading && !error && (
        <EarthquakeVisualizer earthquakes={earthquakes}   />
      )}
      
      <InfoPanel earthquakes={earthquakes} loading={loading}  />
    </div>
  );
}

export default App;