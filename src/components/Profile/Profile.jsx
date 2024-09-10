import "./Profile.css";
import avatar from "../../assets/avatar.png";
import ItemCard from "../Main/ItemCard/ItemCard";

function Profile({ handleItemCardClick, clothingItems }) {
  return (
    <main className="profile">
      <div className="profile__info">
        <img alt="avatar" className="profile__avatar" src={avatar}></img>
        <p className="profile__name">Terrence Tegegne</p>
      </div>
      <div className="profile__cards">
        <div className="profile__heading">
          <p className="profile__heading-title">Your items</p>
          <button className="profile__heading-add-btn">+ Add new</button>
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
      </div>
    </main>
  );
}

export default Profile;
