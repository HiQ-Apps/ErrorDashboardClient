import Sidebar from "components/base/Sidebar/Sidebar";
import { useNavigate } from "react-router-dom";
import BaseButton from "components/base/Button/Button";

const NamespaceSidebar = () => {
  const navigate = useNavigate();

  const navigateToUpdate = () => {
    navigate("/namespace/update");
  };

  const navigateToMetrics = () => {
    navigate("/namespace/metrics");
  };

  const links = [
    <BaseButton
      variant="navbutton"
      content={"Update"}
      onClick={navigateToUpdate}
    />,
    <BaseButton
      variant="navbutton"
      content={"Metrics"}
      onClick={navigateToMetrics}
    />,
  ];

  return <Sidebar isOpen={true} currentPage="Error" links={links} />;
};

export default NamespaceSidebar;
