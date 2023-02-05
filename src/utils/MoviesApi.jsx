class MoviesApi {
  constructor(config) {
    this._baseUrl = config.baseUrl;
    this._headers = config.headers;
    this._movies = JSON.parse(localStorage.getItem('storage-beat-movies') || '[]');
  }

  _handleResponse(res) {
    return res.json().then((data) => {
      if (res.ok) {
        return data;
      }
      return Promise.reject(new Error(data.message));
    });
  }

  getAllMovies() {
    if (this._movies.length === 0) {
      return fetch(`${this._baseUrl}`, {
        headers: this._headers,
      }).then((res) => this._handleResponse(res))
        .then((movies) => {
          this._movies = movies.map((movie) => {
            movie._id = '';
            movie.movieId = movie.id;
            movie.thumbnail = `https://api.nomoreparties.co${movie.image.formats.thumbnail.url}`;
            movie.saved = false;
            return movie;
          });
          localStorage.setItem('storage-beat-movies', JSON.stringify(movies));
          return movies;
        });
    }
    return Promise.resolve(this._movies);
  }

  saveMovie(movie) {
    const localMovie = this._movies.find((film) => film.id === movie.movieId);
    if (localMovie) {
      localMovie._id = movie._id;
      localMovie.movieId = localMovie.id;
      localMovie.thumbnail = `https://api.nomoreparties.co${localMovie.image.formats.thumbnail.url}`;
      localMovie.saved = true;
      localMovie.owner = movie.owner;
      localStorage.setItem('storage-beat-movies', JSON.stringify(this._movies));
      return this._movies;
    }
    return this._movies;
  }

  deleteMovie(id) {
    this._movies = this._movies.map((movie) => {
      if (movie.id === id) {
        movie.saved = false;
      }
      return movie;
    });
    localStorage.setItem('storage-beat-movies', JSON.stringify(this._movies));
    return this._movies;
  }

  exit() {
    this._movies = [];
  }
}

const moviesApi = new MoviesApi({
  baseUrl: 'https://api.nomoreparties.co/beatfilm-movies',
  headers: {
    'Content-Type': 'application/json',
    Authorization: '',
  },
});

export default moviesApi;
