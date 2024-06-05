import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setDarkMode, selectIsDark } from "features/darkSlice";

// Components
import Navbar from "components/base/Navbar/Navbar";
import Footer from "components/base/Footer/Footer";
import { Toaster } from "components/ui/toaster";

// Routes
import NamespaceRoutes from "routes/NamespaceRoutes";
import BaseRoutes from "routes/BaseRoutes";
import ErrorRoutes from "routes/ErrorRoutes";
import UserRoutes from "routes/UserRoutes";
import useClearErrorOnNavigate from "hooks/useClearErrorOnNavigate";

const App = () => {
  useClearErrorOnNavigate();
  const dispatch = useDispatch();
  const isDark = useSelector(selectIsDark);

  useEffect(() => {
    const savedIsDark = JSON.parse(localStorage.getItem("isDark") || "false");
    dispatch(setDarkMode(savedIsDark));
  }, [dispatch]);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  return (
    <div className="flex flex-col justify-center items-center dark:bg-slate-800 font-sans">
      <Navbar />
      <Routes>
        <Route path="/*" element={<BaseRoutes />} />
        <Route path="/namespace/*" element={<NamespaceRoutes />} />
        <Route path="/error/*" element={<ErrorRoutes />} />
        <Route path="/user/*" element={<UserRoutes />} />
      </Routes>
      <Toaster />
      <Footer />
    </div>
  );
};

export default App;
