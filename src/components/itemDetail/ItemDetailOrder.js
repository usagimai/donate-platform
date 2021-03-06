import { Children, useRef, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Helmet } from "react-helmet";

import { DecorationTitle } from "../reusable/DecorationTitle";
import { BrownButton } from "../reusable/ButtonCollection";
import Login from "../login/Login";
import useScrollBlock from "../../utils/useScrollBlock";
import { app, auth } from "../../firebase-config";

const ItemDetailOrder = ({ id, setCartItemChange }) => {
  const user = auth.currentUser;
  const all = useSelector((state) => state.items.all);
  const cartItems = JSON.parse(localStorage.getItem("machudaysCart"));
  const selectedItem = all.find((doc) => {
    return doc.id === id;
  });
  const name = selectedItem.data().name;

  //將每列尺寸/顏色、庫存數量、所需數量之資料整理成object形式放進array中
  const [itemDetailInfo, setItemDetailInfo] = useState([]);
  const [loginBoxOpen, setLoginBoxOpen] = useState(false);
  const [blockScroll, allowScroll] = useScrollBlock();

  useEffect(() => {
    const initialInfo = Array(Object.keys(selectedItem.data().stock).length)
      .fill(null)
      .map((item, idx) => ({
        type: Object.keys(selectedItem.data().stock)[idx],
        stockNum: Object.values(selectedItem.data().stock)[idx][0],
        no: Object.values(selectedItem.data().stock)[idx][1],
      }));

    initialInfo.sort((a, b) => {
      return a.no - b.no;
    });
    setItemDetailInfo(initialInfo);
  }, []);

  //所需數量
  const orderNum = useRef([]);
  const [cartMessage, setCartMessage] = useState("");

  const handleLoginBoxOpen = () => {
    setLoginBoxOpen(true);
    blockScroll();
  };

  const handleAddToCart = () => {
    const formItems = {};
    //將所需數量>0的品項加入formItems (資料型態為 { 商品id_商品type: 所需數量 })
    for (let i = 0; i < itemDetailInfo.length; i++) {
      if (orderNum.current[i].value > 0) {
        formItems[`${id}_${itemDetailInfo[i].type}`] = Number(
          orderNum.current[i].value
        );
      }
    }

    if (Object.keys(formItems).length) {
      //若cartItems是空的，直接將商品加進cartItems
      if (!cartItems) {
        localStorage.setItem("machudaysCart", JSON.stringify(formItems));
        setCartItemChange(true);
        setCartMessage("已加入購物車");
      } else {
        //若formItems裡有和cartItems相同type的商品，只將所需數量加到該項數量
        for (let type in formItems) {
          if (cartItems[type]) {
            cartItems[type] = Number(cartItems[type]) + Number(formItems[type]);
          } else {
            //若formItems的商品在cartItems裡沒有，則直接新增這筆資料
            cartItems[type] = Number(formItems[type]);
          }
        }
        localStorage.setItem("machudaysCart", JSON.stringify(cartItems));
        setCartItemChange(true);
        setCartMessage("已加入購物車");
      }
    } else {
      //若所有品項的所需數量皆為0
      if (Object.keys(formItems).length === 0) {
        setCartMessage("請選擇商品數量");
      }
    }
  };

  useEffect(() => {
    let timeoutID = setTimeout(() => setCartMessage(""), 2000);
    return () => clearTimeout(timeoutID);
  }, [cartMessage]);

  return (
    <>
      {loginBoxOpen && (
        <Login setLoginBoxOpen={setLoginBoxOpen} allowScroll={allowScroll} />
      )}
      <div className="item-detail-order">
        <Helmet>
          <title>Machu Days商品捐贈平台 - {`${name}`}</title>
        </Helmet>
        <div className="l-text">{name}</div>
        <div className="item-number s-text">商品編號：{id}</div>
        <form>
          <div className="order-container s-text">
            <div>
              <DecorationTitle title="尺寸/顏色" fontSize="s-text" />
            </div>
            <div>
              <DecorationTitle title="庫存數量" fontSize="s-text" />
            </div>
            <div>
              <DecorationTitle title="所需數量" fontSize="s-text" />
            </div>

            {Children.toArray(
              itemDetailInfo.map((item, idx) => {
                const nums = [];
                for (let i = 0; i <= item.stockNum; i++) {
                  nums.push(i);
                }
                return (
                  <>
                    <div>{item.type}</div>
                    <div>{item.stockNum}</div>
                    <div>
                      <select
                        name="order-number"
                        ref={(el) => (orderNum.current[idx] = el)}
                      >
                        {Children.toArray(
                          nums.map((num) => <option value={num}>{num}</option>)
                        )}
                      </select>
                    </div>
                  </>
                );
              })
            )}
          </div>

          <div className="order-container">
            <div></div>
            <div>
              <span
                className={`s-text center ${
                  cartMessage === "已加入購物車" && "add-to-cart"
                }`}
              >
                {cartMessage}
              </span>
            </div>
            <div
              className="order-button pointer"
              onClick={user ? handleAddToCart : handleLoginBoxOpen}
            >
              <BrownButton text="加入購物車" />
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default ItemDetailOrder;
