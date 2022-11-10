import React, { useEffect } from "react";

import { BsArrowRight } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

import { SwiperSlide } from "swiper/react";

import { useDispatch, useSelector } from "react-redux";
import { getTvSeries } from "../../redux/slices/tvSeriesHomePageSlice";

import BannerItem from "../common/BannerItem";
import CustomSlider from "../common/CustomSlider";
import FilmList from "../common/FilmList";
import Loader from "../common/Loader";

const TVSeriesHomePage = () => {
  const navigate = useNavigate();

  const tvSeries = useSelector((state) => state.tvSeriesHomePage);
  const dispatch = useDispatch();

  useEffect(() => {
    // get tvseries
    dispatch(getTvSeries());
    // nav to error page
    if (tvSeries.error) {
      navigate("/error");
    }
  }, [dispatch, navigate, tvSeries.error]);

  return (
    <>
      {/* loader */}
      <Loader
        classWidth="w-[50px]"
        classHeight="h-[50px]"
        classBorder="border-[4px]"
        classMargin="mt-[100px] lg:mt-10"
        loading={tvSeries.loading}
      />

      {!tvSeries.loading && (
        <div className=" TVSeriesHomePage mt-[90px] px-3 pb-[90px] md:mt-[100px] md:mb-[100px] md:px-5 lg:my-0 lg:p-10">
          {/* banner */}
          <div className="relative  mb-6 overflow-hidden rounded-[20px]">
            <CustomSlider
              specifyClass="TVSeriesBanner"
              paginationClass="banner"
              autoPlay={true}
            >
              {tvSeries?.onAir?.map((film) => {
                return (
                  <SwiperSlide key={film.id}>
                    <BannerItem type="tvseries" filmID={film.id} info={film} />
                  </SwiperSlide>
                );
              })}
            </CustomSlider>
          </div>

          {/* Popular TV series */}
          <FilmList
            type="tvseries"
            title="Popular TV series"
            films={tvSeries?.popular}
            specifyClass="TVSeriesPopList"
          />

          {/* Top rated TV series */}
          <FilmList
            type="tvseries"
            title="Top rated TV series"
            films={tvSeries?.topRated}
            specifyClass="TVSeriesTopList"
          />

          <button
            onClick={() => {
              navigate("/tvseries/list/page/1");
            }}
            className="ml-auto flex items-center justify-center rounded-[10px] bg-transparent px-5 py-2 font-medium text-primary outline-none transition-all hover:bg-primary hover:text-white lg:text-lg 2xl:text-xl"
          >
            See more
            <BsArrowRight className="ml-2 inline-block font-bold lg:text-xl 2xl:text-2xl" />
          </button>
        </div>
      )}
    </>
  );
};

export default TVSeriesHomePage;
