import { checkResponse } from "./api";
export const getWeather = ({ latitude, longitude }, APIkey) => {
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIkey}`
  ).then(checkResponse);
};

export const filterWeatherData = (data) => {
  const result = {};
  const temp = Math.round(data.main.temp);
  const temp_c = Math.round((data.main.temp - 32) * (5 / 9));
  if (temp >= 86) {
    result.type = "hot";
  } else if (temp >= 66) {
    result.type = "warm";
  } else {
    result.type = "cold";
  }
  const weatherCode = data.weather[0].id;
  if (weatherCode < 623 && weatherCode > 599) {
    result.condition = "snow";
  } else if (weatherCode < 532 && weatherCode > 299) {
    result.condition = "rain";
  } else if ((weatherCode > 199 && weatherCode < 233) || weatherCode === 781) {
    result.condition = "storm";
  } else if (weatherCode == 800) {
    result.condition = "clear";
  } else if (800 < weatherCode) {
    result.condition = "clouds";
  } else if (weatherCode === 701 || weatherCode === 741) {
    result.condition = "fog";
  }
  if (
    data.sys.sunrise < Date.now() / 1000 &&
    data.sys.sunset > Date.now() / 1000
  ) {
    result.isDay = true;
  } else {
    result.isDay = false;
  }
  result.city = data.name;
  result.temp = temp;
  result.temp_c = temp_c;
  return result;
};
