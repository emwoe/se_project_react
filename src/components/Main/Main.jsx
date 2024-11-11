import WeatherCard from "./WeatherCard/WeatherCard";
import ItemCard from "./ItemCard/ItemCard";
import React from "react";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import "./Main.css";

function Main({
  weatherData,
  handleItemCardClick,
  clothingItems,
  handleItemLike,
  updateIsLiked,
}) {
  const tempUnit = React.useContext(CurrentTemperatureUnitContext);

  return (
    <main>
      <WeatherCard weatherData={weatherData} />
      <section className="cards">
        <p className="cards__text">
          Today is{" "}
          {tempUnit.currentTemperatureUnit == "F"
            ? `${weatherData.temp} °F`
            : `${weatherData.temp_c} °C`}{" "}
          / You may want to wear:
        </p>
        <ul className="cards__list">
          {clothingItems
            .filter((item) => {
              return item.weather === weatherData.type;
            })
            .map((item) => {
              return (
                <ItemCard
                  key={item._id}
                  item={item}
                  onCardClick={handleItemCardClick}
                  handleItemLike={handleItemLike}
                  updateIsLiked={updateIsLiked}
                />
              );
            })}
        </ul>
      </section>
    </main>
  );
}

export default Main;
