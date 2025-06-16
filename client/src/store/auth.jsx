// store/auth-user.jsx

import { createContext, useContext, useState, useEffect } from "react";

// Create AuthContext for the user
export const AuthContext = createContext();

// AuthProvider Component for the User
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("userToken"));
  const [user, setUser] = useState(null);

  // Function to store user token in localStorage
  const storeTokenInLS = (serverToken) => {
    localStorage.setItem("userToken", serverToken); // Store only the user token
    setToken(serverToken);
  };

  // Check if the user is logged in
  let isLoggedIn = !!token;

  // Logout User function
  const LogoutUser = () => {
    setToken(""); // Clear the token from state
    localStorage.removeItem("userToken"); // Remove the user token from localStorage
    setUser(null); // Clear the user data from state
  };

  // JWT AUTHENTICATION - to get the currently logged-in user data
  const userAuthentication = async () => {
    if (!token) return;

    try {
      const response = await fetch("http://localhost:5001/api/auth/user", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.userData); // Set user data after successful authentication
      }
    } catch (error) {
      console.error("Error fetching user data", error);
    }
  };

  // Run user authentication check when the token changes
  useEffect(() => {
    userAuthentication();
  }, [token]);

  return (
    <AuthContext.Provider value={{ isLoggedIn, storeTokenInLS, LogoutUser, user }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
