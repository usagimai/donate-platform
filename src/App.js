import { useState, useEffect, useRef } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";

import "./app.scss";
//reusable components
import NotFound from "./components/reusable/NotFound";
//components
import Nav from "./components/nav/Nav";
import Home from "./pages/Home";
import ItemPage from "./pages/ItemPage";
import CartPage from "./pages/CartPage";
import OrderPage from "./pages/OrderPage";
import FavoritePage from "./pages/FavoritePage";
import Footer from "./components/footer/Footer";
//others
import { loadItems } from "./actions/itemsAction";
import { loadOrders } from "./actions/ordersAction";
import { app, auth } from "./firebase-config";

function App() {
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const [user, setUser] = useState("");
  const [loginBoxOpen, setLoginBoxOpen] = useState(false);
  const [itemMenuClicked, setItemMenuClicked] = useState(false);
  const [navLogoClicked, setNavLogoClicked] = useState(false);
  const [cartItemChange, setCartItemChange] = useState(false);
  const [isReload, setIsReload] = useState(false);
  const [isDown, setIsDown] = useState(false);
  const prevScrollPos = useRef(0);

  console.log(window.innerWidth);

  //使用Firebase的功能監聽使用者是否登入(若為登入，會從Firebase接收到該使用者的資訊，包含email、UID等)
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, []);

  //讀取所有商品
  useEffect(() => {
    dispatch(loadItems());
  }, []);

  //讀取訂單資料
  useEffect(() => {
    if (user) {
      dispatch(loadOrders());
    }
  }, [user]);

  //點選Nav的Logo，Home從頂端顯示；點選Nav的商品，Home從指定位置顯示
  useEffect(() => {
    window.scroll({
      top: 0,
      left: 0,
    });
    setNavLogoClicked(false);
  }, [navLogoClicked]);

  useEffect(() => {
    if (pathname === "/") {
      document.getElementById("main").scrollIntoView();
      setItemMenuClicked(false);
    }
  }, [itemMenuClicked]);

  //頁面往下捲時隱藏Nav，頁面往上捲時出現Nav
  useEffect(() => {
    const handleScroll = () => {
      if (window.pageYOffset > prevScrollPos.current) {
        setIsDown(true);
      } else {
        setIsDown(false);
      }
      prevScrollPos.current = window.pageYOffset;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  //重新整理後，頁面從最頂端顯示
  //適用Safari & Firefox
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  //適用Chrome & Edge
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
        isDown={isDown}
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

        {/* <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/404" replace />} /> */}
      </Routes>
      <Footer />
    </>
  );
}

export default App;
