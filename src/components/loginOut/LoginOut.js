import { IconSelector } from "../reusable/IconSelector";
import {
  TitleButton,
  BrownButton,
  BrownButtonReverse,
} from "../reusable/ButtonCollection";
import { loginData } from "../../data";
import Backdrop from "../reusable/Backdrop";

export const Login = () => {
  return (
    <Backdrop>
      <div className="white-container">
        <div className="close-bg">
          <IconSelector name="close" />
        </div>
        <div className="login-content">
          <TitleButton text={loginData.title} />
          <form>
            <div>
              <div className="id m-text">
                <label htmlFor="username">帳號</label>
                <input type="text" id="username" size="23" required />
                <div className="hidden">
                  <IconSelector name="viewable" />
                </div>
              </div>
              <div className="pw m-text">
                <label htmlFor="password">密碼</label>
                <input type="password" id="password" size="23" required />
                <div>
                  <IconSelector name="unviewable" />
                </div>
              </div>
            </div>
            <div className="form-button">
              <BrownButton text="登入" />
            </div>
          </form>
          <div className="login-remark s-text">{loginData.remark}</div>
        </div>
      </div>
    </Backdrop>
  );
};

export const Logout = () => {
  return (
    <Backdrop>
      <div className="white-container">
        <div className="close-bg">
          <IconSelector name="close" />
        </div>
        <div className="logout-content">
          <div className="m-text">是否確認登出?</div>
          <div className="logout-button">
            <BrownButton text="確認" />
            <BrownButtonReverse text="取消" />
          </div>
        </div>
      </div>
    </Backdrop>
  );
};
