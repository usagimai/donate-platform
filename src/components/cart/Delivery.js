import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  doc,
  setDoc,
  updateDoc,
  collection,
  getDocs,
} from "firebase/firestore";

import { TitleButton, BrownButton } from "../reusable/ButtonCollection";
import { app, db } from "../../firebase-config";
import { loadItems } from "../../actions/itemsAction";

const Delivery = ({ cartItems, setCartItems, user }) => {
  const dispatch = useDispatch();
  const all = useSelector((state) => state.items.all);
  const [deliveryForm, setDeliveryForm] = useState({
    name: "",
    tel: "",
    add: "",
    remark: "",
  });

  //初次render讀入session storage中的資料
  useEffect(() => {
    if (
      deliveryForm.name !== "" ||
      deliveryForm.tel !== "" ||
      deliveryForm.add !== "" ||
      deliveryForm.remark !== ""
    ) {
      setDeliveryForm(JSON.parse(sessionStorage.getItem("machudaysDelivery")));
    }
  }, []);

  const handleDeliveryForm = (e) => {
    const { name, value } = e.target;
    setDeliveryForm((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
  };

  //直接設定在handleDeliveryForm中會接收不到input欄位最後一個輸入的文字，需使用useEffect
  useEffect(() => {
    sessionStorage.setItem("machudaysDelivery", JSON.stringify(deliveryForm));
  }, [deliveryForm]);

  //訂單送出後扣除firestore商品庫存
  // [{id:123,type:'M',num:1},{id:123,type:'M',num:2},{id:456,type:'M',num:1}]  =>  {id:123,stock:[{type:'M',num:1},{type:'M',num:1}]}

  // [{id:123,stock:[{type:'M',num:1},{type:'M',num:1}]},{id:456,stock:[{type:'M',num:1},{type:'M',num:1}]}]

  const adjustStock = () => {
    //測試區 start==================
    currentCartInfo.forEach((itemC) => {
      const oneItem = all.find((itemA) => itemC.id === itemA.id);
      // const prevAllStockInfo = oneItem.data().stock;
      // const prevOtherStockInfo = prevAllStockInfo.filter(
      //   (item) => item.type !== itemC.type
      // );
      const prevStock = oneItem
        .data()
        .stock.find((el) => el.type === itemC.type).number;
      const itemRef = doc(db, "items", `${itemC.id}`);
      updateDoc(itemRef, {
        stock: [
          ...prevOtherStockInfo,
          { ["type"]: itemC.type, ["number"]: Number(prevStock - itemC.num) },
        ],
      });
      console.log(prevAllStockInfo);

      dispatch(loadItems());
    });

    //測試區 end==================

    // currentCartInfo.forEach((itemC) => {
    //   const oneItem = all.find((itemA) => itemC.id === itemA.id);
    //   const prevAllStockInfo =oneItem.data().stock;
    //   const prevOtherStockInfo = prevAllStockInfo.filter(
    //     (item) => item.type !== itemC.type
    //   );
    //   const prevStock = oneItem
    //     .data()
    //     .stock.find((el) => el.type === itemC.type).number;

    //   const itemRef = doc(db, "items", `${itemC.id}`);
    //   updateDoc(itemRef, {
    //     stock: [
    //   ...prevOtherStockInfo,
    //   { ["type"]: itemC.type, ["number"]: Number(prevStock - itemC.num) },
    // ],
    //   });
    // });
  };

  const getMonth = () => {
    const month = new Date().getMonth() + 1;
    if (month < 10) {
      return `0${month}`;
    } else {
      return month;
    }
  };
  const getDay = () => {
    const day = new Date().getDate();
    if (day < 10) {
      return `0${day}`;
    } else {
      return day;
    }
  };
  const year = new Date().getFullYear();
  const month = getMonth();
  const day = getDay();
  const time = new Date().getTime();

  const currentCartInfo = Object.entries(cartItems).map((key) => {
    const id = key[0].split("_")[0];
    const type = key[0].split("_")[1];
    return { ["id"]: id, ["type"]: type, ["num"]: key[1] };
  });

  //訂單資料存至firestore＆清空購物車
  const orderSubmit = () => {
    setDoc(doc(db, "orders", `${year}${month}${day}_${time}`), {
      email: user.email,
      date: `${year}/${month}/${day}`,
      status: "訂單處理中",
      item: currentCartInfo,
      deliveryName: deliveryForm.name,
      deliveryTel: deliveryForm.tel,
      deliveryAdd: deliveryForm.add,
      deliveryRemark: deliveryForm.remark,
    });
    setCartItems({});
    setDeliveryForm({
      name: "",
      tel: "",
      add: "",
      remark: "",
    });
    localStorage.setItem("machudaysCart", {});
    adjustStock();
    dispatch(loadItems());
  };

  const [infoIsEmpty, setInfoIsEmpty] = useState(false);

  //點下「送出訂單」後，先判斷庫存是否足夠、收件資料是否有漏填
  const handleSubmit = async () => {
    const dbRef = collection(db, "items");
    const itemData = await getDocs(dbRef);
    const all = itemData.docs;

    const notEnough = [];
    currentCartInfo.forEach((itemC) => {
      const oneItem = all.find((itemA) => itemC.id === itemA.id);
      const prevStock = oneItem
        .data()
        .stock.find((el) => el.type === itemC.type).number;

      if (Number(prevStock - itemC.num) < 0) {
        notEnough.push(itemC);
      }
    });

    switch (true) {
      case notEnough.length > 0:
        //待更新
        console.log("庫存不夠");
        break;
      case deliveryForm.name === "" ||
        deliveryForm.tel === "" ||
        deliveryForm.add === "":
        setInfoIsEmpty(true);
        break;
      default:
        orderSubmit();
        break;
    }
  };

  return (
    <div className="delivery">
      <div className="delivery-title">
        <TitleButton text="收件資訊" />
      </div>
      <form>
        <div className="delivery-input s-text">
          <div>
            <label htmlFor="delivery-name">收件人姓名</label>
          </div>
          <div>
            <input
              type="text"
              id="delivery-name"
              size="49"
              required
              name="name"
              value={deliveryForm.name}
              onChange={handleDeliveryForm}
            />
          </div>
          <div>
            <label htmlFor="delivery-tel">聯絡電話</label>
          </div>
          <div>
            <input
              type="text"
              id="delivery-tel"
              size="49"
              required
              name="tel"
              value={deliveryForm.tel}
              onChange={handleDeliveryForm}
            />
          </div>
          <div>
            <label htmlFor="delivery-add">收件地址</label>
          </div>
          <div>
            <input
              type="text"
              id="delivery-add"
              size="49"
              required
              name="add"
              value={deliveryForm.add}
              onChange={handleDeliveryForm}
            />
          </div>
          <div>
            <label htmlFor="delivery-remark">備註</label>
          </div>
          <div>
            <input
              type="text"
              id="delivery-remark"
              size="49"
              name="remark"
              value={deliveryForm.remark}
              onChange={handleDeliveryForm}
            />
          </div>
        </div>
        <div className="delivery-button pointer" onClick={handleSubmit}>
          {infoIsEmpty && (
            <div className="center s-text">
              「收件人姓名」、「聯絡電話」及「收件地址」皆為必填
            </div>
          )}
          <BrownButton text="送出訂單" />
        </div>
      </form>
    </div>
  );
};

export default Delivery;
