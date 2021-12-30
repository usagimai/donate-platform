import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import { ItemLocation } from "../components/reusable/Location";
import ItemDetail from "../components/itemDetail/ItemDetail";

const ItemPage = ({ user, setLoginBoxOpen }) => {
  const { pathname } = useLocation();
  const itemPath = pathname.split("/")[2];

  const all = useSelector((state) => state.items.all);
  const selectedItem = all.find((doc) => {
    return doc.id === itemPath;
  });

  return (
    <>
      {all.length > 1 && (
        <div className="item-page">
          <div className="item-page-location">
            <ItemLocation category1={selectedItem.data().category1} />
          </div>
          <ItemDetail
            mainImg={selectedItem.data().mainImg}
            name={selectedItem.data().name}
            id={itemPath}
            size1={selectedItem.data().size1}
            stock1={selectedItem.data().stock1}
            detailImg1={selectedItem.data().detailImg1}
            detailImg2={selectedItem.data().detailImg2}
            infoImg={selectedItem.data().infoImg}
            key={itemPath}
            user={user}
            setLoginBoxOpen={setLoginBoxOpen}
          />
        </div>
      )}
    </>
  );
};

export default ItemPage;
