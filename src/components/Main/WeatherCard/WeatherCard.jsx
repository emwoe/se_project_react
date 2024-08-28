import "./WeatherCard.css";
import { weatherOptions } from "../../../utils/constants";

function WeatherCard({ weatherData }) {
  const weatherOptionArray = weatherOptions.filter((option) => {
    return (
      option.condition === weatherData.condition &&
      option.day == weatherData.isDay
    );
  });

  const weatherOptionURL = weatherOptionArray[0]?.url;

  return (
    <section className="weather-card">
      <p className="weather-card__temp">{weatherData.temp} &deg; F</p>
      <img
        src={weatherOptionURL}
        alt={weatherData.condition}
        className="weather-card__image"
      ></img>
    </section>
  );
}

export default WeatherCard;
