import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import { IconSelector } from "../reusable/IconSelector";
import Confirm from "../reusable/Confirm";

const FavoriteOne = ({ no, id, img, name, favorites }) => {
  const dispatch = useDispatch();
  const [deleteFavBoxOpen, setDeleteFavBoxOpen] = useState(false);

  const handleDeleteBoxOpen = () => {
    setDeleteFavBoxOpen(true);
    document.body.style.overflow = "hidden";
  };

  return (
    <>
      {deleteFavBoxOpen && (
        <Confirm
          setDeleteFavBoxOpen={setDeleteFavBoxOpen}
          message="是否確認刪除收藏商品?"
          confirmFor="deleteFavorites"
          dispatch={dispatch}
          favorites={favorites}
          idFav={id}
        />
      )}
      <div className="favorite-one s-text">
        <div>{no}</div>
        <div className="favorite-img-title">
          <div>
            <Link to={`/items/${id}`}>
              <img src={img} alt="商品圖" />
            </Link>
          </div>
          <div>
            <Link to={`/items/${id}`}>{name}</Link>
          </div>
        </div>
        <div className="l-text pointer" onClick={handleDeleteBoxOpen}>
          <IconSelector name="delete" />
        </div>
      </div>
      <div className="line"></div>
    </>
  );
};

export default FavoriteOne;
