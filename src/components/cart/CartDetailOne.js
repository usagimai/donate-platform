import { Children, useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { IconSelector } from "../reusable/IconSelector";
import Confirm from "../reusable/Confirm";

const CartDetailOne = ({
  no,
  img,
  name,
  id,
  type,
  num,
  stockNum,
  cartItems,
  setCartItems,
  oneStockStatus,
}) => {
  const [orderNum, setOrderNum] = useState(num);
  const [deleteBoxOpen, setDeleteBoxOpen] = useState(false);

  useEffect(() => {
    setOrderNum(num);
  }, [num]);

  const nums = [];
  for (let i = 1; i <= stockNum; i++) {
    nums.push(i);
  }

  useEffect(() => {
    setCartItems((prevValue) => {
      return { ...prevValue, [`${id}_${type}`]: orderNum };
    });
  }, [orderNum]);

  useEffect(() => {
    localStorage.setItem("machudaysCart", JSON.stringify(cartItems));
  }, [cartItems]);

  const handleDeleteBoxOpen = () => {
    setDeleteBoxOpen(true);
    document.body.style.overflow = "hidden";
  };

  return (
    <>
      {deleteBoxOpen && (
        <Confirm
          setDeleteBoxOpen={setDeleteBoxOpen}
          message="是否確認刪除商品?"
          confirmFor="deleteItem"
          cartItems={cartItems}
          setCartItems={setCartItems}
          id={id}
          type={type}
        />
      )}
      <div className="cart-detail-one s-text">
        <div>{no}</div>
        <div className="cart-img-title">
          <div>
            <Link to={`/items/${id}`}>
              <img src={img} alt="商品圖" />
            </Link>
          </div>
          <div>
            <Link to={`/items/${id}`}>{name}</Link>
          </div>
        </div>
        <div>{type}</div>
        <div className="order-number">
          <select
            name="order-number-cart"
            value={orderNum}
            onChange={(e) => {
              setOrderNum(e.target.value);
            }}
          >
            {Children.toArray(
              nums.map((num) => <option value={num}>{num}</option>)
            )}
          </select>
          {oneStockStatus && (
            <div className="s-text">
              {oneStockStatus === "noEnoughStock" && "庫存少於需求"}
            </div>
          )}
        </div>
        <div className="l-text pointer" onClick={handleDeleteBoxOpen}>
          <IconSelector name="delete" />
        </div>
      </div>
      <div className="line"></div>
    </>
  );
};

export default CartDetailOne;
