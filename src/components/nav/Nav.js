import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { WhiteButton, NumberButton } from "../reusable/ButtonCollection";
import logoBird from "../../img/logo-bird.png";
import { Login } from "../loginOut/LoginOut";
import { Logout } from "../loginOut/LoginOut";

const Nav = ({ user, loginBoxOpen, setLoginBoxOpen, cartNum, setCartNum }) => {
  const [logoutBoxOpen, setLogoutBoxOpen] = useState(false);

  const handleLoginBoxOpen = () => {
    setLoginBoxOpen(true);
    document.body.style.overflow = "hidden";
  };

  const handleLogoutBoxOpen = () => {
    setLogoutBoxOpen(true);
    document.body.style.overflow = "hidden";
  };

  useEffect(() => {
    setCartNum(
      Object.keys(JSON.parse(localStorage.getItem("machudaysCart"))).length
    );
  }, []);

  return (
    <>
      {loginBoxOpen && <Login setLoginBoxOpen={setLoginBoxOpen} />}
      {logoutBoxOpen && <Logout setLogoutBoxOpen={setLogoutBoxOpen} />}

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

            {user && (
              <div className="islogin">
                <div className="menu">
                  <div className="s-text">
                    <Link to="/">商品</Link>
                  </div>
                  <div className="menu-decoration s-text">|</div>
                  <div className="s-text">
                    <span>購物車</span>
                  </div>
                  <div>
                    <NumberButton text={cartNum} />
                  </div>
                  <div className="menu-decoration s-text">|</div>
                  <div className="s-text">訂單</div>
                  <div className="menu-decoration s-text">|</div>
                  <div className="s-text">收藏</div>
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
