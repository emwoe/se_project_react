function NewGarmentForm({ values, handleChange, errors }) {
  return (
    <>
      <label className="modal__label" htmlFor="name">
        Name
        {errors.url && <span className="modal__error">{errors.url}</span>}
      </label>
      <input
        type="text"
        name="name"
        className="modal__input"
        id="name"
        placeholder="Name"
        value={values.name || ""}
        onChange={handleChange}
        required
        minLength="2"
        maxLength="40"
        /*
        value={name}
        onChange={handleNameChange}
        */
      ></input>
      <label className="modal__label" htmlFor="imageUrl">
        Image
        {errors.url && <span className="modal__error">{errors.url}</span>}
      </label>
      <input
        type="url"
        name="imageUrl"
        required
        className="modal__input"
        id="imageUrl"
        placeholder="Image URL"
        value={values.imageUrl || ""}
        onChange={handleChange}
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
            name="weather-type"
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
            name="weather-type"
            value="cold"
            onChange={handleChange}
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
