import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Helmet } from "react-helmet";
import { onAuthStateChanged } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";

//reusable components
import { TitleButton } from "../components/reusable/ButtonCollection";
import ScrollTop from "../components/reusable/ScrollTop";
import EmptyMessage from "../components/reusable/EmptyMessage";
import { Carousel } from "../components/reusable/Carousel";
//components
import CartDetailAll from "../components/cart/CartDetailAll";
import Note from "../components/cart/Note";
import Delivery from "../components/cart/Delivery";
import { OrderSubmitted } from "../components/cart/OrderSubmitted";
//others
import useScrollBlock from "../utils/useScrollBlock";
import { loadItems } from "../actions/itemsAction";
import { app, db, auth } from "../firebase-config";

const CartPage = ({ setLoginBoxOpen, cartItemChange, setCartItemChange }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [blockScroll, allowScroll] = useScrollBlock();

  const user = auth.currentUser;
  const all = useSelector((state) => state.items.all);
  const cartItems = JSON.parse(localStorage.getItem("machudaysCart"));

  const [stockStatus, setStockStatus] = useState([]);
  const [noStockItem, setNoStockItem] = useState([]);
  const [submittedBoxOpen, setSubmittedBoxOpen] = useState(false);

  //驗證登入狀態，若未登入則轉導回首頁
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        navigate("/", { replace: true });
      }
    });
  }, []);

  //初次進到購物車頁面後，若購物車有商品，判斷庫存是否足夠
  useEffect(async () => {
    if (!user) {
      return;
    } else {
      const dbRef = collection(db, "items");
      const itemData = await getDocs(dbRef);
      const all = itemData.docs;

      if (cartItems) {
        const currentCartInfo = Object.entries(cartItems).map((key) => {
          const id = key[0].split("_")[0];
          const type = key[0].split("_")[1];
          return { ["id"]: id, ["type"]: type, ["num"]: key[1] };
        });

        const currentStockStatus = [];
        currentCartInfo.forEach((itemC) => {
          const oneItem = all.find((itemA) => itemC.id === itemA.id);
          const prevStock = oneItem.data().stock[itemC.type][0];

          switch (true) {
            case Number(prevStock - itemC.num) >= 0:
              currentStockStatus.push("stockEnough");
              itemC.num = itemC.num;
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

        //將驗證庫存後、調整後的需求數量再存進local storage
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
        setCartItemChange(true);
        dispatch(loadItems());
      }
    }
  }, []);

  //未登入狀態進入此頁面後，不顯示內容
  if (!user) return null;

  return (
    <>
      {submittedBoxOpen && (
        <OrderSubmitted
          setSubmittedBoxOpen={setSubmittedBoxOpen}
          allowScroll={allowScroll}
        />
      )}
      <div className="cart-page">
        <Helmet>
          <title>Machu Days商品捐贈平台 - 購物車</title>
        </Helmet>
        <div className="cart-page-title">
          <TitleButton text="購物車" />
        </div>
        {cartItems && Object.keys(cartItems).length !== 0 && (
          <>
            <div>
              <CartDetailAll
                stockStatus={stockStatus}
                noStockItem={noStockItem}
                cartItemChange={cartItemChange}
                setCartItemChange={setCartItemChange}
              />
            </div>
            <div className="cart-page-lower">
              <div>
                <Note />
              </div>
              <div>
                <Delivery
                  setStockStatus={setStockStatus}
                  noStockItem={noStockItem}
                  setNoStockItem={setNoStockItem}
                  setSubmittedBoxOpen={setSubmittedBoxOpen}
                  setCartItemChange={setCartItemChange}
                  blockScroll={blockScroll}
                />
              </div>
            </div>
          </>
        )}
        {!cartItems || Object.keys(cartItems).length === 0 ? (
          <>
            <div>
              <EmptyMessage message="目前購物車是空的" />
            </div>
            {noStockItem.length > 0 && (
              <div className="stock-message s-text">
                <div>
                  抱歉，以下商品已<span>無庫存</span>：
                </div>
                {noStockItem.map((itemN, idx) => {
                  const oneNoStockItem = all.find(
                    (itemA) => itemN.id === itemA.id
                  );
                  const noStockItemName = oneNoStockItem.data().name;
                  return (
                    <div key={idx}>
                      {noStockItemName} ( 尺寸/顏色：{itemN.type} )
                    </div>
                  );
                })}
              </div>
            )}
            <div>
              <Carousel
                setLoginBoxOpen={setLoginBoxOpen}
                text="推薦商品"
                array="recommend"
              />
            </div>
            <div>
              <Carousel
                setLoginBoxOpen={setLoginBoxOpen}
                text="最近瀏覽"
                array="history"
              />
            </div>
          </>
        ) : null}
        <ScrollTop />
      </div>
    </>
  );
};

export default CartPage;
