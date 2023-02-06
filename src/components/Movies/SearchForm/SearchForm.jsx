import './SearchForm.css';
import { useState, useEffect } from 'react';
import useFormValidation from '../../../hooks/UseFormValidation';

export default function SearchForm(props) {
  const {
    onSearch,
    savedSearch = { movie: '', shorts: false },
  } = props;
  const [errorMessage, setErrorMessage] = useState('');
  const {
    values, isValid, handleChange, resetForm,
  } = useFormValidation();

  useEffect(() => {
    resetForm(savedSearch);
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    if (isValid) {
      onSearch(values);
    } else {
      setErrorMessage('Введите слово для поиска!');
    }
  }

  function handleCheckbox(e) {
    handleChange(e);
    onSearch({ ...values, shorts: e.target.checked });
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
            name="movie"
            placeholder="Фильмы"
            value={values.movie || ''}
            onChange={handleChange}
            required
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
            onChange={handleCheckbox}
            checked={values.shorts || false}
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
