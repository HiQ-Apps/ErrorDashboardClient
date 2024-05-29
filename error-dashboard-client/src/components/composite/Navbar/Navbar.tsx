import { useState } from "react";
import { FaHome } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { setIsAuthenticated, clearUser, clearToken, selectIsAuthenticated } from "features/authSlice";
import AppIcon from "assets/AppIcon.svg";
import Modal from "components/base/Modal/Modal";
import BaseButton from "components/base/Button/Button";
import LoginForm from "forms/LoginForm";
import RegistrationForm from "forms/RegistrationForm";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);

  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  const handleLoginClick = () => {
    setIsLoginOpen((prev) => !prev);
  };

  const handleRegistrationClick = () => {
    setIsRegisterOpen((prev) => !prev);
  };

  const handleHomeClick = () => {
    navigate("/");
  };

  const handleNamespaceClick = () => {
    navigate("/namespace")
  };

  const handleLogoutClick = () => {
    dispatch(setIsAuthenticated(false))
    dispatch(clearUser())
    dispatch(clearToken())
  };

  return (
    <div className="w-full flex flex-row justify-between items-center">
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
          override_styles={isAuthenticated ? "hidden" : "mx-1"}
        />
        <BaseButton
          content="Register"
          onClick={handleRegistrationClick}
          variant="outline"
          override_styles={isAuthenticated ? "hidden" : "mx-1"}
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
          variant={isAuthenticated ? "outline" : "ghost"}
          override_styles="mx-1"
        />
      </div>
        <Modal
          header="Login"
          content={<LoginForm onClose={handleLoginClick} />}
          open={isLoginOpen}
          onClose={() => setIsLoginOpen(false)}
        />
        <Modal
          header="Register"
          content={<RegistrationForm onClose={handleRegistrationClick} />}
          open={isRegisterOpen}
          onClose={() => setIsRegisterOpen(false)}
        />
    </div>
  );
};

export default Navbar;
