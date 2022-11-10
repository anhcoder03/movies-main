import { takeLatest } from "redux-saga/effects";

import { getLoginInfo } from "../../slices/loginInfoSlice";

import handleGetLoginInfo from "./loginInfoHandler";

export default function* loginInfoSaga() {
  yield takeLatest(getLoginInfo.type, handleGetLoginInfo);
}
