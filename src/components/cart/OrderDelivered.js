import { IconSelector } from "../reusable/IconSelector";
import { DecorationTitle } from "../reusable/DecorationTitle";
import { BrownButton } from "../reusable/ButtonCollection";
import { orderSubmittedData } from "../../data";
import Backdrop from "../reusable/Backdrop";

export const OrderDelivered = () => {
  return (
    <Backdrop>
      <div className="white-container">
        <div className="close-bg">
          <IconSelector name="close" />
        </div>
        <div className="order-delivered-content">
          <div>
            <DecorationTitle title="訂單已送出，謝謝！" fontSize="l-text" />
          </div>
          <div className="order-delivered-text s-text">
            <div>●訂單編號：___________</div>
            <div>{orderSubmittedData.remark}</div>
          </div>
          <div className="order-delivered-button">
            <div>
              <BrownButton text="回首頁" />
            </div>
            <div>
              <BrownButton text="查看訂單" />
            </div>
          </div>
        </div>
      </div>
    </Backdrop>
  );
};
