import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../contexts/User';

export const ProtectedRoute = ({ children }) => {
  const currentUser = useContext(UserContext);
  // const isAuthorized = currentUser.isAuth();
  const isAuthorized = true;
  const navigate = useNavigate();

  return !isAuthorized ? children : navigate('/signin');
};
