import { useState } from "react";
import React from "react";

import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import NewGarmentForm from "../ModalWithForm/NewGarmentForm/NewGarmentForm";
import ItemModal from "../ItemModal/ItemModal";

function App() {
  const [weatherData, setWeatherData] = useState({ type: "cold" });
  const [activeModal, setActiveModal] = useState("");
  const [itemForModal, setItemForModal] = useState({});

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const handleCardClick = (item) => {
    setActiveModal("item-card");
    setItemForModal(item);
  };

  const handleModalClose = () => {
    setActiveModal("");
  };

  const handleItemCardClick = () => {
    console.log("clicked!");
    setItemForModal({ item });
  };

  React.useEffect(() => {
    function handleEscClose(evt) {
      evt.key === "Escape" && handleModalClose();
    }

    function handleRemoteClick(evt) {
      const target = document.querySelector(".modal");
      if (evt.target === target) {
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
        <Header handleAddClick={handleAddClick} />
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
      <ItemModal />
    </div>
  );
}

export default App;
