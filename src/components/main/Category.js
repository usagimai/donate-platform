import { DecorationTitle } from "../reusable/DecorationTitle";

const Category = () => {
  return (
    <div className="category">
      <div>
        <div className="category-title">
          <DecorationTitle title="服裝類型" fontSize="s-text" />
        </div>
        <div className="category-list s-text">
          <div>Women | 上衣</div>
          <div>Women | 下著</div>
          <div>Women | 外套</div>
          <div>Men | 上衣</div>
          <div>配件&包包</div>
        </div>
      </div>
      <div>
        <div className="category-title">
          <DecorationTitle title="台灣品牌" fontSize="s-text" />
        </div>
        <div className="category-list s-text">
          <div>Machu</div>
          <div>Machu Discovery Series</div>
        </div>
      </div>
      <div>
        <div className="category-title">
          <DecorationTitle title="日本品牌" fontSize="s-text" />
        </div>
        <div className="category-list s-text">
          <div>Emago</div>
          <div>Alma Design</div>
          <div>mitis</div>
          <div>其他日本品牌</div>
        </div>
      </div>
    </div>
  );
};

export default Category;
