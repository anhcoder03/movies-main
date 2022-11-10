import React from "react";

import { SwiperSlide } from "swiper/react";

import CustomSlider from "../common/CustomSlider";
import FDActorItem from "./FDActorItem";

import PropTypes from "prop-types";

const swiperResponsiveConfig = {
  1366: {
    slidesPerView: 6,
    slidesPerGroup: 6,
  },
  992: {
    slidesPerView: 5,
    slidesPerGroup: 5,
  },
  768: {
    slidesPerView: 4,
    slidesPerGroup: 4,
  },
  500: {
    slidesPerView: 3,
    slidesPerGroup: 3,
  },
  200: {
    slidesPerView: 2,
    slidesPerGroup: 2,
  },
};

const FDActorList = ({ specifyClass, actors }) => {
  return (
    <div className="overflow-hidden rounded-[20px]">
      <CustomSlider
        specifyClass={specifyClass}
        paginationClass="normalList"
        config={swiperResponsiveConfig}
      >
        {[
          ...new Map(
            actors
              ?.filter((actor) => actor.profile_path)
              .map((item) => [item.id, item])
          ).values(),
        ].map((actor) => (
          <SwiperSlide key={actor.id}>
            <FDActorItem actor={actor} />
          </SwiperSlide>
        ))}
      </CustomSlider>
    </div>
  );
};

FDActorList.propTypes = {
  specifyClass: PropTypes.string,
  actors: PropTypes.array,
};

export default FDActorList;
