import './NavTab.css';

export default function NavTab() {
  return (
    <nav className="navtab">
      <ul className="navtab__links">
        <li className="navtab__link">О проекте</li>
        <li className="navtab__link">Технологии</li>
        <li className="navtab__link">Студент</li>
      </ul>
    </nav>
  );
}
