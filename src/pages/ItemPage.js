import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import { ItemLocation } from "../components/reusable/Location";
import ItemDetail from "../components/itemDetail/ItemDetail";

const ItemPage = ({ user, setLoginBoxOpen, cartItems, setCartItems }) => {
  const { pathname } = useLocation();
  const itemPath = pathname.split("/")[2];

  const all = useSelector((state) => state.items.all);

  return (
    <>
      {all.length > 1 && (
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
        </div>
      )}
    </>
  );
};

export default ItemPage;
