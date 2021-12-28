import { useState, useEffect } from "react";

import { IconSelector } from "../reusable/IconSelector";
import { footerData } from "../../data";
import copied from "../../img/copied.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard
      .writeText("usagimai@gmail.com")
      .then(() => setIsCopied(true))
      .catch(() => console.log("copy error"));
  };

  useEffect(() => {
    let timeoutID = setTimeout(() => setIsCopied(false), 1500);
    return () => clearTimeout(timeoutID);
  }, [isCopied]);

  return (
    <div className="footer">
      <div className="footer-message">
        {console.log(isCopied)}
        {isCopied && (
          <div className="copied">
            <img src={copied} alt="信箱已複製" />
          </div>
        )}
        <div>
          <IconSelector name={isCopied ? "mail-open" : "email"} />
        </div>
        <div className="s-text">
          <div>{footerData.message}</div>
          <div className="pointer" onClick={handleCopy}>
            {footerData.email}
          </div>
        </div>
      </div>
      <div className="s-text">© {currentYear} Machu Days</div>
    </div>
  );
};

export default Footer;
