import React from "react";
import "./ItemModal.css";
import closeBtnWhite from "../../assets/closebtnwhite.png";
import { CurrentUserContext } from "../../contexts/CurrentUser";

function ItemModal({
  activeModal,
  itemForModal,
  handleModalClose,
  handleDeleteClick,
}) {
  const currentUser = React.useContext(CurrentUserContext);

  const isOwn = itemForModal.owner === currentUser._id;

  // Creating a variable which you'll then set in `className` for the delete button
  const itemDeleteButtonClassName = `item__delete-button ${
    isOwn ? "modal__delete-btn_vsbl" : "modal__delete-tbn_invsbl"
  }`;

  return (
    <div
      className={`modal modal_type_item ${
        activeModal === "item-card" && "modal_opened"
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
              src={closeBtnWhite}
            ></img>
          </button>
          <img
            className="modal__item-image"
            src={itemForModal.imageUrl}
            alt={itemForModal.name}
          ></img>
          <div className="modal__footer">
            <div className="modal__footer-left">
              <h3 className="modal__item-name">{itemForModal.name}</h3>
              <p className="modal__item-weather">
                Weather: {itemForModal.weather}
              </p>
            </div>
            <div className="modal__footer-right">
              <button
                type="button"
                className={itemDeleteButtonClassName}
                onClick={handleDeleteClick}
              >
                Delete item
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
