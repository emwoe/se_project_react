import { Outlet } from "react-router-dom";

import "../Profile/Profile.css";
import ItemCard from "../Main/ItemCard/ItemCard";

function ClothesSection({
  handleItemCardClick,
  clothingItems,
  handleAddClick,
}) {
  return (
    <div className="profile__cards">
      <div className="profile__heading">
        <p className="profile__heading-title">Your items</p>
        <button
          type="button"
          className="profile__heading-add-btn"
          onClick={handleAddClick}
        >
          + Add new
        </button>
      </div>
      <ul className="profile__list">
        {clothingItems.map((item) => {
          return (
            <ItemCard
              key={item._id}
              item={item}
              onCardClick={handleItemCardClick}
            />
          );
        })}
      </ul>
      <Outlet />
    </div>
  );
}

export default ClothesSection;
