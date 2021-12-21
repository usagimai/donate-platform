import { IconSelector } from "../reusable/IconSelector";
import { footerData } from "../../data";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="footer">
      <div className="footer-message">
        <div>
          <IconSelector name="email" />
        </div>
        <div className="s-text">
          <div>{footerData.message}</div>
          <div>{footerData.email}</div>
        </div>
      </div>
      <div className="s-text">© {currentYear} Machu Days</div>
    </div>
  );
};

export default Footer;
