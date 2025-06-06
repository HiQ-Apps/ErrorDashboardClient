import { Route, Routes } from "react-router-dom";
import Home from "pages/Base/Home";
import About from "pages/Base/About";
import TermsOfServices from "pages/Base/TermsOfServices";
import ResetPassword from "pages/Base/ResetPassword";
import PrivacyPolicy from "pages/Base/PrivacyPolicy";
import Changelog from "pages/Base/Changelog";

const BaseRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/terms-of-service" element={<TermsOfServices />} />
      <Route path="/changelog" element={<Changelog />} />
      <Route path="/forget-password/:id" element={<ResetPassword />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
    </Routes>
  );
};

export default BaseRoutes;
