import SearchForm from './SearchForm/SearchForm';
import MoviesCardList from './MoviesCardList/MoviesCardList';
import { initialMovie } from '../../utils/constants';

export default function SavedMovies() {
  return (
    <main className="main">
      <SearchForm />
      <MoviesCardList movies={initialMovie} />
    </main>
  );
}
