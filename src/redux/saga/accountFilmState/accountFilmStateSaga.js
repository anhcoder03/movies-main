import { takeLatest } from "redux-saga/effects";

import {
  updateAccountBothList,
  updateAccountWatchList,
  updateAccountFavorite,
} from "../../slices/accountFilmStateSlice";

import handleAccountFilmState from "./accountFilmStateHandler";

export default function* accountFilmStateSaga() {
  yield takeLatest(
    [
      updateAccountBothList.type,
      updateAccountWatchList.type,
      updateAccountFavorite.type,
    ],
    handleAccountFilmState
  );
}
