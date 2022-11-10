import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { MdOutlineAdd, MdOutlineRemove } from "react-icons/md";
import { FaHeart } from "react-icons/fa";

import {
  updateAccountBothList,
  updateAccountWatchList,
  updateAccountFavorite,
} from "../../redux/slices/accountFilmStateSlice";

import Loader from "../common/Loader";

import { useLocation, useNavigate } from "react-router-dom";

const FDGenresPart = ({ filmId, filmDetails, type }) => {
  const loginInfo = useSelector((state) => state.loginInfo);

  const accountFilmState = useSelector((state) => state.accountFilmState);

  const dispatch = useDispatch();

  let { pathname } = useLocation();
  const navigate = useNavigate();

  const watchlistClickHandler = () => {
    const mediaType = pathname.includes("tvseries") ? "tv" : "movie";
    dispatch(
      updateAccountWatchList({
        watchlist: accountFilmState.watchlist,
        changed: "watchlist",
        mediaType: mediaType,
        user_id: loginInfo.user_id,
        session_id: loginInfo.session_id,
        filmId: filmId,
      })
    );
  };

  const favoriteClickHandler = () => {
    const mediaType = pathname.includes("tvseries") ? "tv" : "movie";

    dispatch(
      updateAccountFavorite({
        favorite: accountFilmState.favorite,
        changed: "favorite",
        mediaType: mediaType,
        user_id: loginInfo.user_id,
        session_id: loginInfo.session_id,
        filmId: filmId,
      })
    );
  };

  useEffect(() => {
    if (loginInfo.user_id) {
      dispatch(
        updateAccountBothList({
          changed: "all",
          watchlist: filmDetails?.account_states?.watchlist,
          favorite: filmDetails?.account_states?.favorite,
        })
      );
    }
  }, [loginInfo.user_id, dispatch, filmDetails]);

  useEffect(() => {
    // nav to error page
    if (accountFilmState.error) {
      navigate("/error");
    }
  }, [navigate, accountFilmState.error]);

  return (
    <>
      <div className="mt-10 flex justify-between gap-x-4 ">
        <div className="flex gap-x-2">
          {loginInfo.user_id && (
            <button
              onClick={watchlistClickHandler}
              className="group flex h-10 w-10 items-center justify-center rounded-xl  bg-[#292326] bg-opacity-90 px-2 py-2 transition-all lg:hover:bg-gray-500"
              disabled={accountFilmState.loadingBtnWatchList}
            >
              <Loader
                classWidth="w-4"
                classHeight="h-4"
                classBorder="border-2"
                classMargin="mt-0"
                loading={accountFilmState.loadingBtnWatchList}
              />

              {accountFilmState?.watchlist &&
                !accountFilmState.loadingBtnWatchList && (
                  <MdOutlineRemove className="text-xl transition-all lg:group-hover:text-2xl" />
                )}

              {!accountFilmState?.watchlist &&
                !accountFilmState.loadingBtnWatchList && (
                  <MdOutlineAdd className="text-xl transition-all lg:group-hover:text-2xl" />
                )}
            </button>
          )}

          {loginInfo.user_id && (
            <button
              className={`${
                accountFilmState?.favorite
                  ? "text-primary  lg:hover:text-[#ececec]"
                  : " lg:hover:text-primary"
              } group flex h-10 w-10 items-center justify-center  rounded-full bg-[#292326] bg-opacity-90 px-2 py-2 transition-all lg:hover:bg-transparent lg:hover:opacity-100`}
              onClick={favoriteClickHandler}
              disabled={accountFilmState.loadingBtnFavorite}
            >
              <Loader
                classWidth="w-4"
                classHeight="h-4"
                classBorder="border-2"
                classMargin="mt-0"
                loading={accountFilmState.loadingBtnFavorite}
              />

              {!accountFilmState.loadingBtnFavorite && (
                <FaHeart className="text-xl transition-all lg:group-hover:text-2xl" />
              )}
            </button>
          )}
        </div>
        <div className="flex flex-wrap justify-end gap-x-5 gap-y-3">
          {filmDetails?.genres?.map((genre) => {
            return (
              <span
                key={genre.id}
                className="my-auto rounded-[10px] border-2 border-[#474749] bg-[#292326] bg-opacity-70 px-[10px] py-[5px] text-sm transition-all hover:cursor-pointer hover:border-white lg:text-base"
                onClick={() => {
                  navigate(
                    `/${type.current}/list/page/1?with_genres=${genre.id}`
                  );
                }}
              >
                {genre.name}
              </span>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default FDGenresPart;
