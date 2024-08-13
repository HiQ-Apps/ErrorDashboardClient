import { Route, Routes } from "react-router-dom";
import Documentation from "pages/Documentation/DocumentationHome";

const DocumentationRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Documentation />} />
    </Routes>
  );
};

export default DocumentationRoutes;
