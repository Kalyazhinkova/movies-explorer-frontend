/* eslint-disable no-unused-vars */
import { useState, useEffect, useContext } from 'react';
import SearchForm from './SearchForm/SearchForm';
import MoviesCardList from './MoviesCardList/MoviesCardList';
import moviesApi from '../../utils/MoviesApi';
import mainApi from '../../utils/MainApi';
import { counterCard } from '../../utils/constants';
import { CurrentUserContext } from '../../contexts/User';

export default function SavedMovies({ loggedIn }) {
  const currentUser = useContext(CurrentUserContext);
  const { _id } = currentUser;
  const visibleCard = counterCard();

  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [displayedCards, setDisplayedCards] = useState(visibleCard.init);
  const [savedSearch, setSavedSearch] = useState(JSON.parse(localStorage.getItem('search') || '{}'));

  const loadingMovies = () => {
    const { more } = counterCard();
    setDisplayedCards(displayedCards + more);
  };

  const onSearch = ({ movie = '', shorts = false }, films) => {
    localStorage.setItem('search', JSON.stringify({ movie, shorts }));
    setSavedSearch({ movie, shorts });
    const newMovies = films.filter((element) => element.owner === _id)
      .filter((element) => {
        if (shorts) {
          return element.duration <= 40 && element.nameRU.toLowerCase().includes(movie.toLowerCase());
        }
        return element.nameRU.toLowerCase().includes(movie.toLowerCase());
      });
    setFilteredMovies(newMovies);
  };

  useEffect(() => {
    mainApi.getMovies()
      .then((mainMovies) => {
        const myMainMovie = mainMovies.filter((element) => element.owner === _id);
        setMovies(myMainMovie);
        setFilteredMovies(myMainMovie);
      })
      .catch((err) => console.log(err));
  }, []);

  const deleteMovie = (movie) => {
    mainApi.deleteMovie(movie._id)
      .then(() => {
        const updatedMovies = moviesApi.deleteMovie(movie.movieId);
        const myUpdatedMovies = updatedMovies.filter((element) => element.owner === _id);
        console.log('updMovoes', myUpdatedMovies);
        setFilteredMovies(myUpdatedMovies);
        onSearch(savedSearch, myUpdatedMovies);
      });
  };

  const handleSavedCard = (movie) => {
    deleteMovie(movie);
  };

  return (
    <main className="main">
      <SearchForm onSearch={(search) => onSearch(search, movies)} savedSearch={savedSearch} required={false} />
      <MoviesCardList
        movies={filteredMovies.slice(0, displayedCards)}
        onSave={handleSavedCard}
        loadMovies={loadingMovies}
        hasMore={filteredMovies.length >= displayedCards}
      />
    </main>
  );
}
