import './App.css';
import { useState, useEffect, useCallback } from 'react';
import {
  Route, Routes, useNavigate, Navigate, useLocation,
} from 'react-router-dom';
import Header from '../Header/Header';
import Movies from '../Movies/Movies';
import SavedMovies from '../Movies/SavedMovies';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Profile from '../Profile/Profile';
import NotFound from '../NotFound/NotFound';
import mainApi from '../../utils/MainApi';

import { CurrentUserContext } from '../../contexts/User';
import { ProtectedRoute } from '../ProtectedRoute/ProtectedRoute';
import moviesApi from '../../utils/MoviesApi';

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  // Переменная состояния пользователя
  const [currentUser, setCurrentUser] = useState({});

  // Состояние зарегистрированного пользователя
  const [loggedIn, setLoggedIn] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const [errorRequest, setErrorRequest] = useState(false);
  // const [login, setLogin] = useState(false);

  const routes = ['/signin', '/signup', '/saved-movies', '/movies', '/profile', '/'];

  const logOut = useCallback(() => {
    setLoggedIn(false);
    setIsAuth(false);
    setCurrentUser({});
    localStorage.removeItem('jwt');
    navigate('/');
    mainApi.exit();
    localStorage.clear();
    moviesApi.exit();
  }, []);

  function checkToken() {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      mainApi.setToken(jwt);
      mainApi.getUserInfo().then((data) => {
        setCurrentUser(data);
        setLoggedIn(true);
        setIsAuth(true);
      }).catch((err) => {
        console.log(err);
        logOut();
      });
    } else {
      logOut();
    }
  }

  useEffect(() => {
    if (routes.includes(location.pathname)) {
      checkToken();
    }
  }, [loggedIn]);

  const handleUpdateUser = (data, setApiError, setApiSucces) => {
    mainApi
      .setNewUserInfo(data)
      .then((userData) => {
        setCurrentUser({ ...currentUser, ...userData.data });
        setApiError('');
        setApiSucces('Данные успешно обновлены!');
      })
      .catch((err) => {
        console.log(err);
        setApiError(err.message);
      });
  };

  const handleLogin = (info) => {
    mainApi.login(info)
      .then((result) => {
        if (result && result.token) {
          setLoggedIn(true);
          localStorage.setItem('jwt', result.token);
          navigate('/movies');
        } else {
          console.log('Ошибка логина');
        }
      })
      .catch((err) => {
        console.log(err.message);
        setErrorRequest(err.message);
      });
  };

  const handleRegistration = (info) => {
    mainApi.register(info)
      .then((result) => {
        if (result) {
          handleLogin({ email: info.email, password: info.password });
        } else {
          console.log('ошибка', 'Не введен пользователь');
        }
      })
      .catch((err) => {
        console.log(err.message);
        setErrorRequest(err.message);
      });
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Routes>
        <Route path="/signup" element={isAuth ? <Navigate to="/movies" /> : <Register onRegister={handleRegistration} errorRequest={errorRequest} />} />
        <Route path="/signin" element={isAuth ? <Navigate to="/movies" /> : <Login onLogin={handleLogin} errorRequest={errorRequest} />} />
        <Route
          path="/"
          element={(
            <>
              <Header loggedIn={loggedIn} />
              <Main />
              <Footer />
            </>
          )}
        />

        <Route
          path="/profile"
          element={(
            <ProtectedRoute loggedIn={loggedIn}>
              <Header loggedIn={loggedIn} />
              <Profile onChange={handleUpdateUser} onLogOut={logOut} statusRequest={errorRequest} />
            </ProtectedRoute>
          )}
        />
        <Route
          path="/movies"
          element={(
            <ProtectedRoute loggedIn={loggedIn}>
              <Header loggedIn={loggedIn} />
              <Movies loggedIn={loggedIn} />
              <Footer />
            </ProtectedRoute>
        )}
        />
        <Route
          path="/saved-movies"
          element={(
            <ProtectedRoute loggedIn={loggedIn}>
              <Header loggedIn={loggedIn} />
              <SavedMovies />
              <Footer />
            </ProtectedRoute>
        )}
        />
        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/404" />} />
      </Routes>
    </CurrentUserContext.Provider>
  );
}

export default App;
