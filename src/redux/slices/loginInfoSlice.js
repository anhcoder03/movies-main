import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  session_id: "",
  user_id: "",
  username: "",
  avatar: "",
  loading: false,
  showErrorMsg: false,
  error: false,
  logout: false,
};

const loginInfoSlice = createSlice({
  name: "loginInfo",
  initialState,
  reducers: {
    getLoginInfo() {},
    setLoginInfo: (state, action) => {
      return {
        ...state,
        session_id: action.payload.session_id,
        user_id: action.payload.user_id,
        username: action.payload.username,
        avatar: action.payload.avatar,
        logout: action.payload.logout,
      };
    },
    setLoading: (state, action) => ({ ...state, loading: action.payload }),
    setShowErrorMsg: (state, action) => ({
      ...state,
      showErrorMsg: action.payload,
    }),
    setError: (state, action) => ({
      ...state,
      error: action.payload,
    }),
  },
});

export const {
  getLoginInfo,
  setLoginInfo,
  setLoading,
  setShowErrorMsg,
  setError,
} = loginInfoSlice.actions;
export default loginInfoSlice.reducer;
