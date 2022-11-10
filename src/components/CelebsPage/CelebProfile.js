import React, { useRef, useState, useEffect, useCallback } from "react";

import axios from "axios";

import { useNavigate, useParams } from "react-router-dom";

import useBuildApiPath from "../../hooks/useBuildApiPath";

import FilmList from "../common/FilmList";
import Loader from "../common/Loader";

const CelebProfile = () => {
  const { celebId } = useParams();

  const [celebInfo, setCelebInfo] = useState();

  const [loading, setLoanding] = useState(true);

  const timeOutId = useRef();

  const navigate = useNavigate();

  const celebImgPath = useBuildApiPath({
    tag: "Img500",
    imgPath: celebInfo?.profile_path,
  });

  const celebProfilePath = useBuildApiPath({
    tag: "CelebProfile",
    celebId: celebId,
  });

  const getCelebInfo = useCallback(async () => {
    try {
      const res = await axios.get(celebProfilePath);

      const moviesCast =
        res.data.movie_credits.cast &&
        res.data.movie_credits.cast.filter((movie) => movie.poster_path);

      const moviesCrew =
        res.data.movie_credits.crew &&
        res.data.movie_credits.crew.filter((movie) => movie.poster_path);

      // remove duplicate movie
      const movies = [
        ...new Map(
          [...moviesCast, ...moviesCrew].map((m) => [m.id, m])
        ).values(),
      ];

      const tvseriesCast =
        res.data.tv_credits.cast &&
        res.data.tv_credits.cast.filter((tv) => tv.poster_path);

      const tvseriesCrew =
        res.data.tv_credits.crew &&
        res.data.tv_credits.crew.filter((tv) => tv.poster_path);

      // remove duplicate tvseries
      const tvseries = [
        ...new Map(
          [...tvseriesCast, ...tvseriesCrew].map((m) => [m.id, m])
        ).values(),
      ];

      res.data = {
        ...res.data,
        movies,
        tvseries,
      };

      setCelebInfo(res.data);

      timeOutId.current = setTimeout(() => {
        setLoanding(false);
      }, 300);
    } catch (error) {
      console.log(error);
      setLoanding(false);
      navigate("/error");
    }
  }, [celebProfilePath, navigate]);

  useEffect(() => {
    getCelebInfo();

    return () => {
      clearTimeout(timeOutId.current);
    };
  }, [getCelebInfo]);

  return (
    <>
      {/* loader */}
      <Loader
        classWidth="w-[50px]"
        classHeight="h-[50px]"
        classBorder="border-[4px]"
        classMargin="mt-[100px] lg:mt-10"
        loading={loading}
      />

      <div
        className={`${
          loading ? "hidden opacity-0 " : "opacity-1 block"
        } CelebProfile mt-[74px] grid grid-cols-12 gap-y-4 px-3 py-8 pb-[90px] text-[#ececec] md:px-5 lg:mt-0 lg:grid-cols-12 lg:gap-y-10 lg:gap-x-10 lg:p-10 xl:gap-y-14`}
      >
        <div className="col-span-12 xl:col-span-4">
          <img
            className="mx-auto w-[70%] sm:w-[50%] md:w-[40%] lg:w-[40%] xl:w-full"
            src={celebImgPath}
            alt="profile img"
          />
        </div>

        <div className="col-span-12 flex flex-col gap-y-2 text-center lg:mt-0 lg:gap-y-4 xl:col-span-8 xl:mt-5 xl:text-left">
          <h1 className="text-3xl lg:text-center lg:text-3xl xl:text-left xl:text-5xl">
            {celebInfo?.name}
          </h1>

          <h2 className="text-xl text-[#b5b5b5] lg:text-center lg:text-xl xl:text-left xl:text-2xl">
            {celebInfo?.birthday && celebInfo?.deathday
              ? `(${celebInfo?.birthday} / ${celebInfo?.deathday})`
              : `(${celebInfo?.birthday})`}
            {celebInfo?.place_of_birth ? ` - ${celebInfo?.place_of_birth}` : ""}
          </h2>

          {celebInfo?.biography ? (
            <p className="mt-4 px-1 text-justify leading-[28px] lg:px-0">
              {celebInfo?.biography}
            </p>
          ) : (
            <h3 className="text-xl text-primary 2xl:text-2xl">
              Info not found
            </h3>
          )}
        </div>

        <div className="col-span-12 mt-3 lg:mt-0">
          <FilmList
            title="Movies"
            specifyClass="moviesCelebProfile"
            type="movies"
            films={celebInfo?.movies}
          />
        </div>

        <div className="col-span-12">
          <FilmList
            title="TV Series"
            specifyClass="tvseriesCelebProfile"
            type="tvseries"
            films={celebInfo?.tvseries}
          />
        </div>
      </div>
    </>
  );
};

export default CelebProfile;
