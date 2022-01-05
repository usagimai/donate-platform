import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { DecorationTitle } from "../reusable/DecorationTitle";
import { IconSelector } from "../reusable/IconSelector";
import CartDetailOne from "./CartDetailOne";

const CartDetailAll = ({
  cartItems,
  setCartItems,
  noStock,
  noEnoughStock,
  orderNum,
  setOrderNum,
}) => {
  const all = useSelector((state) => state.items.all);

  //將local storage的購物車資料整理成array形式 [{商品id:__, 尺寸/顏色:__, 數量:__}]
  //將cartItems的key拆分出id及尺寸/顏色
  const currentCartInfo = Object.entries(cartItems).map((key) => {
    const id = key[0].split("_")[0];
    const type = key[0].split("_")[1];
    return { ["id"]: id, ["type"]: type, ["num"]: key[1] };
  });

  return (
    <>
      <div className="cart-detail-all s-text">
        <div>
          <DecorationTitle title="序號" fontSize="s-text" />
        </div>
        <div className="cart-title-item">
          <DecorationTitle title="商品" fontSize="s-text" />
        </div>
        <div>
          <DecorationTitle title="尺寸/顏色" fontSize="s-text" />
        </div>
        <div>
          <DecorationTitle title="數量" fontSize="s-text" />
        </div>
        <div>
          <DecorationTitle title="移除" fontSize="s-text" />
        </div>
      </div>
      {console.log(currentCartInfo)}
      {all.length &&
        currentCartInfo.map((itemC, idx) => {
          const oneCartItem = all.find((itemA) => itemC.id === itemA.id);
          const stock = oneCartItem.data().stock[itemC.type][0];
          return (
            <CartDetailOne
              no={idx + 1}
              img={oneCartItem.data().mainImg}
              name={oneCartItem.data().name}
              id={itemC.id}
              type={itemC.type}
              num={itemC.num}
              key={idx}
              cartItems={cartItems}
              setCartItems={setCartItems}
              stockNum={stock}
              orderNum={orderNum}
              setOrderNum={setOrderNum}
            />
          );
        })}
      {noEnoughStock.length > 0 && (
        <div className="stock-message s-text">
          <div>
            抱歉，以下商品<span>庫存不足</span>：
          </div>
          {noEnoughStock.map((itemN, idx) => {
            const oneNoEnoughStockItem = all.find(
              (itemA) => itemN.id === itemA.id
            );
            const noEnoughStockItemName = oneNoEnoughStockItem.data().name;
            return (
              <div key={idx}>
                <Link
                  to={`/items/${itemN.id}`}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  {noEnoughStockItemName} ( 尺寸/顏色：{itemN.type} ) 數量不足{" "}
                  {itemN.num}，請重新選擇數量&emsp;
                  <IconSelector name="external-link" />
                </Link>
              </div>
            );
          })}
        </div>
      )}

      {noStock.length > 0 && (
        <div className="stock-message s-text">
          <div>
            抱歉，以下商品已<span>無庫存</span>：
          </div>
          {noStock.map((itemN, idx) => {
            const oneNoStockItem = all.find((itemA) => itemN.id === itemA.id);
            const noStockItemName = oneNoStockItem.data().name;
            return (
              <div key={idx}>
                {noStockItemName} ( 尺寸/顏色：{itemN.type} )
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default CartDetailAll;
