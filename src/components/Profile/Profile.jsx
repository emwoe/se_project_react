import "./Profile.css";
import avatar from "../../assets/avatar.png";

function Profile() {
  return (
    <main className="profile">
      <div className="profile__info">
        <img alt="avatar" className="profile__avatar" src={avatar}></img>
        <p className="profile__name">Terrence Tegegne</p>
      </div>
      <div className="profile__cards"></div>
    </main>
  );
}

export default Profile;
