import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";

export const Logout = () => {
  const { LogoutUser } = useAuth();
  const navigate = useNavigate(); // useNavigate hook for programmatic navigation

  useEffect(() => {
    LogoutUser(); // Log out the user
    navigate("/login"); // Redirect to login page
  }, [LogoutUser, navigate]); // Include `navigate` in dependency array

  return null; // No UI needed, as we're navigating immediately
};
