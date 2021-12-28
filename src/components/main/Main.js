import { useState } from "react";

import { ListLocation } from "../reusable/Location";
import Search from "./Search";
import Category from "./Category";
import ItemList from "./ItemList";

const Main = () => {
  const [searchText, setSearchText] = useState("");

  return (
    <div className="main">
      <div className="main-left">
        <Search setSearchText={setSearchText} />
        <Category />
      </div>
      <div className="main-right">
        <ListLocation searchText={searchText} setSearchText={setSearchText} />

        <ItemList searchText={searchText} setSearchText={setSearchText} />
      </div>
    </div>
  );
};

export default Main;
