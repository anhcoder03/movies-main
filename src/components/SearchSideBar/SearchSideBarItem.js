import React, { useEffect, useState } from "react";

import { AiFillStar } from "react-icons/ai";

import PropTypes from "prop-types";

import posterImgNotFound from "../../assets/images/poster_not_found.jpg";

import axios from "axios";

import { useNavigate } from "react-router-dom";
import useBuildApiPath from "../../hooks/useBuildApiPath";

const SearchSideBarItem = ({ film, type, showSearchOnMobile }) => {
  const [genres, setGenres] = useState([]);

  const navigate = useNavigate();

  const filmPosterPath = useBuildApiPath({
    tag: "Img500",
    imgPath: film?.poster_path,
  });

  const genresApiPaths = useBuildApiPath({
    tag: "Genres",
    type,
  });

  useEffect(() => {
    const getGenres = async () => {
      const resGenres = await axios.get(genresApiPaths);

      const genresResult = film.genre_ids.map((genre) => {
        return resGenres.data.genres.find(
          (genreListItem) => genre === genreListItem.id
        );
      });

      setGenres(genresResult.slice(0, 3));
    };

    getGenres();
  }, [type, film, genresApiPaths]);

  return (
    <div
      onClick={() => {
        showSearchOnMobile(false);
        navigate(`/${type === "movie" ? "movies" : "tvseries"}/${film?.id}`);
      }}
      className="SearchSideBarItem grid grid-cols-12 rounded-[20px] bg-[#33292E] bg-opacity-60 p-3 text-[#ECECEC] transition-all hover:scale-[102%] hover:cursor-pointer lg:gap-y-2 lg:hover:scale-105"
    >
      <img
        src={film?.poster_path ? filmPosterPath : posterImgNotFound}
        alt="poster film"
        className="col-span-3 my-auto w-full rounded-[10px] object-cover sm:col-span-2 lg:col-span-12 lg:h-[145px] lg:object-top xl:col-span-4 2xl:col-span-3 2xl:h-[135px]"
      />

      <div className="col-span-9 ml-[10px] flex flex-col justify-between  sm:col-span-10 lg:col-span-12 lg:ml-0 lg:gap-y-1 xl:col-span-8 xl:ml-[10px] 2xl:col-span-9">
        <div>
          <h4 className="truncate sm:text-xl lg:text-[17px]">
            {type === "tv" ? film?.name : film?.title}
          </h4>
          <div className="flex justify-between text-sm text-[#AFAFAF] sm:mt-2 sm:text-base lg:mt-0 lg:text-[13.5px] xl:mt-1">
            <p className="my-auto">
              {new Date(
                type === "tv" ? film?.first_air_date : film?.release_date
              ).getFullYear()}
            </p>
            <p>
              {film?.vote_average > 0
                ? film?.vote_average?.toString().slice(0, 3)
                : "0"}
              <AiFillStar className="ml-1 mb-1 inline-block text-[20px] text-yellow-400" />
            </p>
          </div>
        </div>

        <div className="row-span-1 flex flex-wrap gap-x-2 gap-y-1">
          {genres?.map((genre) => (
            <p
              onClick={(e) => {
                e.stopPropagation();
                showSearchOnMobile(false);
                navigate(
                  `/${
                    type === "movie" ? "movies" : "tvseries"
                  }/list/page/1?with_genres=${genre?.id?.toString()}`
                );
              }}
              key={genre?.id}
              className={`${
                genres.length > 1 ? "flex-1" : ""
              } flex items-center justify-center rounded-[10px] border-2 border-[#474749] px-2 py-[2px] text-center text-sm transition-all hover:cursor-pointer hover:border-white md:text-base lg:text-sm 2xl:py-1`}
            >
              {genre?.name}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

SearchSideBarItem.propTypes = {
  type: PropTypes.string,
  film: PropTypes.object,
};

export default SearchSideBarItem;
