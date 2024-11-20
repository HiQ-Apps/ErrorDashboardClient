import { useSelector } from "react-redux";

import { AdminSection } from "components/composite";
import { selectUserProfile } from "features/authSlice";

const AdminHome = () => {
  const userProfile = useSelector(selectUserProfile);

  return (
    <>
      {userProfile && (
        <h1>
          Hello {userProfile.role} {userProfile.firstName}. Welcome to the admin
          dashboard.
          <AdminSection />
        </h1>
      )}
    </>
  );
};

export default AdminHome;
