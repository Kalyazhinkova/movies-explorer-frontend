import './MoviesCardList.css';
import MovieCard from '../MovieCard/MovieCard';

export default function MoviesCardList(props) {
  const { movies } = props;

  return (
    <article className="movies">
      <ul className="movies__items">
        {movies.map((movie) => <MovieCard movie={movie} />)}
      </ul>
      <button type="button" className="movies__add">Ещё</button>
    </article>

  );
}
