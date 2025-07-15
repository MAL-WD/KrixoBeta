import React from "react";
import { Navigate } from "react-router-dom";

const isAdminAuthenticated = () => {
  const authToken = localStorage.getItem("authToken");
  // Check if it's an admin token (you can customize this logic)
  // For now, we'll check if it's not a worker token
  return authToken && !authToken.startsWith('worker-');
};

const ProtectedRoute = ({ children }) => {
  if (!isAdminAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default ProtectedRoute; 