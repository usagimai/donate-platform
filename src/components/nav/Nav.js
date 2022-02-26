import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

//reusable components
import { WhiteButton, NumberButton } from "../reusable/ButtonCollection";
import Confirm from "../reusable/Confirm";
//components
import Login from "../login/Login";
//others
import useScrollBlock from "../../utils/useScrollBlock";
import logoBird from "../../img/logo-bird.png";
import { app, auth } from "../../firebase-config";

const Nav = ({
  setItemMenuClicked,
  setNavLogoClicked,
  cartItemChange,
  setCartItemChange,
  isDown,
}) => {
  const [blockScroll, allowScroll] = useScrollBlock();

  const user = auth.currentUser;
  const [cartItems, setCartItems] = useState("");
  const [loginBoxOpen, setLoginBoxOpen] = useState(false);
  const [logoutBoxOpen, setLogoutBoxOpen] = useState(false);
  const [isTestAccount, setIsTestAccount] = useState(false);

  const handleLoginBoxOpen = () => {
    setLoginBoxOpen(true);
    blockScroll();
  };

  const handleLogoutBoxOpen = () => {
    setLogoutBoxOpen(true);
    blockScroll();
  };

  //讀取購物車資料
  useEffect(() => {
    setCartItems(JSON.parse(localStorage.getItem("machudaysCart")));
    setCartItemChange(false);
  }, [cartItemChange]);

  //若是測試用帳號，顯示「測試用帳號」div
  useEffect(() => {
    if (!user) {
      setIsTestAccount(false);
    } else {
      if (user.email === "test@test.com") {
        setIsTestAccount(true);
      } else {
        setIsTestAccount(false);
      }
    }
  }, [user]);

  return (
    <>
      {loginBoxOpen && (
        <Login setLoginBoxOpen={setLoginBoxOpen} allowScroll={allowScroll} />
      )}
      {logoutBoxOpen && (
        <Confirm
          setLogoutBoxOpen={setLogoutBoxOpen}
          message="是否確認登出?"
          confirmFor="logout"
          allowScroll={allowScroll}
        />
      )}

      <div className={`nav ${isDown ? "nav-hide" : "nav-show"}`}>
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

      {isTestAccount && (
        <div className="test-account">
          <div>測試用</div>
          <div>帳號</div>
        </div>
      )}
    </>
  );
};

export default Nav;
