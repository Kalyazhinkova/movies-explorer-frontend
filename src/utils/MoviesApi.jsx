class MoviesApi {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _handleResponse(res) {
    return res.json().then((data) => {
      if (res.ok) {
        return data;
      }
      return Promise.reject(new Error(res.status));
    });
  }

  getAllMovies() {
    return fetch(`${this._baseUrl}`, {
      headers: this._headers,
    })
      .then(this._handleResponse);
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
