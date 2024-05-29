import { Routes, Route } from "react-router-dom";

import ProtectedRoutes from "shared/utils/ProtectedRoutes";
import Home from "pages/Home";
import Namespace from "pages/Namespaces";
import Navbar from "components/composite/Navbar/Navbar";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/namespace" 
          element={
            <ProtectedRoutes>
              <Namespace />
            </ProtectedRoutes>
          }
        />
        {/* <Route path="/namespace/{id}" element={} /> */}
      </Routes>
    </>
  );
};

export default App;
