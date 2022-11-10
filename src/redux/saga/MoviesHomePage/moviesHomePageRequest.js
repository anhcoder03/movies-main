import axios from "axios";

const requestGetMovies = () => {
  const params = {
    api_key: process.env.REACT_APP_API_KEY,
    language: "en-US",
    page: 1,
  };

  return {
    nowPlaying: () =>
      axios.request({
        method: "GET",
        url: `${process.env.REACT_APP_API_PATH_MOVIES}now_playing`,
        params,
      }),
    popular: () =>
      axios.request({
        method: "GET",
        url: `${process.env.REACT_APP_API_PATH_MOVIES}popular`,
        params,
      }),
    topRated: () =>
      axios.request({
        method: "GET",
        url: `${process.env.REACT_APP_API_PATH_MOVIES}top_rated`,
        params,
      }),
  };
};

export default requestGetMovies;
