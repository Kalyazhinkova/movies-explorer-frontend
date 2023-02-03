import { useNavigate, useLocation } from 'react-router-dom';

export const ProtectedRoute = ({ loggedIn, children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  if (!loggedIn && (location.pathname === '/signin' || location === '/signup')) {
    return (navigate('/movies'));
  }
  if (!loggedIn) {
    return (navigate('/'));
  }
  return children;
};
