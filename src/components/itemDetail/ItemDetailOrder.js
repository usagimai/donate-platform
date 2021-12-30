import { Children } from "react";

import { DecorationTitle } from "../reusable/DecorationTitle";
import { BrownButton } from "../reusable/ButtonCollection";

const ItemDetailOrder = ({ name, id, size1, stock1 }) => {
  const orderNum1 = [];
  for (let i = 0; i <= stock1; i++) {
    orderNum1.push(i);
  }

  return (
    <div className="item-detail-order">
      <div className="l-text">{name}</div>
      <div className="item-number s-text">商品編號：{id}</div>
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
          <div>{size1}</div>
          <div>{stock1}</div>
          <div>
            <select name="order-number">
              {Children.toArray(
                orderNum1.map((num) => <option value={num}>{num}</option>)
              )}
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
