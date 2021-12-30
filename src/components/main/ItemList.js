import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { DecorationTitle } from "../reusable/DecorationTitle";
import ItemOne from "./ItemOne";

const ItemList = ({ searchText, setSearchText, user, setLoginBoxOpen }) => {
  const { pathname } = useLocation();
  const categoryPath = pathname.split("/")[1];
  const searchPath = decodeURI(pathname.split("/")[2]);

  const dispatch = useDispatch();

  const all = useSelector((state) => state.items.all);
  const category = useSelector((state) => state.category);

  const [itemList, setItemList] = useState("");
  const [searchList, setSearchList] = useState("");

  //顯示分類
  useEffect(() => {
    const category1 = all.map((doc) => doc.data().category1);
    const category2 = all.map((doc) => doc.data().category2);

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
          all.filter((doc) => {
            return doc.data().category1 === category;
          })
        );
      case category2.includes(category):
        return setItemList(
          all.filter((doc) => {
            return doc.data().category2 === category;
          })
        );
      default:
        return setItemList([]);
    }
  }, [category, categoryPath, all]);

  //顯示搜尋結果
  useEffect(() => {
    setSearchList(
      all.filter((doc) => {
        return doc.data().name.match(new RegExp(searchText, "gi"));
      })
    );
  }, [searchText, all]);
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
            all.map((doc) => (
              <ItemOne
                image={doc.data().mainImg}
                name={doc.data().name}
                id={doc.id}
                key={doc.id}
                user={user}
                setLoginBoxOpen={setLoginBoxOpen}
              />
            ))}
          {itemList &&
            itemList.map((doc) => (
              <ItemOne
                image={doc.data().mainImg}
                name={doc.data().name}
                id={doc.id}
                key={doc.id}
                user={user}
                setLoginBoxOpen={setLoginBoxOpen}
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
              user={user}
              setLoginBoxOpen={setLoginBoxOpen}
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
