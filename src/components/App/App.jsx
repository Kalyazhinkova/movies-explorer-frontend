import './App.css';
import { useState, useEffect, useCallback } from 'react';
import { Route, Routes, Redirect, useNavigate } from 'react-router-dom';
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

import { UserContext } from '../../contexts/User';
import { initialMovie } from '../../utils/constants';
import { ProtectedRoute } from '../ProtectedRoute/ProtectedRoute';

function App() {
  const navigate = useNavigate();

  // Переменная состояния пользователя
  const [currentUser, setCurrentUser] = useState({});

  // Состояние зарегистрированного пользователя
  const [loggedIn, setLoggedIn] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const [statusRequest, setStatusRequest] = useState(false);
  const [login, setLogin] = useState(false);

  const [movies, setMovies] = useState([null]);

  function logOut() {
    setLoggedIn(false);
    setIsAuth(false);
    setCurrentUser({});
    localStorage.removeItem('jwt');
    navigate('/');
  }

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      mainApi.setToken(jwt);
      Promise.all([
        mainApi.getUserInfo(),
        // тут я должна буду еще получить все сохраненные фильмы
      ])
        .then(([data, initialMovies]) => {
          setCurrentUser(data);
          setMovies(initialMovies);
          setLoggedIn(true);
          setIsAuth(true);
        })
        .catch((err) => {
          console.log(err);
          logOut();
        });
    } else {
      logOut();
    }
  }, [loggedIn]);

  function handleUpdateUser(email, name) {
    mainApi
      .setNewUserInfo(email, name)
      .then((userData) => {
        setCurrentUser({ ...currentUser, ...userData });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const handleRegistration = useCallback((info) => {
    mainApi.register(info)
      .then((result) => {
        if (result) {
          setLoggedIn(true);
          navigate('/signin');
        } else {
          console.log('ошибка', 'Не введен пользователь');
        }
      })
      .catch((err) => {
        setStatusRequest(err);
      });
  }, []);

  const handleLogin = useCallback((info) => {
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
        console.log(err);
      });
  }, []);

  return (
    <UserContext.Provider value={currentUser}>
      <Routes>
        <Route path="/signup" element={!isAuth && <Register onRegister={handleRegistration} statusRequest={statusRequest} />} />
        <Route path="/signin" element={!isAuth && <Login onLogin={handleLogin} />} />
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
            <ProtectedRoute>
              <Header loggedIn={loggedIn} />
              <Profile onChange={handleUpdateUser} onLogOut={logOut} />
            </ProtectedRoute>
          )}
        />
        <Route
          path="/movies"
          element={(
            <ProtectedRoute>
              <Header loggedIn={loggedIn} />
              <Movies />
              <Footer />
            </ProtectedRoute>
        )}
        />
        <Route
          path="/saved-movies"
          element={(
            <ProtectedRoute>
              <Header loggedIn={loggedIn} />
              <SavedMovies />
              <Footer />
            </ProtectedRoute>
        )}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </UserContext.Provider>
  );
}

export default App;
