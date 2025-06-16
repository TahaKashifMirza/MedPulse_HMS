import { createContext, useContext, useState, useEffect } from "react";

// Create AuthContext
export const AuthContext = createContext();

// AuthProvider Component
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [admin, setAdmin] = useState(null);

  // Function to store admin token in localStorage
  const storeTokenInLS = (adminToken) => {
    localStorage.setItem("token", adminToken);
    setToken(adminToken);
  };

  // Check if the admin is logged in (token exists)
  let isLoggedIn = !!token;

  // Logout Admin function
  const LogoutAdmin = () => {
    setToken(""); // Clear the token from state
    localStorage.removeItem("token"); // Remove the token from localStorage
    setAdmin(null); // Clear the admin data from state
  };

  // Admin login function
  const adminLogin = async (email, password) => {
    try {
      const response = await fetch("http://localhost:5001/api/admins/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        const adminToken = data.token; // Assuming the response contains the token
        storeTokenInLS(adminToken); // Store the token in localStorage
        setAdmin(data.adminData); // Optionally, set the logged-in admin user data
      } else {
        console.error("Invalid admin login credentials.");
      }
    } catch (error) {
      console.error("Error during admin login", error);
    }
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, storeTokenInLS, LogoutAdmin, admin, adminLogin }}>
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
