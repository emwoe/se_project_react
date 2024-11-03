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
  const [activeModal, setActiveModal] = useState("");
  const [itemForModal, setItemForModal] = useState({});
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [currentUser, setCurrentUser] = useState({});
  const [clothingItems, setClothingItems] = useState([]);
  const [itemForDeleteID, setItemforDeleteID] = useState();
  const [itemToAdd, setItemToAdd] = useState({});

  const handleRegistration = ({ email, password, name, avatar }) => {
    auth
      .register({ email, password, name, avatar })
      .then((data) => {
        console.log(data);
        setIsLoggedIn(true);
        setCurrentUser({
          name: data.name,
          _id: data._id,
          email: data.email,
          avatar: data.avatar,
          initial: data.name[0],
        });
        handleModalClose();
      })
      .catch(console.error);
  };

  const handleLogin = ({ email, password }) => {
    auth
      .login({ email, password })
      .then((data) => {
        console.log(data);
        if (data.usertoken) {
          token.setToken(data.usertoken);
          setCurrentUser(data.userdata);
          setIsLoggedIn(true);
          handleModalClose();
        }
      })
      .catch(console.error);
  };

  const handleRegClick = () => {
    setActiveModal("register");
    setIsMobileMenuOpen(false);
    console.log(currentUser);
  };

  const handleLoginClick = () => {
    setActiveModal("login");
    setIsMobileMenuOpen(false);
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
    const jwt = token.getToken();
    /*
    newItem._id = clothingItems[clothingItems.length - 1]._id + 1;
    */
    newItem._id = Math.random();
    newItem.name = values.name;
    newItem.weather = values.weather;
    newItem.imageUrl = values.url;
    //This works! Other routes should use the same technique!
    postItem(newItem, jwt)
      .then(handleModalClose)
      .then(() => setClothingItems([newItem, ...clothingItems]))
      .then(resetForm)
      .catch(console.error);
  };

  const deleteItemNow = () => {
    const jwt = token.getToken();
    deleteItem(itemForDeleteID, jwt)
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

  useEffect(() => {
    const jwt = token.getToken();

    if (!jwt) {
      return;
    }

    auth.getUserInfo(jwt).then(({ data }) => {
      setIsLoggedIn(true);
      setCurrentUser({
        name: data.name,
        avatar: data.avatar,
        _id: data._id,
        email: data.email,
        initial: String(data.name)[0],
      });
    });
  }, []);

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
              handleRegClick={handleRegClick}
              handleLoginClick={handleLoginClick}
              handleToggleSwitch={handleToggleSwitch}
              handleMenuClose={handleMenuClose}
              isMobileMenuOpen={isMobileMenuOpen}
              weatherData={weatherData}
              isLoggedIn={isLoggedIn}
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
