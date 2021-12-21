import { DecorationTitle } from "../reusable/DecorationTitle";
import { BrownButton } from "../reusable/ButtonCollection";

const ItemDetailOrder = () => {
  return (
    <div className="item-detail-order">
      <div className="l-text">
        【Machu】點點咖啡色圓領 澎袖 白色純棉短袖襯衫_麻雀
      </div>
      <div className="item-number s-text">商品編號：0101-0001-0101-F</div>
      <form>
        <div className="order-container s-text">
          <div>
            <DecorationTitle title="尺寸" fontSize="s-text" />
          </div>
          <div>
            <DecorationTitle title="庫存數量" fontSize="s-text" />
          </div>
          <div>
            <DecorationTitle title="所需數量" fontSize="s-text" />
          </div>
          <div>F</div>
          <div>8</div>
          <div>
            <select name="order-number">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>
          </div>
        </div>

        <div className="order-container">
          <div></div>
          <div></div>
          <div className="order-button">
            <BrownButton text="加入購物車" />
          </div>
        </div>
      </form>
    </div>
  );
};

export default ItemDetailOrder;
