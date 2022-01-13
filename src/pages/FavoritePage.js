import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { collection, getDocs } from "firebase/firestore";

import { TitleButton } from "../components/reusable/ButtonCollection";
import { DecorationTitle } from "../components/reusable/DecorationTitle";
import ScrollTop from "../components/reusable/ScrollTop";
import FavoriteOne from "../components/favorite/FavoriteOne";
import EmptyMessage from "../components/reusable/EmptyMessage";
import { Carousel } from "../components/reusable/Carousel";
import { app, db } from "../firebase-config";

const FavoritePage = ({ user, setLoginBoxOpen }) => {
  const navigate = useNavigate();
  const all = useSelector((state) => state.items.all);

  const [favorites, setFavorites] = useState([]);
  const [favoritesIdArr, setFavoritesIdArr] = useState([]);

  //未登入狀態進入此頁面後，轉導回首頁
  useEffect(() => {
    if (!user) {
      navigate("/", { replace: true });
    }
  }, []);

  useEffect(async () => {
    const dbRef = collection(db, "favorites");
    const favoritesData = await getDocs(dbRef);
    const favoritesArr = favoritesData.docs;
    setFavorites(favoritesArr);
    setFavoritesIdArr(favoritesArr[0].data().itemId);
  }, [favorites]);

  //未登入狀態進入此頁面後，不顯示內容
  if (!user) return null;

  return (
    <div className="favorite-page">
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
                  user={user}
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
              user={user}
              setLoginBoxOpen={setLoginBoxOpen}
              text="推薦商品"
              array="recommend"
            />
          </div>
          <div>
            <Carousel
              user={user}
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
