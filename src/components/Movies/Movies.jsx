import { useState, useEffect } from 'react';
import SearchForm from './SearchForm/SearchForm';
import Preloader from './Preloader/Preloader';
import MoviesCardList from './MoviesCardList/MoviesCardList';
import moviesApi from '../../utils/MoviesApi';
import mainApi from '../../utils/MainApi';
import { counterCard } from '../../utils/constants'; // отображаемое кол-во карточек на странице

export default function Movies({ loggedIn }) {
  const visibleCard = counterCard();

  const [movies, setMovies] = useState([]);
  const [displayedCards, setDisplayedCards] = useState(visibleCard.init);
  const [searchTerm, setSearchTerm] = useState('');
  const [isShorts, setIsShorts] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const loadingMovies = () => {
    setDisplayedCards(displayedCards + visibleCard.more);
  };

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

  const onSearch = ({ movie, shorts }) => {
    console.log({ movie, shorts });
    setSearchTerm(movie);
    setIsShorts(shorts);
  };

  useEffect(() => {
    setIsLoading(true);
    const localMovies = JSON.parse(localStorage.getItem('storage-movies'));
    if (localMovies && localMovies.length > 0) {
      if (isShorts) {
        setMovies(localMovies.map((e) => readyMovie(e))
          .filter((e) => e.duration < 41)
          .filter((e) => e.nameRU.includes(searchTerm)));
      } else {
        setMovies(localMovies.map((e) => readyMovie(e))
          .filter((e) => e.nameRU.includes(searchTerm)));
      }
    } else {
      moviesApi.getAllMovies()
        .then((allMovies) => {
          localStorage.setItem('storage-movies', JSON.stringify(allMovies));
          if (isShorts) {
            setMovies(allMovies.map((e) => readyMovie(e))
              .filter((e) => e.duration < 41)
              .filter((e) => e.nameRU.includes(searchTerm)));
          } else {
            setMovies(allMovies.map((e) => readyMovie(e))
              .filter((e) => e.nameRU.includes(searchTerm)));
          }
        });
    }
    setIsLoading(false);
  }, [searchTerm, isShorts]);

  const handleSavedCard = () => {
    console.log(1);
  };

  const error = false;

  return (
    <main className="main">
      <SearchForm onSearch={onSearch} />
      {isLoading && (<Preloader />)}
      <MoviesCardList
        movies={movies}
        onSave={handleSavedCard}
        error={error}
        haveMovies={loadingMovies}
        visible={movies.length > visibleCard}
      />
    </main>
  );
}
