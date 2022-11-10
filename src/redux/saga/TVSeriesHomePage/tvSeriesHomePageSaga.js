import { takeLatest } from "redux-saga/effects";

import { getTvSeries } from "../../slices/tvSeriesHomePageSlice";

import handleGetTvSeries from "./tvSeriesHomePageHandler";

export default function* tvSeriesHomePageSaga() {
  yield takeLatest(getTvSeries.type, handleGetTvSeries);
}
