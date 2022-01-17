import { useState } from "react";

import { ListLocation } from "../reusable/Location";
import Search from "./Search";
import Category from "./Category";
import ItemList from "./ItemList";

const Main = ({ setLoginBoxOpen }) => {
  const [searchText, setSearchText] = useState("");

  return (
    <div className="main" id="main">
      <div className="main-left">
        <Search setSearchText={setSearchText} />
        <Category />
      </div>
      <div className="main-right">
        <ListLocation searchText={searchText} setSearchText={setSearchText} />

        <ItemList
          searchText={searchText}
          setSearchText={setSearchText}
          setLoginBoxOpen={setLoginBoxOpen}
        />
      </div>
    </div>
  );
};

export default Main;
