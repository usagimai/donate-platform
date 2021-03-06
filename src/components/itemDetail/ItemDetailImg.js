import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { IconSelector } from "../reusable/IconSelector";
import Login from "../login/Login";
import {
  handleAddFavorite,
  handleRemoveFavorite,
} from "../../utils/favoritesUtils";
import useScrollBlock from "../../utils/useScrollBlock";
import { app, auth } from "../../firebase-config";

const ItemDetailImg = ({ id }) => {
  const dispatch = useDispatch();

  const user = auth.currentUser;
  const all = useSelector((state) => state.items.all);
  const selectedItem = all.find((doc) => {
    return doc.id === id;
  });
  const mainImg = selectedItem.data().mainImg;

  const favorites = useSelector((state) => state.favorites.favorites);
  const [isFavorite, setIsFavorite] = useState(false);
  const [loginBoxOpen, setLoginBoxOpen] = useState(false);
  const [blockScroll, allowScroll] = useScrollBlock();

  const handleLoginBoxOpen = () => {
    setLoginBoxOpen(true);
    blockScroll();
  };

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
    <>
      {loginBoxOpen && (
        <Login setLoginBoxOpen={setLoginBoxOpen} allowScroll={allowScroll} />
      )}
      <div className="item-detail-img">
        <div>
          <img src={mainImg} alt="商品圖" />
        </div>
        {!user && (
          <div className="item-detail-favorite" onClick={handleLoginBoxOpen}>
            <div>
              <IconSelector name="favorite-undone" />
            </div>
            <div className="s-text">加入收藏</div>
          </div>
        )}
        {user && !isFavorite && (
          <div
            className="item-detail-favorite"
            onClick={() => handleAddFavorite(dispatch, favorites, user, id)}
          >
            <div>
              <IconSelector name="favorite-undone" />
            </div>
            <div className="s-text">加入收藏</div>
          </div>
        )}
        {user && isFavorite && (
          <div
            className="item-detail-favorite"
            onClick={() => handleRemoveFavorite(dispatch, favorites, user, id)}
          >
            <div>
              <IconSelector name="favorite-done" />
            </div>
            <div className="s-text">移除收藏</div>
          </div>
        )}
      </div>
    </>
  );
};

export default ItemDetailImg;
