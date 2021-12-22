import { WhiteButton, NumberButton } from "../reusable/ButtonCollection";
import logoBird from "../../img/logo-bird.png";
import { Login } from "../loginOut/LoginOut";
import { Logout } from "../loginOut/LoginOut";

const Nav = () => {
  return (
    <>
      {/* <Login /> */}
      {/* <Logout /> */}
      <div className="nav">
        <div className="nav-content">
          <div className="logo-title-box">
            <div>
              <img src={logoBird} alt="logo" />
            </div>
            <div className="m-text">Machu Days商品捐贈平台</div>
          </div>
          <div>
            {/* <WhiteButton text="登入" /> */}
            <div className="islogin">
              <div className="menu">
                <div className="s-text">商品</div>
                <div className="menu-decoration s-text">|</div>
                <div className="s-text">
                  <span>購物車</span>
                </div>
                <div>
                  <NumberButton text="3" />
                </div>
                <div className="menu-decoration s-text">|</div>
                <div className="s-text">訂單</div>
                <div className="menu-decoration s-text">|</div>
                <div className="s-text">收藏</div>
              </div>
              <div>
                <WhiteButton text="登出" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Nav;
