import { Route, Routes } from "react-router-dom";
import ProtectedRoutes from "shared/utils/ProtectedRoutes";

import ErrorDetail from "pages/Error/ErrorDetail";

const ErrorRoutes = () => {
  return (
    <ProtectedRoutes>
      <Routes>
        <Route path="/error/:id" element={<ErrorDetail />} />
      </Routes>
    </ProtectedRoutes>
  );
};

export default ErrorRoutes;
