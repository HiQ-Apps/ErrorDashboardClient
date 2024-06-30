import { Route, Routes } from "react-router-dom";
import Home from "pages/Base/Home";
import Documentation from "pages/Base/Documentation";
import About from "pages/Base/About";
import TermsOfServices from "pages/Base/TermsOfServices";
import Releases from "pages/Base/Releases";

const BaseRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/documentation" element={<Documentation />} />
      <Route path="/about" element={<About />} />
      <Route path="/termsofservice" element={<TermsOfServices />} />
      <Route path="/releases" element={<Releases />} />
    </Routes>
  );
};

export default BaseRoutes;
