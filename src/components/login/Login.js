import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";

import { IconSelector } from "../reusable/IconSelector";
import { TitleButton, BrownButton } from "../reusable/ButtonCollection";
import Backdrop from "../reusable/Backdrop";
import { loginData } from "../../data";
import { app, auth } from "../../firebase-config";

const Login = ({ setLoginBoxOpen }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [visible, setVisible] = useState(false);

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(() => handleLoginBoxClose())
      .catch((error) => {
        switch (error.code) {
          case "auth/user-not-found":
            return setErrorMessage("帳號不存在");
          case "auth/wrong-password":
            return setErrorMessage("密碼錯誤");
          default:
            return setErrorMessage("帳號或密碼錯誤");
        }
      });
  };

  const handleLoginBoxClose = () => {
    setLoginBoxOpen(false);
    document.body.style.overflow = "auto";
  };

  return (
    <Backdrop>
      <div className="white-container">
        <div className="close-bg" onClick={handleLoginBoxClose}>
          <IconSelector name="close" />
        </div>
        <div className="login-content">
          <TitleButton text={loginData.title} />
          <form>
            <div>
              <div className="id m-text">
                <label htmlFor="username">帳號</label>
                <input
                  type="text"
                  id="username"
                  size="23"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <div className="hidden">
                  <IconSelector name="unvisible" />
                </div>
              </div>
              <div className="pw m-text">
                <label htmlFor="password">密碼</label>
                <input
                  type={visible ? "text" : "password"}
                  id="password"
                  size="23"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <div onClick={() => setVisible((prev) => !prev)}>
                  <IconSelector name={visible ? "visible" : "unvisible"} />
                </div>
              </div>
              <div className="error-message s-text">{errorMessage}</div>
            </div>
            <div className="form-button pointer" onClick={handleLogin}>
              <BrownButton text="登入" />
            </div>
          </form>
          <div className="login-remark s-text">{loginData.remark}</div>
        </div>
      </div>
    </Backdrop>
  );
};

export default Login;
