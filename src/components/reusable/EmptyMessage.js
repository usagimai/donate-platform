import { TitleButton } from "../reusable/ButtonCollection";
import { DecorationTitle } from "../reusable/DecorationTitle";

const EmptyMessage = () => {
  return (
    <div className="empty-message">
      <div>
        <DecorationTitle title="目前購物車是空的" fontSize="m-text" />
      </div>
      <div className="line"></div>
    </div>
  );
};

export default EmptyMessage;
