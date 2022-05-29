import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { DecorationTitle } from "../reusable/DecorationTitle";
import ItemOne from "./ItemOne";

const ItemList = ({ searchText, setSearchText }) => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const categoryPath = pathname.split("/")[1];
  const searchPath = decodeURI(pathname.split("/")[2]);

  const all = useSelector((state) => state.items.all);
  const category = useSelector((state) => state.category);

  const [itemList, setItemList] = useState("");
  const [searchList, setSearchList] = useState("");

  //所有尺寸/顏色都為0的品項不顯示於頁面
  const [allWithoutNoStock, setAllWithoutNoStock] = useState([]);
  useEffect(() => {
    setAllWithoutNoStock(
      all.filter((doc) => {
        const stockData = [];
        const stockNumData = [];
        for (let key in doc.data().stock) {
          stockData.push(doc.data().stock[key]);
        }
        for (let i = 0; i < stockData.length; i++) {
          stockNumData.push(stockData[i][0]);
        }

        if (
          stockNumData.reduce((accumulator, currentValue) => {
            return accumulator + currentValue;
          }) === 0
        ) {
          return;
        } else {
          return doc;
        }
      })
    );
  }, [all]);

  //顯示分類
  useEffect(() => {
    //每個商品有兩種分類 (服裝類型、品牌)
    const category1 = allWithoutNoStock.map((doc) => doc.data().category1);
    const category2 = allWithoutNoStock.map((doc) => doc.data().category2);

    //讓目前path與顯示分類一致
    const upperCasePath = categoryPath.toUpperCase();
    if (!upperCasePath) {
      dispatch({ type: "ALL" });
    } else {
      dispatch({ type: upperCasePath });
    }

    switch (true) {
      case category === "all":
        return setItemList(null);
      case category1.includes(category):
        return setItemList(
          allWithoutNoStock.filter((doc) => {
            return doc.data().category1 === category;
          })
        );
      case category2.includes(category):
        return setItemList(
          allWithoutNoStock.filter((doc) => {
            return doc.data().category2 === category;
          })
        );
      default:
        return setItemList([]);
    }
  }, [category, categoryPath, allWithoutNoStock]);

  //顯示搜尋結果
  useEffect(() => {
    setSearchList(
      allWithoutNoStock.filter((doc) => {
        return doc.data().name.match(new RegExp(searchText, "gi"));
      })
    );
  }, [searchText, allWithoutNoStock]);
  //讓目前path與搜尋結果一致
  useEffect(() => {
    if (searchPath === "undefined") {
      setSearchText("");
    } else {
      setSearchText(searchPath);
    }
  }, [searchPath]);

  return (
    <>
      {!searchText && (
        <div
          className={
            itemList && itemList.length === 0 ? "no-item" : "main-item-list"
          }
        >
          {!itemList &&
            allWithoutNoStock.map((doc) => (
              <ItemOne
                image={doc.data().mainImg}
                name={doc.data().name}
                id={doc.id}
                key={doc.id}
              />
            ))}
          {itemList &&
            itemList.map((doc) => (
              <ItemOne
                image={doc.data().mainImg}
                name={doc.data().name}
                id={doc.id}
                key={doc.id}
              />
            ))}
          {itemList && itemList.length === 0 && (
            <DecorationTitle title="抱歉，查無商品" fontSize="s-text" />
          )}
        </div>
      )}
      {searchText && (
        <div className={searchList.length === 0 ? "no-item" : "main-item-list"}>
          {searchList.map((doc) => (
            <ItemOne
              image={doc.data().mainImg}
              name={doc.data().name}
              id={doc.id}
              key={doc.id}
            />
          ))}
          {searchList.length === 0 && (
            <DecorationTitle title="抱歉，查無商品" fontSize="s-text" />
          )}
        </div>
      )}
    </>
  );
};

export default ItemList;
