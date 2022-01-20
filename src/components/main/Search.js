import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { IconSelector } from "../reusable/IconSelector";

const Search = ({ setSearchText }) => {
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchText(searchInput);
    navigate(`/search/${searchInput}`, { push: true });
    setSearchInput("");
  };

  return (
    <form onSubmit={handleSearch}>
      <div className="search-input">
        <input
          type="search"
          placeholder="搜尋商品"
          onChange={(e) => setSearchInput(e.target.value)}
          value={searchInput}
        />
      </div>
      <button type="submit">
        <IconSelector name="search-icon" />
      </button>
    </form>
  );
};

export default Search;
