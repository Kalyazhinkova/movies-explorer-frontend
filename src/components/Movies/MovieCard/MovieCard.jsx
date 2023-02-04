import './MovieCard.css';
// import { useContext } from 'react';
import { useLocation } from 'react-router-dom';
// import { CurrentUserContext } from '../../../contexts/User';

export default function MovieCard(props) {
  const { movie, onSave } = props;
  const location = useLocation();
  // const currentUser = useContext(CurrentUserContext);
  // const { _id } = currentUser;
  // console.log(_id);
  // const isSaved = false;
  // const isSaved = movie.saved;

  const duration = (movie.duration >= 60 ? `${Math.floor(movie.duration / 60)} ч ` : '')
                 + (movie.duration === 60 ? '' : `${movie.duration % 60} м`);

  return (
    <li className="movies__item">
      <section className="movie">
        <div className="movie__content">
          <div className="movie__about">
            <h2 className="movie__title">{movie.nameRU}</h2>
            <p className="movie__time">{duration}</p>
          </div>
          <img
            className="movie__image"
            src={movie.image}
            alt={`Постер к фильму:${movie.nameRU}`}
          />
          {location.pathname === '/movies' && (
            <button
              className={
                movie.saved
                  ? 'movie__save-button movie__saved'
                  : 'movie__save-button movie__not-saved'
              }
              type="button"
              onClick={() => {
                onSave(movie);
              }}
              aria-label="Сохранённые фильмы"
            />
          )}
          {location.pathname === '/saved-movies' && (
            <button
              className="movie__delete-button"
              type="button"
              onClick={() => {
                onSave(movie);
              }}
              aria-label="Сохранённые фильмы"
            />
          )}
        </div>
      </section>
    </li>
  );
}
