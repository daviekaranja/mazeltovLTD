import React, { createContext, useState, useEffect, useContext } from "react";
import axiosClient from "../api/axiosClient";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authToken, setAuthToken] = useState(
    localStorage.getItem("authToken") || null
  );

  useEffect(() => {
    const fetchUser = async () => {
      if (authToken) {
        try {
          const response = await axiosClient.get("/auth/get-current-user", {
            headers: { Authorization: `Bearer ${authToken}` },
          });
          setUser(response.data);
        } catch (error) {
          console.error("Failed to fetch user:", error);
          setUser(null);
        }
      } else {
        setUser(null);
      }
    };

    fetchUser();
  }, [authToken]); // Fetch user data whenever authToken changes

  const login = (token) => {
    localStorage.setItem("authToken", token);
    setAuthToken(token);
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    setAuthToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
