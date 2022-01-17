import { doc, setDoc } from "firebase/firestore";

import { loadFavorites } from "../actions/favoritesAction";
import { app, db } from "../firebase-config";

export const handleAddFavorite = async (dispatch, favorites, user, id) => {
  const prevFavorites = favorites[0].data().itemId;

  await setDoc(doc(db, "favorites", user.uid), {
    email: user.email,
    itemId: [...prevFavorites, id],
  });
  dispatch(loadFavorites());
};

export const handleRemoveFavorite = async (dispatch, favorites, user, id) => {
  const prevFavorites = favorites[0].data().itemId;

  await setDoc(doc(db, "favorites", user.uid), {
    email: user.email,
    itemId: prevFavorites.filter((item) => item !== id),
  });
  dispatch(loadFavorites());
};

export const handleRemoveFavorite2 = async (
  dispatch,
  favorites,
  user,
  idFav
) => {
  const prevFavorites = favorites[0].data().itemId;

  await setDoc(doc(db, "favorites", user.uid), {
    email: user.email,
    itemId: prevFavorites.filter((item) => item !== idFav),
  });
  dispatch(loadFavorites());
};
