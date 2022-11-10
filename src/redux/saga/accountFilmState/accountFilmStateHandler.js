import { call, put } from "redux-saga/effects";

import requestAccountFilmState from "./accountFilmStateRequest";
import {
  setAccountBothList,
  setAccountWatchList,
  setAccountFavorite,
  setLoadingBtnWatchList,
  setLoadingBtnFavorite,
  setError,
} from "../../slices/accountFilmStateSlice";

function* handleAccountFilmState({ payload }) {
  const {
    watchlist,
    favorite,
    changed,
    mediaType,
    user_id,
    session_id,
    filmId,
  } = payload;

  const apiRequest = requestAccountFilmState();

  try {
    if (changed === "watchlist") {
      yield put(setLoadingBtnWatchList(true));

      yield call(
        apiRequest.UpdateWatchList,
        user_id,
        session_id,
        mediaType,
        filmId,
        watchlist
      );

      yield put(
        setAccountWatchList({
          watchlist: !watchlist,
          changed: changed,
          mediaType: mediaType,
        })
      );

      yield put(setLoadingBtnWatchList(false));
    }

    if (changed === "favorite") {
      yield put(setLoadingBtnFavorite(true));

      yield call(
        apiRequest.UpdateFavoriteList,
        user_id,
        session_id,
        mediaType,
        filmId,
        favorite
      );

      yield put(
        setAccountFavorite({
          favorite: !favorite,
          changed: changed,
          mediaType: mediaType,
        })
      );

      yield put(setLoadingBtnFavorite(false));
    }

    if (changed === "all") {
      yield put(
        setAccountBothList({
          watchlist: watchlist,
          changed: changed,
          favorite: favorite,
        })
      );
    }

    yield put(setError(false));
  } catch (error) {
    console.log(error);
    yield put(setLoadingBtnWatchList(false));
    yield put(setLoadingBtnFavorite(false));
    yield put(setError(true));
  }
}

export default handleAccountFilmState;
