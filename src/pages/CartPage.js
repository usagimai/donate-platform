import { TitleButton } from "../components/reusable/ButtonCollection";
import CartDetailAll from "../components/cart/CartDetailAll";
import Note from "../components/cart/Note";
import Delivery from "../components/cart/Delivery";
import { OrderDelivered } from "../components/cart/OrderDelivered";
import EmptyMessage from "../components/reusable/EmptyMessage";
import { Recommend } from "../components/reusable/Recommend";
import { History } from "../components/reusable/History";

const CartPage = ({ cartItems, setCartItems, user }) => {
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
