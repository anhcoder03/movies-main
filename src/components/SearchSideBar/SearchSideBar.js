import React, { useEffect, useRef, useState } from "react";

import { useNavigate } from "react-router-dom";

import SearchSideBarList from "./SearchSideBarList";
import SearchSideBarInput from "./SearchSideBarInput";

import { useSelector } from "react-redux";
import useBuildApiPath from "../../hooks/useBuildApiPath";

const SearchSideBar = () => {
  const [lists, setLists] = useState({});

  const [openSearchSidebar, setOpenSearchSidebar] = useState(false);

  const loginInfo = useSelector((state) => state.loginInfo);

  const navigate = useRef(useNavigate());

  const apiPathsList = useBuildApiPath({
    tag: "SearchSidebarList",
    user_id: loginInfo.user_id,
    session_id: loginInfo.session_id,
  });

  useEffect(() => {
    const getLists = async () => {
      try {
        let results = {};

        results = {
          trending: [
            {
              apiPath: apiPathsList.moviesTrending,
              title: "Movies Trending",
              type: "movie",
              pathNavigate: "/movies/trending",
            },
            {
              apiPath: apiPathsList.tvsTrending,
              title: "TV Series Trending",
              type: "tv",
              pathNavigate: "/tvseries/trending",
            },
          ],
        };

        if (loginInfo.user_id) {
          results = {
            ...results,
            accountFilmList: [
              {
                apiPath: apiPathsList.moviesWatchList,
                title: "Movies Watchlist",
                type: "movie",
                pathNavigate: "/movies/watchlist",
              },
              {
                apiPath: apiPathsList.moviesFavorite,
                title: "Favorite Movies",
                type: "movie",
                pathNavigate: "/movies/favorite",
              },
              {
                apiPath: apiPathsList.tvsWatchList,
                title: "TV Series Watchlist",
                type: "tv",
                pathNavigate: "/tvseries/watchlist",
              },
              {
                apiPath: apiPathsList.tvsFavorite,
                title: "Favorite TV Series",
                type: "tv",
                pathNavigate: "/tvseries/favorite",
              },
            ],
          };
        }

        setLists(results);
      } catch (error) {
        console.log(error);
        navigate("/error");
      }
    };

    getLists();
  }, [
    loginInfo,
    apiPathsList.moviesWatchList,
    apiPathsList.moviesFavorite,
    apiPathsList.moviesTrending,
    apiPathsList.tvsTrending,
    apiPathsList.tvsWatchList,
    apiPathsList.tvsFavorite,
  ]);

  return (
    <div
      className={`${
        openSearchSidebar
          ? "h-full overflow-scroll"
          : "h-[68px] overflow-hidden"
      } no-scrollbar fixed bottom-0 left-0 right-0 z-[100] flex w-full flex-col bg-[#181818] pb-4 text-[#ececec] transition-all duration-200 ease-in lg:relative  lg:z-auto  lg:h-screen lg:w-[30%] lg:overflow-scroll lg:border-l-2 lg:border-[#353535] lg:pb-5 xl:w-[40%] 2xl:w-[35%]`}
    >
      <SearchSideBarInput
        openSearchSidebar={openSearchSidebar}
        setOpenSearchSidebar={setOpenSearchSidebar}
      ></SearchSideBarInput>

      <div className="mt-5 grid gap-y-10 px-3 xl:px-6">
        {lists?.trending?.map((list) => (
          <SearchSideBarList
            key={list.pathNavigate}
            title={list.title}
            type={list.type}
            pathNavigate={list.pathNavigate}
            apiPath={list.apiPath}
            showSearchOnMobile={setOpenSearchSidebar}
          />
        ))}

        {loginInfo.user_id &&
          lists?.accountFilmList?.map((list) => (
            <SearchSideBarList
              key={list.pathNavigate}
              title={list.title}
              type={list.type}
              pathNavigate={list.pathNavigate}
              apiPath={list.apiPath}
              showSearchOnMobile={setOpenSearchSidebar}
            />
          ))}
      </div>
    </div>
  );
};

export default SearchSideBar;
