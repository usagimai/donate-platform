import { IconSelector } from "../reusable/IconSelector";

const Search = () => {
  return (
    <form>
      <div className="search-input">
        <input type="text" placeholder="搜尋商品" size="21" />
      </div>
      <div>
        <IconSelector name="search-icon" />
      </div>
    </form>
  );
};

export default Search;
