import headerLogo from "../../images/header-logo.svg";
// import { Link } from "react-router-dom";
// import { useContext } from "react";
import Navigation from "../Navigation/Navigation";

const Header = () => {
  // const loggedIn = true;
  const loggedIn = false;
  return (
    <header className="header">
      <img src={headerLogo} alt="Логотип" className="header__logo" />
      {loggedIn && <Navigation />}

      {!loggedIn && (
        <div className="header__info">
          <button className="header__link">Регистрация</button>
          <button className="header__button">Войти</button>
        </div>
      )}
    </header>
  );
};

export default Header;
