import { TitleButton } from "../components/reusable/ButtonCollection";
import CartDetailAll from "../components/cart/CartDetailAll";
import Note from "../components/cart/Note";
import Delivery from "../components/cart/Delivery";
import { OrderDelivered } from "../components/cart/OrderDelivered";

const CartPage = () => {
  return (
    <>
      <OrderDelivered />
      <div className="cart-page">
        <div className="cart-page-title">
          <TitleButton text="購物車" />
        </div>
        <div>
          <CartDetailAll />
        </div>
        <div className="cart-page-lower">
          <div>
            <Note />
          </div>
          <div>
            <Delivery />
          </div>
        </div>
      </div>
    </>
  );
};

export default CartPage;
