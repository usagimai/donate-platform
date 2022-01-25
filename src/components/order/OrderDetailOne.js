import { useState } from "react";

import { DecorationTitle } from "../reusable/DecorationTitle";
import { IconSelector } from "../reusable/IconSelector";
import OrderDetailOpen from "./OrderDetailOpen";
import useScrollBlock from "../../utils/useScrollBlock";

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
  const [blockScroll, allowScroll] = useScrollBlock();
  const [detailOpen, setDetailOpen] = useState(false);

  const handleDetailOpen = () => {
    setDetailOpen(true);
    blockScroll();
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
          allowScroll={allowScroll}
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
