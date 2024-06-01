import { type ReactNode } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import { selectIsAuthenticated } from "features/authSlice";

const ProtectedRoutes = ({ children }: { children: ReactNode }) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);

  return isAuthenticated ? <>{children}</> : <Navigate to="/" />;
};

export default ProtectedRoutes;
