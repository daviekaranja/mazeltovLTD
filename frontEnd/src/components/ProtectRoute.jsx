import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";

const ProtectedRoute = ({ children }) => {
  const { authToken, user, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>; // Replace with a spinner or loading indicator if desired
  }

  return authToken && user ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
