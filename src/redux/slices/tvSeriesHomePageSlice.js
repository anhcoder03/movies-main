import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  onAir: [],
  popular: [],
  topRated: [],
  loading: false,
  error: false,
};

const tvSeriesHomePageSlice = createSlice({
  name: "tvSeriesHomePage",
  initialState,
  reducers: {
    getTvSeries() {},
    setTvSeries: (state, action) => ({
      ...state,
      onAir: action.payload.onAir,
      popular: action.payload.popular,
      topRated: action.payload.topRated,
    }),
    setLoading: (state, action) => ({ ...state, loading: action.payload }),
    setError: (state, action) => ({ ...state, error: action.payload }),
  },
});

export const { getTvSeries, setTvSeries, setLoading, setError } =
  tvSeriesHomePageSlice.actions;
export default tvSeriesHomePageSlice.reducer;
