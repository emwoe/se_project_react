import ModalWithForm from "../ModalWithForm/ModalWithForm";
import NewGarmentForm from "../ModalWithForm/NewGarmentForm/NewGarmentForm";
import { useState } from "react";

function AddItemModal({ handleModalClose, activeModal, onAddItem, isOpen }) {
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [weatherType, setWeatherType] = useState("");

  const handleNameChange = (evt) => {
    console.log(evt.target.value);
    setName(evt.target.value);
  };

  const handleNewImageUrl = (evt) => {
    console.log(evt.target.value);
    setImageUrl(evt.target.value);
  };

  const handleRadioInput = (evt) => {
    setWeatherType(evt.target.value);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onAddItem({ name, imageUrl, weatherType });
  };

  return (
    <ModalWithForm
      title="New garment"
      buttonText="Add garment"
      name="garment"
      handleModalClose={handleModalClose}
      isOpen={activeModal === "add-garment"}
      onSubmit={handleSubmit}
    >
      <NewGarmentForm
        name={name}
        handleNameChange={handleNameChange}
        imageUrl={imageUrl}
        handleNewImageUrl={handleNewImageUrl}
        handleRadioInput={handleRadioInput}
      />
    </ModalWithForm>
  );
}

export default AddItemModal;
