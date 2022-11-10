import React, { useState, useEffect, useRef, useCallback } from "react";

import axios from "axios";

import PropTypes from "prop-types";

import { createSearchParams, useLocation, useNavigate } from "react-router-dom";
import useBuildApiPath from "../../hooks/useBuildApiPath";

const FilterBar = ({ type }) => {
  const [filters, setFilters] = useState({});

  const [filterSelected, setFilterSelected] = useState({});

  const navigate = useNavigate();
  let { search } = useLocation();

  const filterParams = useRef({});

  const genresApiPath = useBuildApiPath({ tag: "FilterBarGenres", type: type });
  const certificationsApiPath = useBuildApiPath({
    tag: "FilterBarCertifications",
    type: type,
  });

  // change filter handler
  const selectionChangeHanler = (event) => {
    let name = event.target.name;
    let signYear = "";
    let filterYear = "";
    let filterYearLte = "";

    // filter year
    if (type === "movie") {
      signYear = "primary_release";
      filterYear = "primary_release_year";
      filterYearLte = "primary_release_date.lte";
    } else {
      signYear = "first_air_date";
      filterYear = "first_air_date_year";
      filterYearLte = "first_air_date.lte";
    }

    // change filter year's name
    if (
      event.target.name.includes(signYear) &&
      event.target.selectedOptions[0].innerText.includes("before") &&
      Object.keys(filterParams.current).includes(filterYear)
    ) {
      delete filterParams.current[filterYear];
      name = filterYearLte;
    } else if (
      event.target.name.includes(signYear) &&
      Object.keys(filterParams.current).includes(filterYearLte)
    ) {
      delete filterParams.current[filterYearLte];
    }

    // add filter to object
    if (event.target.value && event.target.value !== "none") {
      filterParams.current[name] = event.target.value;
    } else {
      delete filterParams.current[name];
    }

    //navigate to load new list when choose filter
    navigate({
      pathname: `/${type === "movie" ? "movies" : "tvseries"}/list/page/1`,
      search: createSearchParams(filterParams.current).toString(),
    });
  };

  const getFilters = useCallback(async () => {
    // get genres data
    const resGenres = await axios.get(genresApiPath);

    // get certification data
    let resCertification;
    if (type === "movie") {
      resCertification = await axios.get(certificationsApiPath);
    }

    // build list of years
    const yearNow = new Date().getFullYear();
    const years = [yearNow];
    for (let i = 1; i <= 10; i++) {
      years.push(yearNow - i);
    }

    // list of sort by
    let sortBy = [];
    if (type === "movie") {
      sortBy = [
        { id: 1, name: "popularity", value: "popularity.desc" },
        { id: 2, name: "release date", value: "release_date.desc" },
        {
          id: 3,
          name: "vote count",
          value: "vote_count.desc",
        },
      ];
    } else {
      sortBy = [
        { id: 1, name: "popularity", value: "popularity.desc" },
        { id: 2, name: "first air date", value: "first_air_date.desc" },
        {
          id: 3,
          name: "vote average",
          value: "vote_average.desc",
        },
      ];
    }

    //tv series types list
    const tvTypes = [
      { name: "Documentary", value: "0" },
      { name: "News", value: "1" },
      { name: "Miniseries", value: "2" },
      {
        name: "Reality",
        value: "3",
      },
      { name: "Scripted", value: "4" },
      { name: "Talk Show", value: "5" },
      {
        name: "Video",
        value: "6",
      },
    ];

    // set data to render select - option
    if (type === "movie") {
      setFilters({
        genres: resGenres.data.genres,
        certifications: resCertification.data.certifications.US,
        years,
        sortBy,
      });
    } else {
      setFilters({
        genres: resGenres.data.genres,
        years,
        sortBy,
        tvTypes,
      });
    }
  }, [certificationsApiPath, genresApiPath, type]);

  // Get data when type change
  useEffect(() => {
    getFilters();
  }, [getFilters]);

  // get filter params from URL when page reloaded and bind to select's value
  const buildFilterSearchObj = (search) => {
    if (search) {
      search = search.slice(1, search.length);
      const searchArr = search.split("&");
      const FilterSearchObj = searchArr.reduce((obj, filter) => {
        filter = filter.split("=");

        return {
          ...obj,
          [filter[0]]: filter[1],
        };
      }, {});
      return FilterSearchObj;
    }
  };

  // set filter params to oject
  useEffect(() => {
    filterParams.current = buildFilterSearchObj(search) || {};
    setFilterSelected(() => buildFilterSearchObj(search));
  }, [search]);

  return (
    <div className="FilterBar mb-5 grid w-full grid-cols-2 justify-between gap-x-2 gap-y-3 rounded-[20px] bg-[#33292E] bg-opacity-60 py-5 px-1 md:grid-cols-4 lg:gap-x-5">
      {/* Genres */}
      <div className="flex flex-col items-start justify-center px-[10px]">
        <label className="mr-2 text-[#ececec]" htmlFor="genres">
          Genres:
        </label>
        <select
          onChange={selectionChangeHanler}
          name="with_genres"
          className="mt-1 w-full rounded-[7px] py-1 px-2 hover:cursor-pointer focus:outline-none"
          id="genres"
          value={
            filterSelected?.with_genres ? filterSelected?.with_genres : "none"
          }
        >
          <option key="default" value="none">
            -- genes --
          </option>
          {filters?.genres?.map((genre) => (
            <option key={genre.id} value={genre.id.toString()}>
              {genre.name}
            </option>
          ))}
        </select>
      </div>

      {/* Certification */}
      {type === "movie" && (
        <div className="flex flex-col items-start justify-center px-[10px]">
          <label className="mr-2 text-[#ececec]" htmlFor="certification">
            Certification:
          </label>
          <select
            onChange={selectionChangeHanler}
            name="certification"
            className="mt-1 w-full rounded-[7px] py-1 px-2 hover:cursor-pointer focus:outline-none"
            value={
              filterSelected?.certification
                ? filterSelected?.certification
                : "none"
            }
            id="certification"
          >
            <option key="default" value="none">
              -- certification --
            </option>
            {filters?.certifications?.map((certification) => (
              <option
                key={certification.certification}
                value={certification.certification}
              >
                {certification.certification}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* TV Series type */}
      {type === "tv" && (
        <div className="flex flex-col items-start justify-center px-[10px]">
          <label className="mr-2 text-[#ececec]" htmlFor="certification">
            Type:
          </label>
          <select
            onChange={selectionChangeHanler}
            name="with_type"
            className="mt-1 w-full rounded-[7px] py-1 px-2 hover:cursor-pointer focus:outline-none"
            value={
              filterSelected?.with_type ? filterSelected?.with_type : "none"
            }
            id="tvType"
          >
            <option key="default" value="none">
              -- type --
            </option>
            {filters?.tvTypes?.map((tvtype) => (
              <option key={tvtype.value} value={tvtype.value}>
                {tvtype.name}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Year */}
      <div className="flex flex-col items-start justify-center px-[10px]">
        <label className="mr-2 text-[#ececec]" htmlFor="year">
          Year:
        </label>
        <select
          onChange={selectionChangeHanler}
          name={
            type === "movie" ? "primary_release_year" : "first_air_date_year"
          }
          className="mt-1 w-full rounded-[7px] py-1 px-2 hover:cursor-pointer focus:outline-none"
          value={
            type === "movie"
              ? filterSelected?.primary_release_year ||
                (filterSelected &&
                  filterSelected["primary_release_date.lte"]) ||
                "none"
              : filterSelected?.first_air_date_year ||
                (filterSelected && filterSelected["first_air_date.lte"]) ||
                "none"
          }
          id="year"
        >
          <option key="default" value="none">
            -- year --
          </option>
          {filters?.years?.map((year, index, years) => (
            <option key={year} value={year}>
              {index === years.length - 1 ? `before ${year}` : `${year}`}
            </option>
          ))}
        </select>
      </div>

      {/* Sort by */}
      <div className="flex flex-col items-start justify-center px-[10px]">
        <label className="mr-2 text-[#ececec]" htmlFor="sort">
          Sort by:
        </label>
        <select
          onChange={selectionChangeHanler}
          name="sort_by"
          className="mt-1 w-full rounded-[7px] py-1 px-2 hover:cursor-pointer focus:outline-none"
          value={filterSelected?.sort_by ? filterSelected?.sort_by : "none"}
          id="sort"
        >
          <option key="default" value="none">
            -- sort --
          </option>
          {filters?.sortBy?.map((sortItem) => (
            <option key={sortItem.id} value={sortItem.value}>
              {sortItem.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

FilterBar.propTypes = { type: PropTypes.string };

export default FilterBar;
