import { DecorationTitle } from "../reusable/DecorationTitle";
import { IconSelector } from "../reusable/IconSelector";

const ItemDetailInfo = () => {
  return (
    <div className="item-detail-info">
      <div>
        <DecorationTitle title="商品介紹" fontSize="m-text" />
      </div>
      <div>
        <img
          src="https://firebasestorage.googleapis.com/v0/b/donate-platform.appspot.com/o/items%2F0101-0001-0101-F-3.jpg?alt=media&token=7104727e-d71e-44ee-b261-d4c973c9c36d"
          alt="商品資訊圖-1"
        />
      </div>
      <div>
        <img
          src="https://firebasestorage.googleapis.com/v0/b/donate-platform.appspot.com/o/items%2F0101-0001-0101-F-2.jpg?alt=media&token=e84d1906-e23a-4976-9cb0-46408c710664"
          alt="商品資訊圖-2"
        />
      </div>
      <div className="item-detail-info-top s-text">
        <div>
          <IconSelector name="top" />
        </div>
        <div>TOP</div>
      </div>
    </div>
  );
};

export default ItemDetailInfo;
