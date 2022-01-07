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

const Delivery = ({
  cartItems,
  setCartItems,
  user,
  setStockStatus,
  setNoStockItem,
  setSubmittedBoxOpen,
}) => {
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
    setDeliveryForm(JSON.parse(sessionStorage.getItem("machudaysDelivery")));
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

  //3.訂單送出後扣除firestore商品庫存
  const adjustStock = () => {
    currentCartInfo.forEach((itemC) => {
      const itemRef = doc(db, "items", `${itemC.id}`);
      const oneItem = all.find((itemA) => itemC.id === itemA.id);
      const prevStock = oneItem.data().stock[itemC.type][0];
      const prevNo = oneItem.data().stock[itemC.type][1];
      updateDoc(itemRef, {
        [`stock.${itemC.type}`]: [
          Number(prevStock - itemC.num),
          Number(prevNo),
        ],
      });
    });
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

  //2.訂單資料存至firestore＆清空購物車
  const orderSubmit = () => {
    setDoc(doc(db, "orders", `${year}${month}${day}_${time}`), {
      docID: `${year}${month}${day}${time}`,
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
    // setDeliveryForm({
    //   name: "",
    //   tel: "",
    //   add: "",
    //   remark: "",
    // });
    localStorage.removeItem("machudaysCart");
    adjustStock();
    dispatch(loadItems());
  };

  const [infoIsEmpty, setInfoIsEmpty] = useState(false);
  const scrollTop = () => {
    window.scroll({
      top: 0,
      left: 0,
    });
  };

  //1.點下「送出訂單」後，先判斷庫存是否足夠、收件資料是否有漏填
  const handleSubmit = async () => {
    const dbRef = collection(db, "items");
    const itemData = await getDocs(dbRef);
    const all = itemData.docs;

    const currentStockStatus = [];
    currentCartInfo.forEach((itemC) => {
      const oneItem = all.find((itemA) => itemC.id === itemA.id);
      const prevStock = oneItem.data().stock[itemC.type][0];

      switch (true) {
        case Number(prevStock - itemC.num) >= 0:
          currentStockStatus.push("stockEnough");
          break;
        case Number(prevStock - itemC.num) < 0 && prevStock === 0:
          itemC.num = 0;
          break;
        case Number(prevStock - itemC.num) < 0 && prevStock !== 0:
          currentStockStatus.push("noEnoughStock");
          itemC.num = prevStock;
          break;
        default:
          return;
      }
    });
    setStockStatus(currentStockStatus);
    setNoStockItem(currentCartInfo.filter((item) => item.num === 0));

    const editedCartInfo = currentCartInfo
      .filter((item) => item.num !== 0)
      .reduce(
        (acc, item) => ({
          ...acc,
          [`${item.id}_${item.type}`]: Number(`${item.num}`),
        }),
        {}
      );
    localStorage.setItem("machudaysCart", JSON.stringify(editedCartInfo));
    setCartItems(editedCartInfo);

    switch (true) {
      case currentCartInfo.filter((item) => item.num === 0).length > 0 ||
        currentStockStatus.includes("noEnoughStock"):
        scrollTop();
        dispatch(loadItems());
        break;
      case deliveryForm.name === "" ||
        deliveryForm.tel === "" ||
        deliveryForm.add === "":
        setInfoIsEmpty(true);
        break;
      default:
        orderSubmit();
        scrollTop();
        setSubmittedBoxOpen(true);
        document.body.style.overflow = "hidden";
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
