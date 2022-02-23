import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Helmet } from "react-helmet";
import { onAuthStateChanged } from "firebase/auth";

//reusable components
import { TitleButton } from "../components/reusable/ButtonCollection";
import ScrollTop from "../components/reusable/ScrollTop";
import EmptyMessage from "../components/reusable/EmptyMessage";
import { Carousel } from "../components/reusable/Carousel";
//components
import OrderDetailOne from "../components/order/OrderDetailOne";
//others
import { loadOrders } from "../actions/ordersAction";
import { app, auth } from "../firebase-config";

const OrderPage = () => {
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

  //進入訂單詳情頁面後記錄該筆訂單號碼，回到訂單列表後，畫面從該筆訂單開始顯示
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
      <Helmet>
        <title>Machu Days商品捐贈平台 - 訂單</title>
      </Helmet>
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
            <Carousel text="推薦商品" array="recommend" />
          </div>
          <div>
            <Carousel text="最近瀏覽" array="history" />
          </div>
        </>
      )}
      <ScrollTop />
    </div>
  );
};

export default OrderPage;
