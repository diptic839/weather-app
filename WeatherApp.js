import React, { useState } from "react";
import ForecastCard from "./ForecastCard";
import "../weather.css";

// Use your actual API key here
const API_KEY = "40a0eda3992a8db12164a0b1d7999971";

export default function WeatherApp() {
  const [city, setCity] = useState("New York");
  const [query, setQuery] = useState("");
  const [data, setData] = useState(null);
  const [forecast, setForecast] = useState([]);

  const searchCity = async () => {
    if (!query) return;

    // URLs for current weather and forecast
    const urlCurrent = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${API_KEY}&units=metric`;
    const urlForecast = `https://api.openweathermap.org/data/2.5/forecast?q=${query}&appid=${API_KEY}&units=metric`;

    try {
      // Fetch current weather
      const res1 = await fetch(urlCurrent);
      const cur = await res1.json();

      if (cur.cod !== 200) {
        alert("City not found!");
        return;
      }

      // Fetch forecast
      const res2 = await fetch(urlForecast);
      const fore = await res2.json();

      // Update state
      setCity(cur.name);
      setData(cur);
      setForecast(fore.list.slice(0, 10)); // first 10 forecast items
      setQuery("");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="weather-container">

      {/* SEARCH BAR */}
      <div className="search-box">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search city..."
        />
        <button onClick={searchCity}>🔍</button>
      </div>

      {/* MAIN WEATHER CARD */}
      {data && (
        <div className="main-card">

          {/* CITY + COUNTRY */}
          <h1>
            {city}
            {data?.sys?.country ? `, ${data.sys.country}` : ""}
          </h1>

          <p>{new Date().toDateString()}</p>

          <div className="weather-main-info">

            {/* ICON */}
            <img
              className="weather-icon"
              alt="weather icon"
              src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
            />

            {/* TEMP + DESCRIPTION */}
            <div>
              <h2>{Math.round(data.main.temp)}°</h2>
              <p>{data.weather[0].description}</p>
            </div>

            {/* SIDE PANEL */}
            <div className="side-info glass">
              <p>High: {data.main.temp_max}°</p>
              <p>Low: {data.main.temp_min}°</p>
              <p>Wind: {data.wind.speed} mph</p>
              <p>Humidity: {data.main.humidity}%</p>
            </div>

          </div>

          {/* FORECAST */}
          <h2 className="forecast-title">Forecast</h2>
          <div className="forecast-scroll">
            {forecast.map((item, i) => (
              <ForecastCard key={i} data={item} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
