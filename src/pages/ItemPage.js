import Location from "../components/reusable/Location";
import ItemDetail from "../components/itemDetail/ItemDetail";

const ItemPage = () => {
  return (
    <div className="item-page">
      <div className="item-page-location">
        <Location />
      </div>
      <ItemDetail />
    </div>
  );
};

export default ItemPage;
