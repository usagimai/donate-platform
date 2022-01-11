import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import { ItemLocation } from "../components/reusable/Location";
import ScrollTop from "../components/reusable/ScrollTop";
import ItemDetail from "../components/itemDetail/ItemDetail";

const ItemPage = ({ user, setLoginBoxOpen, cartItems, setCartItems }) => {
  const { pathname } = useLocation();
  const itemPath = pathname.split("/")[2];

  const all = useSelector((state) => state.items.all);

  return (
    <>
      {all.length && (
        <div className="item-page">
          <div className="item-page-location">
            <ItemLocation id={itemPath} />
          </div>
          <ItemDetail
            id={itemPath}
            user={user}
            setLoginBoxOpen={setLoginBoxOpen}
            cartItems={cartItems}
            setCartItems={setCartItems}
          />
          <ScrollTop />
        </div>
      )}
    </>
  );
};

export default ItemPage;
