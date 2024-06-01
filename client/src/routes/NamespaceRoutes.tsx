import { Route, Routes } from "react-router-dom";
import ProtectedRoutes from "shared/utils/ProtectedRoutes";
import Namespace from "pages/Namespace/Namespaces";
import NamespaceDetail from "pages/Namespace/NamespaceDetail";
import NamespaceLogs from "pages/Namespace/NamespaceLogs";
import NamespaceMetrics from "pages/Namespace/NamespaceMetrics";
import NamespaceConsole from "pages/Namespace/NamespaceConsole";

const NamespaceRoutes = () => {
  return (
    <ProtectedRoutes>
      <Routes>
        <Route path="/namespace" element={<Namespace />} />
        <Route path="/namespace/:id" element={<NamespaceDetail />} />
        <Route path="/namespace/:id/logs" element={<NamespaceLogs />} />
        <Route path="/namespace/:id/metrics" element={<NamespaceMetrics />} />
        <Route path="/namespace/:id/console" element={<NamespaceConsole />} />
      </Routes>
    </ProtectedRoutes>
  );
};

export default NamespaceRoutes;
