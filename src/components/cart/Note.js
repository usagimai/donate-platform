import { DecorationTitle } from "../reusable/DecorationTitle";
import { orderRemarkData } from "../../data";

const Note = () => {
  return (
    <div className="note">
      <div>
        <DecorationTitle title="注意事項" fontSize="s-text" />
      </div>
      <div className="s-text">
        <div>{orderRemarkData.remark1}</div>
        <div>{orderRemarkData.remark2}</div>
        <div>{orderRemarkData.remark3}</div>
      </div>
    </div>
  );
};

export default Note;
