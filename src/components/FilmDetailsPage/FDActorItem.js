import React, { useState, useRef } from "react";

import { Link, useNavigate } from "react-router-dom";

import PropTypes from "prop-types";

import useBuildApiPath from "../../hooks/useBuildApiPath";

const FDActorItem = ({ actor }) => {
  const [imgLoaded, setImgLoaded] = useState(true);

  const navigate = useNavigate();

  const celebImgPath = useBuildApiPath({
    tag: "Img500",
    imgPath: actor?.profile_path,
  });

  const profileImg = useRef();

  return (
    <div className="flex flex-col items-center justify-center gap-y-1 text-center ">
      <div
        className={`${
          imgLoaded
            ? "before:absolute before:inset-0 before:z-[49] before:animate-pulse before:rounded-[20px] before:bg-[#181818] before:content-['']"
            : ""
        } relative w-full`}
      >
        <img
          ref={profileImg}
          className={`${
            imgLoaded ? "invisible" : ""
          } h-[250px] w-full rounded-[20px] border-2 border-[#252229] object-cover transition-all hover:cursor-pointer hover:border-2 hover:border-white lg:h-[200px] 2xl:h-[300px]`}
          src={celebImgPath}
          alt="actor img"
          loading="lazy"
          onClick={() => {
            navigate(`/celebs/profile/${actor.id}`);
          }}
          onLoad={() => {
            if (
              profileImg.current.complete &&
              profileImg.current.naturalHeight > 0
            ) {
              setImgLoaded(false);
            }
          }}
        />
      </div>

      <Link
        to={`/celebs/profile/${actor.id}`}
        className="mt-3 font-medium text-[#ececec] transition-all hover:text-white"
      >
        {actor?.original_name}
      </Link>

      <p className="font-light text-[#b5b5b5]">{actor?.character}</p>
    </div>
  );
};

FDActorItem.propTypes = {
  actor: PropTypes.object,
};

export default FDActorItem;
