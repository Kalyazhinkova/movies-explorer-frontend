import SearchForm from './SearchForm/SearchForm';
// import Preloader from "./Preloader/Preloader";
import MoviesCardList from './MoviesCardList/MoviesCardList';
import { initialMovie } from '../../utils/constants';

export default function Movies() {
  return (
    <main className="main">
      <SearchForm />
      {/* <Preloader /> */}
      <MoviesCardList movies={initialMovie} />
    </main>
  );
}
