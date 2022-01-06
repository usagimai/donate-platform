import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { collection, getDocs } from "firebase/firestore";

import { TitleButton } from "../components/reusable/ButtonCollection";
import CartDetailAll from "../components/cart/CartDetailAll";
import Note from "../components/cart/Note";
import Delivery from "../components/cart/Delivery";
import { OrderSubmitted } from "../components/cart/OrderSubmitted";
import EmptyMessage from "../components/reusable/EmptyMessage";
import { Recommend } from "../components/reusable/Recommend";
import { History } from "../components/reusable/History";
import { app, db } from "../firebase-config";
import { loadItems } from "../actions/itemsAction";

const CartPage = ({ cartItems, setCartItems, user, cartLoading }) => {
  const dispatch = useDispatch();
  const all = useSelector((state) => state.items.all);

  const [stockStatus, setStockStatus] = useState([]);
  const [noStockItem, setNoStockItem] = useState([]);
  const [submittedBoxOpen, setSubmittedBoxOpen] = useState(false);

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

    const currentStockStatus = [];
    currentCartInfo.forEach((itemC) => {
      const oneItem = all.find((itemA) => itemC.id === itemA.id);
      const prevStock = oneItem.data().stock[itemC.type][0];

      switch (true) {
        case Number(prevStock - itemC.num) >= 0:
          currentStockStatus.push("stockEnough");
          itemC.num = itemC.num;
          break;
        case Number(prevStock - itemC.num) < 0 && prevStock === 0:
          itemC.num = 0;
          break;
        case Number(prevStock - itemC.num) < 0 && prevStock !== 0:
          currentStockStatus.push("noEnoughStock");
          itemC.num = prevStock;
          break;
        default:
          return;
      }
    });
    setStockStatus(currentStockStatus);
    setNoStockItem(currentCartInfo.filter((item) => item.num === 0));

    const editedCartInfo = currentCartInfo
      .filter((item) => item.num !== 0)
      .reduce(
        (acc, item) => ({
          ...acc,
          [`${item.id}_${item.type}`]: Number(`${item.num}`),
        }),
        {}
      );
    localStorage.setItem("machudaysCart", JSON.stringify(editedCartInfo));
    setCartItems(editedCartInfo);

    dispatch(loadItems());
  }, [cartLoading]);

  return (
    <>
      {submittedBoxOpen && (
        <OrderSubmitted setSubmittedBoxOpen={setSubmittedBoxOpen} />
      )}
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
                stockStatus={stockStatus}
                noStockItem={noStockItem}
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
                  setStockStatus={setStockStatus}
                  noStockItem={noStockItem}
                  setNoStockItem={setNoStockItem}
                  setSubmittedBoxOpen={setSubmittedBoxOpen}
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
            {noStockItem.length > 0 && (
              <div className="stock-message s-text">
                <div>
                  抱歉，以下商品已<span>無庫存</span>：
                </div>
                {noStockItem.map((itemN, idx) => {
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
