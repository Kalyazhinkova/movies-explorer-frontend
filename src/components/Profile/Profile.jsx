/* eslint-disable react/destructuring-assignment */
import { useState, useContext, useEffect } from 'react';
import { CurrentUserContext } from '../../contexts/User';
import useFormValidation from '../../hooks/UseFormValidation';
import './Profile.css';

export default function Profile(props) {
  const { onChange, onLogOut, statusRequest } = props;

  const [isMessage, setIsMessage] = useState('');

  function handleMessage() {
    if (statusRequest) {
      console.log(statusRequest);
      switch (statusRequest) {
        case '200':
          setIsMessage('Данные обновлены!');
          break;
        case '400':
          setIsMessage('Ошибка в данных!');
          break;
        case '409':
          setIsMessage('Пользователь с такими данными уже существует!');
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

  const currentUser = useContext(CurrentUserContext);
  const [email, setEmail] = useState(currentUser.email);
  const [name, setName] = useState(currentUser.name);

  const {
    errors,
  } = useFormValidation();

  // useEffect(() => {
  //   setIsButtonDisabled(name === currentUser.name && email === currentUser.email);
  // }, [name, email, currentUser.name, currentUser.email]);

  useEffect(() => {
    setName(currentUser.name);
    setEmail(currentUser.email);
  }, [currentUser.name, currentUser.email]);

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log('Ghb');
    onChange({ name, email });
  }

  return (
    <main className="profile">
      <form onSubmit={handleSubmit} className="profile__form">
        <h1 className="profile__header">
          Привет,
          {' '}
          {name}
          !
        </h1>
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
                required
                value={name}
              />
            </span>
            <span className="profile__input-error">{errors.name}</span>
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
                value={email}
                required
              />
            </span>
            <span className="profile__input-error">{errors.email}</span>
          </label>
        </fieldset>
        <span className="profile__input-error">{isMessage}</span>
        <div className="profile__submit">
          <button type="submit" className="profile__submit-button">
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
