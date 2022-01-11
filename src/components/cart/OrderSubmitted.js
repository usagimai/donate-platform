import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { IconSelector } from "../reusable/IconSelector";
import { DecorationTitle } from "../reusable/DecorationTitle";
import { BrownButton } from "../reusable/ButtonCollection";
import { orderSubmittedData } from "../../data";
import Backdrop from "../reusable/Backdrop";
import { app, db } from "../../firebase-config";
import { loadOrders } from "../../actions/ordersAction";

export const OrderSubmitted = ({ setSubmittedBoxOpen }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [orderNo, setOrderNo] = useState("");

  const orders = useSelector((state) => state.orders.orders);

  useEffect(() => {
    dispatch(loadOrders());
  }, []);

  useEffect(() => {
    const orderNoArr = orders.map((doc) => doc.id);
    setOrderNo(orderNoArr[0]);
  }, [orders]);

  const handleSubmittedBoxClose = (argument) => {
    switch (argument) {
      case "close":
        setSubmittedBoxOpen(false);
        break;
      case "home":
        navigate("/", { push: true });
        break;
      case "order":
        navigate("/order", { push: true });
        break;
      default:
        break;
    }
    document.body.style.overflow = "auto";
  };

  return (
    <Backdrop>
      <div className="white-container">
        <div
          className="close-bg"
          onClick={() => handleSubmittedBoxClose("close")}
        >
          <IconSelector name="close" />
        </div>
        <div className="order-delivered-content">
          <div>
            <DecorationTitle title="訂單已送出，謝謝！" fontSize="l-text" />
          </div>
          <div className="order-delivered-text s-text">
            <div>●訂單編號：{orderNo}</div>
            <div>{orderSubmittedData.remark}</div>
          </div>
          <div className="order-delivered-button">
            <div
              onClick={() => handleSubmittedBoxClose("home")}
              className="pointer"
            >
              <BrownButton text="回首頁" />
            </div>
            <div
              onClick={() => handleSubmittedBoxClose("order")}
              className="pointer"
            >
              <BrownButton text="查看訂單" />
            </div>
          </div>
        </div>
      </div>
    </Backdrop>
  );
};
