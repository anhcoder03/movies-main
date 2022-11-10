import React from "react";

import { BsPlayCircleFill } from "react-icons/bs";
import { AiFillStar } from "react-icons/ai";

import { useNavigate } from "react-router-dom";

import coverImgNotFound from "../../assets/images/cover_not_found.jpg";

import PropTypes from "prop-types";
import useBuildApiPath from "../../hooks/useBuildApiPath";

const BannerItem = ({ type, filmID, info }) => {
  const navigate = useNavigate();

  const clickFilmBannerHandler = (event) => {
    event.stopPropagation();
    navigate(`/${type}/${filmID}`);
  };

  const imgBannerPath = useBuildApiPath({
    tag: "ImgOriginal",
    imgPath: info.backdrop_path,
  });

  return (
    <div
      onClick={clickFilmBannerHandler}
      className="BannerItem relative select-none hover:cursor-pointer"
    >
      <img
        src={info.backdrop_path ? imgBannerPath : coverImgNotFound}
        alt="banner img not found"
        className="max-h-[230px] w-full rounded-[20px] object-cover text-primary sm:max-h-[260px] md:max-h-[310px] lg:max-h-[465px]  2xl:max-h-[570px]"
      />

      <div className="absolute bottom-3 w-full px-4 text-white lg:bottom-8 lg:left-8 lg:w-auto lg:px-0">
        <h2 className="mb-1 text-xl font-bold lg:mb-5 lg:text-3xl 2xl:text-4xl">
          {type === "tvseries" ? info.name : info.title}
        </h2>

        <div className="mb-1 flex items-center justify-between sm:mb-5">
          <p className="mr-1 flex items-center text-base font-bold lg:text-xl">
            <AiFillStar className="mr-1 inline-block text-[20px] text-yellow-400 lg:mr-2 lg:text-[26px]" />
            {info.vote_average ? info.vote_average : "0"}
            <span className="test-base font-bold text-[#545454]">/10</span>
          </p>
          <button
            className="flex items-center justify-center rounded-full bg-primary p-2 font-medium outline-none transition-all hover:bg-red-400 sm:hidden"
            onClick={clickFilmBannerHandler}
          >
            <BsPlayCircleFill className="text-xl" />
          </button>
        </div>

        <button
          className="hidden items-center rounded-[10px] bg-primary px-10 py-2 font-medium outline-none transition-all hover:bg-red-400 sm:flex"
          onClick={clickFilmBannerHandler}
        >
          Watch
          <BsPlayCircleFill className="ml-1 inline-block text-xl" />
        </button>
      </div>
    </div>
  );
};

BannerItem.propTypes = {
  type: PropTypes.string,
  filmID: PropTypes.number,
  info: PropTypes.object,
};

export default BannerItem;
