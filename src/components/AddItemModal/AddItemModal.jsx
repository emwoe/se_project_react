import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useFormAndValidation } from "../../hooks/useFormAndValidation";

function AddItemModal({ handleModalClose, activeModal, onAddItem, isLoading }) {
  const { values, errors, isValid, resetForm, handleChange } =
    useFormAndValidation();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (!isValid) {
      return;
    }
    onAddItem({ values }, resetForm);
  };

  return (
    <ModalWithForm
      title="New garment"
      buttonText={isLoading ? "Saving..." : "Add garment"}
      name="garment"
      handleModalClose={handleModalClose}
      isOpen={activeModal === "add-garment"}
      onSubmit={handleSubmit}
      isValid={isValid}
    >
      <label className="modal__label" htmlFor="name">
        Name
      </label>
      <input
        type="text"
        name="name"
        className="modal__input"
        id="name"
        placeholder="Name"
        onChange={handleChange}
        value={values.name || ""}
        required
        minLength="2"
        maxLength="40"
      ></input>
      {errors.name && (
        <span className="modal__input-error_active">{errors.name}</span>
      )}

      <label className="modal__label" htmlFor="imageUrl">
        Image
      </label>

      <input
        type="url"
        className="modal__input"
        id="imageUrl"
        placeholder="Image URL"
        name="url"
        pattern="https?://.+"
        onChange={handleChange}
        value={values.url || ""}
        required
      ></input>
      {errors.url && (
        <span className="modal__input-error_active">{errors.url}</span>
      )}
      <fieldset className="modal__radio-buttons" id="fieldset">
        <legend className="modal__legend">
          Select the weather type
          <span className="modal__input-error fieldset-input-error"></span>
        </legend>
        <div className="modal__radio-pairs">
          <input
            className="modal__radio-input"
            type="radio"
            name="weather"
            id="hot"
            value="hot"
            onChange={handleChange}
          ></input>
          <label className="modal__radio-label" htmlFor="hot">
            Hot
          </label>
        </div>
        <div className="modal__radio-pairs">
          <input
            className="modal__radio-input"
            type="radio"
            name="weather"
            id="warm"
            value="warm"
            onChange={handleChange}
          ></input>
          <label htmlFor="warm" className="modal__radio-label">
            Warm
          </label>
        </div>
        <div className="modal__radio-pairs">
          <input
            className="modal__radio-input"
            type="radio"
            name="weather"
            value="cold"
            onChange={handleChange}
            id="cold"
          ></input>
          <label htmlFor="cold" className="modal__radio-label">
            Cold
          </label>
        </div>
      </fieldset>
    </ModalWithForm>
  );
}

export default AddItemModal;
