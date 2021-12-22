import { TitleButton } from "../components/reusable/ButtonCollection";
import { DecorationTitle } from "../components/reusable/DecorationTitle";
import FavoriteOne from "../components/favorite/FavoriteOne";
import EmptyMessage from "../components/reusable/EmptyMessage";
import { Recommend } from "../components/reusable/Recommend";
import { History } from "../components/reusable/History";

const FavoritePage = () => {
  return (
    <div className="favorite-page">
      <div className="favorite-page-title">
        <TitleButton text="收藏" />
      </div>
      {/* 有收藏顯示內容(開始) */}
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
        <FavoriteOne />
        <FavoriteOne />
      </div>
      {/* 有收藏顯示內容(結束) */}
      {/* 無收藏顯示內容(開始) */}
      {/* <div>
        <EmptyMessage message="無收藏商品" />
      </div>
      <div>
        <Recommend />
      </div>
      <div>
        <History />
      </div> */}
      {/* 無收藏顯示內容(結束) */}
    </div>
  );
};

export default FavoritePage;
