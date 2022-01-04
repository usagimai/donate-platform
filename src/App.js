import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";

import "./app.scss";
import Nav from "./components/nav/Nav";
import Home from "./pages/Home";
import ItemPage from "./pages/ItemPage";
import CartPage from "./pages/CartPage";
import OrderPage from "./pages/OrderPage";
import FavoritePage from "./pages/FavoritePage";
import Footer from "./components/footer/Footer";
import { app, auth } from "./firebase-config";
import { loadItems } from "./actions/itemsAction";

function App() {
  const [user, setUser] = useState("");
  const [loginBoxOpen, setLoginBoxOpen] = useState(false);
  const [cartItems, setCartItems] = useState({});

  const dispatch = useDispatch();

  //使用Firebase的功能監聽使用者是否登入(若為登入，會從Firebase接收到該使用者的資訊，包含email、UID等)
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, []);

  //讀取所有商品
  useEffect(() => {
    dispatch(loadItems());
  }, [dispatch]);

  //讀取購物車(local storage商品)
  // useEffect(() => {
  //   setCartItems(JSON.parse(localStorage.getItem("machudaysCart")));
  // }, []);

  return (
    <>
      <Nav
        user={user}
        loginBoxOpen={loginBoxOpen}
        setLoginBoxOpen={setLoginBoxOpen}
        cartItems={cartItems}
      />
      <Routes>
        <Route
          path="/"
          element={<Home user={user} setLoginBoxOpen={setLoginBoxOpen} />}
        />
        <Route
          path="/:category"
          element={<Home user={user} setLoginBoxOpen={setLoginBoxOpen} />}
        />
        <Route
          path="/search/:text"
          element={<Home user={user} setLoginBoxOpen={setLoginBoxOpen} />}
        />
        <Route
          path="/items/:id"
          element={
            <ItemPage
              user={user}
              setLoginBoxOpen={setLoginBoxOpen}
              cartItems={cartItems}
              setCartItems={setCartItems}
            />
          }
        />
        <Route
          path="/cart"
          element={
            <CartPage
              cartItems={cartItems}
              setCartItems={setCartItems}
              user={user}
            />
          }
        />
        <Route path="/order" element={<OrderPage />} />
        <Route path="/favorite" element={<FavoritePage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
