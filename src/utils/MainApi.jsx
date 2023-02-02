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
      return Promise.reject(new Error(`Ошибка: ${res.status} ${data.message}`));
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

  setNewUserInfo(email, name) {
    return fetch(`${this._config.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._config.headers,
      body: JSON.stringify({
        email,
        name,
      }),
    })
      .then(this._handleResponse);
  }
}

const mainApi = new MainApi(apiMainConfig);

export default mainApi;
