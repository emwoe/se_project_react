import { useContext } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useFormAndValidation } from "../../hooks/useFormAndValidation";
import { CurrentUserContext } from "../../contexts/CurrentUser";

function EditProfileModal({
  handleModalClose,
  activeModal,
  handleProfileChanges,
}) {
  const currentUser = useContext(CurrentUserContext);

  const { values, errors, handleChange, resetForm } = useFormAndValidation();

  const handleSubmit = (evt) => {
    console.log("Submitted");
    evt.preventDefault();
    if (!isValid) {
      return;
    }
    handleProfileChanges({
      newName: values.newName,
      newImageUrl: values.newImageUrl,
    });
    resetForm();
  };

  return (
    <ModalWithForm
      title="Change profile data"
      buttonText="Save changes"
      name="edit-profile"
      handleModalClose={handleModalClose}
      isOpen={activeModal === "edit-profile"}
      onSubmit={handleSubmit}
    >
      <label className="modal__label" htmlFor="name">
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
        placeholder="avatar Url"
        name="newImageUrl"
        pattern="https?://.+"
        onChange={handleChange}
        default={currentUser.avatar}
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
