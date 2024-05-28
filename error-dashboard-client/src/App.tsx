import { Routes, Route } from "react-router-dom";
import Home from "pages/Home";
import Namespace from "pages/Namespaces";
import Navbar from "components/composite/Navbar/Navbar";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/namespace" element={<Namespace />} />
        {/* <Route path="/namespace/{id}" element={} /> */}
      </Routes>
    </>
  );
};

export default App;
