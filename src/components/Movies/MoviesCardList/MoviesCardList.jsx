import './MoviesCardList.css';
import MovieCard from '../MovieCard/MovieCard';

export default function MoviesCardList(props) {
  const {
    movies, onSave, loadMovies, hasMore,
  } = props;

  return (
    <article className="movies">
      <ul className="movies__items">
        {movies.map((movie) => <MovieCard movie={movie} onSave={onSave} key={movie.id || movie._id} />)}
      </ul>
      {hasMore && (<button type="button" className="movies__add" onClick={loadMovies}>Ещё</button>)}
    </article>

  );
}
