import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useFormValidation from '../../hooks/UseFormValidation';

export default function Login(props) {
  const { onLogin, errorRequest } = props;

  const [apiError, setApiError] = useState('');

  const {
    values, errors, isValid, handleChange, resetForm,
  } = useFormValidation();
  const { email, password } = values;

  useEffect(() => {
    setApiError(errorRequest);
  }, [errorRequest]);

  useEffect(() => {
    resetForm();
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    if (isValid) {
      onLogin({ email, password });
    }
  }

  return (
    <div className="register">
      <Link to="/" className="register__logo" />
      <form onSubmit={handleSubmit} className="register__form form">
        <h1 className="form__header">Рады видеть!</h1>
        <fieldset className="form__fieldset">
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
            Войти
          </button>

          <span className="form__subtitle">
            Еще не зарегистрированы?
            <Link to="/signup" className="form__link">
              Регистрация
            </Link>
          </span>
        </div>
      </form>
    </div>
  );
}
