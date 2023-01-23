import { Link } from 'react-router-dom';
// import { useContext } from "react";
import Navigation from '../Navigation/Navigation';

const Header = (props) => {
  const { loggedIn } = props;

  return (
    <header className="header">
      <div className="header__groupe">
        <Link to="/" className="header__logo" />
        {loggedIn && <Navigation loggedIn={props} />}

        {!loggedIn && (
        <div className="header__info">
          <Link to="/signup" className="header__link">Регистрация</Link>
          <Link to="/signin" className="header__button">Войти</Link>
        </div>
        )}
      </div>

    </header>
  );
};

export default Header;
