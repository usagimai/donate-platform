import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Helmet } from "react-helmet";
import { onAuthStateChanged } from "firebase/auth";

//reusable components
import { TitleButton } from "../components/reusable/ButtonCollection";
import { DecorationTitle } from "../components/reusable/DecorationTitle";
import ScrollTop from "../components/reusable/ScrollTop";
import EmptyMessage from "../components/reusable/EmptyMessage";
import { Carousel } from "../components/reusable/Carousel";
//components
import FavoriteOne from "../components/favorite/FavoriteOne";
//others
import { loadFavorites } from "../actions/favoritesAction";
import { app, auth } from "../firebase-config";

const FavoritePage = ({ setLoginBoxOpen }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = auth.currentUser;
  const all = useSelector((state) => state.items.all);
  const favorites = useSelector((state) => state.favorites.favorites);

  const [favoritesIdArr, setFavoritesIdArr] = useState([]);

  //驗證登入狀態，若未登入則轉導回首頁
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        navigate("/", { replace: true });
      }
    });
  }, []);

  //讀取收藏商品
  useEffect(() => {
    dispatch(loadFavorites());
  }, [user]);

  useEffect(() => {
    if (favorites.length > 0) {
      setFavoritesIdArr(favorites[0].data().itemId);
    }
  }, [favorites]);

  //未登入狀態進入此頁面後，不顯示內容
  if (!user) return null;

  return (
    <div className="favorite-page">
      <Helmet>
        <title>Machu Days商品捐贈平台 - 收藏</title>
      </Helmet>
      <div className="favorite-page-title">
        <TitleButton text="收藏" />
      </div>

      {favoritesIdArr.length > 0 && (
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

          {all.length > 0 &&
            favoritesIdArr.map((itemF, idx) => {
              const oneFavoriteItem = all.find((itemA) => itemF === itemA.id);
              return (
                <FavoriteOne
                  no={idx + 1}
                  id={itemF}
                  img={oneFavoriteItem.data().mainImg}
                  name={oneFavoriteItem.data().name}
                  key={itemF}
                  favorites={favorites}
                />
              );
            })}
        </div>
      )}

      {favoritesIdArr.length === 0 && (
        <>
          <div>
            <EmptyMessage message="無收藏商品" />
          </div>
          <div>
            <Carousel
              setLoginBoxOpen={setLoginBoxOpen}
              text="推薦商品"
              array="recommend"
            />
          </div>
          <div>
            <Carousel
              setLoginBoxOpen={setLoginBoxOpen}
              text="最近瀏覽"
              array="history"
            />
          </div>
        </>
      )}
      <ScrollTop />
    </div>
  );
};

export default FavoritePage;
