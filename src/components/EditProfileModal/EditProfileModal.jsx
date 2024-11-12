import { useContext } from "react";
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

  const { values, isValid, errors, handleChange } = useFormAndValidation();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (!isValid) {
      return;
    }
    handleProfileChanges({
      newName: values.newName,
      newImageUrl: values.newImageUrl,
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
      <label className="modal__label" htmlFor="newName">
        Name*
      </label>
      <input
        type="text"
        name="newName"
        className="modal__input"
        id="newName"
        placeholder={currentUser.name}
        onChange={handleChange}
        value={values.newName || ""}
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
        id="newImageUrl"
        name="newImageUrl"
        pattern="https?://.+"
        onChange={handleChange}
        placeholder={currentUser.avatar}
        value={values.newImageUrl || ""}
        required
      ></input>
      {errors.url && (
        <span className="modal__input-error_active">{errors.url}</span>
      )}
    </ModalWithForm>
  );
}

export default EditProfileModal;
