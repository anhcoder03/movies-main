import Main from "./components/Main";
import MenuSideBar from "./components/MenuSideBar/MenuSideBar";
import SearchSideBar from "./components/SearchSideBar/SearchSideBar";
import FDTrailerModal from "./components/FilmDetailsPage/FDTrailerModal";

import { createContext, useEffect, useState } from "react";
import { setLoginInfo } from "./redux/slices/loginInfoSlice";
import { useDispatch } from "react-redux";

// export context
export const TrailerModalContext = createContext();

function App() {
  const [loadTrailer, setloadTrailer] = useState(true);

  const [openModal, setOpenModal] = useState(false);

  const [trailerKey, setTrailerKey] = useState();

  const dispatch = useDispatch();

  useEffect(() => {
    // get login info from local storage
    if (localStorage.getItem("session_id")) {
      dispatch(
        setLoginInfo({
          session_id: localStorage.getItem("session_id"),
          user_id: localStorage.getItem("user_id"),
          username: localStorage.getItem("username"),
          avatar:
            localStorage.getItem("avatar") === "null"
              ? null
              : localStorage.getItem("avatar"),
        })
      );
    }
  }, [dispatch]);

  return (
    <div className="App relative mx-auto flex max-w-[1920px]">
      <MenuSideBar />

      <TrailerModalContext.Provider value={{ setOpenModal, setTrailerKey }}>
        <Main></Main>
      </TrailerModalContext.Provider>

      <SearchSideBar />

      {/* Trailer modal */}
      <FDTrailerModal
        visible={openModal}
        onClose={() => setOpenModal(false)}
        bodyClassName="w-[90%] h-[30%] lg:w-1/2 lg:h-1/2 bg-black flex items-center relative"
      >
        {/* loader */}
        <div
          className={`${
            loadTrailer ? "visible opacity-100" : "hidden opacity-0"
          } absolute inset-0 m-auto h-[30px] w-[30px] animate-spin rounded-full border-[4px] border-primary border-r-transparent`}
        ></div>

        {/* iframe for youtube video */}
        <iframe
          className={`${
            loadTrailer ? "opacity-0" : "opacity-100"
          } h-full w-full`}
          onLoad={() => {
            setloadTrailer(false);
          }}
          src={`https://www.youtube.com/embed/${trailerKey}`}
          title="YouTube video player"
          frameBorder="0"
          allowFullScreen
        ></iframe>
      </FDTrailerModal>
    </div>
  );
}

export default App;
