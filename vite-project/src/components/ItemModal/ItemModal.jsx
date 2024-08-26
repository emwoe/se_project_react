import "./ItemModal.css";
import closebtnwhite from "../../assets/closebtnwhite.png";

function ItemModal({ activeModal, itemForModal, handleModalClose }) {
  return (
    <div
      className={`modal modal_type_${name} ${
        activeModal === "item-card" && "modal__opened"
      }`}
    >
      <div className="modal__overlay modal__overlay_type_item">
        <div className="modal__card">
          <button
            type="button"
            className="modal__close-btn"
            onClick={handleModalClose}
          >
            <img className="modal__close-btn-img" src={closebtnwhite}></img>
          </button>
          <img
            className="modal__item-image"
            src={itemForModal.link}
            alt={itemForModal.name}
          ></img>
          <div className="modal__footer">
            <h3 className="modal__item-name">{itemForModal.name}</h3>
            <p className="modal__item-weather">
              Weather: {itemForModal.weather}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
