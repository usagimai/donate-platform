import { collection, getDocs, query, where, orderBy } from "firebase/firestore";
import { app, db, auth } from "../firebase-config";

//Action Creator
export const loadOrders = () => async (dispatch) => {
  const user = auth.currentUser;
  const dbRef = collection(db, "orders");
  const orderQuery = query(
    dbRef,
    where("email", "==", user.email),
    orderBy("docID", "desc")
  );
  const orderData = await getDocs(orderQuery);

  dispatch({
    type: "FETCH_ORDERS",
    payload: {
      orders: orderData.docs,
    },
  });
};
