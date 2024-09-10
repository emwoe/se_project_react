import "./DeleteItemCheckModal.css";
import closeBtn from "../../assets/closebtn.png";

function DeleteItemCheckModal({
  activeModal,
  handleModalClose,
  deleteItemNow,
}) {
  return (
    <div
      className={`modal modal_type_item ${
        activeModal === "delete-check" && "modal_opened"
      }`}
    >
      <div className="modal__overlay modal__overlay_type_item">
        <div className="modal__card">
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
          <div className="modal__questions">
            <p className="modal__questions-text">
              Are you sure you want to delete?
            </p>
            <p className="modal__questions-text">This action is irreversible</p>
            <button
              type="button"
              className="modal__questions-confirm"
              onClick={deleteItemNow}
            >
              Yes, delete item
            </button>
            <button
              type="button"
              className="modal__questions-cancel"
              onClick={handleModalClose}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeleteItemCheckModal;
