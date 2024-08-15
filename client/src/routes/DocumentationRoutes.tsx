import { Route, Routes } from "react-router-dom";
import Documentation from "pages/Documentation/InstallationDocumentation";

const DocumentationRoutes = () => {
  return (
    <Routes>
      <Route path="/installation" element={<Documentation />} />
      {/* <Route
        path="/getting-started"
        element={<GettingStartedDocumentation />}
      /> */}
    </Routes>
  );
};

export default DocumentationRoutes;
