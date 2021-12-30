import { collection, getDocs, query, where } from "firebase/firestore";
import { app, db, auth } from "../firebase-config";

//Action Creator
export const loadFavorites = () => async (dispatch) => {
  const user = auth.currentUser;
  const dbRef = collection(db, "favorites");
  const favoriteQuery = query(dbRef, where("email", "==", user.email));
  const favoriteData = await getDocs(favoriteQuery);

  dispatch({
    type: "FETCH_FAVORITES",
    payload: {
      favorites: favoriteData.docs,
    },
  });
};
