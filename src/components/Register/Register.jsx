import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useFormValidation from '../../hooks/UseFormValidation';
import './Register.css';

export default function Register(props) {
  const { onRegister, errorRequest } = props;

  const [apiError, setApiError] = useState('');

  const {
    values, errors, isValid, handleChange,
  } = useFormValidation();
  const { name, email, password } = values;

  useEffect(() => {
    setApiError(errorRequest);
  }, [errorRequest]);

  function handleSubmit(e) {
    e.preventDefault();
    if (isValid) {
      onRegister({ name, email, password });
    }
  }

  return (
    <main className="register">
      <Link to="/" className="register__logo" />
      <form onSubmit={handleSubmit} className="register__form form">
        <h1 className="form__header">Добро пожаловать!</h1>
        <fieldset className="form__fieldset">
          <label className="form__label">
            Имя
            <input
              id="name__input"
              name="name"
              type="text"
              minLength={2}
              placeholder="Имя"
              className="form__input"
              onChange={handleChange}
              required
            />
            <span className="form__input-error">{errors.name}</span>
          </label>
          <label className="form__label">
            E-mail
            <input
              id="email__input"
              name="email"
              type="email"
              placeholder="e-mail"
              className="form__input"
              onChange={handleChange}
              required
            />
            <span className="form__input-error">{errors.email}</span>
          </label>
          <label className="form__label">
            Пароль
            <input
              id="password__input"
              name="password"
              type="password"
              placeholder="Пароль"
              className="form__input"
              minLength={8}
              maxLength={50}
              onChange={handleChange}
              required
            />
            <span className="form__input-error">{errors.password}</span>
          </label>
        </fieldset>
        <span className="form__input-error">{apiError}</span>
        <div className="form__submit">
          <button type="submit" className="form__submit-button" disabled={!isValid}>
            Зарегистрироваться
          </button>

          <span className="form__subtitle">
            Уже зарегистрированы?
            <Link to="/signin" className="form__link">
              Войти
            </Link>
          </span>
        </div>
      </form>
    </main>
  );
}
