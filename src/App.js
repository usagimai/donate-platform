import { Routes, Route } from "react-router";

import "./app.scss";
import Nav from "./components/nav/Nav";
import Home from "./pages/Home";
import ItemPage from "./pages/ItemPage";
import Footer from "./components/footer/Footer";

function App() {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/item" element={<ItemPage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
