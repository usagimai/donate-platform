import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { collection, getDocs } from "firebase/firestore";

import { TitleButton } from "../components/reusable/ButtonCollection";
import CartDetailAll from "../components/cart/CartDetailAll";
import Note from "../components/cart/Note";
import Delivery from "../components/cart/Delivery";
import { OrderDelivered } from "../components/cart/OrderDelivered";
import EmptyMessage from "../components/reusable/EmptyMessage";
import { Recommend } from "../components/reusable/Recommend";
import { History } from "../components/reusable/History";
import { app, db } from "../firebase-config";

const CartPage = ({ cartItems, setCartItems, user }) => {
  const all = useSelector((state) => state.items.all);

  const [noStock, setNoStock] = useState([]);
  const [noEnoughStock, setNoEnoughStock] = useState([]);

  const currentCartInfo = Object.entries(cartItems).map((key) => {
    const id = key[0].split("_")[0];
    const type = key[0].split("_")[1];
    return { ["id"]: id, ["type"]: type, ["num"]: key[1] };
  });

  //初次進到購物車頁面後，判斷庫存是否足夠
  useEffect(async () => {
    const dbRef = collection(db, "items");
    const itemData = await getDocs(dbRef);
    const all = itemData.docs;

    const noStockItems = [];
    const noEnoughStockItems = [];
    currentCartInfo.forEach((itemC) => {
      const oneItem = all.find((itemA) => itemC.id === itemA.id);
      const prevStock = oneItem.data().stock[itemC.type][0];

      switch (true) {
        case Number(prevStock - itemC.num) < 0 && prevStock === 0:
          noStockItems.push(itemC);
          itemC.deleteFromCart = true;
          break;
        case Number(prevStock - itemC.num) < 0 && prevStock !== 0:
          noEnoughStockItems.push(itemC);
          itemC.deleteFromCart = true;
          break;
        default:
          return;
      }
      //設定購物車若沒商品，但無庫存及不足有商品的話，購物車無商品下顯示說明
    });
    setNoStock(noStockItems);
    setNoEnoughStock(noEnoughStockItems);

    const editedCartInfo = currentCartInfo
      .filter((item) => item.deleteFromCart !== true)
      .reduce(
        (acc, item) => ({ ...acc, [`${item.id}_${item.type}`]: `${item.num}` }),
        {}
      );
    setCartItems(editedCartInfo);
    localStorage.setItem("machudaysCart", JSON.stringify(editedCartInfo));
  }, []);

  return (
    <>
      {/* <OrderDelivered /> */}
      <div className="cart-page">
        <div className="cart-page-title">
          <TitleButton text="購物車" />
        </div>
        {Object.keys(cartItems).length !== 0 && (
          <>
            <div>
              <CartDetailAll
                cartItems={cartItems}
                setCartItems={setCartItems}
                noStock={noStock}
                noEnoughStock={noEnoughStock}
              />
            </div>
            <div className="cart-page-lower">
              <div>
                <Note />
              </div>
              <div>
                <Delivery
                  cartItems={cartItems}
                  setCartItems={setCartItems}
                  user={user}
                  noStock={noStock}
                  setNoStock={setNoStock}
                  noEnoughStock={noEnoughStock}
                  setNoEnoughStock={setNoEnoughStock}
                />
              </div>
            </div>
          </>
        )}
        {Object.keys(cartItems).length === 0 && (
          <>
            <div>
              <EmptyMessage message="目前購物車是空的" />
            </div>
            {noStock.length > 0 && (
              <div className="stock-message s-text">
                <div>
                  抱歉，以下商品已<span>無庫存</span>：
                </div>
                {noStock.map((itemN, idx) => {
                  const oneNoStockItem = all.find(
                    (itemA) => itemN.id === itemA.id
                  );
                  const noStockItemName = oneNoStockItem.data().name;
                  return (
                    <div key={idx}>
                      {noStockItemName} ( 尺寸/顏色：{itemN.type} )
                    </div>
                  );
                })}
              </div>
            )}
            <div>
              <Recommend />
            </div>
            <div>
              <History />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default CartPage;
