import { Routes, Route } from "react-router";

import "./app.scss";
import Nav from "./components/nav/Nav";
import Home from "./pages/Home";
import ItemPage from "./pages/ItemPage";
import CartPage from "./pages/CartPage";
import OrderPage from "./pages/OrderPage";
import FavoritePage from "./pages/FavoritePage";
import Footer from "./components/footer/Footer";

function App() {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/item" element={<ItemPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/order" element={<OrderPage />} />
        <Route path="/favorite" element={<FavoritePage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
