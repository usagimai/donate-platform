import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

//reusable components
import { WhiteButton, NumberButton } from "../reusable/ButtonCollection";
import Confirm from "../reusable/Confirm";
//components
import Login from "../login/Login";
//others
import logoBird from "../../img/logo-bird.png";
import { app, auth } from "../../firebase-config";

const Nav = ({
  loginBoxOpen,
  setLoginBoxOpen,
  setItemMenuClicked,
  setNavLogoClicked,
  cartItemChange,
  setCartItemChange,
}) => {
  const user = auth.currentUser;
  const [cartItems, setCartItems] = useState("");
  const [logoutBoxOpen, setLogoutBoxOpen] = useState(false);

  //讀取購物車資料
  useEffect(() => {
    setCartItems(JSON.parse(localStorage.getItem("machudaysCart")));
    setCartItemChange(false);
  }, [cartItemChange]);

  const handleLoginBoxOpen = () => {
    setLoginBoxOpen(true);
    document.body.style.overflow = "hidden";
  };

  const handleLogoutBoxOpen = () => {
    setLogoutBoxOpen(true);
    document.body.style.overflow = "hidden";
  };

  return (
    <>
      {loginBoxOpen && <Login setLoginBoxOpen={setLoginBoxOpen} />}
      {logoutBoxOpen && (
        <Confirm
          setLogoutBoxOpen={setLogoutBoxOpen}
          message="是否確認登出?"
          confirmFor="logout"
        />
      )}

      <div className="nav">
        <div className="nav-content">
          <div className="logo-title-box">
            <div>
              <Link to="/">
                <img
                  src={logoBird}
                  alt="logo"
                  onClick={() => setNavLogoClicked(true)}
                />
              </Link>
            </div>
            <Link to="/">
              <div className="m-text" onClick={() => setNavLogoClicked(true)}>
                Machu Days商品捐贈平台
              </div>
            </Link>
          </div>
          <div>
            {!user && (
              <div className="pointer" onClick={handleLoginBoxOpen}>
                <WhiteButton text="登入" />
              </div>
            )}

            {user && (
              <div className="islogin">
                <div className="menu">
                  <div
                    className="s-text"
                    onClick={() => setItemMenuClicked(true)}
                  >
                    <Link to="/">商品</Link>
                  </div>
                  <div className="menu-decoration s-text">|</div>
                  <div className="s-text">
                    <span>
                      <Link to="/cart">購物車</Link>
                    </span>
                  </div>
                  <div>
                    {cartItems ? (
                      <NumberButton text={Object.keys(cartItems).length} />
                    ) : (
                      <NumberButton text="0" />
                    )}
                  </div>
                  <div className="menu-decoration s-text">|</div>
                  <div className="s-text">
                    <Link to="/order">訂單</Link>
                  </div>
                  <div className="menu-decoration s-text">|</div>
                  <div className="s-text">
                    <Link to="/favorite">收藏</Link>
                  </div>
                </div>
                <div className="pointer" onClick={handleLogoutBoxOpen}>
                  <WhiteButton text="登出" />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Nav;
