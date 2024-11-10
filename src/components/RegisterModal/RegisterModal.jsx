import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useFormAndValidation } from "../../hooks/useFormAndValidation";

function RegisterModal({
  handleModalClose,
  activeModal,
  handleRegistration,
  handleLoginClick,
}) {
  const { values, isValid, errors, handleChange, resetForm } =
    useFormAndValidation();

  const handleSubmit = (evt) => {
    console.log("Submitting!");
    evt.preventDefault();
    if (!isValid) {
      return;
    }
    handleRegistration({
      email: values.email,
      password: values.password,
      name: values.newname,
      avatar: values.url,
    });
    resetForm();
  };

  return (
    <ModalWithForm
      title="Sign up"
      buttonText="Next"
      secondbuttonText="or Log in"
      onSecondClick={handleLoginClick}
      name="register"
      handleModalClose={handleModalClose}
      isOpen={activeModal === "register"}
      onSubmit={handleSubmit}
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
      {errors.email && (
        <span className="modal__input-error_active">{errors.email}</span>
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
      {errors.password && (
        <span className="modal__input-error_active">{errors.password}</span>
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
        value={values.newname || ""}
        required
        minLength="2"
        maxLength="40"
      ></input>
      {errors.newname && (
        <span className="modal__input-error_active">{errors.newname}</span>
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
