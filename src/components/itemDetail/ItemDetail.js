import ItemDetailImg from "./ItemDetailImg";
import ItemDetailOrder from "./ItemDetailOrder";
import ItemDetailInfo from "./ItemDetailInfo";

const ItemDetail = () => {
  return (
    <div className="item-detail">
      <div className="item-detail-upper">
        <div>
          <ItemDetailImg />
        </div>
        <div className="item-detail-upper-right">
          <ItemDetailOrder />
        </div>
      </div>
      <div className="item-detail-lower">
        <ItemDetailInfo />
      </div>
    </div>
  );
};

export default ItemDetail;
