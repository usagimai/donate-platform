import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { useSelector, useDispatch } from "react-redux";

import { TitleButton } from "../components/reusable/ButtonCollection";
import ScrollTop from "../components/reusable/ScrollTop";
import OrderDetailOne from "../components/order/OrderDetailOne";
import EmptyMessage from "../components/reusable/EmptyMessage";
import { Carousel } from "../components/reusable/Carousel";
import { app, auth } from "../firebase-config";
import { loadOrders } from "../actions/ordersAction";

const OrderPage = ({ setLoginBoxOpen }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = auth.currentUser;
  const orders = useSelector((state) => state.orders.orders);
  const [orderDetailNo, setOrderDetailNo] = useState("");

  //驗證登入狀態，若未登入則轉導回首頁
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        navigate("/", { replace: true });
      }
    });
  }, []);

  //讀取訂單
  useEffect(() => {
    dispatch(loadOrders());
  }, [user]);

  useEffect(() => {
    if (orderDetailNo) {
      document.getElementById(`${orderDetailNo}`).scrollIntoView();
      setOrderDetailNo("");
    }
  }, [orderDetailNo]);

  //未登入狀態進入此頁面後，不顯示內容
  if (!user) return null;

  return (
    <div className="order-page">
      <div className="order-page-title">
        <TitleButton text="訂單" />
      </div>
      {orders.length > 0 && (
        <div className="order-list-container">
          {orders.map((doc) => (
            <OrderDetailOne
              orderNo={doc.id}
              date={doc.data().date}
              delivery={doc.data().status}
              key={doc.id}
              items={doc.data().item}
              deliveryName={doc.data().deliveryName}
              deliveryTel={doc.data().deliveryTel}
              deliveryAdd={doc.data().deliveryAdd}
              deliveryRemark={doc.data().deliveryRemark}
              setOrderDetailNo={setOrderDetailNo}
            />
          ))}
        </div>
      )}

      {orders.length === 0 && (
        <>
          <div>
            <EmptyMessage message="查無訂單" />
          </div>
          <div>
            <Carousel
              setLoginBoxOpen={setLoginBoxOpen}
              text="推薦商品"
              array="recommend"
            />
          </div>
          <div>
            <Carousel
              setLoginBoxOpen={setLoginBoxOpen}
              text="最近瀏覽"
              array="history"
            />
          </div>
        </>
      )}
      <ScrollTop />
    </div>
  );
};

export default OrderPage;
