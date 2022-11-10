import { takeLatest } from "redux-saga/effects";

import { getMovies } from "../../slices/moviesHomePageSlice";

import handleGetMovies from "./moviesHomePageHandler";

export default function* moviesHomePageSaga() {
  yield takeLatest(getMovies.type, handleGetMovies);
}
