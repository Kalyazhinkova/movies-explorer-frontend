import './App.css';
import { Route, Routes } from 'react-router-dom';
// import Main from '../Main/Main';
import Header from '../Header/Header';
import Movies from '../Movies/Movies';
import SavedMovies from '../Movies/SavedMovies';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Profile from '../Profile/Profile';
import NotFound from '../NotFound/NotFound';

import { defaultUser, UserContext } from '../../contexts/User';

function App() {
  const loggedIn = true;
  // const loggedIn = false;

  return (
    <UserContext.Provider value={defaultUser}>
      <Routes>
        <Route path="/signup" element={<Register />} />
        <Route path="/signin" element={<Login />} />
        <Route
          path="/profile"
          element={(
            <>
              <Header loggedIn={loggedIn} />
              <Profile />
            </>
          )}
        />
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
          path="/movies"
          element={(
            <>
              <Header loggedIn={loggedIn} />
              <Movies />
              <Footer />
            </>
        )}
        />
        <Route
          path="/saved-movies"
          element={(
            <>
              <Header loggedIn={loggedIn} />
              <SavedMovies />
              <Footer />
            </>
        )}
        />
        <Route path="/404" element={<NotFound />} />
      </Routes>
    </UserContext.Provider>
  );
}

export default App;
