import { useState, useEffect } from 'react';
import SearchForm from './SearchForm/SearchForm';
import MoviesCardList from './MoviesCardList/MoviesCardList';
import moviesApi from '../../utils/MoviesApi';
import mainApi from '../../utils/MainApi';
// import { numberCard } from '../../utils/constants'; // отображаемое кол-во карточек на странице

export default function Movies({ loggedIn }) {

  const [movies, setMovies] = useState();

  function readyMovie(beatMovie) {
    const newMovie = {
      country: beatMovie.country,
      director: beatMovie.director,
      duration: beatMovie.duration,
      year: beatMovie.year,
      description: beatMovie.description,
      image: `https://api.nomoreparties.co${beatMovie.image.url}`,
      trailerLink: beatMovie.trailerLink,
      nameRU: beatMovie.nameRU,
      nameEN: beatMovie.nameEN,
      thumbnail: `https://api.nomoreparties.co${beatMovie.image.formats.thumbnail.url}`,
      movieID: beatMovie.id,
    };
    return newMovie;
  }

  useEffect(() => {
    // здесь добавляю прелоадер
    moviesApi.getAllMovies()
      .then((allMovies) => {
        console.log(allMovies);
        setMovies(allMovies.map((e) => readyMovie(e)));
        const newArray = allMovies.map((e) => readyMovie(e));
        console.log(newArray);
        const searchWord = 'и';
        const shortArray = newArray.filter((e) => e.duration < 41).filter((e) => e.nameRU.includes(searchWord));
        const sortArray = newArray.filter((e) => e.nameRU.includes(searchWord));
        console.log(shortArray);
        console.log(sortArray);
        // здесь убираю прелоадер
      });
  }, []);

  return (
    <main className="main">
      <SearchForm />
      <MoviesCardList movies={movies} />
    </main>
  );
}
