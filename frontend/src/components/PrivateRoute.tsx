import type { JSX } from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const token = localStorage.getItem('accessToken');
  if (!token) {
    console.log('No access token found, redirecting to login.');
  }
  return token ? children : <Navigate to="/login" />;
};

export default PrivateRoute;