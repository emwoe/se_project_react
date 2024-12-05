import { useContext, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useFormAndValidation } from "../../hooks/useFormAndValidation";
import { CurrentUserContext } from "../../contexts/CurrentUser";

function EditProfileModal({
  handleModalClose,
  activeModal,
  handleProfileChanges,
  isLoading,
}) {
  const currentUser = useContext(CurrentUserContext);

  const { values, setValues, isValid, errors, handleChange } =
    useFormAndValidation();

  useEffect(() => {
    if (currentUser) {
      setValues({
        name: currentUser.name,
        avatar: currentUser.avatar,
      });
    }
  }, [currentUser]);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (!isValid) {
      return;
    }
    handleProfileChanges({
      name: values.name,
      avatar: values.avatar,
    });
  };

  return (
    <ModalWithForm
      title="Change profile data"
      buttonText={isLoading ? "Saving..." : "Save changes"}
      name="edit-profile"
      handleModalClose={handleModalClose}
      isOpen={activeModal === "edit-profile"}
      onSubmit={handleSubmit}
      isValid={isValid}
    >
      <label className="modal__label" htmlFor="newname">
        Name*
      </label>
      <input
        type="text"
        name="name"
        className="modal__input"
        id="newname"
        placeholder={values.name}
        onChange={handleChange}
        value={values.name || ""}
        required
        minLength="2"
        maxLength="40"
      ></input>
      {errors.name && (
        <span className="modal__input-error_active">{errors.name}</span>
      )}

      <label className="modal__label" htmlFor="imageUrl">
        Avatar*
      </label>

      <input
        type="url"
        className="modal__input"
        id="avatar"
        name="avatar"
        pattern="https?://.+"
        onChange={handleChange}
        placeholder={values.avatar}
        value={values.avatar || ""}
        required
      ></input>
      {errors.url && (
        <span className="modal__input-error_active">{errors.url}</span>
      )}
    </ModalWithForm>
  );
}

export default EditProfileModal;
