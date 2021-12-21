import { useState, useEffect } from "react";

import { HeroReason, HeroProcess } from "./HeroText";
import hero1 from "../../img/hero-1.jpg";
import hero2 from "../../img/hero-2.jpg";
import hero3 from "../../img/hero-3.jpg";

const Hero = () => {
  //圖片輪播
  const [heroImg, setHeroImg] = useState("img1");

  useEffect(() => {
    const handleHeroImg = () => {
      switch (true) {
        case heroImg === "img1":
          setHeroImg("img2");
          break;
        case heroImg === "img2":
          setHeroImg("img3");
          break;
        case heroImg === "img3":
          setHeroImg("img1");
          break;
        default:
          console.log("handleHeroImgSrc error");
          break;
      }
    };

    let intervalImgID = setInterval(handleHeroImg, 5000);

    return () => clearInterval(intervalImgID);
  }, [heroImg]);

  //Hero文字內容
  //true放「平台緣由」，false放「訂單流程」
  const [heroText, setHeroText] = useState(true);

  useEffect(() => {
    const handleHeroText = () => {
      if (heroText) {
        setHeroText(false);
      } else {
        setHeroText(true);
      }
    };

    let intervalTextID = setInterval(handleHeroText, 5000);

    return () => clearInterval(intervalTextID);
  }, [heroText]);

  return (
    <div className="hero">
      <div className="hero-left">
        <div className="hero-img">
          {heroImg === "img1" && <img src={hero1} alt="輪播圖" />}
          {heroImg === "img2" && <img src={hero2} alt="輪播圖" />}
          {heroImg === "img3" && <img src={hero3} alt="輪播圖" />}
        </div>
        <div className="hero-blank"></div>
      </div>
      <div className="hero-right">
        <div className="hero-text-upper">
          {heroText ? <HeroReason /> : <HeroProcess />}
        </div>
        <div className="hero-text-lower">
          <div>
            <div className="s-text" onClick={() => setHeroText(true)}>
              平台緣由
            </div>
            <div className="center">
              {heroText && <div className="circle"></div>}
            </div>
          </div>
          <div>
            <div className="s-text" onClick={() => setHeroText(false)}>
              訂單流程
            </div>
            <div className="center">
              {!heroText && <div className="circle"></div>}
            </div>
          </div>
        </div>
      </div>
      <div className="bg-box-light"></div>
      <div className="bg-box-dark"></div>
    </div>
  );
};

export default Hero;
