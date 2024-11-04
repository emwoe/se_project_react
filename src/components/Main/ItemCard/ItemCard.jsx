import React from "react";
import "./ItemCard.css";
import likebtn from "../../../assets/likebtn.png";
import likebtnliked from "../../../assets/likebtnliked.png";

import { CurrentUserContext } from "../../../contexts/CurrentUser";

function ItemCard({ item, onCardClick, handleItemLike }) {
  const currentUser = React.useContext(CurrentUserContext);
  const isLiked = item.likes.includes(currentUser._id);

  return (
    <div className="item-card__wrapper">
      <div className="item-card__header">
        <h2 className="item-card__title">{item.name}</h2>
        <img
          className="item-card__like-btn"
          src={`${isLiked ? likebtnliked : likebtn}`}
          alt="heart like button"
          onClick={() => {
            handleItemLike({ id: item._id, isLiked });
          }}
        ></img>
      </div>
      <img
        className="item-card__image"
        src={item.imageUrl}
        alt={item.name}
        onClick={() => {
          onCardClick(item);
        }}
      ></img>
    </div>
  );
}

export default ItemCard;
