import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(localStorage.getItem("authToken"));
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    const validateToken = async (token) => {
      try {
        // Replace this with your API call to validate the token
        const response = await fetch("/auth/get-current-user", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          if (data.isValid) {
            setAuthToken(token);
          } else {
            logout(); // Invalidate the session if the token is not valid
          }
        } else {
          logout(); // Invalidate the session if the API request fails
        }
      } catch (error) {
        console.error("Token validation failed", error);
        logout(); // Invalidate the session if an error occurs
      } finally {
        setIsLoading(false); // Stop loading state
      }
    };

    if (token) {
      validateToken(token);
    } else {
      setIsLoading(false); // Stop loading state if no token is found
    }
  }, []);

  const login = (token) => {
    localStorage.setItem("authToken", token);
    setAuthToken(token);
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    setAuthToken(null);
  };

  return (
    <AuthContext.Provider value={{ authToken, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
