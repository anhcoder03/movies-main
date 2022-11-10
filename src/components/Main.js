import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";

import CelebProfile from "./CelebsPage/CelebProfile";
import CelebsHomePage from "./CelebsPage/CelebsHomePage";
import FilmDetailsPage from "./FilmDetailsPage/FilmDetailsPage";
import MoviesHomePage from "./MoviesHomePage/MoviesHomePage";
import FilmsListPage from "./FilmsListPage/FilmsListPage";
import TVSeriesHomePage from "./TVSeriesHomePage/TVSeriesHomePage";
import SignUpPage from "./SignUpPage/SignUpPage";
import LoginPage from "./LoginPage/LoginPage";
import ResultSearchPage from "./ResultSearchPage/ResultSearchPage";
import CommonListPage from "./common/CommonListPage";
import ErrorPage from "./common/ErrorPage";

const Main = () => {
  return (
    <div className="Main no-scrollbar relative h-screen w-full overflow-scroll">
      {/* <div className="Main no-scrollbar relative col-span-12 h-screen  lg:col-span-8 lg:overflow-scroll"> */}
      <div>
        <Routes>
          <Route path="/" element={<Navigate to="movies" />}></Route>
          {/* Movies route */}
          <Route path="movies" element={<MoviesHomePage />}></Route>
          <Route path="movies/:filmId" element={<FilmDetailsPage />}></Route>
          <Route
            path="movies/list/page/:page"
            element={<FilmsListPage />}
          ></Route>
          <Route
            path="movies/search/page/:page"
            element={<ResultSearchPage />}
          ></Route>
          <Route
            path="movies/trending/page/:page"
            element={<CommonListPage />}
          ></Route>{" "}
          <Route
            path="movies/watchlist/page/:page"
            element={<CommonListPage />}
          ></Route>
          <Route
            path="movies/favorite/page/:page"
            element={<CommonListPage />}
          ></Route>
          {/* TV Series route */}
          <Route path="tvseries" element={<TVSeriesHomePage />}></Route>
          <Route path="tvseries/:filmId" element={<FilmDetailsPage />}></Route>
          <Route
            path="tvseries/list/page/:page"
            element={<FilmsListPage />}
          ></Route>
          <Route
            path="tvseries/search/page/:page"
            element={<ResultSearchPage />}
          ></Route>
          <Route
            path="tvseries/trending/page/:page"
            element={<CommonListPage />}
          ></Route>
          <Route
            path="tvseries/watchlist/page/:page"
            element={<CommonListPage />}
          ></Route>
          <Route
            path="tvseries/favorite/page/:page"
            element={<CommonListPage />}
          ></Route>
          {/* Celebs route */}
          <Route
            path="celebs"
            element={<Navigate to="/celebs/page/1" />}
          ></Route>
          <Route path="celebs/page/:page" element={<CelebsHomePage />}></Route>
          <Route
            path="celebs/profile/:celebId"
            element={<CelebProfile />}
          ></Route>
          <Route
            path="celebs/search/page/:page"
            element={<ResultSearchPage />}
          ></Route>
          {/* login, signup route */}
          <Route path="signup" element={<SignUpPage />}></Route>
          <Route path="login" element={<LoginPage />}></Route>
          {/* Error page */}
          <Route
            path="error"
            element={
              <ErrorPage msg="Something went wrong, please try again!" />
            }
          ></Route>
          {/* Route not found */}
          <Route path="*" element={<ErrorPage msg="Page not found." />}></Route>
        </Routes>
      </div>
    </div>
  );
};

export default Main;
