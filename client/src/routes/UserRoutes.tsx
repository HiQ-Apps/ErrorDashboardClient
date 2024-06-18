import { Route, Routes } from "react-router-dom";
import ProtectedRoutes from "shared/utils/ProtectedRoutes";
import UserProfile from "pages/User/UserProfile";

const UserRoutes = () => {
  return (
    <Routes>
      <Route
        path=":id/profile"
        element={
          <ProtectedRoutes>
            <UserProfile />
          </ProtectedRoutes>
        }
      />
    </Routes>
  );
};

export default UserRoutes;
