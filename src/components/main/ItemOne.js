import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { IconSelector } from "../reusable/IconSelector";
import {
  handleAddFavorite,
  handleRemoveFavorite,
} from "../../utils/favoritesUtils";
import { loadFavorites } from "../../actions/favoritesAction";
import { app, auth } from "../../firebase-config";

const ItemOne = ({ image, name, id, setLoginBoxOpen }) => {
  const dispatch = useDispatch();
  const user = auth.currentUser;
  const favorites = useSelector((state) => state.favorites.favorites);
  const [isFavorite, setIsFavorite] = useState(false);

  const imageRef = useRef();
  const [imgSrc, setImgSrc] = useState();

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

  //圖片Lazy Loading
  const options = {
    rootMargin: "0% 0% 10% 0%",
  };

  const callback = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setImgSrc(image);
        observer.unobserve(imageRef.current);
      }
    });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(callback, options);

    observer.observe(imageRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="item-list-container">
      <Link to={`/items/${id}`}>
        <div>
          <div>
            <img src={imgSrc} alt="商品圖" ref={imageRef} />
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
