import { Route, Routes } from "react-router-dom";
import ProtectedRoutes from "shared/utils/ProtectedRoutes";
import Namespaces from "pages/Namespace/Namespaces";
import NamespaceDetail from "pages/Namespace/NamespaceDetail";
import NamespaceLogs from "pages/Namespace/NamespaceLogs";
import NamespaceMetrics from "pages/Namespace/NamespaceMetrics";
import NamespaceConsole from "pages/Namespace/NamespaceConsole";

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
    </Routes>
  );
};

export default NamespaceRoutes;
