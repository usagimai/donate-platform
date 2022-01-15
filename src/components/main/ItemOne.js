import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { IconSelector } from "../reusable/IconSelector";
import { loadFavorites } from "../../actions/favoritesAction";
import {
  handleAddFavorite,
  handleRemoveFavorite,
} from "../../utils/favoritesUtils";
import { app, auth } from "../../firebase-config";

const ItemOne = ({ image, name, id, setLoginBoxOpen }) => {
  const dispatch = useDispatch();
  const user = auth.currentUser;
  const favorites = useSelector((state) => state.favorites.favorites);
  const [isFavorite, setIsFavorite] = useState(false);

  const handleLoginBoxOpen = () => {
    setLoginBoxOpen(true);
    document.body.style.overflow = "hidden";
  };

  //讀取收藏資料
  useEffect(() => {
    if (user) {
      dispatch(loadFavorites());
    }
  }, [user]);

  //判斷是否為收藏的商品;
  useEffect(() => {
    if (favorites.length > 0) {
      const currentFavorites = favorites[0].data().itemId;
      if (currentFavorites.includes(id)) {
        setIsFavorite(true);
      } else {
        setIsFavorite(false);
      }
    }
  }, [favorites]);

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
      {!user && (
        <div className="item-list-favorite" onClick={handleLoginBoxOpen}>
          <IconSelector name="favorite-undone" />
        </div>
      )}
      {user && !isFavorite && (
        <div
          className="item-list-favorite"
          onClick={() => handleAddFavorite(dispatch, favorites, user, id)}
        >
          <IconSelector name="favorite-undone" />
        </div>
      )}
      {user && isFavorite && (
        <div
          className="item-list-favorite"
          onClick={() => handleRemoveFavorite(dispatch, favorites, user, id)}
        >
          <IconSelector name="favorite-done" />
        </div>
      )}
    </div>
  );
};

export default ItemOne;
