import { useState } from 'react';
import './Profile.css';

export default function Profile(props) {
  const { onChange, onLogOut } = props;

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onChange({ name, email });
  }

  return (
    <main className="profile">
      <form className="profile__form">
        <h1 className="profile__header">Привет, Виталий!</h1>
        <fieldset className="profile__fieldset">
          <label className="profile__label">
            <span className="profile__field">
              Имя
              <input
                id="name__input"
                name="userName"
                type="text"
                placeholder="Имя"
                className="profile__input"
                onChange={handleChangeName}
                required=""
              />
            </span>
            <span className="profile__input-error" />
          </label>
          <label className="profile__label">
            <span className="profile__field profile__field_no-bottom">
              E-mail
              <input
                id="email__input"
                name="email"
                type="email"
                placeholder="e-mail"
                className="profile__input"
                onChange={handleChangeEmail}
                required=""
              />
            </span>
            <span className="profile__input-error" />
          </label>
        </fieldset>
        <div className="profile__submit">
          <button type="submit" onSubmit={handleSubmit} className="profile__submit-button">
            Редактировать
          </button>

          <button type="button" onClick={onLogOut} className="profile__submit-button profile__submit_exit">
            Выйти из аккаунта
          </button>

        </div>
      </form>
    </main>
  );
}
