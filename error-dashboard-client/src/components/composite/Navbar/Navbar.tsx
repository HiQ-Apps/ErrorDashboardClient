import { useState } from "react";
import AppIcon from "assets/AppIcon.svg";
import { FaHome } from "react-icons/fa";
import BaseButton from "components/base/Button/Button";
import { useNavigate } from "react-router-dom";
import AuthModal from "components/composite/AuthModal/AuthModal";
import LoginForm from "forms/LoginForm";
import RegistrationForm from "forms/RegistrationForm";

const Navbar = () => {
  const navigate = useNavigate();
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  const handleLoginClick = () => {
    setIsLoginOpen(true);
  };

  const handleRegistrationClick = () => {
    setIsRegisterOpen(true);
  };

  const handleHomeClick = () => {
    navigate("/");
  };

  const handleNamespaceClick = () => {
    navigate("/namespace")
  };

  const handleLogoutClick = () => {
    // Logout logic
  };

  return (
    <div className="w-full flex flex-row justify-between items-center bg-red-500">
      <img src={AppIcon} alt="App Icon" width="100px" height="100px" />
      <div className="flex flex-row mx-2">
        <BaseButton
          content={<FaHome size={24} />}
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
        <BaseButton
          content="Namespace"
          onClick={handleNamespaceClick}
          variant="outline"
          override_styles="mx-1"
        />
      </div>
      <AuthModal
        header="Login"
        content={<LoginForm />}
        isOpen={isLoginOpen}
        onOpenChange={setIsLoginOpen}
      />
      <AuthModal
        header="Register"
        content={<RegistrationForm />}
        isOpen={isRegisterOpen}
        onOpenChange={setIsRegisterOpen}
      />
    </div>
  );
};

export default Navbar;
