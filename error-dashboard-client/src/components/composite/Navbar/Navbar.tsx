import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Light, Dark, BlackHome, WhiteHome, AppIcon } from "assets/index";
import {
  setIsAuthenticated,
  clearUser,
  clearToken,
  selectIsAuthenticated,
} from "features/authSlice";
import { selectIsDark, setDarkMode } from "features/darkSlice";
import Modal from "components/base/Modal/Modal";
import BaseButton from "components/base/Button/Button";
import LoginForm from "forms/LoginForm";
import RegistrationForm from "forms/RegistrationForm";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const isDarkMode = useSelector(selectIsDark);

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
    navigate("/namespace");
  };

  const handleDarkModeClick = () => {
    dispatch(setDarkMode(!isDarkMode));
  };

  const handleLogoutClick = () => {
    dispatch(setIsAuthenticated(false));
    dispatch(clearUser());
    dispatch(clearToken());
  };

  return (
    <div className="bg-slate-50 w-full flex flex-row justify-between items-center dark:bg-slate-700">
      <img src={AppIcon} alt="App Icon" width="100px" height="100px" />
      <div className="flex flex-row mx-2">
        <BaseButton
          image={isDarkMode ? WhiteHome : BlackHome}
          onClick={handleHomeClick}
          variant="navbutton"
        />
        <BaseButton
          content="Login"
          onClick={handleLoginClick}
          variant="navbutton"
          override_styles={isAuthenticated ? "hidden" : "mx-1"}
        />
        <BaseButton
          content="Register"
          onClick={handleRegistrationClick}
          variant="navbutton"
          override_styles={isAuthenticated ? "hidden" : "mx-1"}
        />
        {isAuthenticated ? (
          <BaseButton
            content="Logout"
            onClick={handleLogoutClick}
            variant="navbutton"
          />
        ) : (
          <></>
        )}
        {isAuthenticated ? (
          <BaseButton
            content="Namespace"
            onClick={handleNamespaceClick}
            variant="navbutton"
          />
        ) : (
          <></>
        )}
        <BaseButton
          image={isDarkMode ? Dark : Light}
          onClick={handleDarkModeClick}
          variant="navbutton"
          override_styles="p-2"
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
