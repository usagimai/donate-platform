import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";

import { IconSelector } from "../reusable/IconSelector";
import { BrownButton, BrownButtonReverse } from "../reusable/ButtonCollection";
import Backdrop from "../reusable/Backdrop";
import { handleRemoveFavorite2 } from "../../utils/favoritesUtils";
import { app, auth } from "../../firebase-config";

const Confirm = ({
  setLogoutBoxOpen,
  setDeleteBoxOpen,
  setDeleteFavBoxOpen,
  message,
  confirmFor,
  allowScroll,
  id,
  type,
  setCartItemChange,
  dispatch,
  favorites,
  idFav,
}) => {
  const navigate = useNavigate();
  const user = auth.currentUser;
  const [cartItems, setCartItems] = useState("");

  useEffect(() => {
    setCartItems(JSON.parse(localStorage.getItem("machudaysCart")));
  }, []);

  //通用
  const handleConfirmFor = () => {
    switch (confirmFor) {
      case "logout":
        signOut(auth)
          .then(() => handleLogoutNavigate())
          .catch((error) => {
            console.log("logout error");
          });
        break;
      case "deleteItem":
        const keyToDelete = `${id}_${type}`;
        const { [keyToDelete]: value, ...editedCartItems } = cartItems;
        localStorage.setItem("machudaysCart", JSON.stringify(editedCartItems));
        setCartItemChange(true);
        handleConfirmBoxClose();
        break;
      case "deleteFavorites":
        handleRemoveFavorite2(dispatch, favorites, user, idFav);
        handleConfirmBoxClose();
        break;
      default:
        console.log("confirmFor error");
    }
  };

  const handleConfirmBoxClose = () => {
    switch (confirmFor) {
      case "logout":
        setLogoutBoxOpen(false);
        break;
      case "deleteItem":
        setDeleteBoxOpen(false);
        break;
      case "deleteFavorites":
        setDeleteFavBoxOpen(false);
        break;
      default:
        console.log("confirmBoxClose error");
    }
    allowScroll();
  };

  //確認登出相關
  const handleLogoutNavigate = () => {
    handleConfirmBoxClose();
    navigate("/", { push: true });
  };

  return (
    <Backdrop>
      <div className="white-container confirm-white-container">
        <div className="close-bg" onClick={handleConfirmBoxClose}>
          <IconSelector name="close" />
        </div>
        <div className="confirm-content">
          <div className="m-text">{message}</div>
          <div className="confirm-button">
            <div onClick={handleConfirmFor} className="pointer">
              <BrownButton text="確認" />
            </div>
            <div onClick={handleConfirmBoxClose} className="pointer">
              <BrownButtonReverse text="取消" />
            </div>
          </div>
        </div>
      </div>
    </Backdrop>
  );
};

export default Confirm;
