import "./Register.css";
import headerLogo from "../../images/header-logo.svg";
// import { Link } from "react-router-dom";

export default function Register() {
  return (
    <div className="register">
      <img src={headerLogo} alt="Логотип" className="register__logo" />
      <form className="register__form">
        <h1 className="form__header">Добро пожаловать!</h1>
        <fieldset className="form__fieldset">
          <label className="form__label">Имя
            <input
              id="name__input"
              name="userName"
              type="text"
              placeholder="Имя"
              className="form__input"
              required=""
            />
            <span className="form__input-error" />
          </label>
          <label className="form__label">E-mail
            <input
              id="email__input"
              name="email"
              type="email"
              placeholder="e-mail"
              className="form__input"
              required=""
            />
            <span className="form__input-error" />
          </label>
          <label className="form__label">Пароль
            <input
              id="password__input"
              name="password"
              type="password"
              placeholder="Пароль"
              className="form__input"
              minLength={8}
              maxLength={50}
            />
            <span className="form__input-error">Что-то пошло не так...</span>
          </label>
        </fieldset>
        <div className="form__submit">
          <button type="submit" className="form__submit-button">
            Зарегистрироваться
          </button>

          <span className="form__subtitle">
            Уже зарегистрированы?
            <div className="form__link">Войти</div>
            {/* <Link to="/sign-in" className="form__link"> */}
            {/* </Link> */}
          </span>
        </div>
      </form>
    </div>
  );
}
