import { useState, useEffect } from 'react';
import SearchForm from './SearchForm/SearchForm';
import MoviesCardList from './MoviesCardList/MoviesCardList';
import moviesApi from '../../utils/MoviesApi';
import mainApi from '../../utils/MainApi';
// а оimport { numberCard } from '../../utils/constants'; // отображаемое кол-во карточек на странице

export default function Movies({ loggedIn }) {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isShorts, setIsShorts] = useState('');

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

  const onSearch = (searchWord, shorts) => {
    setSearchTerm(searchWord);
    setIsShorts(shorts);
  };

  useEffect(() => {
    // здесь добавляю прелоадер
    const localMovies = JSON.parse(localStorage.getItem('storage-movies'));
    const newLocalMovies = localMovies.map((e) => readyMovie(e));
    if (localMovies && localMovies.length > 0) {
      if (isShorts) {
        console.log('память короткие');
        const filtredMovies = newLocalMovies.filter((e) => e.duration < 41)
          .filter((e) => e.nameRU.includes(searchTerm));
        console.log(filtredMovies);
        // setMovies();
      }
      const filtredMovies = newLocalMovies.filter((e) => e.nameRU.includes(searchTerm));
      console.log(newLocalMovies);
      console.log(searchTerm);
      console.log(filtredMovies);
      // setMovies();
      console.log('память не короткие');
    } else {
      moviesApi.getAllMovies()
        .then((allMovies) => {
          localStorage.setItem('storage-movies', JSON.stringify(allMovies));
          const newMovies = allMovies.map((e) => readyMovie(e));
          if (isShorts) {
            setMovies(newMovies).filter((e) => e.duration < 41).filter((e) => e.nameRU.includes(searchTerm));
          } setMovies(newMovies.filter((e) => e.nameRU.includes(searchTerm)));
        });
    }
    // здесь убираю прелоадер
  }, [searchTerm, isShorts]);

  console.log(movies);

  return (
    <main className="main">
      <SearchForm onSearch={onSearch} />
      <MoviesCardList movies={movies} />
    </main>
  );
}
