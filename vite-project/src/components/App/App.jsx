import { useState } from "react";
import React from "react";

import "./App.css";
import { coordinates, APIkey } from "../../utils/constants";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import NewGarmentForm from "../ModalWithForm/NewGarmentForm/NewGarmentForm";
import ItemModal from "../ItemModal/ItemModal";
import { getWeather, filterWeatherData } from "../../utils/weatherAPI";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "cold",
    temp: 999,
    city: "",
    condition: "",
  });
  const [activeModal, setActiveModal] = useState("");
  const [itemForModal, setItemForModal] = useState({});

  const handleAddClick = () => {
    setActiveModal("add-garment");
    console.log("Modal should open");
  };

  const handleModalClose = () => {
    setActiveModal("");
  };

  const handleItemCardClick = (card) => {
    setActiveModal("item-card");
    setItemForModal(card);
    console.log(card);
  };

  React.useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);

  React.useEffect(() => {
    function handleEscClose(evt) {
      evt.key === "Escape" && handleModalClose();
    }

    function handleRemoteClick(evt) {
      const modaloverlay = document.querySelector(".modal__overlay");
      const itemmodaloverlay = document.querySelector(
        ".modal__overlay_type_item"
      );
      if (evt.target === modaloverlay || evt.target === itemmodaloverlay) {
        setActiveModal("");
      }
    }

    if (activeModal !== "") {
      document.addEventListener("keydown", handleEscClose);
      document.addEventListener("click", handleRemoteClick);
    }

    return () => {
      document.removeEventListener("keydown", handleEscClose);
      document.removeEventListener("click", handleRemoteClick);
      console.log(activeModal);
    };
  }, [activeModal]);

  return (
    <div className="app">
      <div className="app__content">
        <Header handleAddClick={handleAddClick} weatherData={weatherData} />
        <Main
          weatherData={weatherData}
          handleItemCardClick={handleItemCardClick}
        />
      </div>
      <Footer />
      <ModalWithForm
        title="New garment"
        buttonText="Add garment"
        name="garment"
        activeModal={activeModal}
        handleModalClose={handleModalClose}
      >
        <NewGarmentForm />
      </ModalWithForm>
      <ItemModal
        activeModal={activeModal}
        itemForModal={itemForModal}
        handleModalClose={handleModalClose}
      />
    </div>
  );
}

export default App;
