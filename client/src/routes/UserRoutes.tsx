import { Route } from "react-router-dom";
import ProtectedRoutes from "shared/utils/ProtectedRoutes";
import UserProfile from "pages/User/UserProfile";

const UserRoutes = () => {
  return (
    <ProtectedRoutes>
      <Route path="/user" element={<UserProfile />} />
    </ProtectedRoutes>
  );
};

export default UserRoutes;
