import React, { useRef, useState, useEffect } from "react";

import axios from "axios";

import { useLocation, useNavigate, useParams } from "react-router-dom";

import FilmList from "../common/FilmList";
import FDActorList from "./FDActorList";
import FDTrailerList from "./FDTrailerList";
import Loader from "../common/Loader";
import FDTitlePart from "./FDTitlePart";
import FDIntroPart from "./FDIntroPart";
import FDGenresPart from "./FDGenresPart";

import coverImgNotFound from "../../assets/images/cover_not_found.jpg";
import posterImgNotFound from "../../assets/images/poster_not_found.jpg";

import useBuildApiPath from "../../hooks/useBuildApiPath";

import { useSelector } from "react-redux";

const FilmDetailsPage = () => {
  const [loading, setLoading] = useState(true);

  const [filmDetails, setFilmDetails] = useState({});

  const type = useRef("");

  const navigate = useNavigate();

  let { pathname } = useLocation();
  let { filmId } = useParams();

  const loginInfo = useSelector((state) => state.loginInfo);

  const timeOutId = useRef();

  const filmPosterPath = useBuildApiPath({
    tag: "Img500",
    imgPath: filmDetails?.poster_path,
  });

  const filmImgBannerPath = useBuildApiPath({
    tag: "ImgOriginal",
    imgPath: filmDetails?.backdrop_path,
  });

  // set type
  type.current = pathname.includes("tvseries") ? "tvseries" : "movies";

  const filmDetailsApiPaths = useBuildApiPath({
    tag: "FilmDetailsPage",
    type: type.current,
    filmId: filmId,
    session_id: loginInfo.session_id,
  });

  useEffect(() => {
    const getFilmDetails = async () => {
      try {
        setLoading(true);

        const res = await axios.get(filmDetailsApiPaths);

        setFilmDetails((prevData) => {
          // refactor data
          if (type.current === "movies") {
            // refactor movie's time
            const [hours, minutes] = [
              Math.floor(res.data.runtime / 60),
              res.data.runtime % 60,
            ];

            // get certification
            const USCertification = res.data.release_dates?.results?.filter(
              (item) => item.iso_3166_1 === "US"
            );

            const certification = USCertification[0]?.release_dates?.filter(
              (item) => item.certification !== ""
            )[0]?.certification;

            res.data = {
              ...res.data,
              hours,
              minutes,
              certification,
            };
          } else if (type.current === "tvseries") {
            const [hours, minutes] = [
              Math.floor(res.data.episode_run_time / 60),
              res.data.episode_run_time % 60,
            ];

            const certification = res.data.content_ratings.results.filter(
              (item) => item.iso_3166_1 === "US"
            )[0]?.rating;

            res.data = {
              ...res.data,
              hours,
              minutes,
              certification,
            };
          }

          // refactor vote average
          const vote_average = res.data.vote_average.toString().slice(0, 3);

          // get director
          const director = res.data.credits.crew
            .filter((person) => person.known_for_department === "Directing")
            .map((person) => person.name)
            .join(", ");

          res.data = {
            ...res.data,
            vote_average,
            director,
          };
          return res.data;
        });

        timeOutId.current = setTimeout(() => {
          setLoading(false);
        }, [200]);
      } catch (error) {
        console.log(error);
        setLoading(false);
        navigate("/error");
      }
    };

    // call function getData
    getFilmDetails();

    return () => {
      clearTimeout(timeOutId.current);
    };
  }, [
    pathname,
    filmId,
    loginInfo.session_id,
    loginInfo.user_id,
    navigate,
    filmDetailsApiPaths,
  ]);

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

      {!loading && (
        <div className="FilmDetail relative mt-[74px] grid grid-cols-1 gap-y-8 pb-[90px] transition-all lg:mt-0 lg:gap-y-12 lg:pb-0">
          {/* banner */}
          <div
            className="coverImgFilmDetails relative col-span-1 grid bg-cover px-4 py-8 md:px-5 lg:my-auto lg:grid-cols-12 lg:gap-10 lg:py-16 lg:px-10 2xl:py-10"
            style={{
              backgroundImage: `url(${
                filmDetails?.backdrop_path
                  ? filmImgBannerPath
                  : coverImgNotFound
              })`,
            }}
          >
            <div className="z-50 lg:col-span-5 2xl:col-span-4">
              <img
                className="mx-auto w-[70%] object-cover text-primary sm:w-[50%] md:w-[40%] lg:mx-0 lg:w-full"
                src={
                  filmDetails?.poster_path ? filmPosterPath : posterImgNotFound
                }
                alt="poster img not found"
              />
            </div>

            <div className="z-50 mt-8 flex flex-col justify-between text-[#ececec] lg:col-span-7 lg:mt-5 2xl:col-span-8">
              <FDTitlePart type={type} filmDetails={filmDetails} />

              <FDIntroPart type={type} filmDetails={filmDetails} />

              <FDGenresPart
                type={type}
                filmDetails={filmDetails}
                filmId={filmId}
              />
            </div>
          </div>

          {/* actors list */}
          <div className="relative col-span-1 mx-3 text-[#ececec] lg:col-span-12 lg:mx-10">
            <h4 className="mb-6 text-xl font-medium lg:mb-10 2xl:text-2xl">
              Actors
            </h4>
            {filmDetails?.credits?.cast?.length > 0 ? (
              <FDActorList
                specifyClass="film-details-actor-list"
                actors={filmDetails?.credits?.cast}
              />
            ) : (
              <h3 className="text-center text-xl text-primary 2xl:text-2xl">
                Actor not found
              </h3>
            )}
          </div>

          {/* trailers list */}
          <div className="relative col-span-1 mx-3 text-[#ececec] lg:col-span-12 lg:mx-10">
            <h4 className="mb-6 text-xl font-medium lg:mb-10 2xl:text-2xl">
              Trailers
            </h4>
            {filmDetails?.videos?.results.length > 0 ? (
              <FDTrailerList
                specifyClass="film-details-trailer-list"
                trailers={filmDetails?.videos?.results}
              />
            ) : (
              <h3 className="text-center text-xl text-primary 2xl:text-2xl">
                Trailer not found
              </h3>
            )}
          </div>

          {/* similar films list */}
          <div className="relative col-span-1 mx-3 text-[#ececec] lg:col-span-12 lg:mx-10">
            <FilmList
              title={
                type.current === "movies"
                  ? "Similar Movies"
                  : "Similar TV Series"
              }
              type={type.current}
              films={filmDetails?.similar?.results?.filter(
                (film) => film.poster_path
              )}
              specifyClass="film-details-similar-movies-list"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default FilmDetailsPage;
