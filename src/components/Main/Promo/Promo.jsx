import "./Promo.css";
import banner from "../../../images/banner.svg";

export default function Promo () {
  return (
    <div className="promo">
      <img className="promo__banner" alt="Баннер" src={banner}></img>
      <p className="promo__text">Учебный проект студента факультета Веб-разработки.</p>
    </div>
  )
}