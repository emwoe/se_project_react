import { useState } from "react";
import React from "react";

import "./App.css";
import { coordinates, APIkey, validationConfig } from "../../utils/constants";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import NewGarmentForm from "../ModalWithForm/NewGarmentForm/NewGarmentForm";
import ItemModal from "../ItemModal/ItemModal";
import { getWeather, filterWeatherData } from "../../utils/weatherAPI";
import FormValidator from "../../utils/FormValidator";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "cold",
    temp: 999,
    city: "",
    condition: "",
    isDay: "true",
  });
  const [activeModal, setActiveModal] = useState("");
  const [itemForModal, setItemForModal] = useState({});
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleAddClick = () => {
    setActiveModal("add-garment");
    setIsMobileMenuOpen(false);
  };

  const handleModalClose = () => {
    setActiveModal("");
  };

  const handleItemCardClick = (card) => {
    setActiveModal("item-card");
    setItemForModal(card);
    console.log(card);
  };

  const handleHamburgerClick = () => {
    setIsMobileMenuOpen(true);
  };

  const handleMenuClose = () => {
    setIsMobileMenuOpen(false);
  };

  const formValidators = {};

  const enableValidation = (validationConfig) => {
    const formList = Array.from(
      document.querySelectorAll(validationConfig.formSelector)
    );
    formList.forEach((formElement) => {
      const validator = new FormValidator(validationConfig, formElement);
      const formName = formElement.getAttribute("name");
      formValidators[formName] = validator;
      validator.enableValidation();
    });
  };

  React.useEffect(() => {
    enableValidation(validationConfig);
  }, []);

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
        <Header
          handleAddClick={handleAddClick}
          handleHamburgerClick={handleHamburgerClick}
          handleMenuClose={handleMenuClose}
          isMobileMenuOpen={isMobileMenuOpen}
          weatherData={weatherData}
        />
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
