import './Promo.css';
import banner from '../../../images/banner.svg';

export default function Prom() {
  return (
    <section className="promo">
      <img className="promo__banner" alt="Баннер" src={banner} />
      <p className="promo__text">
        Учебный проект студента факультета Веб-разработки.
      </p>
    </section>
  );
}
