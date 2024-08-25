import "./ModalWithForm.css";
import closebtn from "../../assets/closebtn.png";

function ModalWithForm({
  title,
  buttonText,
  name,
  activeModal,
  handleModalClose,
  children,
}) {
  return (
    <div
      className={`modal modal_type_${name} ${
        activeModal === "add-garment" && "modal__opened"
      }`}
    >
      <form className="modal__form">
        <button
          type="button"
          className="modal__close-btn"
          onClick={handleModalClose}
        >
          <img className="modal__close-btn-img" src={closebtn}></img>
        </button>
        <h3 className="modal__title">{title}</h3>
        {children}
        <button type="submit" className="modal__submit-btn">
          {buttonText}
        </button>
      </form>
    </div>
  );
}

export default ModalWithForm;
