import { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";

import { IconSelector } from "./IconSelector";
import ItemOne from "../main/ItemOne";

export const Carousel = ({ text, array }) => {
  //輪播用商品array(推薦)
  const all = useSelector((state) => state.items.all);
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
  const allForRandom = [...allWithoutNoStock];
  const [randomAll, setRandomAll] = useState("");
  useEffect(() => {
    setRandomAll(allForRandom.sort(() => Math.random() - 0.5).slice(0, 20));
  }, [allWithoutNoStock]);

  //輪播用商品array(最近瀏覽)
  const [historyIdArrOriginal, setHistoryIdArrOriginal] = useState([]);
  const [historyArr, setHistoryArr] = useState([]);

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("machudaysHistory"))) {
      setHistoryIdArrOriginal(
        JSON.parse(localStorage.getItem("machudaysHistory"))
      );
    }
  }, []);

  const historyItemsArr = [];
  useEffect(() => {
    if (allWithoutNoStock.length === 0) {
      return;
    } else {
      switch (true) {
        case historyIdArrOriginal.length > 0:
          historyIdArrOriginal.map((id) => {
            const historyItems = allWithoutNoStock.find(
              (item) => item.id === id
            );
            historyItemsArr.push(historyItems);
          });
          setHistoryArr(historyItemsArr);
          break;
        case historyIdArrOriginal.length === 0:
          setHistoryArr([]);
          break;
        default:
          console.log("historyIdArrOriginal convertion error");
          break;
      }
    }
  }, [historyIdArrOriginal, allWithoutNoStock]);

  //輪播功能相關
  const [gridColumnNum, setGridColumnNum] = useState("");
  const [width, setWidth] = useState("");
  const gridRef = useRef();

  const [arrIdx, setArrIdx] = useState("");
  const [arrOriginal, setArrOriginal] = useState("");
  const [arrBatch, setArrBatch] = useState("");

  //監聽螢幕尺寸變動 (顯示的商品數量也會變動)
  useEffect(() => {
    window.addEventListener("resize", () => setWidth(window.innerWidth), {
      passive: true,
    });
    return () =>
      window.removeEventListener("resize", () => setWidth(window.innerWidth));
  }, []);

  //取得grid的column數(依螢幕尺寸調整)
  useEffect(() => {
    const allData = window.getComputedStyle(gridRef.current);
    const gridData = allData
      .getPropertyValue("grid-template-columns")
      .split(" ").length;
    setGridColumnNum(gridData);
  }, [width]);

  //依據grid的column數量決定array slice的數量
  useEffect(() => {
    setArrIdx([0, gridColumnNum]);
  }, [gridColumnNum]);

  //依據array這個prop的值決定顯示哪個商品array
  useEffect(() => {
    if (allWithoutNoStock.length === 0) {
      return;
    } else {
      switch (array) {
        case "recommend":
          setArrOriginal(randomAll);
          setArrBatch(randomAll.slice(arrIdx[0], arrIdx[1]));
          break;
        case "history":
          setArrOriginal(historyArr);
          setArrBatch(historyArr.slice(arrIdx[0], arrIdx[1]));
          break;
        default:
          break;
      }
    }
  }, [arrIdx, randomAll, historyArr]);

  const handleNext = () => {
    setArrIdx((prevValue) => {
      const [start, end] = prevValue;
      return [start + gridColumnNum, end + gridColumnNum];
    });
  };

  const handleBack = () => {
    setArrIdx((prevValue) => {
      const [start, end] = prevValue;
      return [start - gridColumnNum, end - gridColumnNum];
    });
  };

  return (
    <div className="carousel">
      <div className="m-text">{text}</div>
      <div className="carousel-items" ref={gridRef}>
        <div
          className="circle-arrow-left"
          hidden={arrIdx[0] === 0}
          onClick={handleBack}
        >
          <IconSelector name="circle-arrow-left" />
        </div>

        {allWithoutNoStock &&
          arrBatch &&
          arrBatch.length > 0 &&
          arrBatch.map((doc) => (
            <ItemOne
              image={doc.data().mainImg}
              name={doc.data().name}
              id={doc.id}
              key={doc.id}
            />
          ))}

        <div
          className="circle-arrow-right"
          hidden={
            arrOriginal.length <= gridColumnNum ||
            (arrIdx[1] - arrOriginal.length >= 0 &&
              arrIdx[1] - arrOriginal.length <= gridColumnNum - 1)
          }
          onClick={handleNext}
        >
          <IconSelector name="circle-arrow-right" />
        </div>
      </div>
    </div>
  );
};
