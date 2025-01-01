import { useState } from "react";
import "./App.css";
import cloud from "./assets/cloud.png";
import axios from "axios";

function App() {
  const [city, setCity] = useState("Hong Kong");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get(
        `http://api.weatherapi.com/v1/current.json?key=60071b57a79342de86b140514250101&q=${city}`
      );
      setData(response.data);
    } catch (err) {
      setError("Failed to fetch weather data. Please check the city name.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-b from-blue-900 to-gray-900 w-full h-screen flex flex-col justify-center items-center">
      {/* Search Bar */}
      <div className="flex items-center mb-6">
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="w-64 p-2 rounded-l-lg text-black"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-r-lg font-semibold"
        >
          Search
        </button>
      </div>

      {/* Error Message */}
      {error && <p className="text-red-500">{error}</p>}

      {/* Loading Spinner */}
      {loading && (
        <div className="flex items-center justify-center">
          <div className="loader"></div>
        </div>
      )}

      {/* Weather Card */}
      {!loading && data && (
        <div className="flex items-center gap-4 bg-slate-800 w-[22em] h-[14em] rounded-lg shadow-lg p-4">
          {/* Weather Info */}
          <div className="text-white">
            <p className="text-lg font-semibold">{data.location.name}</p>
            <p className="text-sm text-gray-300">
              {new Date(data.location.localtime).toLocaleString()}
            </p>
            <p className="text-5xl font-bold mt-2 flex items-start">
              {data.current.temp_c}
              <sup className="text-xl">°C</sup>
            </p>
          </div>

          {/* Weather Icon */}
          <div className="flex-shrink-0">
            <img
              src={data.current.condition.icon}
              alt={data.current.condition.text}
              className="w-24 h-24 object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
