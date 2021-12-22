import { DecorationTitle } from "../reusable/DecorationTitle";
import { IconSelector } from "../reusable/IconSelector";

const OrderDetailOne = () => {
  return (
    <div className="order-list-box s-text">
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
      <div>______________</div>
      <div>2021/12/16</div>
      <div>訂單處理中</div>
      <div>
        <IconSelector name="order-detail-icon" />
      </div>
    </div>
  );
};

export default OrderDetailOne;
