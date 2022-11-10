const useBuildApiPath = ({
  tag,
  page = 1,
  search = "",
  imgPath = "",
  celebId,
  videoKey,
  type,
  session_id,
  user_id,
  filmId,
  pathname,
}) => {
  switch (tag) {
    case "MovieListPage":
      return `${process.env.REACT_APP_API_PATH_DISCOVER_MOVIE}${
        process.env.REACT_APP_API_KEY
      }&language=en-US&certification_country=US&page=${page}${search.replace(
        "?",
        "&"
      )}`;

    case "TVListPage":
      return `${process.env.REACT_APP_API_PATH_DISCOVER_TV}${
        process.env.REACT_APP_API_KEY
      }&language=en-US&page=${page}${search.replace("?", "&")}`;

    case "CelebProfile":
      return `${process.env.REACT_APP_API_PATH_PEOPLE}${celebId}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&append_to_response=movie_credits,tv_credits`;

    case "CelebListPage":
      return `${process.env.REACT_APP_API_PATH_PEOPLE}popular?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=${page}`;

    case "Img500":
      return `${process.env.REACT_APP_API_PATH_IMG_W500}${imgPath}`;

    case "ImgOriginal":
      return `${process.env.REACT_APP_API_PATH_IMG_ORIGINAL}${imgPath}`;

    case "TrailerImg":
      return `${process.env.REACT_APP_API_PATH_YOUTUBE_IMG}${videoKey}/0.jpg`;

    case "FilterBarGenres":
      return `${process.env.REACT_APP_API_PATH_GENRES}${type}/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`;

    case "FilterBarCertifications":
      return `${process.env.REACT_APP_API_PATH_CERTIFICATIONS}${type}/list?api_key=${process.env.REACT_APP_API_KEY}`;

    case "Logout":
      return `${process.env.REACT_APP_API_PATH_SESSION_DELETE}${process.env.REACT_APP_API_KEY}`;

    case "Genres":
      return `${process.env.REACT_APP_API_PATH_GENRES}${type}/list?api_key=${process.env.REACT_APP_API_KEY}`;

    case "FilmDetailsPage":
      let filmApi = { path: "", certificationAppend: "" };
      let sessionObj = { session_id: "", accountStateAppend: "" };

      if (type === "tvseries") {
        filmApi.path = process.env.REACT_APP_API_PATH_TVSERIES;
        filmApi.certificationAppend = "content_ratings";
      } else if (type === "movies") {
        filmApi.path = process.env.REACT_APP_API_PATH_MOVIES;
        filmApi.certificationAppend = "release_dates";
      }

      if (session_id) {
        sessionObj.session_id = `&session_id=${session_id}`;
        sessionObj.accountStateAppend = "account_states";
      }

      return `${filmApi.path}${filmId}?api_key=${process.env.REACT_APP_API_KEY}${sessionObj.session_id}&append_to_response=videos,credits,${filmApi.certificationAppend},${sessionObj.accountStateAppend},similar`;

    case "ResultSearchPage":
      let searchApiPath = "";
      if (pathname.includes("movies")) {
        searchApiPath = process.env.REACT_APP_API_PATH_SEARCH_MOVIE;
      }

      if (pathname.includes("tvseries")) {
        searchApiPath = process.env.REACT_APP_API_PATH_SEARCH_TV;
      }

      if (pathname.includes("celebs")) {
        searchApiPath = process.env.REACT_APP_API_PATH_SEARCH_PEOPLE;
      }

      return `${searchApiPath}${
        process.env.REACT_APP_API_KEY
      }&language=en-US&page=${page}${search.replace("?", "&")}`;
    case "CommonListPage":
      if (!user_id && !session_id && !pathname.includes("trending")) return "";

      if (pathname.includes("movies") && pathname.includes("trending")) {
        return `${process.env.REACT_APP_API_PATH_TRENDING}movie/day?api_key=${process.env.REACT_APP_API_KEY}&page=${page}`;
      }

      if (pathname.includes("tvseries") && pathname.includes("trending")) {
        return `${process.env.REACT_APP_API_PATH_TRENDING}tv/day?api_key=${process.env.REACT_APP_API_KEY}&page=${page}`;
      }

      if (pathname.includes("movies") && pathname.includes("watchlist")) {
        return `${process.env.REACT_APP_API_PATH_ACCOUNT_FILM_LIST}${user_id}/watchlist/movies?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&session_id=${session_id}&sort_by=created_at.desc&page=${page}`;
      }

      if (pathname.includes("tvseries") && pathname.includes("watchlist")) {
        return `${process.env.REACT_APP_API_PATH_ACCOUNT_FILM_LIST}${user_id}/watchlist/tv?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&session_id=${session_id}&sort_by=created_at.desc&page=${page}`;
      }

      if (pathname.includes("movies") && pathname.includes("favorite")) {
        return `${process.env.REACT_APP_API_PATH_ACCOUNT_FILM_LIST}${user_id}/favorite/movies?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&session_id=${session_id}&sort_by=created_at.desc&page=${page}`;
      }

      if (pathname.includes("tvseries") && pathname.includes("favorite")) {
        return `${process.env.REACT_APP_API_PATH_ACCOUNT_FILM_LIST}${user_id}/favorite/tv?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&session_id=${session_id}&sort_by=created_at.desc&page=${page}`;
      }
      break;

    case "SearchSidebarList":
      let apiPaths = {
        moviesTrending: `${process.env.REACT_APP_API_PATH_TRENDING}movie/day?api_key=${process.env.REACT_APP_API_KEY}`,
        tvsTrending: `${process.env.REACT_APP_API_PATH_TRENDING}tv/day?api_key=${process.env.REACT_APP_API_KEY}`,
      };

      if (user_id && session_id) {
        apiPaths = {
          ...apiPaths,
          moviesWatchList: `${process.env.REACT_APP_API_PATH_ACCOUNT_FILM_LIST}${user_id}/watchlist/movies?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&session_id=${session_id}&sort_by=created_at.desc&page=1`,
          moviesFavorite: `${process.env.REACT_APP_API_PATH_ACCOUNT_FILM_LIST}${user_id}/favorite/movies?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&session_id=${session_id}&sort_by=created_at.desc&page=1`,
          tvsWatchList: `${process.env.REACT_APP_API_PATH_ACCOUNT_FILM_LIST}${user_id}/watchlist/tv?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&session_id=${session_id}&sort_by=created_at.desc&page=1`,
          tvsFavorite: `${process.env.REACT_APP_API_PATH_ACCOUNT_FILM_LIST}${user_id}/favorite/tv?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&session_id=${session_id}&sort_by=created_at.desc&page=1`,
        };
      }
      return apiPaths;

    default:
      break;
  }
};

export default useBuildApiPath;
