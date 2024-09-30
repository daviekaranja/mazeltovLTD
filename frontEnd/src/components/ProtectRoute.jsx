import React from "react";
import { useAuth } from "./AuthProvider";
import Login from "./Login";

const ProtectedRoute = ({ children }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return user ? children : <Login />;
};

export default ProtectedRoute;
