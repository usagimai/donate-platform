import { IconSelector } from "../reusable/IconSelector";

const ItemDetailImg = () => {
  return (
    <div className="item-detail-img">
      <div>
        <img
          src="https://firebasestorage.googleapis.com/v0/b/donate-platform.appspot.com/o/items%2F0101-0001-0101-F-1.jpg?alt=media&token=9c8242c3-f8db-4be5-b888-ae4dd2b40b28"
          alt="商品圖"
        />
      </div>
      <div className="item-detail-favorite">
        <div>
          <IconSelector name="favorite-undone" />
        </div>
        <div className="s-text">加入收藏</div>
      </div>
    </div>
  );
};

export default ItemDetailImg;
