import './NotFound.css';

export default function NotFound() {
  return (
    <main className="not-found">
      <article className="not-found__article">
        <h1 className="not-found__title">404</h1>
        <p className="not-found__text">Страница не найдена</p>
      </article>
      <button type="button" className="not-found__button">
        Назад
      </button>
    </main>
  );
}
