import './MoviesCardList.css';
import MovieCard from '../MovieCard/MovieCard';

export default function MoviesCardList(props) {
  const {
    movies, onSave, error, haveMovies, visible,
  } = props;

  return (
    <article className="movies">
      <ul className="movies__items">
        {movies.map((movie) => <MovieCard movie={movie} onSave={onSave} />)}
      </ul>
      {!error && visible && (<button type="button" className="movies__add" onClick={haveMovies} >Ещё</button>)}
    </article>

  );
}
