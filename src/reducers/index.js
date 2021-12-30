import { combineReducers } from "redux";

import itemsReducer from "./itemsReducer";
import categoryReducer from "./categoryReducer";
import favoritesReducer from "./favoritesReducer";

const rootReducers = combineReducers({
  items: itemsReducer,
  category: categoryReducer,
  favorites: favoritesReducer,
});

export default rootReducers;
