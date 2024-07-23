import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsDark } from "features/darkSlice";

// Components
import { Navbar, Footer } from "components/composite";
import { Toaster } from "components/ui/toaster";

// Routes
import NamespaceRoutes from "routes/NamespaceRoutes";
import BaseRoutes from "routes/BaseRoutes";
import ErrorRoutes from "routes/ErrorRoutes";
import UserRoutes from "routes/UserRoutes";

import useClearErrorOnNavigate from "hooks/useClearErrorOnNavigate";
import { ModalHandlerProvider } from "shared/context/modalHandlerContext";
import { TooltipProvider } from "components/ui/tooltip";

const App = () => {
  // For error boundary
  useClearErrorOnNavigate();

  const isDark = useSelector(selectIsDark);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  return (
    <div className="flex flex-col h-full justify-center items-center dark:bg-slate-800 font-sans">
      <Navbar />
      <ModalHandlerProvider>
        <TooltipProvider>
          <Routes>
            <Route path="/*" element={<BaseRoutes />} />
            <Route path="/namespace/*" element={<NamespaceRoutes />} />
            <Route path="/error/*" element={<ErrorRoutes />} />
            <Route path="/user/*" element={<UserRoutes />} />
          </Routes>
        </TooltipProvider>
      </ModalHandlerProvider>
      <Toaster />
      <Footer />
    </div>
  );
};

export default App;
