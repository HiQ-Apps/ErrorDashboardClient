import { Route, Routes } from "react-router-dom";
import ProtectedRoutes from "shared/utils/ProtectedRoutes";

import ErrorDetail from "pages/Error/ErrorDetail";

const ErrorRoutes = () => {
  return (
    <Routes>
      <Route
        path="/:id/console"
        element={
          <ProtectedRoutes>
            <ErrorDetail />
          </ProtectedRoutes>
        }
      />
    </Routes>
  );
};

export default ErrorRoutes;
