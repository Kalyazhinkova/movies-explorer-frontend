import './SearchForm.css';
import { useState } from 'react';
import useFormValidation from '../../../hooks/UseFormValidation';

export default function SearchForm(props) {
  const {
    onSearch,
  } = props;
  const [errorMessage, setErrorMessage] = useState('');
  const [search, setSearch] = useState('');
  const { values, isValid, handleChange } = useFormValidation();
  const [isShorts, setIsShorts] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    if (isValid) {
      onSearch(search, isShorts);
    } else {
      setErrorMessage('Введите слово для поиска!');
    }
  }

  function handleChangeMovies(e) {
    setSearch(e.target.value);
  }

  function onChangeCheckbox(e) {
    handleChange(e);
    setIsShorts(!isShorts);
  }

  return (
    <article className="search" aria-label="Поиск">
      <form className="search__form" name="search" onSubmit={handleSubmit} noValidate>
        <fieldset className="search__form-fields search__form-fields_film">
          <label className="search__form-label" htmlFor="films" />
          <input
            className="search__form-input"
            type="text"
            id="films"
            placeholder="Фильмы"
            values={search}
            onChange={handleChangeMovies}
          />
          <button
            className="search__form-button"
            type="submit"
            aria-label="Найти"
            disabled={!isValid}
          />
        </fieldset>
        <fieldset className="search__form-fields search__form-fields_shorts">
          <input
            className="search__form-checkbox"
            type="checkbox"
            id="shorts"
            name="shorts"
            onChange={onChangeCheckbox}
          />
          <label className="search__form-checkbox-text" htmlFor="shorts">Короткометражки</label>
        </fieldset>
      </form>
      <span className="search__input-error">
        {isValid && values.search ? '' : `${errorMessage}`}
      </span>
      <div className="search__form-border" />
    </article>
  );
}
