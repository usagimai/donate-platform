import ItemDetailImg from "./ItemDetailImg";
import ItemDetailOrder from "./ItemDetailOrder";
import ItemDetailInfo from "./ItemDetailInfo";

const ItemDetail = ({
  mainImg,
  name,
  id,
  size1,
  stock1,
  detailImg1,
  detailImg2,
  infoImg,
}) => {
  return (
    <div className="item-detail">
      <div className="item-detail-upper">
        <div>
          <ItemDetailImg mainImg={mainImg} />
        </div>
        <div className="item-detail-upper-right">
          <ItemDetailOrder name={name} id={id} size1={size1} stock1={stock1} />
        </div>
      </div>
      <div className="item-detail-lower">
        <ItemDetailInfo
          detailImg1={detailImg1}
          detailImg2={detailImg2}
          infoImg={infoImg}
        />
      </div>
    </div>
  );
};

export default ItemDetail;
