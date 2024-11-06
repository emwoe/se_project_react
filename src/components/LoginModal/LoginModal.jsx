import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useFormAndValidation } from "../../hooks/useFormAndValidation";

function LoginModal({
  handleModalClose,
  activeModal,
  isOpen,
  handleLogin,
  handleRegClick,
}) {
  const { values, errors, isValid, resetForm, handleChange } =
    useFormAndValidation();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (!isValid) {
      return;
    }
    handleLogin({ email: values.loginemail, password: values.loginpassword });
  };

  return (
    <ModalWithForm
      title="Log in"
      buttonText="Log in"
      secondbuttonText="or Sign up"
      onSecondClick={handleRegClick}
      name="login"
      handleModalClose={handleModalClose}
      isOpen={activeModal === "login"}
      onSubmit={handleSubmit}
      isValid={isValid}
    >
      <label className="modal__label" htmlFor="loginemail">
        Email
      </label>
      <input
        type="text"
        name="loginemail"
        className="modal__input"
        id="loginemail"
        placeholder="Email"
        onChange={handleChange}
        value={values.loginemail || ""}
        required
      ></input>
      {errors.name && (
        <span className="modal__input-error_active">{errors.name}</span>
      )}
      <label className="modal__label" htmlFor="loginpassword">
        Password
      </label>
      <input
        type="password"
        name="loginpassword"
        className="modal__input"
        id="loginpassword"
        placeholder="Password"
        onChange={handleChange}
        value={values.loginpassword || ""}
        required
        minLength="8"
        maxLength="40"
      ></input>
      {errors.name && (
        <span className="modal__input-error_active">{errors.name}</span>
      )}
    </ModalWithForm>
  );
}

export default LoginModal;
