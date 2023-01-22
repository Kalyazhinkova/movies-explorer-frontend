import './App.css';
import { Route, Routes } from 'react-router-dom';

import Main from '../Main/Main';

import NotFound from '../NotFound/NotFound';
import Login from '../Login/Login';
import Register from '../Register/Register';

import { defaultUser, UserContext } from '../../contexts/User';

function App() {
  return (
    <UserContext.Provider value={defaultUser}>
      <Routes>
        <Route path="/signup" element={<Register />} />
        <Route path="/signin" element={<Login />} />
        <Route path="/" element={<Main />} />
        <Route path="/404" element={<NotFound />} />
      </Routes>
    </UserContext.Provider>
  );
}

export default App;
