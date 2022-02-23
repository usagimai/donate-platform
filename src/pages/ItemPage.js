import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import { ItemLocation } from "../components/reusable/Location";
import ScrollTop from "../components/reusable/ScrollTop";
import ItemDetail from "../components/itemDetail/ItemDetail";

const ItemPage = ({ setCartItemChange }) => {
  const { pathname } = useLocation();
  const itemPath = pathname.split("/")[2];

  const all = useSelector((state) => state.items.all);

  const [historyIdArrOriginal, setHistoryIdArrOriginal] = useState("");
  const [historyIdArr, setHistoryIdArr] = useState([]);

  //讀取最近瀏覽商品
  useEffect(() => {
    setHistoryIdArrOriginal(
      JSON.parse(localStorage.getItem("machudaysHistory"))
    );
  }, []);

  //使用itemPath加入最近瀏覽的商品array，並使商品不重複
  useEffect(() => {
    if (!historyIdArrOriginal) {
      setHistoryIdArr([itemPath]);
    } else {
      const originalArr = [itemPath, ...historyIdArrOriginal];
      const uniqueItems = new Set();
      const repeatItems = new Set();
      originalArr.slice(0, 20).forEach((item) => {
        uniqueItems.has(item) ? repeatItems.add(item) : uniqueItems.add(item);
      });
      setHistoryIdArr([...uniqueItems]);
    }
  }, [historyIdArrOriginal]);

  //儲存調整後的最近瀏覽商品array
  useEffect(() => {
    localStorage.setItem("machudaysHistory", JSON.stringify(historyIdArr));
  }, [historyIdArr]);

  return (
    <>
      {all.length && (
        <div className="item-page">
          <div className="item-page-location">
            <ItemLocation id={itemPath} />
          </div>
          <ItemDetail id={itemPath} setCartItemChange={setCartItemChange} />
          <ScrollTop />
        </div>
      )}
    </>
  );
};

export default ItemPage;
