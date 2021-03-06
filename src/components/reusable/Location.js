import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Helmet } from "react-helmet";

export const ListLocation = ({ searchText }) => {
  const category = useSelector((state) => state.category);
  const [listLocation, setListLocation] = useState([]);

  useEffect(() => {
    switch (category) {
      case "all":
        return setListLocation(["", "所有商品列表"]);
      case "top":
        return setListLocation(["服裝類型", "Women | 上衣"]);
      case "bottoms":
        return setListLocation(["服裝類型", "Women | 下著"]);
      case "outers":
        return setListLocation(["服裝類型", "Women | 外套"]);
      case "top-men":
        return setListLocation(["服裝類型", "Men | 上衣"]);
      case "accessories":
        return setListLocation(["服裝類型", "配件&包包"]);
      case "machu":
        return setListLocation(["台灣品牌", "Machu"]);
      case "machu-discovery-series":
        return setListLocation(["台灣品牌", "Machu Discovery Series"]);
      case "emago":
        return setListLocation(["日本品牌", "Emago"]);
      case "alma-design":
        return setListLocation(["日本品牌", "Alma Design"]);
      case "mitis":
        return setListLocation(["日本品牌", "mitis"]);
      case "others":
        return setListLocation(["日本品牌", "其他日本品牌"]);
      default:
        return setListLocation(["預定放入搜尋字串", "搜尋結果"]);
    }
  }, [category]);

  return (
    <>
      {!searchText && (
        <div className="location s-text">
          <Helmet>
            <title>Machu Days商品捐贈平台 - {`${listLocation[1]}`}</title>
          </Helmet>
          <div>{listLocation[0]}</div>
          <div>{category != "all" && <span>&gt;</span>}</div>
          <div>{listLocation[1]}</div>
        </div>
      )}
      {searchText && (
        <div className="location s-text">
          <Helmet>
            <title>
              Machu Days商品捐贈平台 - 「{`${searchText}`}」搜尋結果
            </title>
          </Helmet>
          <div className="search-text">「{searchText}」</div>
          <div>搜尋結果</div>
        </div>
      )}
    </>
  );
};

export const ItemLocation = ({ id }) => {
  const all = useSelector((state) => state.items.all);
  const selectedItem = all.find((doc) => {
    return doc.id === id;
  });
  const category1 = selectedItem.data().category1;

  const [itemLocation, setItemLocation] = useState([]);

  useEffect(() => {
    switch (category1) {
      case "top":
        return setItemLocation(["服裝類型", "Women | 上衣"]);
      case "bottoms":
        return setItemLocation(["服裝類型", "Women | 下著"]);
      case "outers":
        return setItemLocation(["服裝類型", "Women | 外套"]);
      case "top-men":
        return setItemLocation(["服裝類型", "Men | 上衣"]);
      case "accessories":
        return setItemLocation(["服裝類型", "配件&包包"]);
      default:
        return console.log("category1 error");
    }
  }, [category1]);

  return (
    <div className="location s-text">
      <div>{itemLocation[0]}</div>
      <div>
        <span>&gt;</span>
      </div>
      <div>{itemLocation[1]}</div>
    </div>
  );
};
