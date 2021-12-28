const initState = {
  all: [],
};

const itemsReducer = (state = initState, action) => {
  switch (action.type) {
    case "FETCH_ITEMS":
      return {
        ...state,
        all: action.payload.all,
      };
    default:
      return { ...state };
  }
};

export default itemsReducer;
