import { DecorationTitle } from "../reusable/DecorationTitle";

const EmptyMessage = ({ message }) => {
  return (
    <div className="empty-message">
      <div>
        <DecorationTitle title={message} fontSize="m-text" />
      </div>
      <div className="line"></div>
    </div>
  );
};

export default EmptyMessage;
