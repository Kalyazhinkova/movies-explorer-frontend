import { useState, useEffect } from 'react';
import SearchForm from './SearchForm/SearchForm';
import MoviesCardList from './MoviesCardList/MoviesCardList';
import moviesApi from '../../utils/MoviesApi';
import mainApi from '../../utils/MainApi';

export default function Movies({ loggedIn }) {
  const [movies, setMovies] = useState([null]);

      moviesApi.getAllMovies()
        .then((allMovies) => {
          setMovies(allMovies.slice());
          console.log('then');
        })
        .catch((err) => {
          console.log(err);
        });

    console.log(movies);


  return (
    <main className="main">
      <SearchForm />
      {/* <MoviesCardList movies={filteredMovies.filter((_, i) => i < numberMiviesShow)} isSearch={isSearch} /> */}
    </main>
  );
}
