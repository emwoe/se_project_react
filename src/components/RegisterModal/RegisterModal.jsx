import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useFormAndValidation } from "../../hooks/useFormAndValidation";

function RegisterModal({
  handleModalClose,
  activeModal,
  isOpen,
  handleRegistration,
}) {
  const { values, errors, isValid, handleChange } = useFormAndValidation();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (!isValid) {
      return;
    }
    handleRegistration({ values });
  };

  return (
    <ModalWithForm
      title="Sign up"
      buttonText="Next"
      name="register"
      handleModalClose={handleModalClose}
      isOpen={activeModal === "register"}
      onSubmit={handleSubmit}
      isValid={isValid}
    >
      <label className="modal__label" htmlFor="email">
        Email*
      </label>
      <input
        type="text"
        name="email"
        className="modal__input"
        id="email"
        placeholder="Email"
        onChange={handleChange}
        value={values.email || ""}
        required
      ></input>
      {errors.name && (
        <span className="modal__input-error_active">{errors.name}</span>
      )}
      <label className="modal__label" htmlFor="password">
        Password
      </label>
      <input
        type="password"
        name="password"
        className="modal__input"
        id="password"
        placeholder="Password"
        onChange={handleChange}
        value={values.password || ""}
        required
        minLength="8"
        maxLength="40"
      ></input>
      {errors.name && (
        <span className="modal__input-error_active">{errors.name}</span>
      )}
      <label className="modal__label" htmlFor="newname">
        Name*
      </label>
      <input
        type="text"
        name="newname"
        className="modal__input"
        id="newname"
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

      <label className="modal__label" htmlFor="avatarUrl">
        Avatar URL*
      </label>

      <input
        type="url"
        className="modal__input"
        id="avatarUrl"
        placeholder="Avatar URL"
        name="url"
        pattern="https?://.+"
        onChange={handleChange}
        value={values.url || ""}
        required
      ></input>
      {errors.url && (
        <span className="modal__input-error_active">{errors.url}</span>
      )}
    </ModalWithForm>
  );
}

export default RegisterModal;
