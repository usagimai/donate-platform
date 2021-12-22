import { IconSelector } from "../reusable/IconSelector";

const CartDetailOne = () => {
  return (
    <>
      <div className="cart-detail-one s-text">
        <div>1</div>
        <div className="cart-img-title">
          <div>
            <img
              src="https://firebasestorage.googleapis.com/v0/b/donate-platform.appspot.com/o/items%2F0101-0001-0101-F-1.jpg?alt=media&token=9c8242c3-f8db-4be5-b888-ae4dd2b40b28"
              alt="商品圖"
            />
          </div>
          <div>【Machu】點點咖啡色圓領 澎袖 白色純棉短袖襯衫_麻雀</div>
        </div>
        <div>F</div>
        <div>
          <select name="order-number-cart">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
        </div>
        <div className="l-text">
          <IconSelector name="delete" />
        </div>
      </div>
      <div className="line"></div>
    </>
  );
};

export default CartDetailOne;
