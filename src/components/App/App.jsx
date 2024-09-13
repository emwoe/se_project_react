import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import React from "react";

import "./App.css";
import { coordinates, APIkey, validationConfig } from "../../utils/constants";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
/*
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import NewGarmentForm from "../ModalWithForm/NewGarmentForm/NewGarmentForm";
*/
import AddItemModal from "../AddItemModal/AddItemModal.jsx";
import ItemModal from "../ItemModal/ItemModal";
import Profile from "../Profile/Profile";
import DeleteItemCheckModal from "../DeleteItemCheckModal/DeleteItemCheckModal.jsx";
import { getWeather, filterWeatherData } from "../../utils/weatherAPI";
import { getItems, postItem, deleteItem } from "../../utils/api.js";
import FormValidator from "../../utils/FormValidator";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
/*
import { defaultClothingItems } from "../../utils/constants";
*/

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "cold",
    temp: 999,
    temp_c: 888,
    city: "",
    condition: "",
    isDay: "true",
  });
  const [activeModal, setActiveModal] = useState("");
  const [itemForModal, setItemForModal] = useState({});
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState([]);
  const [itemForDeleteID, setItemforDeleteID] = useState();
  const [itemToAdd, setItemToAdd] = useState({});

  const handleAddClick = () => {
    setActiveModal("add-garment");
    setIsMobileMenuOpen(false);
  };

  const handleDeleteClick = () => {
    setActiveModal("delete-check");
  };

  const handleModalClose = () => {
    setActiveModal("");
  };

  const handleItemCardClick = (card) => {
    setActiveModal("item-card");
    setItemForModal(card);
    setItemforDeleteID(card._id);
  };

  const handleHamburgerClick = () => {
    setIsMobileMenuOpen(true);
  };

  const handleMenuClose = () => {
    setIsMobileMenuOpen(false);
  };

  const handleToggleSwitch = () => {
    currentTemperatureUnit === "F"
      ? setCurrentTemperatureUnit("C")
      : setCurrentTemperatureUnit("F");
  };

  const onAddItem = ({ values }, resetForm) => {
    const newItem = {};
    newItem._id = clothingItems[clothingItems.length - 1]._id + 1;
    newItem.name = values.name;
    newItem.weather = values.weather;
    newItem.imageUrl = values.url;
    postItem(newItem)
      .catch(console.error)
      .then(() => setClothingItems([newItem, ...clothingItems]))
      .then(resetForm)
      .finally(handleModalClose);
  };

  const deleteItemNow = () => {
    deleteItem(itemForDeleteID)
      .then(() => {
        setClothingItems((cards) =>
          cards.filter((card) => card._id != itemForDeleteID)
        );
      })
      .catch(console.error);

    getItems()
      .catch(console.error)
      .then((data) => setClothingItems(data))
      .finally(handleModalClose);
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
    getItems()
      .catch(console.error)
      .then((data) => setClothingItems(data));
  }, []);

  React.useEffect(() => {
    function handleEscClose(evt) {
      evt.key === "Escape" && handleModalClose();
    }

    /*
    function handleRemoteClick(evt) {
      const modaloverlay = document.querySelector(".modal__overlay");
      const itemmodaloverlay = document.querySelector(
        ".modal__overlay_type_item"
      );
      if (evt.target === modaloverlay || evt.target === itemmodaloverlay) {
        setActiveModal("");
      }
    }
      */

    function handleRemoteClick(evt) {
      if (evt.target.classList.contains("modal__overlay")) {
        handleModalClose();
      }
    }

    if (activeModal !== "") {
      document.addEventListener("keydown", handleEscClose);
      document.addEventListener("click", handleRemoteClick);
    }

    return () => {
      document.removeEventListener("keydown", handleEscClose);
      document.removeEventListener("click", handleRemoteClick);
    };
  }, [activeModal]);

  return (
    <CurrentTemperatureUnitContext.Provider
      value={{ currentTemperatureUnit, handleToggleSwitch }}
    >
      <div className="app">
        <div className="app__content">
          <Header
            handleAddClick={handleAddClick}
            handleHamburgerClick={handleHamburgerClick}
            handleToggleSwitch={handleToggleSwitch}
            handleMenuClose={handleMenuClose}
            isMobileMenuOpen={isMobileMenuOpen}
            weatherData={weatherData}
          />
          <Routes>
            <Route
              path="/"
              element={
                <Main
                  weatherData={weatherData}
                  handleItemCardClick={handleItemCardClick}
                  clothingItems={clothingItems}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <Profile
                  handleItemCardClick={handleItemCardClick}
                  clothingItems={clothingItems}
                  handleAddClick={handleAddClick}
                />
              }
            />
          </Routes>

          <Footer />
        </div>
        <AddItemModal
          activeModal={activeModal}
          handleModalClose={handleModalClose}
          isOpen={activeModal === "add-garment"}
          onAddItem={onAddItem}
        />
        <ItemModal
          activeModal={activeModal}
          itemForModal={itemForModal}
          handleModalClose={handleModalClose}
          handleDeleteClick={handleDeleteClick}
        />

        <DeleteItemCheckModal
          activeModal={activeModal}
          handleModalClose={handleModalClose}
          deleteItemNow={deleteItemNow}
        />
      </div>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
