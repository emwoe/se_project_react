function NewGarmentForm() {
  return (
    <>
      <label className="modal__label" htmlFor="name">
        Name
      </label>
      <input
        type="text"
        className="modal__input"
        id="name"
        placeholder="Name"
      ></input>
      <label className="modal__label" htmlFor="imageUrl">
        Image
      </label>
      <input
        type="url"
        className="modal__input"
        id="imageUrl"
        placeholder="Image URL"
      ></input>
      <fieldset className="modal__radio-buttons">
        <legend className="modal__legend">Select the weather type</legend>
        <div className="modal__radio-pairs">
          <input className="modal__radio-input" type="radio" id="hot"></input>
          <label className="modal__radio-label" htmlFor="hot">
            Hot
          </label>
        </div>
        <div className="modal__radio-pairs">
          <input className="modal__radio-input" type="radio" id="warm"></input>
          <label htmlFor="warm" className="modal__radio-label">
            Warm
          </label>
        </div>
        <div className="modal__radio-pairs">
          <input className="modal__radio-input" type="radio" id="cold"></input>
          <label htmlFor="cold" className="modal__radio-label">
            Cold
          </label>
        </div>
      </fieldset>
    </>
  );
}

export default NewGarmentForm;
