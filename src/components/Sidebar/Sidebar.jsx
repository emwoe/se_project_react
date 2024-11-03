import React from "react";
import { Outlet } from "react-router-dom";
import "../Profile/Profile.css";
import avatar from "../../assets/avatar.png";
import { CurrentUserContext } from "../../contexts/CurrentUser";

function Sidebar() {
  const currentUser = React.useContext(CurrentUserContext);
  return (
    <div className="profile__info">
      <img
        alt="avatar"
        className="profile__avatar"
        src={currentUser.avatar}
      ></img>
      <p className="profile__name">{currentUser.name}</p>
      <Outlet />
    </div>
  );
}

export default Sidebar;
