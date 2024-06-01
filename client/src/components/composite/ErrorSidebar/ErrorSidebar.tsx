import Sidebar from "components/base/Sidebar/Sidebar";
import { Link } from "react-router-dom";

const ErrorSidebar = () => {
  const links = [
    <Link to="/tbd" className="text-sm text-gray-700 hover:text-gray-900">
      Errors
    </Link>,
  ];

  return <Sidebar isOpen={true} header="Error" links={links} />;
};

export default ErrorSidebar;
