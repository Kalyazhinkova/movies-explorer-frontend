import './AboutMe.css';
import myPhoto from '../../../images/my-photo.jpg';

export default function AboutMe() {
  return (
    <div className="about-me">
      <h1 className="about-me__title" id="about-me">Студент</h1>
      <div className="about-me__group">
        <div className="about-me__description">
          <h2 className="about-me__subtitle">Ольга</h2>
          <p className="about-me__text-big">Фронтенд-разработчик, 34 года</p>
          <p className="about-me__text">
            Я родилася и жила в Челябинске, недавно переехала в город Мармарис
            (Турция). В 2010 году закончила факультет прикладной математики и
            информатики ЮУРГУ, после этого закончила магистратуру по экономике и
            увлеклась бухучетом. Замужем. Я люблю смотреть фильмы, очень много
            читаю, учиться чего-нибудь новому, путешествовать и много кататься
            на велосипеде. Недавно начала делать не сложные сайты, а потом
            решила изучить JS. С 2010 года работала главным бухгалтером. После
            того, как прошла курс по веб-разработке, начала заниматься
            фриланс-заказами и ушла с постоянной работы.
          </p>
          <a
            href="https://github.com/Kalyazhinkova"
            target="_blank"
            className="about-me__link"
            rel="noreferrer"
          >
            GitHub
          </a>
        </div>

        <img className="about-me__photo" alt="Мое фото" src={myPhoto} />
      </div>
    </div>
  );
}
