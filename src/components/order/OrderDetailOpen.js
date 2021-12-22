import { IconSelector } from "../reusable/IconSelector";
import { DecorationTitle } from "../reusable/DecorationTitle";
import { TitleButton, BrownButton } from "../reusable/ButtonCollection";
import Backdrop from "../reusable/Backdrop";
import OrderDetailOpenOne from "../order/OrderDetailOpenOne";

const OrderDetailOpen = () => {
  return (
    <Backdrop>
      <div className="white-container">
        <div className="close-bg">
          <IconSelector name="close" />
        </div>
        <div className="order-detail-content">
          <div className="order-detail-title">
            <TitleButton text="訂單詳情" />
          </div>
          <div className="order-three-info s-text">
            <div>訂單編號：________________</div>
            <div>日期：2021/12/16</div>
            <div>配送狀況：訂單處理中</div>
          </div>
          <div className="order-detail-list">
            <div>
              <DecorationTitle title="序號" fontSize="s-text" />
            </div>
            <div className="order-title-item">
              <DecorationTitle title="商品" fontSize="s-text" />
            </div>
            <div>
              <DecorationTitle title="尺寸" fontSize="s-text" />
            </div>
            <div>
              <DecorationTitle title="數量" fontSize="s-text" />
            </div>
          </div>
        </div>
        <OrderDetailOpenOne />
        <OrderDetailOpenOne />
        <OrderDetailOpenOne />
        <div className="order-delivery-info-container">
          <div>
            <TitleButton text="收件資訊" />
          </div>
          <div className="order-delivery-info s-text">
            <div className="center">收件人姓名</div>
            <div className="vertical-line"></div>
            <div>林*竹</div>
            <div className="center">聯絡電話</div>
            <div className="vertical-line"></div>
            <div>0932***264</div>
            <div className="center">收件地址</div>
            <div className="vertical-line"></div>
            <div>台北市內湖區康寧路三段**巷**弄**號*樓</div>
            <div className="center">備註</div>
            <div className="vertical-line"></div>
            <div></div>
          </div>
        </div>
        <div className="order-detail-close-buttom">
          <BrownButton text="關閉" />
        </div>
      </div>
    </Backdrop>
  );
};

export default OrderDetailOpen;
