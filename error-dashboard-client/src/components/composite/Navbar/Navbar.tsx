import AppIcon from "assets/AppIcon.svg";
import { FaHome } from "react-icons/fa";
import BaseButton from "components/base/Button/Button";
import { useNavigate } from "react-router-dom";

const Navbar = () => {

  const navigate = useNavigate();

  const handleLoginClick = () => {
    // Login modal
  }

  const handleRegistrationClick = () => {
    // Registration modal
  }

  const handleHomeClick = () => {
      navigate("/");
    }

  const handleLogoutClick = () => {
    // Logout logic
  }
  return (
    <div className="w-full flex flex-row justify-between items-center bg-red-500">
        <img src={AppIcon} alt="App Icon" width="100px" height="100px"/>
        <div className="flex flex-row mx-2 ">
          <BaseButton
              content={<FaHome size={24}/>}
              onClick={handleHomeClick}
              variant="outline"
              override_styles="mx-1"
          />
          <BaseButton
              content="Login"
              onClick={handleLoginClick}
              variant="outline"
              override_styles="mx-1"
          />
           <BaseButton
              content="Register"
              onClick={handleRegistrationClick}
              variant="outline"
              override_styles="mx-1"
          />
           <BaseButton
              content="Logout"
              onClick={handleLogoutClick}
              variant="outline"
              override_styles="mx-1"
          />
        </div>
    </div>
  )
};

export default Navbar;
