import './Techs.css';

export default function Techs() {
  return (
    <div className="techs">
      <h1 className="techs__title" id="techs">Технологии</h1>

      <h2 className="techs__subtitle">7 технологий</h2>
      <p className="techs__text">
        На курсе веб-разработки мы освоили технологии, которые применили в
        дипломном проекте.
      </p>

      <div className="techs__table">
        <div className="techs__element">
          <p className="techs__text">HTML</p>
        </div>
        <div className="techs__element">
          <p className="techs__text">CSS</p>
        </div>
        <div className="techs__element">
          <p className="techs__text">JS</p>
        </div>
        <div className="techs__element">
          <p className="techs__text">React</p>
        </div>
        <div className="techs__element">
          <p className="techs__text">Git</p>
        </div>
        <div className="techs__element">
          <p className="techs__text">Express.js</p>
        </div>
        <div className="techs__element">
          <p className="techs__text">mongoDB</p>
        </div>
      </div>
    </div>
  );
}
