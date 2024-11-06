import React from "react";
import { Link } from "react-router-dom";
import headerLogo from "../../assets/wtwr.png";
import closebtn from "../../assets/closebtn.png";
import hamburger from "../../assets/hamburgermenu.png";
import ToggleSwitch from "./ToggleSwitch/ToggleSwitch";
import "./Header.css";
import { CurrentUserContext } from "../../contexts/CurrentUser";

function Header({
  handleAddClick,
  handleRegClick,
  handleLoginClick,
  handleHamburgerClick,
  handleMenuClose,
  handleToggleSwitch,
  isMobileMenuOpen,
  weatherData,
  isLoggedIn,
}) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  const currentUser = React.useContext(CurrentUserContext);

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

        <div
          className={`header__right_loggedin ${
            isLoggedIn === false && "header__right_loggedin-invsb"
          }`}
        >
          <button
            type="button"
            onClick={handleAddClick}
            className="header__add-clothes-btn"
          >
            + Add clothes
          </button>
          <Link
            className={`header__link ${
              isMobileMenuOpen === true && "header__link_mobile"
            }`}
            to="/profile"
          >
            <p className="header__name">{currentUser.name}</p>
            <div className="header__images">
              {!currentUser.avatar ? (
                <p className="header__placeholder">{currentUser.initial}</p>
              ) : (
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="header__avatar"
                />
              )}
            </div>
          </Link>
        </div>
        <div
          className={`header__right_loggedout ${
            isLoggedIn === true && "header__right_loggedout-invsb"
          }`}
        >
          <button
            type="button"
            onClick={handleRegClick}
            className="header__reg-btn"
          >
            Sign Up
          </button>
          <button
            type="button"
            onClick={handleLoginClick}
            className="header__login-btn"
          >
            Login
          </button>
        </div>
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
