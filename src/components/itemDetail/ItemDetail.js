import ItemDetailImg from "./ItemDetailImg";
import ItemDetailOrder from "./ItemDetailOrder";
import ItemDetailInfo from "./ItemDetailInfo";

const ItemDetail = ({ id, setLoginBoxOpen, setCartItemChange }) => {
  return (
    <div className="item-detail">
      <div className="item-detail-upper">
        <div>
          <ItemDetailImg id={id} setLoginBoxOpen={setLoginBoxOpen} />
        </div>
        <div className="item-detail-upper-right">
          <ItemDetailOrder
            id={id}
            setLoginBoxOpen={setLoginBoxOpen}
            setCartItemChange={setCartItemChange}
          />
        </div>
      </div>
      <div className="item-detail-lower">
        <ItemDetailInfo id={id} />
      </div>
    </div>
  );
};

export default ItemDetail;
