import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setDarkMode, selectIsDark } from "features/darkSlice";

import ProtectedRoutes from "shared/utils/ProtectedRoutes";
import Home from "pages/Home";
import Namespace from "pages/Namespaces";
import Navbar from "components/composite/Navbar/Navbar";
import Footer from "components/base/Footer/Footer";
import NamespaceDetail from "pages/NamespaceDetail";
import ErrorDetail from "pages/ErrorDetail";
import Documentation from "pages/Documentation";
import About from "pages/About";

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
        <Route path="/" element={<Home />} />
        <Route
          path="/namespace"
          element={
            <ProtectedRoutes>
              <Namespace />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/namespace/:id"
          element={
            <ProtectedRoutes>
              <NamespaceDetail />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/error/:id"
          element={
            <ProtectedRoutes>
              <ErrorDetail />
            </ProtectedRoutes>
          }
        />
        <Route path="/documentation" element={<Documentation />} />
        <Route path="/about" element={<About />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
