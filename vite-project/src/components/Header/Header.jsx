import headerLogo from "../../assets/wtwr.png";
import avatar from "../../assets/avatar.png";
import "./Header.css";

function Header() {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <div className="header__left">
        <img src={headerLogo} className="header__logo"></img>
        <p className="header__date-place">{currentDate}</p>
      </div>
      <div className="header__right">
        <button className="header__add-clothes-btn">+ Add clothes</button>
        <p className="header__name">Emma Woelk</p>
        <img className="header__avatar" src={avatar}></img>
      </div>
    </header>
  );
}

export default Header;
