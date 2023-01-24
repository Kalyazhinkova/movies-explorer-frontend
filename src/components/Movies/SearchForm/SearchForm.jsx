import './SearchForm.css';

export default function SearchForm() {
  return (
    <article className="search" aria-label="Поиск">
      <form className="search__form" name="search">
        <fieldset className="search__form-fields search__form-fields_film">
          <label className="search__form-label" htmlFor="films" />
          <input
            className="search__form-input"
            type="text"
            id="films"
            placeholder="Фильмы"
            required=""
          />
          <button
            className="search__form-button"
            type="submit"
            aria-label="Найти"
          />
        </fieldset>
        <fieldset className="search__form-fields search__form-fields_shorts">
          <input
            className="search__form-checkbox"
            type="checkbox"
            id="shorts"
            name="shorts"
          />
          <label className="search__form-checkbox-text" htmlFor="shorts">Короткометражки</label>
        </fieldset>
      </form>
    </article>
  );
}
