import './App.css';
import { useState, useEffect, useCallback } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
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

function App() {
  const navigate = useNavigate();

  // Переменная состояния пользователя
  const [currentUser, setCurrentUser] = useState({});

  // Состояние зарегистрированного пользователя
  const [loggedIn, setLoggedIn] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const [statusRequest, setStatusRequest] = useState(false);
  // const [login, setLogin] = useState(false);

  const logOut = useCallback(() => {
    setLoggedIn(false);
    setIsAuth(false);
    setCurrentUser({});
    localStorage.removeItem('jwt');
    navigate('/');
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
    checkToken();
  }, [loggedIn]);

  const handleUpdateUser = useCallback((data) => {
    mainApi
      .setNewUserInfo(data)
      .then((userData) => {
        setCurrentUser({ ...currentUser, ...userData });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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
        console.log(err.message);
        setStatusRequest(err.message);
      });
  }, []);

  const handleLogin = useCallback((info) => {
    mainApi.login(info)
      .then((result) => {
        if (result && result.token) {
          setLoggedIn(true);
          localStorage.setItem('jwt', result.token);
          navigate('/movies');
          console.log(currentUser);
        } else {
          console.log('Ошибка логина');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Routes>
        <Route path="/signup" element={!isAuth && <Register onRegister={handleRegistration} statusRequest={statusRequest} />} />
        <Route path="/signin" element={!isAuth && <Login onLogin={handleLogin} statusRequest={statusRequest} />} />
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
              <Profile onChange={handleUpdateUser} onLogOut={logOut} statusRequest={statusRequest} />
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
        <Route path="*" element={<NotFound />} />
      </Routes>
    </CurrentUserContext.Provider>
  );
}

export default App;
