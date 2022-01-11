import { useState } from "react";

import { DecorationTitle } from "../reusable/DecorationTitle";
import { IconSelector } from "../reusable/IconSelector";
import OrderDetailOpen from "./OrderDetailOpen";

const OrderDetailOne = ({
  orderNo,
  date,
  delivery,
  items,
  deliveryName,
  deliveryTel,
  deliveryAdd,
  deliveryRemark,
  setOrderDetailNo,
}) => {
  const [detailOpen, setDetailOpen] = useState(false);

  const handleDetailOpen = () => {
    setDetailOpen(true);
    document.body.style.overflow = "hidden";
    setOrderDetailNo(orderNo);
  };

  return (
    <>
      {detailOpen && (
        <OrderDetailOpen
          orderNo={orderNo}
          date={date}
          delivery={delivery}
          items={items}
          deliveryName={deliveryName}
          deliveryTel={deliveryTel}
          deliveryAdd={deliveryAdd}
          deliveryRemark={deliveryRemark}
          setDetailOpen={setDetailOpen}
        />
      )}

      <div className="order-list-box s-text" id={orderNo}>
        <div>
          <DecorationTitle title="訂單編號" fontSize="s-text" />
        </div>
        <div>
          <DecorationTitle title="日期" fontSize="s-text" />
        </div>
        <div>
          <DecorationTitle title="配送狀況" fontSize="s-text" />
        </div>
        <div>
          <DecorationTitle title="訂單詳情" fontSize="s-text" />
        </div>
        <div>{orderNo}</div>
        <div>{date}</div>
        <div>{delivery}</div>
        <div className="pointer" onClick={handleDetailOpen}>
          <IconSelector name="order-detail-icon" />
        </div>
      </div>
    </>
  );
};

export default OrderDetailOne;
