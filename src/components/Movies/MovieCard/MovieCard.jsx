import './MovieCard.css';
// import { useContext } from 'react';
// import { UserContext } from '../../../contexts/User';

export default function MovieCard(props) {
  const { movie } = props;
  // const { currentUser } = useContext(UserContext);
  // const isSaved = movie.saved.some((id) => id === currentUser._id);
  const isSaved = true;
  return (
    <article className="movie">
      <div className="movie__content">
        <div className="movie__about">
          <h1 className="movie__title">{movie.nameRU}</h1>
          <p className="movie__time">{movie.duration}</p>
        </div>
        <img className="movie__image" src={movie.image} alt={`Постер к фильму:${movie.nameRU}`} />
        <button
          className={isSaved ? 'movie__save-button movie__saved' : 'movie__save-button movie__not-saved'}
          type="button"
          // onClick={() => {
          //   onSave(movie);
          // }}
          aria-label="Сохранённые фильмы"
        />
      </div>
    </article>
  );
}
