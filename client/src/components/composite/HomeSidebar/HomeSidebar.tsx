import { useSelector } from "react-redux";
import { selectIsAuthenticated, selectUser } from "features/authSlice";
import Sidebar from "components/base/Sidebar/Sidebar";

const HomeSidebar = () => {
  return <Sidebar isOpen={true} currentPage="Home" links={[]} />;
};

export default HomeSidebar;
