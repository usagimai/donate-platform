export const DecorationTitle = ({ title, fontSize }) => {
  return (
    <div className="decoration-title">
      <div className={fontSize}>{title}</div>
      <div className={`decoration ${fontSize}`}>{title}</div>
    </div>
  );
};
