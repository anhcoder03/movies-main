import React from "react";

const FDIntroPart = ({ type, filmDetails }) => {
  return (
    <div className="mt-5">
      {filmDetails?.director && (
        <p className="mb-1">
          <span className="mr-2 uppercase text-[#b5b5b5]">Director:</span>
          {filmDetails?.director}
        </p>
      )}

      <p className="mb-1">
        <span className="mr-2 uppercase text-[#b5b5b5]">Nation:</span>
        {filmDetails?.production_countries
          ?.map((country) => country.name)
          .join(", ")}
      </p>

      <p className="mb-1">
        <span className="mr-2 uppercase text-[#b5b5b5]">Release date:</span>
        {type.current === "movies"
          ? filmDetails?.release_date
          : filmDetails?.first_air_date}
      </p>

      <p className="mt-5 text-justify leading-[24px]">
        {filmDetails?.overview}
      </p>
    </div>
  );
};

export default FDIntroPart;
