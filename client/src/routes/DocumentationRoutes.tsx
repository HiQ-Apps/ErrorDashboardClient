import { Route, Routes } from "react-router-dom";
import InstallationDocumentation from "pages/Documentation/InstallationDocumentation";
import GettingStartedDocumentation from "pages/Documentation/GettingStartedDocumentation";

const DocumentationRoutes = () => {
  return (
    <Routes>
      <Route path="/installation" element={<InstallationDocumentation />} />
      <Route
        path="/getting-started"
        element={<GettingStartedDocumentation />}
      />
    </Routes>
  );
};

export default DocumentationRoutes;
