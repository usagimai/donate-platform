import Search from "./Search";
import Category from "./Category";
import AboutItemList from "./AboutItemList";
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
          <AboutItemList />
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
