import React, { useContext, useRef, useState } from "react";

import { BsFillPlayFill } from "react-icons/bs";

import { TrailerModalContext } from "../../App";

import PropTypes from "prop-types";

import useBuildApiPath from "../../hooks/useBuildApiPath";

const FDTrailerItem = ({ videoKey }) => {
  const [imgLoaded, setImgLoaded] = useState(true);
  // get props from TrailerModalContext
  const { setOpenModal, setTrailerKey } = useContext(TrailerModalContext);

  const trailerImgPath = useBuildApiPath({
    tag: "TrailerImg",
    videoKey: videoKey,
  });

  const trailerImg = useRef();

  return (
    <div
      className="group relative hover:cursor-pointer"
      onClick={() => {
        // open modal and update videoKey for iframe
        setTrailerKey(videoKey);
        setOpenModal(true);
      }}
    >
      <div
        className={`${
          imgLoaded
            ? "before:rounded-0 before:absolute before:inset-0 before:z-[49] before:animate-pulse before:bg-[#181818] before:content-['']"
            : ""
        } relative w-full`}
      >
        <img
          ref={trailerImg}
          className={`${
            imgLoaded ? "invisible" : ""
          } h-full w-full object-cover`}
          src={trailerImgPath}
          alt="trailer thumb"
          loading="lazy"
          onLoad={() => {
            if (
              trailerImg.current.complete &&
              trailerImg.current.naturalHeight > 0
            ) {
              setImgLoaded(false);
            }
          }}
        />
      </div>
      <BsFillPlayFill className="absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 text-[55px] text-white opacity-0 transition-all group-hover:opacity-100" />
    </div>
  );
};

FDTrailerItem.propTypes = {
  videoKey: PropTypes.string,
};

export default FDTrailerItem;
