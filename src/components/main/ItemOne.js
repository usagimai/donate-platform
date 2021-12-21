import { IconSelector } from "../reusable/IconSelector";

const ItemOne = () => {
  return (
    <div className="item-list-container">
      <div>
        <div>
          <img
            src="https://firebasestorage.googleapis.com/v0/b/donate-platform.appspot.com/o/items%2F0101-0001-0101-F-1.jpg?alt=media&token=9c8242c3-f8db-4be5-b888-ae4dd2b40b28"
            alt="商品圖"
          />
        </div>
        <div className="item-list-title s-text">
          【Machu】點點咖啡色圓領 澎袖 白色純棉短袖襯衫_麻雀
        </div>
      </div>
      <div className="item-list-favorite">
        <IconSelector name="favorite-undone" />
      </div>
    </div>
  );
};

export default ItemOne;
