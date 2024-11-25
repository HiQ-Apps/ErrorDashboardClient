import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsDark } from "features/darkSlice";

// Components
import { Navbar, Footer } from "components/composite";
import { Toaster } from "components/ui/toaster";

// Routes
import AdminRoutes from "src/routes/AdminRoutes";
import NamespaceRoutes from "src/routes/NamespaceRoutes";
import BaseRoutes from "src/routes/BaseRoutes";
import ErrorRoutes from "src/routes/ErrorRoutes";
import UserRoutes from "src/routes/UserRoutes";
import DocumentationRoutes from "src/routes/DocumentationRoutes";

import useClearErrorOnNavigate from "hooks/useClearErrorOnNavigate";
import { ModalHandlerProvider } from "shared/context/modalHandlerContext";
import { TooltipProvider } from "components/ui/tooltip";
import { usePageDimensions } from "hooks/usePageDimensions";
import Banner from "components/base/Banner/Banner";

const App = () => {
  // For error boundary
  useClearErrorOnNavigate();
  const { width, height } = usePageDimensions();

  const isDark = useSelector(selectIsDark);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  return (
    <div className="flex flex-col h-full justify-center items-center dark:bg-slate-800">
      <TooltipProvider>
        <ModalHandlerProvider>
          <Navbar />
          {width <= 700 && height <= 900 && (
            <Banner text="This site has been optimized for desktop view. Please use this app on one for the best experience." />
          )}
          <Routes>
            <Route path="/*" element={<BaseRoutes />} />
            <Route path="/admin/*" element={<AdminRoutes />} />
            <Route path="/namespace/*" element={<NamespaceRoutes />} />
            <Route path="/error/*" element={<ErrorRoutes />} />
            <Route path="/user/*" element={<UserRoutes />} />
            <Route path="/documentation/*" element={<DocumentationRoutes />} />
          </Routes>
        </ModalHandlerProvider>
        <Toaster />
        <Footer />
      </TooltipProvider>
    </div>
  );
};

export default App;
