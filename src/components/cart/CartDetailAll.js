import { useSelector } from "react-redux";

import { DecorationTitle } from "../reusable/DecorationTitle";
import CartDetailOne from "./CartDetailOne";

const CartDetailAll = ({ cartItems, setCartItems }) => {
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
            />
          );
        })}
    </>
  );
};

export default CartDetailAll;
