import { TitleButton } from "../components/reusable/ButtonCollection";
import CartDetailAll from "../components/cart/CartDetailAll";
import Note from "../components/cart/Note";
import Delivery from "../components/cart/Delivery";
import { OrderDelivered } from "../components/cart/OrderDelivered";
import EmptyMessage from "../components/reusable/EmptyMessage";
import { Recommend } from "../components/reusable/Recommend";
import { History } from "../components/reusable/History";

const CartPage = () => {
  return (
    <>
      {/* <OrderDelivered /> */}
      <div className="cart-page">
        <div className="cart-page-title">
          <TitleButton text="購物車" />
        </div>
        {/* 購物車有商品顯示內容(開始) */}
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
        {/* 購物車有商品顯示內容(結束) */}
        {/* 購物車無商品顯示內容(開始) */}
        {/* <div>
          <EmptyMessage message="目前購物車是空的" />
        </div>
        <div>
          <Recommend />
        </div>
        <div>
          <History />
        </div> */}
        {/* 購物車無商品顯示內容(結束) */}
      </div>
    </>
  );
};

export default CartPage;
