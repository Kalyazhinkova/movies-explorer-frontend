import './AboutProject.css';

export default function AboutProject() {
  return (
    <section className="about">
      <h1 className="about__title" id="about">О проекте</h1>
      <div className="about__table">
        <h2 className="about__subtitle">Дипломный проект включал 5 этапов</h2>
        <p className="about__text">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
        <h2 className="about__subtitle">На выполнение диплома ушло 5 недель</h2>
        <p className="about__text">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
      </div>
      <div className="about__line-table">
        <div className="about__line-green">
          <p className="about__text">1 неделя</p>
        </div>
        <div className="about__line-gray">
          <p className="about__text">4 недели</p>
        </div>
        <p className="about__text about__text-gray">Back-end</p>
        <p className="about__text about__text-gray">Front-end</p>
      </div>
    </section>
  );
}
