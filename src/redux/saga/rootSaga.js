import { all, fork } from "redux-saga/effects";

import tvSeriesHomePageSaga from "./TVSeriesHomePage/tvSeriesHomePageSaga";
import moviesHomePageSaga from "./MoviesHomePage/moviesHomePageSaga";
import loginInfoSaga from "./LoginInfo/loginInfoSaga";
import accountFilmStateSaga from "./accountFilmState/accountFilmStateSaga";

export default function* rootSaga() {
  yield all([
    fork(moviesHomePageSaga),
    fork(tvSeriesHomePageSaga),
    fork(loginInfoSaga),
    fork(accountFilmStateSaga),
  ]);
}
