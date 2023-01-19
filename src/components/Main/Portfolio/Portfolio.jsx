import "./Portfolio.css";

export default function Portfolio() {
  return (
    <div className="portfolio">
      <h2 className="portfolio__subtitle">Портфолио</h2>
      <ul className="portfolio__links">
        <li className="portfolio__link-style">
          <a className="portfolio__link" href="https://ya.ru" target="_blank" rel="noreferrer">
            Статичный сайт</a> 
        </li>
        <li className="portfolio__link-style">
          <a className="portfolio__link" href="https://ya.ru" target="_blank" rel="noreferrer">
            Адаптивный сайт</a> 
        </li>
        <li className="portfolio__link-style">
          <a className="portfolio__link" href="https://ya.ru" target="_blank" rel="noreferrer">
            Одностраничное приложение</a> 
        </li>
      </ul>
    </div>
  );
}