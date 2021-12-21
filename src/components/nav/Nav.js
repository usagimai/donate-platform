import { LoginButton } from "../reusable/ButtonCollection";
import logoBird from "../../img/logo-bird.png";
import { Login } from "../loginOut/LoginOut";

const Nav = () => {
  return (
    <>
      <Login />
      <div className="nav">
        <div className="nav-content">
          <div className="logo-title-box">
            <div>
              <img src={logoBird} alt="logo" />
            </div>
            <div className="m-text">Machu Days商品捐贈平台</div>
          </div>
          <div className="menu">
            <LoginButton text="登入" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Nav;
