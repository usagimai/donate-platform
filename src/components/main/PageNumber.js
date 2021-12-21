import { IconSelector } from "../reusable/IconSelector";

export const PgNumSimple = () => {
  return (
    <div className="pg-num-container">
      <div>
        <IconSelector name="page-back" />
      </div>
      <div className="s-text">2 / 7</div>
      <div>
        <IconSelector name="page-next" />
      </div>
    </div>
  );
};

export const PgNumDetail = () => {
  return (
    <div className="pg-num-container">
      <div>
        <IconSelector name="page-back" />
      </div>
      <div className="s-text">
        &emsp;|&emsp;1&emsp;|&emsp;2&emsp;|&emsp;3&emsp;|&emsp;4&emsp;|&emsp;5&emsp;|&emsp;6&emsp;|&emsp;7&emsp;|&emsp;
      </div>
      <div>
        <IconSelector name="page-next" />
      </div>
    </div>
  );
};
