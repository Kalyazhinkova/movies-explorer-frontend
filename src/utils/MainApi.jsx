import { apiMainConfig } from './constants';

class MainApi {
  constructor(config) {
    this._config = config;
  }

  _handleResponse(res) {
    return res.json().then((data) => {
      if (res.ok) {
        return data;
      }
      return Promise.reject(new Error(res.status));
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

  getAllMovies() {
    return fetch(`${this._config.baseUrl}/movies`, {
      headers: this._config.headers,
    })
      .then(this._handleResponse);
  }

  saveMovie(movie) {
    return fetch(`${this._config.baseUrl}/movies`, {
      method: 'POST',
      headers: this._config.headers,
      body: JSON.stringify(movie),
    })
      .then(this._handleResponse);
  }

  deleteMovie(id) {
    return fetch(`${this._config.baseUrl}/movies/${id}`, {
      method: 'DELETE',
      headers: this._config.headers,
    })
      .then(this._handleResponse);
  }
}

const mainApi = new MainApi(apiMainConfig);

export default mainApi;
