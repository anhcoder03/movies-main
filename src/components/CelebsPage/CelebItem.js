import { useState, useRef } from "react";

import { useNavigate } from "react-router-dom";

import PropTypes from "prop-types";

import useBuildApiPath from "../../hooks/useBuildApiPath";

const CelebItem = ({ celebId, name, profilePath }) => {
  const [imgLoaded, setImgLoaded] = useState(true);

  const navigate = useNavigate();

  const celebImgPath = useBuildApiPath({
    tag: "Img500",
    imgPath: profilePath,
  });

  const profileImg = useRef();

  return (
    <div
      className="flex flex-col items-center justify-center gap-y-1 rounded-[20px] bg-[#33292E] bg-opacity-60 p-3 text-center transition-all hover:scale-95 hover:cursor-pointer hover:bg-opacity-100"
      onClick={() => {
        navigate(`/celebs/profile/${celebId}`);
      }}
    >
      <div
        className={`${
          imgLoaded
            ? "before:absolute before:inset-0 before:z-[49] before:animate-pulse before:rounded-[10px] before:bg-[#181818] before:content-['']"
            : ""
        } relative w-full`}
      >
        <img
          ref={profileImg}
          className={`${
            imgLoaded ? "invisible" : ""
          } h-[230px] w-full rounded-[10px] object-cover lg:h-[200px] 2xl:h-[300px]`}
          src={celebImgPath}
          alt="actor img"
          loading="lazy"
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

      <p className="mt-2 inline-block w-full truncate font-medium text-[#ececec] transition-all hover:text-white">
        {name}
      </p>
    </div>
  );
};

CelebItem.propTypes = {
  celebId: PropTypes.number,
  name: PropTypes.string,
  profilePath: PropTypes.string,
};

export default CelebItem;
