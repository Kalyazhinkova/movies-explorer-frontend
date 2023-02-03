import { useState } from 'react';
import SearchForm from './SearchForm/SearchForm';
import MoviesCardList from './MoviesCardList/MoviesCardList';
import moviesApi from '../../utils/MoviesApi';
import mainApi from '../../utils/MainApi';

export default function Movies({ loggedIn }) {
  if (loggedIn) {
    const films = moviesApi.getAllMovies();
    console.log(films);
  }

  return (
    <main className="main">
      <SearchForm />
      {/* <MoviesCardList movies={filteredMovies.filter((_, i) => i < numberMiviesShow)} isSearch={isSearch} /> */}
    </main>
  );
}
