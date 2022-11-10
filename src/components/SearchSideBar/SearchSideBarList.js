import React, { useState, useEffect, useRef, useCallback } from "react";

import SearchSideBarItem from "./SearchSideBarItem";
import Loader from "../common/Loader";

import PropTypes from "prop-types";

import { useNavigate } from "react-router-dom";

import axios from "axios";

import { useSelector } from "react-redux";

const SearchSideBarList = ({
  title,
  type,
  pathNavigate,
  apiPath,
  showSearchOnMobile,
}) => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [films, setFilms] = useState([]);

  const accountFilmState = useSelector((state) => state.accountFilmState);

  const timeOut = useRef(0);

  const getFilms = useCallback(async () => {
    setLoading(true);
    const res = await axios.get(apiPath);

    res.data.results = res.data.results.filter((film) => film.poster_path);

    if (res.data.results.length < 3) {
      setFilms(res.data.results);
    } else {
      setFilms(res.data.results.slice(0, 3));
    }

    timeOut.current = setTimeout(() => {
      setLoading(false);
    }, 200);
  }, [apiPath]);

  useEffect(() => {
    getFilms();

    return () => {
      clearTimeout(timeOut.current);
    };
  }, [getFilms]);

  useEffect(() => {
    if (
      accountFilmState.changed === "watchlist" &&
      accountFilmState.mediaType === "movie" &&
      pathNavigate === "/movies/watchlist"
    ) {
      getFilms();
    }

    if (
      accountFilmState.changed === "favorite" &&
      accountFilmState.mediaType === "movie" &&
      pathNavigate === "/movies/favorite"
    ) {
      getFilms();
    }

    if (
      accountFilmState.changed === "watchlist" &&
      accountFilmState.mediaType === "tv" &&
      pathNavigate === "/tvseries/watchlist"
    ) {
      getFilms();
    }

    if (
      accountFilmState.changed === "favorite" &&
      accountFilmState.mediaType === "tv" &&
      pathNavigate === "/tvseries/favorite"
    ) {
      getFilms();
    }

    return () => {
      clearTimeout(timeOut.current);
    };
  }, [
    accountFilmState.changed,
    accountFilmState.mediaType,
    accountFilmState.watchlist,
    accountFilmState.favorite,
    pathNavigate,
    getFilms,
  ]);

  return (
    <div className="SearchSideBarList">
      <h2 className="mb-5 text-xl font-medium text-[#ECECEC] lg:text-center lg:text-lg xl:text-left xl:text-xl 2xl:text-2xl">
        {title}
      </h2>

      <Loader
        classWidth="w-10"
        classHeight="h-10"
        classBorder="border-2"
        classMargin="mt-0"
        loading={loading}
      />

      {films.length <= 0 && !loading && (
        <h3 className="text-center text-xl text-primary"> Not found</h3>
      )}

      {films.length > 0 && !loading && (
        <>
          <div className="flex flex-col gap-y-[15px]">
            {films?.map((film) => (
              <SearchSideBarItem
                key={film?.id}
                type={type}
                film={film}
                showSearchOnMobile={showSearchOnMobile}
              />
            ))}
          </div>
          <button
            onClick={() => {
              showSearchOnMobile(false);
              navigate(`${pathNavigate}/page/1`);
            }}
            className="mt-[15px] w-full rounded-[10px] bg-primary px-5 py-2 font-medium outline-none transition-all hover:bg-red-400 md:text-lg lg:text-base 2xl:text-[18px] "
          >
            See more
          </button>
        </>
      )}
    </div>
  );
};

SearchSideBarList.propTypes = {
  title: PropTypes.string,
  type: PropTypes.string,
  pathNavigate: PropTypes.string,
  apiPath: PropTypes.string,
};

export default SearchSideBarList;
