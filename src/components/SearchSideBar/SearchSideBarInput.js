import React, { useState, useEffect, useRef } from "react";

import { FiSearch } from "react-icons/fi";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

import useDebounce from "../../hooks/useDebounce";

const SearchSideBarInput = ({ setOpenSearchSidebar, openSearchSidebar }) => {
  const [type, setType] = useState("");

  const [searchQuery, setSearchQuery] = useState("");

  const { pathname } = useLocation();

  const typeRef = useRef("");

  const navigate = useRef(useNavigate());

  const [searchParams] = useSearchParams();

  const reload = useRef(false);

  // preventing call API a lots of times when the user types in the search input
  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  const clickOpenSideBarHandler = () => {
    setOpenSearchSidebar(!openSearchSidebar);
  };

  useEffect(() => {
    // set search param when reload
    const searchParam = searchParams.get("query");
    if (searchParam) {
      reload.current = true;
      setSearchQuery(searchParam);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // navigation when the user types in the search input
    if (debouncedSearchQuery) {
      if (reload.current === false) {
        setOpenSearchSidebar(false);
        navigate.current(
          `/${typeRef.current}/search/page/1?query=${debouncedSearchQuery}`
        );
      } else {
        reload.current = false;
      }
    }
  }, [debouncedSearchQuery, setOpenSearchSidebar]);

  useEffect(() => {
    // set search placeholder and path to navigate base on the pathname
    if (pathname.includes("movies")) {
      setType("Movies");

      typeRef.current = "movies";
    }

    if (pathname.includes("tvseries")) {
      setType("TV Series");

      typeRef.current = "tvseries";
    }

    if (pathname.includes("celebs")) {
      setType("Celebs");

      typeRef.current = "celebs";
    }

    if (!pathname.includes("search")) {
      setSearchQuery("");
    }
  }, [pathname]);

  return (
    <div className="sticky top-0 z-50 flex gap-x-2 bg-[#181818] bg-opacity-95 py-3 px-3 lg:py-5 xl:px-6">
      {!openSearchSidebar && (
        <IoIosArrowUp
          onClick={clickOpenSideBarHandler}
          className="rounded-[10px] bg-[#252229] p-2 text-[44px] lg:hidden"
        />
      )}

      {openSearchSidebar && (
        <IoIosArrowDown
          onClick={clickOpenSideBarHandler}
          className="rounded-[10px] bg-[#252229] p-2 text-[44px] lg:hidden"
        />
      )}

      <FiSearch className="absolute top-1/2 right-[25px] -translate-y-1/2 text-[22px] text-[#9CA3AF] lg:right-[39px] lg:hidden xl:block" />

      <input
        type="text"
        placeholder={`Search ${type}`}
        className="w-full truncate rounded-[10px] bg-[#252229] px-[15px] py-[10px] outline-none focus:outline-[#353535]"
        onChange={(e) => {
          setSearchQuery(e.target.value);
        }}
        value={searchQuery}
      />
    </div>
  );
};

export default SearchSideBarInput;
