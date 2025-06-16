import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";

export const AdminPannelLogout = () => {
  const { LogoutAdmin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Logout admin and clear all auth state
    LogoutAdmin();

    // Navigate to the login page after logout
    navigate("/admin-login");
  }, [LogoutAdmin, navigate]);

  return null;
};
