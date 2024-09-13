import "./ModalWithForm.css";
import closeBtn from "../../assets/closebtn.png";

function ModalWithForm({
  title,
  name,
  handleModalClose,
  children,
  isOpen,
  onSubmit,
  isValid,
}) {
  return (
    <div
      className={`modal modal_type_${name} ${
        isOpen === true && "modal_opened"
      }`}
    >
      <div className="modal__overlay">
        <form className="modal__form" onSubmit={onSubmit}>
          <button
            type="button"
            className="modal__close-btn"
            onClick={handleModalClose}
          >
            <img
              alt="x to close"
              className="modal__close-btn-img"
              src={closeBtn}
            ></img>
          </button>
          <h3 className="modal__title">{title}</h3>
          {children}
          <button
            type="submit"
            className="modal__submit-btn"
            disabled={!isValid}
          >
            Add garment
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
