import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { Light, Dark, AppIcon } from "assets/index";
import { selectIsAuthenticated, clearAuth } from "features/authSlice";
import {
  openModal,
  closeModal,
  selectModalType,
  selectIsOpen,
} from "features/modalSlice";
import { selectIsDark, toggleDark } from "features/darkSlice";
import { Modal, BaseButton } from "components/base";
import LoginForm from "forms/LoginForm";
import RegistrationForm from "forms/RegistrationForm";
import { useToast } from "components/ui/use-toast";
import EmailForm from "forms/EmailForm";

const Navbar = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const isDarkMode = useSelector(selectIsDark);
  const isOpen = useSelector(selectIsOpen);
  const modalType = useSelector(selectModalType);
  const [menuOpen, setMenuOpen] = useState(false);
  const [forgotPasswordFormTrigger, setForgotPasswordFormTrigger] =
    useState(false);

  const handleRegisterOpenModalClick = () => {
    dispatch(
      openModal({
        modalType: "registration",
      })
    );
  };

  const handleLoginOpenModalClick = () => {
    dispatch(
      openModal({
        modalType: "login",
      })
    );
  };

  const handleCloseModalClick = () => {
    dispatch(closeModal());
  };

  const handleHomeClick = () => {
    navigate("/");
  };

  const handleNamespaceClick = () => {
    navigate("/namespace/console");
  };

  const handleDarkModeClick = () => {
    dispatch(toggleDark());
  };

  const handleLogoutClick = () => {
    dispatch(clearAuth());
    toast({
      title: "Logged out successfully",
    });
  };

  const handleDocumentationClick = () => {
    navigate("/documentation/installation");
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const toggleForgetPasswordForm = () => {
    setForgotPasswordFormTrigger(!forgotPasswordFormTrigger);
  };

  return (
    <div className="z-50 bg-slate-50 w-full sticky top-0 flex flex-row justify-between items-center dark:bg-slate-700">
      <div className="relative min-w-32">
        <img
          className="cursor-pointer"
          onClick={handleHomeClick}
          src={AppIcon}
          alt="App Icon"
          width="100px"
          height="100px"
        />
        <span className="absolute right-1.5 bottom-3 text-sm text-default">
          BETA
        </span>
      </div>

      <div className="md:hidden flex items-center">
        <button
          onClick={toggleMenu}
          className="text-2xl text-gray-800 dark:text-white p-8"
        >
          {menuOpen ? "" : "☰"}
        </button>
      </div>

      <div className="md:flex flex-row mx-2 hidden">
        <BaseButton
          content="Home"
          onClick={handleHomeClick}
          variant="navbutton"
        />
        <BaseButton
          content="Docs"
          onClick={handleDocumentationClick}
          variant="navbutton"
        />
        {isAuthenticated ? (
          <>
            <BaseButton
              content="Logout"
              onClick={handleLogoutClick}
              variant="navbutton"
            />
            <BaseButton
              content="Namespace"
              onClick={handleNamespaceClick}
              variant="navbutton"
            />
          </>
        ) : (
          <>
            <BaseButton
              content="Login"
              onClick={handleLoginOpenModalClick}
              variant="navbutton"
              overrideStyles={isAuthenticated ? "hidden" : "mx-1"}
            />
            <BaseButton
              content="Register"
              onClick={handleRegisterOpenModalClick}
              variant="navbutton"
              overrideStyles={isAuthenticated ? "hidden" : "mx-1"}
            />
          </>
        )}

        <BaseButton
          image={isDarkMode ? Dark : Light}
          onClick={handleDarkModeClick}
          variant="navbutton"
          overrideStyles="p-2"
        />
      </div>

      {menuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 backdrop-blur-sm"
          onClick={closeMenu}
        />
      )}

      <div
        className={`fixed top-0 left-0 h-1/2 w-full bg-white dark:bg-slate-700 p-4 shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${
          menuOpen ? "translate-y-0" : "-translate-y-full"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col justify-center h-full space-y-5">
          <BaseButton
            content="Home"
            onClick={() => {
              handleHomeClick();
              closeMenu();
            }}
            variant="navbutton"
          />
          <BaseButton
            content="Docs"
            onClick={() => {
              handleDocumentationClick();
              closeMenu();
            }}
            variant="navbutton"
          />
          {isAuthenticated ? (
            <>
              <BaseButton
                content="Logout"
                onClick={() => {
                  handleLogoutClick();
                  closeMenu();
                }}
                variant="navbutton"
              />
              <BaseButton
                content="Namespace"
                onClick={() => {
                  handleNamespaceClick();
                  closeMenu();
                }}
                variant="navbutton"
              />
            </>
          ) : (
            <>
              <BaseButton
                content="Login"
                onClick={() => {
                  handleLoginOpenModalClick();
                  closeMenu();
                }}
                variant="navbutton"
              />
              <BaseButton
                content="Register"
                onClick={() => {
                  handleRegisterOpenModalClick();
                  closeMenu();
                }}
                variant="navbutton"
              />
            </>
          )}
          <BaseButton
            image={isDarkMode ? Dark : Light}
            onClick={() => {
              handleDarkModeClick();
            }}
            variant="navbutton"
            overrideStyles="p-2"
          />
        </div>
      </div>

      <Modal
        header={forgotPasswordFormTrigger ? "Forgot Password" : "Login"}
        content={
          <div className="flex flex-col space-y-2">
            {forgotPasswordFormTrigger ? (
              <>
                <EmailForm onClose={handleCloseModalClick} />
                <div
                  className="hover:underline-default hover:text-default hover:underline cursor-pointer"
                  onClick={toggleForgetPasswordForm}
                >
                  Back to Login
                </div>
              </>
            ) : (
              <>
                <LoginForm onClose={handleCloseModalClick} />
                <div
                  className="hover:underline-default hover:text-default hover:underline cursor-pointer"
                  onClick={toggleForgetPasswordForm}
                >
                  Forgot Password?
                </div>
              </>
            )}
          </div>
        }
        open={isOpen && modalType === "login"}
        onClose={handleCloseModalClick}
        showConfirmButtons={false}
      />
      <Modal
        header="Register"
        content={<RegistrationForm onClose={handleCloseModalClick} />}
        open={isOpen && modalType === "registration"}
        onClose={handleCloseModalClick}
        showConfirmButtons={false}
      />
    </div>
  );
};

export default Navbar;
