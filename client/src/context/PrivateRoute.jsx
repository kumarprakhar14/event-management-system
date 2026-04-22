import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';

const PrivateRoute = ({ children, allowedRole }) => {
  const { user, token } = useContext(AuthContext);

  if (!token || !user) {
    if (allowedRole === 'admin') return <Navigate to="/admin/login" />;
    if (allowedRole === 'vendor') return <Navigate to="/vendor/login" />;
    return <Navigate to="/user/login" />;
  }

  if (user.role !== allowedRole) {
    if (user.role === 'admin') return <Navigate to="/admin" />;
    if (user.role === 'vendor') return <Navigate to="/vendor" />;
    return <Navigate to="/user" />;
  }

  return children;
};

export default PrivateRoute;
