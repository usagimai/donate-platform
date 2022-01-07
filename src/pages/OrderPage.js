import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";

import { TitleButton } from "../components/reusable/ButtonCollection";
import OrderDetailOne from "../components/order/OrderDetailOne";
import EmptyMessage from "../components/reusable/EmptyMessage";
import { Recommend } from "../components/reusable/Recommend";
import { History } from "../components/reusable/History";
import { app, db } from "../firebase-config";

const OrderPage = () => {
  const [orders, setOrders] = useState([]);

  useEffect(async () => {
    const dbRef = collection(db, "orders");
    const ordersData = await getDocs(dbRef);
    const ordersArr = ordersData.docs;
    setOrders(ordersArr);
  }, []);

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
            <Recommend />
          </div>
          <div>
            <History />
          </div>
        </>
      )}
    </div>
  );
};

export default OrderPage;
