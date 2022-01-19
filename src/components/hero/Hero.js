import { useState } from "react";

import { HeroReason, HeroProcess } from "./HeroText";
import hero1 from "../../img/hero-1.jpg";
import hero2 from "../../img/hero-2.jpg";
import hero3 from "../../img/hero-3.jpg";

const Hero = () => {
  //Hero文字內容 (true放「平台緣由」，false放「訂單流程」)
  const [heroText, setHeroText] = useState(true);

  return (
    <div className="hero">
      <div className="hero-left">
        <div className="hero-img">
          <img src={hero1} alt="輪播圖" />
          <img src={hero2} alt="輪播圖" />
          <img src={hero3} alt="輪播圖" />
        </div>
        <div className="hero-blank"></div>
        <div className="bg-box-light"></div>
        <div className="bg-box-dark"></div>
      </div>
      <div className="hero-right">
        <div className="hero-text-upper">
          {heroText ? <HeroReason /> : <HeroProcess />}
        </div>
        <div className="hero-text-lower">
          <div>
            <div className="s-text center" onClick={() => setHeroText(true)}>
              平台緣由
            </div>
            <div className="center">
              {heroText && <div className="circle"></div>}
            </div>
          </div>
          <div>
            <div className="s-text center" onClick={() => setHeroText(false)}>
              訂單流程
            </div>
            <div className="center">
              {!heroText && <div className="circle"></div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
