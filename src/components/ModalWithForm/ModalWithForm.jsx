import "./ModalWithForm.css";
import closeBtn from "../../assets/closebtn.png";
import { useFormAndValidation } from "../../hooks/useFormAndValidation";

function ModalWithForm({
  title,
  name,
  handleModalClose,
  children,
  isOpen,
  onSubmit,
  buttonText,
  secondbuttonText,
  onSecondClick,
}) {
  const { isValid } = useFormAndValidation();

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
          <div className="modal__btns">
            <button
              type="submit"
              className={`modal__submit-btn ${
                !isValid ? "modal__btn_inactive" : ""
              }`}
              disabled={!isValid}
            >
              {buttonText}
            </button>
            <button
              type="button"
              onClick={onSecondClick}
              className={`modal__second-btn ${
                secondbuttonText === null ? "modal__second-btn_invsbl" : ""
              }`}
            >
              {secondbuttonText}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
