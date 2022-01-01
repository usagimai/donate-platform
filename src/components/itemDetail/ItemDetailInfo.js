import { useSelector } from "react-redux";

import { DecorationTitle } from "../reusable/DecorationTitle";
import { IconSelector } from "../reusable/IconSelector";

const ItemDetailInfo = ({ id }) => {
  const all = useSelector((state) => state.items.all);
  const selectedItem = all.find((doc) => {
    return doc.id === id;
  });
  const detailImg1 = selectedItem.data().detailImg1;
  const detailImg2 = selectedItem.data().detailImg2;
  const infoImg = selectedItem.data().infoImg;

  const handleTop = () => {
    window.scroll({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="item-detail-info">
      <div>
        <DecorationTitle title="商品介紹" fontSize="m-text" />
      </div>
      <div>
        <img src={detailImg1} alt="商品詳情-1" />
      </div>
      {detailImg2 && (
        <div>
          <img src={detailImg2} alt="商品詳情-2" />
        </div>
      )}

      <div>
        <img src={infoImg} alt="商品資訊圖" />
      </div>
      <div className="item-detail-info-top s-text" onClick={handleTop}>
        <div>
          <IconSelector name="top" />
        </div>
        <div>TOP</div>
      </div>
    </div>
  );
};

export default ItemDetailInfo;
