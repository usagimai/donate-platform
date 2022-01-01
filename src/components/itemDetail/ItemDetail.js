import ItemDetailImg from "./ItemDetailImg";
import ItemDetailOrder from "./ItemDetailOrder";
import ItemDetailInfo from "./ItemDetailInfo";

const ItemDetail = ({ id, user, setLoginBoxOpen, setCartNum }) => {
  return (
    <div className="item-detail">
      <div className="item-detail-upper">
        <div>
          <ItemDetailImg
            user={user}
            id={id}
            setLoginBoxOpen={setLoginBoxOpen}
          />
        </div>
        <div className="item-detail-upper-right">
          <ItemDetailOrder
            id={id}
            user={user}
            setLoginBoxOpen={setLoginBoxOpen}
            setCartNum={setCartNum}
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
