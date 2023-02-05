import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navigation.css';

export default function Navigation(props) {
  const { loggedIn } = props;
  const [isNavigationRightMenu, setIsNavigationRightMenu] = useState(false);

  const openRightMenu = () => {
    setIsNavigationRightMenu(true);
  };
  const closeRightMenu = () => {
    setIsNavigationRightMenu(false);
  };

  return (
    <nav className="navigation">
      {loggedIn
      && (
      <ul className="navigation__links">
        <li>
          <Link to="/movies" className="navigation__link">Фильмы</Link>
        </li>
        <li>
          <Link to="/saved-movies" className="navigation__link">Сохраненные фильмы</Link>
        </li>
        <li>
          <Link to="/profile" className="navigation__account" />
        </li>
      </ul>
      )}

      {loggedIn && <button className="navigation__burger" aria-label="navigation" type="button" onClick={openRightMenu} /> }

      {loggedIn
      && (
      <div className={`navigation__right-menu ${isNavigationRightMenu ? 'navigation__right-menu_opened' : ''}`}>
        <button className="navigation__close-button" aria-label="navigation" type="button" onClick={closeRightMenu} />
        <ul className="navigation__links navigation__links_right">
          <li>
            <Link to="/" className="navigation__link">Главная</Link>
          </li>
          <li>
            <Link to="/movies" className="navigation__link">Фильмы</Link>
          </li>
          <li>
            <Link to="/saved-movies" className="navigation__link">Сохраненные фильмы</Link>
          </li>
          <li>
            <Link to="/profile" className="navigation__account" />
          </li>
        </ul>
      </div>
      )}
    </nav>
  );
}
