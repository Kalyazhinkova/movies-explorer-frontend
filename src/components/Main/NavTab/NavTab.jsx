import './NavTab.css';

export default function NavTab() {
  return (
    <nav className="navtab">
      <div className="navtab__links">
        <a href="#about" className="navtab__link">О проекте</a>
        <a href="#techs" className="navtab__link">Технологии</a>
        <a href="#about-me" className="navtab__link">Студент</a>
      </div>
    </nav>
  );
}
