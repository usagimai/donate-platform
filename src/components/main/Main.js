import Location from "../reusable/Location";
import Search from "./Search";
import Category from "./Category";
import ItemList from "./ItemList";
import { PgNumSimple, PgNumDetail } from "./PageNumber";

const Main = () => {
  return (
    <div className="main">
      <div className="main-left">
        <Search />
        <Category />
      </div>
      <div className="main-right">
        <div className="main-right-upper">
          <Location />
          <PgNumSimple />
        </div>
        <ItemList />
        <div className="main-page-lower">
          <PgNumDetail />
        </div>
      </div>
    </div>
  );
};

export default Main;
