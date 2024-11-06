import { Route, Routes } from "react-router-dom";
import Home from "pages/Base/Home";
import About from "pages/Base/About";
import TermsOfServices from "pages/Base/TermsOfServices";
import Releases from "pages/Base/Releases";
import ResetPassword from "pages/Base/ResetPassword";

const BaseRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/termsofservice" element={<TermsOfServices />} />
      <Route path="/releases" element={<Releases />} />
      <Route path="/forget-password/:id" element={<ResetPassword />} />
    </Routes>
  );
};

export default BaseRoutes;
