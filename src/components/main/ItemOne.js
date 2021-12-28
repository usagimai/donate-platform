import { Link } from "react-router-dom";

import { IconSelector } from "../reusable/IconSelector";

const ItemOne = ({ image, name, id }) => {
  return (
    <div className="item-list-container">
      <Link to={`/items/${id}`}>
        <div>
          <div>
            <img src={image} alt="商品圖" />
          </div>
          <div className="item-list-title s-text">{name}</div>
        </div>
      </Link>
      <div className="item-list-favorite">
        <IconSelector name="favorite-undone" />
      </div>
    </div>
  );
};

export default ItemOne;
