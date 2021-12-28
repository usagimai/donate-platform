import { collection, getDocs, query, where } from "firebase/firestore";
import { app, db } from "../firebase-config";

//Action Creator
export const loadItems = () => async (dispatch) => {
  const dbRef = collection(db, "items");
  const itemData = await getDocs(dbRef);

  dispatch({
    type: "FETCH_ITEMS",
    payload: {
      all: itemData.docs,
    },
  });
};
