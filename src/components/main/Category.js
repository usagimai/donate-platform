import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import { DecorationTitle } from "../reusable/DecorationTitle";

const Category = () => {
  const dispatch = useDispatch();

  //對應categoryReducer
  const handleCategory = (category) => {
    dispatch({ type: category });
  };

  return (
    <div className="category">
      <div>
        <div className="category-title">
          <DecorationTitle title="服裝類型" fontSize="s-text" />
        </div>
        <div className="category-list s-text">
          <div>
            <Link to="/top" onClick={() => handleCategory("TOP")}>
              Women&emsp;|&emsp;上衣
            </Link>
          </div>
          <div>
            <Link to="/bottoms" onClick={() => handleCategory("BOTTOMS")}>
              Women&emsp;|&emsp;下著
            </Link>
          </div>
          <div>
            <Link to="/outers" onClick={() => handleCategory("OUTERS")}>
              Women&emsp;|&emsp;外套
            </Link>
          </div>
          <div>
            <Link to="/top-men" onClick={() => handleCategory("TOP-MEN")}>
              Men&emsp;|&emsp;上衣
            </Link>
          </div>
          <div>
            <Link
              to="/accessories"
              onClick={() => handleCategory("ACCESSORIES")}
            >
              配件 & 包包
            </Link>
          </div>
        </div>
      </div>
      <div>
        <div className="category-title">
          <DecorationTitle title="台灣品牌" fontSize="s-text" />
        </div>
        <div className="category-list s-text">
          <div>
            <Link to="/machu" onClick={() => handleCategory("MACHU")}>
              Machu
            </Link>
          </div>
          <div>
            <Link
              to="/machu-discover"
              onClick={() => handleCategory("MACHU-DISCOVER")}
            >
              Machu Discovery Series
            </Link>
          </div>
        </div>
      </div>
      <div>
        <div className="category-title">
          <DecorationTitle title="日本品牌" fontSize="s-text" />
        </div>
        <div className="category-list s-text">
          <div>
            <Link to="/emago" onClick={() => handleCategory("EMAGO")}>
              Emago
            </Link>
          </div>
          <div>
            <Link
              to="/alma-design"
              onClick={() => handleCategory("ALMA-DESIGN")}
            >
              Alma Design
            </Link>
          </div>
          <div>
            <Link to="/mitis" onClick={() => handleCategory("MITIS")}>
              mitis
            </Link>
          </div>
          <div>
            <Link to="/others" onClick={() => handleCategory("OTHERS")}>
              其他日本品牌
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;
