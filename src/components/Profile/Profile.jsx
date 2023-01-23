import './Profile.css';

export default function Profile() {
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
                required=""
              />
            </span>
            <span className="profile__input-error" />
          </label>
        </fieldset>
        <div className="profile__submit">
          <button type="submit" className="profile__submit-button">
            Редактировать
          </button>

          <button type="submit" className="profile__submit-button profile__submit_exit">Выйти из аккаунта</button>
          {/* <Link to="/sign-in" className="profile__link"> */}
          {/* </Link> */}

        </div>
      </form>
    </main>
  );
}
