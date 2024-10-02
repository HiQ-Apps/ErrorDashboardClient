import { Route, Routes } from "react-router-dom";
import ProtectedRoutes from "shared/utils/ProtectedRoutes";
import Namespaces from "pages/Namespace/Namespaces";
import NamespaceDetail from "pages/Namespace/NamespaceDetail";
import NamespaceLogs from "pages/Namespace/NamespaceLogs";
import NamespaceMetrics from "pages/Namespace/NamespaceMetrics";
import NamespaceSettings from "pages/Namespace/NamespaceSettings";
import NamespaceAlerts from "pages/Namespace/NamespaceAlerts";

const NamespaceRoutes = () => {
  return (
    <Routes>
      <Route
        path="/console"
        element={
          <ProtectedRoutes>
            <Namespaces />
          </ProtectedRoutes>
        }
      />
      <Route
        path="/:id"
        element={
          <ProtectedRoutes>
            <NamespaceDetail />
          </ProtectedRoutes>
        }
      />
      <Route
        path="/:id/logs"
        element={
          <ProtectedRoutes>
            <NamespaceLogs />
          </ProtectedRoutes>
        }
      />
      <Route
        path="/:id/metrics"
        element={
          <ProtectedRoutes>
            <NamespaceMetrics />
          </ProtectedRoutes>
        }
      />
      <Route
        path="/:id/settings"
        element={
          <ProtectedRoutes>
            <NamespaceSettings />
          </ProtectedRoutes>
        }
      />
      <Route
        path="/:id/alerts"
        element={
          <ProtectedRoutes>
            <NamespaceAlerts />
          </ProtectedRoutes>
        }
      />
    </Routes>
  );
};

export default NamespaceRoutes;
