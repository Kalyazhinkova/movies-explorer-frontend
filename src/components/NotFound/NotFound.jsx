import './NotFound.css';
import { useNavigate } from 'react-router-dom';

export default function NotFound() {
  const navigate = useNavigate();
  const goBack = () => navigate(-1);
  return (
    <main className="not-found">
      <article className="not-found__article">
        <h1 className="not-found__title">404</h1>
        <p className="not-found__text">Страница не найдена</p>
      </article>
      <button type="button" onClick={goBack} className="not-found__button">
        Назад
      </button>
    </main>
  );
}
