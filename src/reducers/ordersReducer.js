const initState = {
  orders: [],
};

const ordersReducer = (state = initState, action) => {
  switch (action.type) {
    case "FETCH_ORDERS":
      return {
        ...state,
        orders: action.payload.orders,
      };
    default:
      return { ...state };
  }
};

export default ordersReducer;
