import { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import React from "react";

import "./App.css";
import { coordinates, APIkey, validationConfig } from "../../utils/constants";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute.jsx";
import AddItemModal from "../AddItemModal/AddItemModal.jsx";
import RegisterModal from "../RegisterModal/RegisterModal.jsx";
import LoginModal from "../LoginModal/LoginModal.jsx";
import ItemModal from "../ItemModal/ItemModal";
import Profile from "../Profile/Profile";
import DeleteItemCheckModal from "../DeleteItemCheckModal/DeleteItemCheckModal.jsx";
import { getWeather, filterWeatherData } from "../../utils/weatherAPI";
import { getItems, postItem, deleteItem } from "../../utils/api.js";
import FormValidator from "../../utils/FormValidator";
import * as auth from "../../utils/auth.js";
import * as token from "../../utils/token.js";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import { CurrentUserContext } from "../../contexts/CurrentUser.js";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "cold",
    temp: 999,
    temp_c: 888,
    city: "",
    condition: "",
    isDay: "true",
  });

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState({ name: "", email: "", avatar: "" });
  const [activeModal, setActiveModal] = useState("");
  const [itemForModal, setItemForModal] = useState({});
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [currentUser, setCurrentUser] = useState({});
  const [clothingItems, setClothingItems] = useState([]);
  const [itemForDeleteID, setItemforDeleteID] = useState();
  const [itemToAdd, setItemToAdd] = useState({});

  const handleRegistration = ({ data }) => {
    auth
      .register(data.email, data.newname, data.password, data.url)
      .then(() => {
        setIsLoggedIn(true);
        handleModalClose();
        //How should userData be set here?
      })
      .catch(console.error);
  };

  const handleLogin = ({ data }) => {
    auth
      .login(data.email, data.password)
      .then((data) => {
        if (data.jwt) {
          //Where is data.jwt/data.user coming from?
          token.setToken(data.jwt);
          setUserData(data.user);
          setIsLoggedIn(true);
          handleModalClose();
        }
      })
      .catch(console.error);
  };

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
    /*
    newItem._id = clothingItems[clothingItems.length - 1]._id + 1;
    */
    newItem._id = Math.random();
    newItem.name = values.name;
    newItem.weather = values.weather;
    newItem.imageUrl = values.url;
    postItem(newItem)
      .then(handleModalClose)
      .then(() => setClothingItems([newItem, ...clothingItems]))
      .then(resetForm)
      .catch(console.error);
  };

  const deleteItemNow = () => {
    deleteItem(itemForDeleteID)
      .then(() => {
        setClothingItems((cards) =>
          cards.filter((card) => card._id != itemForDeleteID)
        );
        handleModalClose();
      })
      .catch(console.error);
  };

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    getItems()
      .then((data) => setClothingItems(data.data))
      .catch(console.error);
  }, []);

  useEffect(() => {
    function handleEscClose(evt) {
      evt.key === "Escape" && handleModalClose();
    }

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
  /*
  useEffect(() => {
    const jwt = token.getToken();

    if (!jwt) {
      return;
    }

    auth.getUserInfo(jwt).then(({ name, avatar, email }) => {
      setIsLoggedIn(true);
      setUserData({ name, avatar, email });
    });
  }, []);
  */

  return (
    <CurrentUserContext.Provider value={currentUser}>
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
              userData={userData}
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
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <Profile
                      handleItemCardClick={handleItemCardClick}
                      clothingItems={clothingItems}
                      handleAddClick={handleAddClick}
                    />
                  </ProtectedRoute>
                }
              />
            </Routes>

            <Footer />
          </div>
          <RegisterModal
            activeModal={activeModal}
            handleModalClose={handleModalClose}
            isOpen={activeModal === "register"}
            handleRegistration={handleRegistration}
          />
          <LoginModal
            activeModal={activeModal}
            handleModalClose={handleModalClose}
            isOpen={activeModal === "login"}
            handleLogin={handleLogin}
          />
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
    </CurrentUserContext.Provider>
  );
}

export default App;
