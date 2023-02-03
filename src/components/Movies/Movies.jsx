import { useState } from 'react';
import SearchForm from './SearchForm/SearchForm';
import MoviesCardList from './MoviesCardList/MoviesCardList';
import moviesApi from '../../utils/MoviesApi';
import mainApi from '../../utils/MainApi';

export default function Movies({ loggedIn }) {
  const savedSearch = JSON.parse(localStorage.getItem('search') || '{}');
  if (loggedIn) {
    const films = moviesApi.getAllMovies();
    console.log(films);
    console.log(savedSearch);
  }

  return (
    <main className="main">
      <SearchForm savedSearch={savedSearch} onSearchMovies={onSearchMovies} />
      {/* <MoviesCardList movies={filteredMovies.filter((_, i) => i < numberMiviesShow)} isSearch={isSearch} /> */}
    </main>
  );
}
