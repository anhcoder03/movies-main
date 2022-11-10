import React from "react";

import { AiFillStar } from "react-icons/ai";

const FDTitlePart = ({ type, filmDetails }) => {
  return (
    <div className="flex flex-col gap-y-2 text-center lg:gap-y-4 lg:text-left">
      <h1 className="text-3xl lg:text-5xl">
        {type.current === "movies" ? filmDetails?.title : filmDetails?.name}
      </h1>

      <h2 className="text-xl text-[#b5b5b5] lg:text-2xl">
        {type.current === "movies"
          ? filmDetails?.original_title
          : filmDetails?.original_name}
        (
        {new Date(
          type.current === "movies"
            ? filmDetails?.release_date
            : filmDetails?.first_air_date
        ).getFullYear()}
        )
      </h2>

      <p>
        <span
          className={`${parseInt(filmDetails?.hours) ? "" : "hidden"} mr-1`}
        >
          {filmDetails?.hours} hour
          {type.current === "tvseries" ? "/episode" : ""}
        </span>
        <span
          className={`${parseInt(filmDetails?.minutes) ? "" : "hidden"} mr-2`}
        >
          {filmDetails?.minutes} minutes
          {type.current === "tvseries" ? "/episode" : ""}
        </span>
        {filmDetails?.certification && (
          <span className="rounded-[6px] bg-[#363636] px-2">
            {filmDetails?.certification}
          </span>
        )}
      </p>

      <p className="flex items-center justify-center lg:justify-start">
        <AiFillStar className="mr-1 inline-block text-[20px] text-yellow-400" />
        {filmDetails?.vote_average ? filmDetails?.vote_average : "0"}
      </p>
    </div>
  );
};

export default FDTitlePart;
