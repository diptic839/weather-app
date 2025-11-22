import React from "react";

export default function ForecastCard({ data }) {
  const date = new Date(data.dt_txt);

  return (
    <div className="forecast-card glass">
      <p>{date.toLocaleDateString([], { month: "2-digit", day: "2-digit" })}</p>
      <p>{date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</p>

      <img
        src={`https://openweathermap.org/img/wn/${data.weather[0].icon}.png`}
        alt=""
      />

      <h3>{Math.round(data.main.temp)}°</h3>
    </div>
  );
}
