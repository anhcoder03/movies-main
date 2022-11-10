import { SwiperSlide } from "swiper/react";

import CustomSlider from "./CustomSlider";
import FilmItem from "./FilmItem";

import PropTypes from "prop-types";

const swiperResponsiveConfig = {
  1536: {
    slidesPerView: 5,
    slidesPerGroup: 5,
  },
  1280: {
    slidesPerView: 4,
    slidesPerGroup: 4,
  },
  1024: {
    slidesPerView: 3,
    slidesPerGroup: 3,
  },
  768: {
    slidesPerView: 4,
    slidesPerGroup: 4,
  },
  600: {
    slidesPerView: 3,
    slidesPerGroup: 3,
  },
  200: {
    slidesPerView: 2,
    slidesPerGroup: 2,
  },
};

const FilmList = ({ title, type, specifyClass, films }) => {
  return (
    <div className="FilmList relative mb-6 lg:mb-0">
      <h2 className="mb-5  text-xl font-medium text-[#ECECEC] 2xl:text-2xl">
        {title}
      </h2>

      {films?.length > 0 ? (
        <div className="overflow-hidden rounded-[20px]">
          <CustomSlider
            specifyClass={specifyClass}
            paginationClass="normalList"
            config={swiperResponsiveConfig}
          >
            {films?.map((film) => {
              return (
                <SwiperSlide key={film?.id}>
                  <FilmItem type={type} filmID={film?.id} info={film} />
                </SwiperSlide>
              );
            })}
          </CustomSlider>
        </div>
      ) : (
        <h3 className="mb-10 text-center text-xl text-primary 2xl:text-2xl">{`${
          type === "movies" ? "Movies" : "TV Series"
        } not found`}</h3>
      )}
    </div>
  );
};

FilmList.propTypes = {
  specifyClass: PropTypes.string,
  type: PropTypes.string,
  title: PropTypes.string,
  films: PropTypes.array,
};

export default FilmList;
