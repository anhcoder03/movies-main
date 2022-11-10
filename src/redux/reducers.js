import { combineReducers } from "@reduxjs/toolkit";

import loginInfoReducer from "./slices/loginInfoSlice";
import moviesHomePageReducer from "./slices/moviesHomePageSlice";
import tvSeriesHomePageReducer from "./slices/tvSeriesHomePageSlice";
import accountFilmStateReducer from "./slices/accountFilmStateSlice";

const reducer = combineReducers({
  moviesHomePage: moviesHomePageReducer,
  tvSeriesHomePage: tvSeriesHomePageReducer,
  loginInfo: loginInfoReducer,
  accountFilmState: accountFilmStateReducer,
});

export default reducer;
