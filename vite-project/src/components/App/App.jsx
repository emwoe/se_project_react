import { useState } from "react";

import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import NewGarmentForm from "../ModalWithForm/NewGarmentForm/NewGarmentForm";

function App() {
  const [weatherData, setWeatherData] = useState({ type: "cold" });
  const [activeModal, setActiveModal] = useState("");

  const handleAddClick = () => {
    setActiveModal("add-garment");
    console.log("Open!");
  };

  const handleModalClose = () => {
    setActiveModal("");
    console.log("Closed!");
  };

  const findTarget = (evt) => {
    console.log(evt.target);
  };

  return (
    <div className="app">
      <div className="app__content">
        <Header handleAddClick={handleAddClick} />
        <Main weatherData={weatherData} />
      </div>
      <Footer />
      <ModalWithForm
        title="New garment"
        buttonText="Add garment"
        name="garment"
        activeModal={activeModal}
        findTarget={findTarget}
        handleModalClose={handleModalClose}
      >
        <NewGarmentForm />
      </ModalWithForm>
    </div>
  );
}

export default App;
