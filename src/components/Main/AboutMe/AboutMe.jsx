import "./AboutMe.css";

export default function AboutMe() {
  return (
    <div className="techs">
      <h1 className="techs__title">Студент</h1>
      <div className="aboutme__group">
      <h2 className="techs__subtitle">Ольга</h2>
      <p className="techs__text">Фронтенд-разработчик, 34 года</p>
      <p className="techs__text">
        Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня
        есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно
        начал кодить. С 2015 года работал в компании «СКБ Контур». После того,
        как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и
        ушёл с постоянной работы.
      </p>
      <a href="https://github.com/Kalyazhinkova" target="_blank" className="aboutMe__link" rel="noreferrer">GitHub</a>
      </div>
     <img className="aboutme__photo" alt="Мое фото" src=""></img>
    </div>
  );
}
