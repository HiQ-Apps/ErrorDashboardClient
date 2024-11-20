import { type ReactNode } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import { selectUserProfile } from "features/authSlice";

const AdminProtectedRoutes = ({ children }: { children: ReactNode }) => {
  const userProfile = useSelector(selectUserProfile);

  return userProfile?.role === "admin" ? (
    <>{children}</>
  ) : (
    <Navigate to="/" replace />
  );
};

export default AdminProtectedRoutes;
