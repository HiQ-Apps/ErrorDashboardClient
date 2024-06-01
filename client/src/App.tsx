import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setDarkMode, selectIsDark } from "features/darkSlice";

// Base components
import Navbar from "components/composite/Navbar/Navbar";
import Footer from "components/base/Footer/Footer";

// Routes
import NamespaceRoutes from "./routes/NamespaceRoutes";
import BaseRoutes from "./routes/BaseRoutes";
import ErrorRoutes from "./routes/ErrorRoutes";

const App = () => {
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
        <BaseRoutes />
        <NamespaceRoutes />
        <ErrorRoutes />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
