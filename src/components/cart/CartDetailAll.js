import { DecorationTitle } from "../reusable/DecorationTitle";
import CartDetailOne from "./CartDetailOne";

const CartDetailAll = () => {
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
          <DecorationTitle title="尺寸" fontSize="s-text" />
        </div>
        <div>
          <DecorationTitle title="數量" fontSize="s-text" />
        </div>
        <div>
          <DecorationTitle title="移除" fontSize="s-text" />
        </div>
      </div>
      <CartDetailOne />
      <CartDetailOne />
      <CartDetailOne />
    </>
  );
};

export default CartDetailAll;
