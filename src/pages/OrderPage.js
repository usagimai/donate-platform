import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { TitleButton } from "../components/reusable/ButtonCollection";
import OrderDetailOne from "../components/order/OrderDetailOne";
import EmptyMessage from "../components/reusable/EmptyMessage";
import { Recommend } from "../components/reusable/Recommend";
import { History } from "../components/reusable/History";
import { loadOrders } from "../actions/ordersAction";

const OrderPage = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders.orders);

  useEffect(() => {
    dispatch(loadOrders());
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
