import { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
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
import { loadOrders } from "./actions/ordersAction";

function App() {
  const [user, setUser] = useState("");
  const [loginBoxOpen, setLoginBoxOpen] = useState(false);
  const [cartLoading, setCartLoading] = useState(true);
  const [itemMenuClicked, setItemMenuClicked] = useState(false);
  const [navLogoClicked, setNavLogoClicked] = useState(false);
  const [cartItemChange, setCartItemChange] = useState(false);

  const dispatch = useDispatch();
  const { pathname } = useLocation();

  //使用Firebase的功能監聽使用者是否登入(若為登入，會從Firebase接收到該使用者的資訊，包含email、UID等)
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, []);

  //讀取所有商品 & 購物車內商品
  useEffect(() => {
    dispatch(loadItems());
  }, []);

  //讀取購物車商品 ////待確認setCartLoading(false);是否還需要
  //由於進到CartPage時該頁的useEffect會比App的useEffect先執行，為了確保執行順序，設定CartPage的useEffect等這邊的cartLoading變動時再執行
  // useEffect(() => {
  //   setCartItems(JSON.parse(localStorage.getItem("machudaysCart")));
  //   setCartLoading(false);
  // }, []);

  //讀取訂單資料
  useEffect(() => {
    if (user) {
      dispatch(loadOrders());
    }
  }, [user]);

  //點選Nav的Logo，Home從頂端顯示；點選Nav的商品，Home從指定位置顯示
  useEffect(() => {
    if (pathname === "/") {
      document.getElementById("main").scrollIntoView();
      setItemMenuClicked(false);
    }
  }, [itemMenuClicked]);

  useEffect(() => {
    window.scroll({
      top: 0,
      left: 0,
    });
    setNavLogoClicked(false);
  }, [navLogoClicked]);

  //重新整理後，頁面從最頂端顯示
  const [isReload, setIsReload] = useState(false);

  useEffect(() => {
    const scrollTop = () => {
      setIsReload(true);

      window.scroll({
        top: 0,
        left: 0,
      });
    };

    window.addEventListener("beforeunload", scrollTop, { passive: true });
  }, []);

  if (isReload) return null;

  return (
    <>
      <Nav
        loginBoxOpen={loginBoxOpen}
        setLoginBoxOpen={setLoginBoxOpen}
        setItemMenuClicked={setItemMenuClicked}
        setNavLogoClicked={setNavLogoClicked}
        cartItemChange={cartItemChange}
        setCartItemChange={setCartItemChange}
      />
      <Routes>
        <Route path="/" element={<Home setLoginBoxOpen={setLoginBoxOpen} />} />
        <Route
          path="/:category"
          element={<Home setLoginBoxOpen={setLoginBoxOpen} />}
        />
        <Route
          path="/search/:text"
          element={<Home setLoginBoxOpen={setLoginBoxOpen} />}
        />
        <Route
          path="/items/:id"
          element={
            <ItemPage
              setLoginBoxOpen={setLoginBoxOpen}
              setCartItemChange={setCartItemChange}
            />
          }
        />
        <Route
          path="/cart"
          element={
            <CartPage
              cartLoading={cartLoading}
              setLoginBoxOpen={setLoginBoxOpen}
              cartItemChange={cartItemChange}
              setCartItemChange={setCartItemChange}
            />
          }
        />
        <Route
          path="/order"
          element={<OrderPage setLoginBoxOpen={setLoginBoxOpen} />}
        />
        <Route
          path="/favorite"
          element={<FavoritePage setLoginBoxOpen={setLoginBoxOpen} />}
        />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
