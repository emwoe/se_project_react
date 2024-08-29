import "./ModalWithForm.css";
import closeBtn from "../../assets/closebtn.png";

function ModalWithForm({
  title,
  buttonText,
  name,
  handleModalClose,
  children,
  isOpen,
}) {
  return (
    <div
      className={`modal modal_type_${name} ${
        isOpen === true && "modal_opened"
      }`}
    >
      <div className="modal__overlay">
        <form className="modal__form">
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
          <button type="submit" className="modal__submit-btn">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
