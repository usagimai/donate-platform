import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { TitleButton } from "../components/reusable/ButtonCollection";
import { DecorationTitle } from "../components/reusable/DecorationTitle";
import FavoriteOne from "../components/favorite/FavoriteOne";
import EmptyMessage from "../components/reusable/EmptyMessage";
import { Recommend } from "../components/reusable/Recommend";
import { History } from "../components/reusable/History";
import { loadFavorites } from "../actions/favoritesAction";

const FavoritePage = ({ user }) => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites.favorites);
  const all = useSelector((state) => state.items.all);

  useEffect(() => {
    dispatch(loadFavorites());
  }, []);

  return (
    <div className="favorite-page">
      <div className="favorite-page-title">
        <TitleButton text="收藏" />
      </div>

      {favorites[0].data().itemId.length > 0 && (
        <div>
          <div className="favorite-list-container">
            <div>
              <DecorationTitle title="序號" fontSize="s-text" />
            </div>
            <div className="favorite-title-item">
              <DecorationTitle title="商品" fontSize="s-text" />
            </div>
            <div>
              <DecorationTitle title="移除" fontSize="s-text" />
            </div>
          </div>

          {favorites[0].data().itemId.map((itemF, idx) => {
            const oneFavoriteItem = all.find((itemA) => itemF === itemA.id);
            return (
              <FavoriteOne
                no={idx + 1}
                id={itemF}
                img={oneFavoriteItem.data().mainImg}
                name={oneFavoriteItem.data().name}
                key={itemF}
                favorites={favorites}
                user={user}
              />
            );
          })}
        </div>
      )}

      {favorites[0].data().itemId.length === 0 && (
        <>
          <div>
            <EmptyMessage message="無收藏商品" />
          </div>
          <div>
            <Recommend />
          </div>
          <div>
            <History />
          </div>
        </>
      )}
    </div>
  );
};

export default FavoritePage;
