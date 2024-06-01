import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "components/base/Sidebar/Sidebar";
import BaseButton from "components/base/Button/Button";

const NamespaceSidebar = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const navigateToConsole = () => {
    navigate(`/namespace/${id}/update`);
  };

  const navigateToMetrics = () => {
    navigate(`/namespace/${id}/metrics`);
  };

  const navigateToLogs = () => {
    navigate(`/namespace/${id}/logs`);
  };

  const links = [
    <BaseButton
      variant="navbutton"
      content={"Console"}
      onClick={navigateToConsole}
    />,
    <BaseButton
      variant="navbutton"
      content={"Metrics"}
      onClick={navigateToMetrics}
    />,
    <BaseButton
      variant="navbutton"
      content={"Logs"}
      onClick={navigateToLogs}
    />,
  ];

  return <Sidebar isOpen={true} header="Error" links={links} />;
};

export default NamespaceSidebar;
