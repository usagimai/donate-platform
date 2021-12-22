import { TitleButton } from "../components/reusable/ButtonCollection";
import OrderDetailOne from "../components/order/OrderDetailOne";
import OrderDetailOpen from "../components/order/OrderDetailOpen";
import EmptyMessage from "../components/reusable/EmptyMessage";
import { Recommend } from "../components/reusable/Recommend";
import { History } from "../components/reusable/History";

const OrderPage = () => {
  return (
    <>
      {/* <OrderDetailOpen /> */}
      <div className="order-page">
        <div className="order-page-title">
          <TitleButton text="訂單" />
        </div>
        {/* 有訂單顯示內容(開始) */}
        <div className="order-list-container">
          <OrderDetailOne />
          <OrderDetailOne />
        </div>
        {/* 有訂單顯示內容(結束) */}
        {/* 無訂單顯示內容(開始) */}
        {/* <div>
          <EmptyMessage message="查無訂單" />
        </div>
        <div>
          <Recommend />
        </div>
        <div>
          <History />
        </div> */}
        {/* 無訂單顯示內容(結束) */}
      </div>
    </>
  );
};

export default OrderPage;
