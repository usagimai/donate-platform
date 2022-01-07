import { Link } from "react-router-dom";

const OrderDetailOpenOne = ({ id, no, img, name, type, num }) => {
  return (
    <>
      <div className="order-detail-open-one s-text">
        <div>{no}</div>
        <div className="order-img-title">
          <div>
            <Link to={`/items/${id}`} target="_blank">
              <img src={img} alt="商品圖" />
            </Link>
          </div>
          <div>
            <Link to={`/items/${id}`} target="_blank">
              {name}
            </Link>
          </div>
        </div>
        <div>{type}</div>
        <div>{num}</div>
      </div>
      <div className="line"></div>
    </>
  );
};

export default OrderDetailOpenOne;
