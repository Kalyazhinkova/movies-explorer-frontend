/* eslint-disable no-unused-vars */
import { useState, useEffect, useContext } from 'react';
import SearchForm from './SearchForm/SearchForm';
import Preloader from './Preloader/Preloader';
import MoviesCardList from './MoviesCardList/MoviesCardList';
import moviesApi from '../../utils/MoviesApi';
import mainApi from '../../utils/MainApi';
import { counterCard } from '../../utils/constants';
import { CurrentUserContext } from '../../contexts/User';

export default function Movies({ loggedIn }) {
  const currentUser = useContext(CurrentUserContext);
  const { _id } = currentUser;
  const visibleCard = counterCard();

  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [displayedCards, setDisplayedCards] = useState(visibleCard.init);
  const [savedSearch, setSavedSearch] = useState(JSON.parse(localStorage.getItem('search') || '{}'));
  const [isLoading, setIsLoading] = useState(false);

  const loadingMovies = () => {
    const { more } = counterCard();
    setDisplayedCards(displayedCards + more);
  };

  const onSearch = ({ movie = '', shorts = false }, films) => {
    setIsLoading(true);
    localStorage.setItem('search', JSON.stringify({ movie, shorts }));
    setSavedSearch({ movie, shorts });
    const newMovies = films.filter((element) => {
      if (shorts) {
        return element.duration <= 40 && element.nameRU.toLowerCase().includes(movie.toLowerCase());
      }
      return element.nameRU.toLowerCase().includes(movie.toLowerCase());
    });
    setFilteredMovies(newMovies);
    setIsLoading(false);
  };

  useEffect(() => {
    setIsLoading(true);
    const jwt = localStorage.getItem('jwt');
    mainApi.setToken(jwt);
    Promise.all([moviesApi.getAllMovies(), mainApi.getMovies()])
      .then(([beatMovies, mainMovies]) => {
        let unionMovies = beatMovies;
        mainMovies.forEach((mainMovie) => {
          unionMovies = moviesApi.saveMovie(mainMovie);
        });
        setMovies(unionMovies);
        onSearch(savedSearch, unionMovies);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, []);

  const saveMovie = (beatMovie) => {
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
      movieId: beatMovie.id,
    };
    mainApi.saveMovie(newMovie)
      .then((serverMovie) => {
        const updatedMovies = moviesApi.saveMovie(serverMovie);
        setMovies(updatedMovies);
        onSearch(savedSearch, updatedMovies);
      });
  };

  const deleteMovie = (movie) => {
    mainApi.deleteMovie(movie._id)
      .then(() => {
        const updatedMovies = moviesApi.deleteMovie(movie.movieId);
        setMovies(updatedMovies);
        onSearch(savedSearch, updatedMovies);
      });
  };

  const handleSavedCard = (movie) => {
    if (movie.saved && movie.owner === _id) {
      deleteMovie(movie);
    } else {
      saveMovie(movie);
    }
  };

  return (
    <main className="main">
      <SearchForm onSearch={(search) => onSearch(search, movies)} savedSearch={savedSearch} required />
      {isLoading && (<Preloader />)}
      <MoviesCardList
        movies={filteredMovies.slice(0, displayedCards)}
        onSave={handleSavedCard}
        loadMovies={loadingMovies}
        hasMore={filteredMovies.length >= displayedCards}
      />
    </main>
  );
}
