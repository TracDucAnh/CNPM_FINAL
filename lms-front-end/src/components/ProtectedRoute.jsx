// src/components/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, role }) {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");

  // Chưa đăng nhập
  if (!token) {
    return <Navigate to="/login-lms" replace />;
  }

  // Có yêu cầu role nhưng không khớp
  if (role && userRole !== role) {
    return <Navigate to="/" replace />;
  }

  return children;
}
