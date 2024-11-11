import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import "./ItemCard.css";
import likebtn from "../../../assets/likebtn.png";
import likebtnliked from "../../../assets/likebtnliked.png";

import { CurrentUserContext } from "../../../contexts/CurrentUser";
import { IsLoggedInContext } from "../../../contexts/IsLoggedIn";

function ItemCard({
  item,
  onCardClick,
  handleItemLike,
  clothingItems,
  updateIsLiked,
}) {
  const [isLiked, setIsLiked] = useState(false);
  const currentUser = React.useContext(CurrentUserContext);
  const isLoggedIn = React.useContext(IsLoggedInContext);

  useEffect(() => {
    setIsLiked(item.likes.includes(currentUser._id));
  }, [clothingItems, item, currentUser._id]);

  return (
    <div className="item-card__wrapper">
      <div className="item-card__header">
        <h2 className="item-card__title">{item.name}</h2>
        <img
          className={`item-card__like-btn ${
            !isLoggedIn ? "item-card__like-btn_invsbl" : ""
          }`}
          src={`${isLiked ? likebtnliked : likebtn}`}
          alt="heart like button"
          onClick={() => {
            handleItemLike({ id: item._id, isLiked });
            updateIsLiked(item._id);
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
