import { useEffect, useState } from "react";
import { collection, getDocs, query, where, orderBy } from "firebase/firestore";
// import { onAuthStateChanged } from "firebase/auth";

import { TitleButton } from "../components/reusable/ButtonCollection";
import ScrollTop from "../components/reusable/ScrollTop";
import OrderDetailOne from "../components/order/OrderDetailOne";
import EmptyMessage from "../components/reusable/EmptyMessage";
import { Carousel } from "../components/reusable/Carousel";
import { app, db, auth } from "../firebase-config";

const OrderPage = ({ user, setLoginBoxOpen }) => {
  // const [user, setUser] = useState("");
  const [orders, setOrders] = useState([]);
  const [orderDetailNo, setOrderDetailNo] = useState("");

  //由於where會有錯誤，暫comment掉，等有不同帳號訂單時確認是否有問題
  // useEffect(() => {
  //   onAuthStateChanged(auth, (currentUser) => {
  //     setUser(currentUser);
  //   });
  // }, []);

  useEffect(async () => {
    const dbRef = collection(db, "orders");
    const orderQuery = query(
      dbRef,
      // where("email", "==", user.email),
      orderBy("docID", "desc")
    );
    const orderData = await getDocs(orderQuery);
    const ordersArr = orderData.docs;
    setOrders(ordersArr);
  }, []);

  useEffect(() => {
    if (orderDetailNo) {
      document.getElementById(`${orderDetailNo}`).scrollIntoView();
      setOrderDetailNo("");
    }
  }, [orderDetailNo]);

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
              user={user}
              setLoginBoxOpen={setLoginBoxOpen}
              text="推薦商品"
              array="recommend"
            />
          </div>
          <div>
            <Carousel
              user={user}
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
