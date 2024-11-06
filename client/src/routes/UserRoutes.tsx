import { Route, Routes } from "react-router-dom";
import ProtectedRoutes from "shared/utils/ProtectedRoutes";
import UserProfile from "pages/User/UserProfile";
import VerifyUser from "pages/Base/VerifyUser";

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
      <Route path=":id/verify" element={<VerifyUser />} />
    </Routes>
  );
};

export default UserRoutes;
