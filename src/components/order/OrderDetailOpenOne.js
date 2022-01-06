const OrderDetailOpenOne = ({ no, img, name, type, num }) => {
  return (
    <>
      <div className="order-detail-open-one s-text">
        <div>{no}</div>
        <div className="order-img-title">
          <div>
            <img src={img} alt="商品圖" />
          </div>
          <div>{name}</div>
        </div>
        <div>{type}</div>
        <div>{num}</div>
      </div>
      <div className="line"></div>
    </>
  );
};

export default OrderDetailOpenOne;
