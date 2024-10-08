import "./WeatherCard.css";
import { weatherOptions } from "../../../utils/constants";
import { CurrentTemperatureUnitContext } from "../../../contexts/CurrentTemperatureUnitContext";
import React from "react";

function WeatherCard({ weatherData }) {
  const tempUnit = React.useContext(CurrentTemperatureUnitContext);
  const weatherOptionArray = weatherOptions.filter((option) => {
    return (
      option.condition === weatherData.condition &&
      option.day == weatherData.isDay
    );
  });

  const weatherOptionURL = weatherOptionArray[0]?.url;

  return (
    <section className="weather-card">
      <p className="weather-card__temp">
        {tempUnit.currentTemperatureUnit == "F"
          ? `${weatherData.temp} °F`
          : `${weatherData.temp_c} °C`}
      </p>
      <img
        src={weatherOptionURL}
        alt={weatherData.condition}
        className="weather-card__image"
      ></img>
    </section>
  );
}

export default WeatherCard;
