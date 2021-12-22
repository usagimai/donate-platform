import { TitleButton, BrownButton } from "../reusable/ButtonCollection";

const Delivery = () => {
  return (
    <div className="delivery">
      <div className="delivery-title">
        <TitleButton text="收件資訊" />
      </div>
      <form>
        <div className="delivery-input s-text">
          <div>
            <label htmlFor="delivery-name">收件人姓名</label>
          </div>
          <div>
            <input type="text" id="delivery-name" size="49" required />
          </div>
          <div>
            <label htmlFor="delivery-tel">聯絡電話</label>
          </div>
          <div>
            <input type="text" id="delivery-tel" size="49" required />
          </div>
          <div>
            <label htmlFor="delivery-add">收件地址</label>
          </div>
          <div>
            <input type="text" id="delivery-add" size="49" required />
          </div>
          <div>
            <label htmlFor="delivery-remark">備註</label>
          </div>
          <div>
            <input type="text" id="delivery-remark" size="49" />
          </div>
        </div>
        <div className="delivery-button">
          <BrownButton text="送出訂單" />
        </div>
      </form>
    </div>
  );
};

export default Delivery;
