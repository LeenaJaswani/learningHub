import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, isAuthenticated, redirectTo }) => {
  return isAuthenticated ? children : <Navigate to={redirectTo} replace />;
};

export default ProtectedRoute;