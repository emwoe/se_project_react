import { Outlet } from "react-router-dom";
import "../Profile/Profile.css";
import avatar from "../../assets/avatar.png";

function Sidebar() {
  return (
    <div className="profile__info">
      <img alt="avatar" className="profile__avatar" src={avatar}></img>
      <p className="profile__name">Terrence Tegegne</p>
      <Outlet />
    </div>
  );
}

export default Sidebar;
