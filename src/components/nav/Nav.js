import { useState } from "react";
import { Link } from "react-router-dom";

import { WhiteButton, NumberButton } from "../reusable/ButtonCollection";
import Confirm from "../reusable/Confirm";
import logoBird from "../../img/logo-bird.png";
import Login from "../login/Login";

const Nav = ({ user, loginBoxOpen, setLoginBoxOpen, cartItems }) => {
  const [logoutBoxOpen, setLogoutBoxOpen] = useState(false);

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
                <img src={logoBird} alt="logo" />
              </Link>
            </div>
            <Link to="/">
              <div className="m-text">Machu Days商品捐贈平台</div>
            </Link>
          </div>
          <div>
            {!user && (
              <div className="pointer" onClick={handleLoginBoxOpen}>
                <WhiteButton text="登入" />
              </div>
            )}

            {user && cartItems && (
              <div className="islogin">
                <div className="menu">
                  <div className="s-text">
                    <Link to="/">商品</Link>
                  </div>
                  <div className="menu-decoration s-text">|</div>
                  <div className="s-text">
                    <span>
                      <Link to="/cart">購物車</Link>
                    </span>
                  </div>
                  <div>
                    <NumberButton text={Object.keys(cartItems).length} />
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
