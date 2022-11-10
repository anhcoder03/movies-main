import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  watchlist: false,
  favorite: false,
  changed: "",
  mediaType: "",
  loadingBtnWatchList: false,
  loadingBtnFavorite: false,
  error: false,
};

const accountFilmState = createSlice({
  name: "accountFilmState",
  initialState,
  reducers: {
    updateAccountBothList() {},
    setAccountBothList: (state, action) => {
      return {
        ...state,
        watchlist: action.payload.watchlist,
        changed: action.payload.changed,
        favorite: action.payload.favorite,
      };
    },
    updateAccountWatchList() {},
    setAccountWatchList: (state, action) => {
      return {
        ...state,
        watchlist: action.payload.watchlist,
        changed: action.payload.changed,
        mediaType: action.payload.mediaType,
      };
    },
    updateAccountFavorite() {},
    setAccountFavorite: (state, action) => {
      return {
        ...state,
        favorite: action.payload.favorite,
        changed: action.payload.changed,
        mediaType: action.payload.mediaType,
      };
    },
    setLoadingBtnWatchList: (state, action) => ({
      ...state,
      loadingBtnWatchList: action.payload,
    }),
    setLoadingBtnFavorite: (state, action) => ({
      ...state,
      loadingBtnFavorite: action.payload,
    }),
    setError: (state, action) => ({
      ...state,
      error: action.payload,
    }),
  },
});

export const {
  setAccountBothList,
  updateAccountBothList,
  setAccountWatchList,
  updateAccountWatchList,
  setAccountFavorite,
  updateAccountFavorite,
  setLoadingBtnWatchList,
  setLoadingBtnFavorite,
  setError,
} = accountFilmState.actions;

export default accountFilmState.reducer;
