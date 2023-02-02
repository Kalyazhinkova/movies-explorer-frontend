import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useFormValidation from '../../hooks/UseFormValidation';

export default function Login(props) {
  const { onLogin, statusRequest } = props;

  const [isMessage, setIsMessage] = useState('');

  function handleMessage() {
    if (statusRequest) {
      console.log(statusRequest);
      switch (statusRequest) {
        case 400:
          setIsMessage('Ошибка в данных');
          break;
        case 401:
          setIsMessage('Пользователь не найден!');
          break;
        case 500:
          setIsMessage('Ошибка на сервере.');
          break;
        default:
          setIsMessage(' Что-то пошло не так...');
          break;
      }
    }
  }

  useEffect(() => {
    handleMessage();
  }, [statusRequest]);

  const {
    values, errors, isValid, handleChange,
  } = useFormValidation();
  const { email, password } = values;

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
        <span className="form__input-error">{isMessage}</span>
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
