import axios from "axios";

const requestAccountFilmState = () => {
  return {
    UpdateWatchList: (user_id, session_id, mediaType, filmId, watchlist) => {
      return axios.request({
        method: "POST",
        url: `${process.env.REACT_APP_API_PATH_ACCOUNT_FILM_LIST}${user_id}/watchlist?api_key=${process.env.REACT_APP_API_KEY}&session_id=${session_id}`,
        data: {
          media_type: mediaType,
          media_id: filmId,
          watchlist: !watchlist,
        },
        headers: { "Content-Type": "application/json;charset=utf-8" },
      });
    },
    UpdateFavoriteList: (user_id, session_id, mediaType, filmId, favorite) =>
      axios.request({
        method: "POST",
        url: `${process.env.REACT_APP_API_PATH_ACCOUNT_FILM_LIST}${user_id}/favorite?api_key=${process.env.REACT_APP_API_KEY}&session_id=${session_id}`,
        data: {
          media_type: mediaType,
          media_id: filmId,
          favorite: !favorite,
        },
        headers: { "Content-Type": "application/json;charset=utf-8" },
      }),
  };
};

export default requestAccountFilmState;
