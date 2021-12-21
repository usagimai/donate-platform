import { IconSelector } from "../reusable/IconSelector";
import { heroData } from "../../data";
import logo from "../../img/logo.png";

export const HeroReason = () => {
  return (
    <div className="hero-reason">
      <div className="s-text">{heroData.reason}</div>
      <div className="center">
        <img src={logo} alt="logo" />
      </div>
    </div>
  );
};

export const HeroProcess = () => {
  return (
    <div className="hero-process">
      <div className="process-box s-text">{heroData.process1}</div>
      <div>
        <IconSelector name="hero-process-down" />
      </div>
      <div className="process-box s-text">{heroData.process2}</div>
      <div>
        <IconSelector name="hero-process-down" />
      </div>
      <div className="process-box s-text">{heroData.process3}</div>
      <div>
        <IconSelector name="hero-process-down" />
      </div>
      <div className="process-box s-text">{heroData.process4}</div>
    </div>
  );
};
