import { call, put } from "redux-saga/effects";

import requestGetLoginInfo from "./loginInfoRequest";
import {
  setLoginInfo,
  setLoading,
  setShowErrorMsg,
  setError,
} from "../../slices/loginInfoSlice";

function* handleGetLoginInfo({ payload }) {
  const { username, password } = payload;

  const apiRequest = requestGetLoginInfo();

  try {
    // show loading
    yield put(setLoading(true));

    //get request token
    const resRequestToken = yield call(apiRequest.requestToken);

    if (resRequestToken.data.success) {
      try {
        //authentication
        const resAuthentication = yield call(
          apiRequest.Authentication,
          username,
          password,
          resRequestToken.data.request_token
        );

        if (resAuthentication.data.success) {
          //get session id
          const resSessionRequestToken = yield call(
            apiRequest.sessionRequestToken,
            resAuthentication.data.request_token
          );

          if (resSessionRequestToken.data.success) {
            //get user info
            const resUserInfo = yield call(
              apiRequest.userInfo,
              resSessionRequestToken.data.session_id
            );

            //set user info
            yield put(
              setLoginInfo({
                session_id: resSessionRequestToken.data.session_id,
                user_id: resUserInfo.data.id,
                username: resUserInfo.data.username,
                avatar: resUserInfo.data.avatar.tmdb.avatar_path,
              })
            );

            //store user info in local
            localStorage.setItem(
              "session_id",
              resSessionRequestToken.data.session_id
            );
            localStorage.setItem("user_id", resUserInfo.data.id);
            localStorage.setItem("username", resUserInfo.data.username);
            localStorage.setItem(
              "avatar",
              resUserInfo.data.avatar.tmdb.avatar_path
            );
          }
        }
      } catch (error) {
        if (error.response.status === 401) {
          yield put(setShowErrorMsg(true));
        }
      }
    }
    yield put(setError(false));
    yield put(setLoading(false));
  } catch (error) {
    console.log(error);
    if (!(error.response.status === 401)) {
      yield put(setError(true));
    }
  }
}

export default handleGetLoginInfo;
