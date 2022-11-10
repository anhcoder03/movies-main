import axios from "axios";

const requestGetTvSeries = () => {
  const params = {
    api_key: process.env.REACT_APP_API_KEY,
    language: "en-US",
    page: 1,
  };

  return {
    onAir: () =>
      axios.request({
        method: "GET",
        url: `${process.env.REACT_APP_API_PATH_TVSERIES}on_the_air`,
        params,
      }),
    popular: () =>
      axios.request({
        method: "GET",
        url: `${process.env.REACT_APP_API_PATH_TVSERIES}popular`,
        params,
      }),
    topRated: () =>
      axios.request({
        method: "GET",
        url: `${process.env.REACT_APP_API_PATH_TVSERIES}top_rated`,
        params,
      }),
  };
};

export default requestGetTvSeries;
