import { useEffect } from "react";

import CustomSlider from "../common/CustomSlider";
import BannerItem from "../common/BannerItem";
import FilmList from "../common/FilmList";
import Loader from "../common/Loader";

import { BsArrowRight } from "react-icons/bs";

import { SwiperSlide } from "swiper/react";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getMovies } from "../../redux/slices/moviesHomePageSlice";

const MoviesHomePage = () => {
  const dispatch = useDispatch();

  const movies = useSelector((state) => state.moviesHomePage);

  const navigate = useNavigate();

  useEffect(() => {
    // get movies
    dispatch(getMovies());
    // nav to error page
    if (movies.error) {
      navigate("/error");
    }
  }, [dispatch, navigate, movies.error]);

  return (
    <>
      {/* loader */}
      <Loader
        classWidth="w-[50px]"
        classHeight="h-[50px]"
        classBorder="border-[4px]"
        classMargin="mt-[100px] lg:mt-10"
        loading={movies.loading}
      />

      {!movies.loading && (
        <div className="MoviesHomePage mt-[90px] px-3 pb-[90px] md:mt-[100px] md:mb-[100px] md:px-5 lg:my-0 lg:p-10">
          {/* Banner */}
          <div className="relative mb-6 overflow-hidden rounded-[20px]">
            <CustomSlider
              specifyClass="moviesBanner"
              paginationClass="banner"
              autoPlay={true}
            >
              {movies?.nowPlaying?.map((film) => (
                <SwiperSlide key={film.id}>
                  <BannerItem type="movies" filmID={film.id} info={film} />
                </SwiperSlide>
              ))}
            </CustomSlider>
          </div>

          {/* Popular movies */}
          <FilmList
            title="Popular movies"
            specifyClass="moviesPopList"
            type="movies"
            films={movies.popular}
          />

          {/* Top rated movies */}
          <FilmList
            title="Top rated movies"
            specifyClass="moviesTopList"
            type="movies"
            films={movies.topRated}
          />

          <button
            onClick={() => {
              navigate("/movies/list/page/1");
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

export default MoviesHomePage;
