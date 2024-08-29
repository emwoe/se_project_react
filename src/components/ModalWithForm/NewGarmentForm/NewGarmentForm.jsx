import { useFormAndValidation } from "../../../hooks/useFormAndValidation";
function NewGarmentForm() {
  /* Tried using the hook for validation, but couldn't get it to work
  const { values, handleChange, errors, isValid, setValues, resetForm } =
    useFormAndValidation();
    */

  return (
    <>
      <label className="modal__label" htmlFor="name">
        Name
        <span className="modal__input-error name-input-error"></span>
      </label>
      <input
        type="text"
        className="modal__input"
        id="name"
        placeholder="Name"
        required
        minLength="2"
        maxLength="40"
      ></input>
      <label className="modal__label" htmlFor="imageUrl">
        Image
        <span className="modal__input-error imageUrl-input-error"></span>
      </label>
      <input
        type="url"
        required
        className="modal__input"
        id="imageUrl"
        placeholder="Image URL"
      ></input>
      <fieldset className="modal__radio-buttons" id="fieldset">
        <legend className="modal__legend">
          Select the weather type
          <span className="modal__input-error fieldset-input-error"></span>
        </legend>
        <div className="modal__radio-pairs">
          <input
            className="modal__radio-input"
            type="radio"
            name="weather-type"
            id="hot"
            required
          ></input>
          <label className="modal__radio-label" htmlFor="hot">
            Hot
          </label>
        </div>
        <div className="modal__radio-pairs">
          <input
            className="modal__radio-input"
            type="radio"
            name="weather-type"
            id="warm"
          ></input>
          <label htmlFor="warm" className="modal__radio-label">
            Warm
          </label>
        </div>
        <div className="modal__radio-pairs">
          <input
            className="modal__radio-input"
            type="radio"
            name="weather-type"
            id="cold"
          ></input>
          <label htmlFor="cold" className="modal__radio-label">
            Cold
          </label>
        </div>
      </fieldset>
    </>
  );
}

export default NewGarmentForm;
