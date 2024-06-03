import { Route, Routes } from "react-router-dom";
import Home from "pages/Base/Home";
import Documentation from "pages/Base/Documentation";
import About from "pages/Base/About";

const BaseRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/documentation" element={<Documentation />} />
      <Route path="/about" element={<About />} />
    </Routes>
  );
};

export default BaseRoutes;
