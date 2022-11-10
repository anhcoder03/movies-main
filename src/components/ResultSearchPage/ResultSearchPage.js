import React, { useEffect, useRef, useState, useCallback } from "react";

import axios from "axios";

import FilmItem from "../common/FilmItem";
import CelebItem from "../CelebsPage/CelebItem";
import Loader from "../common/Loader";

import { useLocation, useNavigate, useParams } from "react-router-dom";

import CustomPagination from "../common/CustomPagination";
import useBuildApiPath from "../../hooks/useBuildApiPath";

const ResultSearchPage = () => {
  const [loading, setLoading] = useState(false);

  const [resultSearch, setResultSearch] = useState();

  const navigate = useNavigate();
  let { pathname, search } = useLocation();
  let { page } = useParams();

  const type = useRef({});

  const timeOutId = useRef();

  const searchApiPath = useBuildApiPath({
    tag: "ResultSearchPage",
    pathname: pathname,
    page: page,
    search: search,
  });

  const getResultSearch = useCallback(async () => {
    try {
      setLoading(true);

      // set API's path and title base on pathname
      if (pathname.includes("movies")) {
        type.current = {
          title: "Movies Search List",
          subType: "movies",
        };
      }

      if (pathname.includes("tvseries")) {
        type.current = {
          title: "TV Series Search List",
          subType: "tvseries",
        };
      }

      if (pathname.includes("celebs")) {
        type.current = {
          title: "Celebs Search List",
          subType: "celebs",
        };
      }

      //  back to previous page when search is empty
      if (!search) {
        navigate(-1);
      } else {
        const res = await axios.get(searchApiPath);

        setResultSearch(res.data);

        // set timeout to prevent jerking
        timeOutId.current = setTimeout(() => {
          setLoading(false);
        }, [200]);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      navigate("/error");
    }
  }, [navigate, pathname, search, searchApiPath]);

  // get data when page, search was changed
  useEffect(() => {
    getResultSearch();

    return () => {
      clearTimeout(timeOutId.current);
    };
  }, [getResultSearch]);

  return (
    <>
      <div className="MoviesListPage mt-[100px] px-3 pb-[90px] md:px-5 lg:mt-0 lg:p-10">
        <h1 className="mb-7 text-center text-2xl font-medium text-[#cecece] lg:mb-10 2xl:text-3xl">
          {type?.current?.title}
        </h1>

        {/* loader */}
        <Loader
          classWidth="w-[50px]"
          classHeight="h-[50px]"
          classBorder="border-[4px]"
          classMargin="mt-10"
          loading={loading}
        />

        {/* not found msg */}
        {resultSearch?.results?.filter((film) => film.poster_path).length <=
          0 &&
          resultSearch?.results?.filter((celeb) => celeb.profile_path).length <=
            0 && (
            <h3
              className={`${
                loading ? "hidden opacity-0" : "opacity-1 block"
              } mt-20 text-center text-xl text-primary transition-all 2xl:text-2xl`}
            >
              Not found
            </h3>
          )}

        {/* Film list */}
        {type.current.subType !== "celebs" &&
          resultSearch?.results?.filter((film) => film.poster_path).length >
            0 && (
            <div
              className={`${
                loading ? "hidden opacity-0" : "opacity-1 grid"
              } grid-cols-2 gap-3 transition-all sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5`}
            >
              {resultSearch?.results
                ?.filter((film) => film.poster_path)
                .map((film) => (
                  <FilmItem
                    key={film.id}
                    type={type?.current?.subType}
                    filmID={film.id}
                    info={film}
                  ></FilmItem>
                ))}
            </div>
          )}

        {/* Celebs list */}
        {type.current.subType === "celebs" &&
          resultSearch?.results?.filter((celeb) => celeb.profile_path).length >
            0 && (
            <div
              className={`${
                loading ? "hidden opacity-0" : "opacity-1 grid"
              } grid-cols-2 gap-3 transition-all sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5`}
            >
              {resultSearch?.results
                ?.filter((celeb) => celeb.profile_path)
                .map((celeb) => (
                  <CelebItem
                    key={celeb.id}
                    celebId={celeb.id}
                    name={celeb.name}
                    profilePath={celeb.profile_path}
                  />
                ))}
            </div>
          )}

        {/* pagination */}
        <CustomPagination
          totalPage={resultSearch?.total_pages ? resultSearch?.total_pages : 1}
          page={parseInt(page)}
          onPageChange={(e) => {
            navigate(
              `/${type.current.subType}/search/page/${(
                e.selected + 1
              ).toString()}${search ? search : ""}`
            );
          }}
        />
      </div>
    </>
  );
};

export default ResultSearchPage;
