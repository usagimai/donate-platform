import { combineReducers } from "redux";

import itemsReducer from "./itemsReducer";
import categoryReducer from "./categoryReducer";
import favoritesReducer from "./favoritesReducer";
import ordersReducer from "./ordersReducer";

const rootReducers = combineReducers({
  items: itemsReducer,
  category: categoryReducer,
  favorites: favoritesReducer,
  orders: ordersReducer,
});

export default rootReducers;
