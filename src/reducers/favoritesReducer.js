const initState = {
  favorites: [],
};

const favoritesReducer = (state = initState, action) => {
  switch (action.type) {
    case "FETCH_FAVORITES":
      return {
        ...state,
        favorites: action.payload.favorites,
      };
    default:
      return { ...state };
  }
};

export default favoritesReducer;
