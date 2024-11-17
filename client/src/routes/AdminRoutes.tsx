import { Route, Routes } from "react-router-dom";
import AdminHome from "pages/Admin/AdminHome";
import AdminProtectedRoutes from "shared/utils/AdminProtectedRoutes";
import ProtectedRoutes from "shared/utils/ProtectedRoutes";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route
        path="/console"
        element={
          <ProtectedRoutes>
            <AdminProtectedRoutes>
              <AdminHome />
            </AdminProtectedRoutes>
          </ProtectedRoutes>
        }
      />
    </Routes>
  );
};

export default AdminRoutes;
