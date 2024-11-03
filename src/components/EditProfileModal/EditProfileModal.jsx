import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useFormAndValidation } from "../../hooks/useFormAndValidation";

function EditProfileModal({
  handleModalClose,
  activeModal,
  onAddItem,
  isOpen,
  handleProfileChanges,
}) {
  const { values, errors, isValid, resetForm, handleChange } =
    useFormAndValidation();

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
      buttonText="Save changes"
      name="edit-profile"
      handleModalClose={handleModalClose}
      isOpen={activeModal === "edit-profile"}
      onSubmit={handleSubmit}
      isValid={isValid}
    >
      <label className="modal__label" htmlFor="name">
        Name*
      </label>
      <input
        type="text"
        name="newName"
        className="modal__input"
        id="changeName"
        placeholder="Name"
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
        placeholder="Image URL"
        name="newImageUrl"
        pattern="https?://.+"
        onChange={handleChange}
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
