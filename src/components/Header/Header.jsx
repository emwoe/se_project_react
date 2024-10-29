import { Link } from "react-router-dom";
import headerLogo from "../../assets/wtwr.png";
import avatar from "../../assets/avatar.png";
import closebtn from "../../assets/closebtn.png";
import hamburger from "../../assets/hamburgermenu.png";
import ToggleSwitch from "./ToggleSwitch/ToggleSwitch";
import "./Header.css";

function Header({
  handleAddClick,
  handleHamburgerClick,
  handleMenuClose,
  handleToggleSwitch,
  isMobileMenuOpen,
  weatherData,
  userData,
}) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <div className="header__left">
        <Link className="header__link" to="/">
          <img src={headerLogo} alt="logo" className="header__logo"></img>
        </Link>
        <p className="header__date-place">
          {currentDate}, {weatherData.city}
        </p>
      </div>
      <div
        className={`header__right ${
          isMobileMenuOpen === true && "header__right_mobile"
        }`}
      >
        <ToggleSwitch handleToggleSwitch={handleToggleSwitch} />
        <button
          type="button"
          onClick={handleAddClick}
          className="header__add-clothes-btn"
        >
          + Add clothes
        </button>
        <button
          type="button"
          onClick={handleMenuClose}
          className={`header__mobile-close-btn ${
            isMobileMenuOpen === true && "header__mobile-close-btn_visible"
          }`}
        >
          <img
            className="header__mobile-img"
            src={closebtn}
            alt="exit button"
          ></img>
        </button>
        <Link
          className={`header__link ${
            isMobileMenuOpen === true && "header__link_mobile"
          }`}
          to="/profile"
        >
          <p className="header__name">{userData.name}</p>
          <img alt="avatar" className="header__avatar" src={avatar}></img>
        </Link>
      </div>
      <img
        src={hamburger}
        alt="menu"
        className={`header__hamburger-menu ${
          isMobileMenuOpen === true && "header__hamburger-menu_hidden"
        }`}
        onClick={handleHamburgerClick}
      ></img>
    </header>
  );
}

export default Header;
