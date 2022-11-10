import { SwiperSlide } from "swiper/react";

import CustomSlider from "../common/CustomSlider";
import FDTrailerItem from "./FDTrailerItem";

import PropTypes from "prop-types";

const swiperResponsiveConfig = {
  992: {
    slidesPerView: 4,
    slidesPerGroup: 4,
  },
  768: {
    slidesPerView: 4,
    slidesPerGroup: 4,
  },
  640: {
    slidesPerView: 3,
    slidesPerGroup: 3,
  },
  200: {
    slidesPerView: 2,
    slidesPerGroup: 2,
  },
};

const FDTrailerList = ({ specifyClass, trailers }) => {
  return (
    <CustomSlider
      specifyClass={specifyClass}
      paginationClass="normalList"
      config={swiperResponsiveConfig}
    >
      {trailers
        ?.filter((trailer) => trailer.site === "YouTube")
        .map((trailer) => {
          return (
            <SwiperSlide key={trailer.id}>
              <FDTrailerItem videoKey={trailer.key} />
            </SwiperSlide>
          );
        })}
    </CustomSlider>
  );
};

FDTrailerList.propTypes = {
  specifyClass: PropTypes.string,
  trailers: PropTypes.array,
};

export default FDTrailerList;
