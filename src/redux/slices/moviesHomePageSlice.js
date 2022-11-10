import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  nowPlaying: [],
  popular: [],
  topRated: [],
  loading: false,
  error: false,
};

const moviesHomePageSlice = createSlice({
  name: "moviesHomePage",
  initialState,
  reducers: {
    getMovies() {},
    setMovies: (state, action) => ({
      ...state,
      nowPlaying: action.payload.nowPlaying,
      popular: action.payload.popular,
      topRated: action.payload.topRated,
    }),
    setLoading: (state, action) => ({ ...state, loading: action.payload }),
    setError: (state, action) => ({ ...state, error: action.payload }),
  },
});

export const { getMovies, setMovies, setLoading, setError } =
  moviesHomePageSlice.actions;
export default moviesHomePageSlice.reducer;
