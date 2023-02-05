import { apiMainConfig } from './constants';

class MainApi {
  constructor(config) {
    this._config = config;
    this._movies = JSON.parse(localStorage.getItem('storage-movies') || '[]');
  }

  _handleResponse(res) {
    return res.json().then((data) => {
      if (res.ok) {
        return data;
      }
      return Promise.reject(new Error(data.message));
    });
  }

  setToken(token) {
    this._config.headers.Authorization = token;
  }

  register(data) {
    return fetch(`${this._config.baseUrl}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(this._handleResponse);
  }

  login(data) {
    return fetch(`${this._config.baseUrl}/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(this._handleResponse);
  }

  getUserInfo() {
    return fetch(`${this._config.baseUrl}/users/me`, {
      headers: this._config.headers,
    })
      .then(this._handleResponse);
  }

  setNewUserInfo(data) {
    return fetch(`${this._config.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._config.headers,
      body: JSON.stringify(data),
    })
      .then(this._handleResponse);
  }

  getMovies() {
    if (this._movies.length === 0) {
      return fetch(`${this._config.baseUrl}/movies`, {
        headers: this._config.headers,
      })
        .then(this._handleResponse)
        .then((films) => {
          this._movies = films;
          localStorage.setItem('storage-movies', JSON.stringify(films));
          return films;
        });
    }
    return Promise.resolve(this._movies);
  }

  saveMovie(movie) {
    return fetch(`${this._config.baseUrl}/movies`, {
      method: 'POST',
      headers: this._config.headers,
      body: JSON.stringify(movie),
    })
      .then(this._handleResponse)
      .then((film) => {
        this._movies.push(film);
        localStorage.setItem('storage-movies', JSON.stringify(this._movies));
        return film;
      });
  }

  deleteMovie(id) {
    return fetch(`${this._config.baseUrl}/movies/${id}`, {
      method: 'DELETE',
      headers: this._config.headers,
    })
      .then(this._handleResponse)
      .then((film) => {
        this._movies = this._movies.filter((flm) => flm._id !== id);
        localStorage.setItem('storage-movies', JSON.stringify(this._movies));
        return film;
      });
  }

  exit() {
    this._movies = [];
  }
}

const mainApi = new MainApi(apiMainConfig);

export default mainApi;
