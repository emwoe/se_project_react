import React from "react";
import { Outlet } from "react-router-dom";
import "../Profile/Profile.css";

import { CurrentUserContext } from "../../contexts/CurrentUser";

function Sidebar({ handleEditClick, handleLogout }) {
  const currentUser = React.useContext(CurrentUserContext);
  return (
    <div>
      <div className="profile__info">
        <div className="profile__image">
          {!currentUser.avatar ? (
            <p className="profile__placeholder">currentUser.initial</p>
          ) : (
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="profile__avatar"
            />
          )}
        </div>
        <p className="profile__name">{currentUser.name}</p>
      </div>
      <div className="profile__buttons">
        <button className="profile__btn" onClick={handleEditClick}>
          Change profile data
        </button>
        <button className="profile__btn" onClick={handleLogout}>
          Log out
        </button>
      </div>
      <Outlet />
    </div>
  );
}

export default Sidebar;
