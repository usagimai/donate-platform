import { IconSelector } from "../reusable/IconSelector";

const ItemDetailImg = ({ mainImg }) => {
  return (
    <div className="item-detail-img">
      <div>
        <img src={mainImg} alt="商品圖" />
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
