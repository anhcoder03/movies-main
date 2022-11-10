import { call, delay, put } from "redux-saga/effects";

import {
  setMovies,
  setLoading,
  setError,
} from "../../slices/moviesHomePageSlice";

import requestGetMovies from "./moviesHomePageRequest";

function* handleGetMovies() {
  const data = {};

  const apiRequest = requestGetMovies();

  try {
    // show loading
    yield put(setLoading(true));
    //get movies on air
    const resNowPlaying = yield call(apiRequest.nowPlaying);
    data.nowPlaying = resNowPlaying.data.results;
    //get popular movies
    const resPopular = yield call(apiRequest.popular);
    data.popular = resPopular.data.results;
    //get top rated movies
    const resTopRated = yield call(apiRequest.topRated);
    data.topRated = resTopRated.data.results;
    // set movies in store
    yield put(setMovies({ ...data }));
    // hide loading
    yield delay(200);
    yield put(setLoading(false));
    yield put(setError(false));
  } catch (error) {
    console.log(error);
    yield put(setError(true));
  }
}

export default handleGetMovies;
