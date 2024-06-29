import { Route, Routes } from "react-router-dom";
import Home from "pages/Base/Home";
import Documentation from "pages/Base/Documentation";
import About from "pages/Base/About";
import TermsOfServices from "pages/Base/TermsOfServices";

const BaseRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/documentation" element={<Documentation />} />
      <Route path="/about" element={<About />} />
      <Route path="/termsofservice" element={<TermsOfServices />} />
    </Routes>
  );
};

export default BaseRoutes;
