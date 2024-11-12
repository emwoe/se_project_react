import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import "./App.css";
import { coordinates, APIkey } from "../../utils/constants";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute.jsx";
import AddItemModal from "../AddItemModal/AddItemModal.jsx";
import EditProfileModal from "../EditProfileModal/EditProfileModal.jsx";
import RegisterModal from "../RegisterModal/RegisterModal.jsx";
import LoginModal from "../LoginModal/LoginModal.jsx";
import ItemModal from "../ItemModal/ItemModal";
import Profile from "../Profile/Profile";
import DeleteItemCheckModal from "../DeleteItemCheckModal/DeleteItemCheckModal.jsx";
import { getWeather, filterWeatherData } from "../../utils/weatherAPI";
import {
  getItems,
  postItem,
  addCardLike,
  removeCardLike,
  deleteItem,
} from "../../utils/api.js";
import * as auth from "../../utils/auth.js";
import * as token from "../../utils/token.js";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import { CurrentUserContext } from "../../contexts/CurrentUser.js";
import { IsLoggedInContext } from "../../contexts/IsLoggedIn.js";

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
  const [itemForDeleteID, setItemforDeleteID] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleModalClose = () => {
    setActiveModal("");
  };

  function handleSubmit(request) {
    setIsLoading(true);
    request()
      .then(handleModalClose)
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }

  const handleRegistration = ({ email, password, name, avatar }) => {
    const makeRequest = () => {
      return auth.register({ email, password, name, avatar }).then((data) => {
        setIsLoggedIn(true);
        setCurrentUser({
          name: data.name,
          _id: data._id,
          email: data.email,
          avatar: data.avatar,
          initial: data.name.split("")[0],
        });
      });
    };
    handleSubmit(makeRequest);
  };

  const handleLogin = ({ email, password }) => {
    const makeRequest = () => {
      return auth.login({ email, password }).then((data) => {
        console.log(data);
        if (data.usertoken) {
          token.setToken(data.usertoken);
          setCurrentUser(data.userdata);
          setIsLoggedIn(true);
        }
      });
    };

    handleSubmit(makeRequest);
  };

  const handleRegClick = () => {
    setActiveModal("register");
    setIsMobileMenuOpen(false);
  };

  const handleEditClick = () => {
    setActiveModal("edit-profile");
    setIsMobileMenuOpen(false);
    console.log(currentUser);
  };

  const handleProfileChanges = ({ newName, newImageUrl }) => {
    const jwt = token.getToken();
    const makeRequest = () => {
      return auth
        .editUserInfo({ newName, newImageUrl }, jwt)
        .then(
          auth.getUserInfo(jwt).then(({ data }) => {
            setCurrentUser({
              name: data.name,
              avatar: data.avatar,
              _id: data._id,
              email: data.email,
              initial: data.name.split("")[0],
            });
          })
        )
        .catch(console.error);
    };

    handleSubmit(makeRequest);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    token.clearToken();
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

  const handleItemCardClick = (card) => {
    console.log(isLoggedIn);
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

  const handleItemLike = ({ id, isLiked }) => {
    console.log(isLiked);
    const jwt = token.getToken();
    console.log(clothingItems);
    !isLiked
      ? addCardLike(id, jwt)
          .then((updatedCard) => {
            console.log(updatedCard);

            setClothingItems((cards) =>
              cards.map((item) =>
                item._id === id ? { ...item, ...updatedCard } : item
              )
            );
          })
          .then(console.log(clothingItems))
          .catch((err) => console.log(err))
      : removeCardLike(id, jwt)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) =>
                item._id === id ? { ...item, ...updatedCard } : item
              )
            );
          })
          .catch((err) => console.log(err));
  };

  const updateIsLiked = (id) => {
    setClothingItems((prevItems) =>
      prevItems.map((item) =>
        item._id === id
          ? { ...item, likes: toggleLike(item.likes, currentUser._id) }
          : item
      )
    );
  };

  const toggleLike = (likes, userId) =>
    likes.includes(userId)
      ? likes.filter((id) => id !== userId)
      : [...likes, userId];

  const onAddItem = ({ values }, resetForm) => {
    const newItem = {};
    const jwt = token.getToken();
    newItem.name = values.name;
    newItem.weather = values.weather;
    newItem.imageUrl = values.url;
    newItem.likes = [];
    const makeRequest = () => {
      return postItem(newItem, jwt).then((newItem) => {
        setClothingItems((currentItems) => [newItem.data, ...currentItems]);
        handleModalClose();
        resetForm();
      });
    };

    handleSubmit(makeRequest);
  };

  const deleteItemNow = () => {
    console.log(itemForDeleteID);
    const jwt = token.getToken();
    deleteItem(itemForDeleteID, jwt)
      .then(() => {
        setClothingItems((cards) =>
          cards.filter((card) => card._id != itemForDeleteID)
        );
      })
      .then(handleModalClose)
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
    console.log("Updated clothingItems:", clothingItems);
  }, [clothingItems]);

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

    auth
      .getUserInfo(jwt)
      .then(({ data }) => {
        setIsLoggedIn(true);
        setCurrentUser({
          name: data.name,
          avatar: data.avatar,
          _id: data._id,
          email: data.email,
          initial: data.name.split("")[0],
        });
      })
      .catch(console.error);
  }, []);

  return (
    <IsLoggedInContext.Provider value={isLoggedIn}>
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
              />
              <Routes>
                <Route
                  path="/"
                  element={
                    <Main
                      weatherData={weatherData}
                      handleItemCardClick={handleItemCardClick}
                      clothingItems={clothingItems}
                      handleItemLike={handleItemLike}
                      updateIsLiked={updateIsLiked}
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
                        handleEditClick={handleEditClick}
                        handleItemLike={handleItemLike}
                        handleLogout={handleLogout}
                        updateIsLiked={updateIsLiked}
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
              handleLoginClick={handleLoginClick}
              isLoading={isLoading}
            />
            <LoginModal
              activeModal={activeModal}
              handleModalClose={handleModalClose}
              isOpen={activeModal === "login"}
              handleLogin={handleLogin}
              handleRegClick={handleRegClick}
              isLoading={isLoading}
            />
            <EditProfileModal
              activeModal={activeModal}
              handleModalClose={handleModalClose}
              isOpen={activeModal === "edit-profile"}
              handleProfileChanges={handleProfileChanges}
              isLoading={isLoading}
            />
            <AddItemModal
              activeModal={activeModal}
              handleModalClose={handleModalClose}
              isOpen={activeModal === "add-garment"}
              onAddItem={onAddItem}
              isLoading={isLoading}
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
    </IsLoggedInContext.Provider>
  );
}

export default App;
