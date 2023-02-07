/* eslint-disable react/destructuring-assignment */
import { useState, useContext, useEffect } from 'react';
import { CurrentUserContext } from '../../contexts/User';
import useFormValidation from '../../hooks/UseFormValidation';
import './Profile.css';

export default function Profile(props) {
  const { onChange, onLogOut, errorRequest } = props;
  const currentUser = useContext(CurrentUserContext);
  const [apiError, setApiError] = useState('');
  const [succesMessage, setSuccesMessage] = useState('');
  const [isDisabled, setIsDisabled] = useState(false);
  const {
    values,
    errors, isValid, handleChange,
  } = useFormValidation(currentUser);
  const { name, email } = values;

  useEffect(() => {
    setApiError(errorRequest);
  }, [errorRequest]);

  useEffect(() => {
    setIsDisabled(currentUser.name === name && currentUser.email === email);
  }, [name, email, currentUser.name, currentUser.email]);

  function handleSubmit(e) {
    e.preventDefault();
    if (isValid) {
      onChange({ name, email }, setApiError, setSuccesMessage);
    }
  }

  return (
    <main className="profile">
      <form onSubmit={handleSubmit} className="profile__form">
        <h1 className="profile__header">
          Привет,
          {' '}
          {currentUser.name}
          !
        </h1>
        <fieldset className="profile__fieldset">
          <label className="profile__label">
            <span className="profile__field">
              Имя
              <input
                id="name__input"
                name="name"
                type="text"
                placeholder="Имя"
                className="profile__input"
                onChange={handleChange}
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
                onChange={handleChange}
                value={email}
                required
              />
            </span>
            <span className="profile__input-error">{errors.email}</span>
          </label>
        </fieldset>
        <span className="profile__input-error">{apiError}</span>
        <span className="profile__input-message">{succesMessage}</span>
        <div className="profile__submit">
          <button type="submit" className="profile__submit-button" disabled={!isValid || isDisabled}>
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
