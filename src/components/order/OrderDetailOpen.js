import { Children } from "react";
import { useSelector } from "react-redux";

import { IconSelector } from "../reusable/IconSelector";
import { DecorationTitle } from "../reusable/DecorationTitle";
import { TitleButton, BrownButton } from "../reusable/ButtonCollection";
import Backdrop from "../reusable/Backdrop";
import ScrollTop from "../reusable/ScrollTop";
import OrderDetailOpenOne from "../order/OrderDetailOpenOne";

const OrderDetailOpen = ({
  orderNo,
  date,
  delivery,
  items,
  deliveryName,
  deliveryTel,
  deliveryAdd,
  deliveryRemark,
  setDetailOpen,
}) => {
  const all = useSelector((state) => state.items.all);

  const handleDetailClose = () => {
    setDetailOpen(false);
    document.body.style.overflow = "auto";
  };

  return (
    <div className="order-detail-container">
      <ScrollTop />
      <Backdrop>
        <div className="white-container">
          <div className="close-bg" onClick={handleDetailClose}>
            <IconSelector name="close" />
          </div>
          <div className="order-detail-content-all">
            <div className="order-detail-content">
              <div className="order-detail-title">
                <TitleButton text="訂單詳情" />
              </div>
              <div className="order-three-info s-text">
                <div>訂單編號：{orderNo}</div>
                <div>日期：{date}</div>
                <div>配送狀況：{delivery}</div>
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
            {Children.toArray(
              items.map((item, idx) => {
                const oneOrderItem = all.find((itemA) => item.id === itemA.id);
                return (
                  <OrderDetailOpenOne
                    id={item.id}
                    no={idx + 1}
                    img={oneOrderItem.data().mainImg}
                    name={oneOrderItem.data().name}
                    type={item.type}
                    num={item.num}
                  />
                );
              })
            )}

            <div className="order-delivery-info-container">
              <div>
                <TitleButton text="收件資訊" />
              </div>
              <div className="order-delivery-info s-text">
                <div className="center">收件人姓名</div>
                <div className="vertical-line"></div>
                {/* 第二個字用＊表示 */}
                <div>{deliveryName}</div>
                <div className="center">聯絡電話</div>
                <div className="vertical-line"></div>
                {/* 中間三個字用＊表示 */}
                <div>{deliveryTel}</div>
                <div className="center">收件地址</div>
                <div className="vertical-line"></div>
                {/* 數字用＊表示 */}
                <div>{deliveryAdd}</div>
                <div className="center">備註</div>
                <div className="vertical-line"></div>
                <div>{deliveryRemark}</div>
              </div>
            </div>
            <div
              className="order-detail-close-buttom pointer"
              onClick={handleDetailClose}
            >
              <BrownButton text="關閉" />
            </div>
          </div>
        </div>
      </Backdrop>
    </div>
  );
};

export default OrderDetailOpen;
