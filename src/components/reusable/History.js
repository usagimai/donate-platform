import ItemOne from "../main/ItemOne";
import { IconSelector } from "../reusable/IconSelector";

export const History = () => {
  return (
    <div className="carousel">
      <div className="m-text">最近瀏覽</div>
      <div className="carousel-items">
        <div className="circle-arrow-left">
          <IconSelector name="circle-arrow-left" />
        </div>
        <ItemOne />
        <ItemOne />
        <ItemOne />
        <ItemOne />
        <ItemOne />
        <div className="circle-arrow-right">
          <IconSelector name="circle-arrow-right" />
        </div>
      </div>
    </div>
  );
};
