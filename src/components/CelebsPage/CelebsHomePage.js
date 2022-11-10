import React, { useEffect, useState } from "react";

import axios from "axios";

import { useNavigate, useParams } from "react-router-dom";

import CelebItem from "./CelebItem";
import Loader from "../common/Loader";
import CustomPagination from "../common/CustomPagination";
import useBuildApiPath from "../../hooks/useBuildApiPath";

const CelebsHomePage = () => {
  const [celebsList, setCelebsList] = useState();

  const [loading, setLoading] = useState(true);

  let { page } = useParams();

  const navigate = useNavigate();

  const celebListApiPath = useBuildApiPath({
    tag: "CelebListPage",
    page: page,
  });

  useEffect(() => {
    const getCelebsList = async () => {
      try {
        setLoading(true);
        const res = await axios.get(celebListApiPath);

        setCelebsList(res.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
        navigate("/error");
      }
    };

    getCelebsList();
  }, [navigate, celebListApiPath]);

  return (
    <div className="CelebsHomePage transtion-all mt-[100px] px-3 pb-[90px] md:px-5 lg:mt-0 lg:p-10">
      <h1 className="mb-7 text-center text-2xl font-medium text-[#cecece] lg:mb-10 2xl:text-3xl">
        Celebs
      </h1>

      {/* loader */}
      <Loader
        classWidth="w-[50px]"
        classHeight="h-[50px]"
        classBorder="border-[4px]"
        classMargin="mt-10"
        loading={loading}
      />

      <div
        className={`${
          loading ? "hidden opacity-0 " : "opacity-1 grid"
        } grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:gap-5`}
      >
        {celebsList?.results
          ?.filter((celeb) => celeb.profile_path !== null)
          .map((celeb) => (
            <CelebItem
              key={celeb.id}
              celebId={celeb.id}
              name={celeb.name}
              profilePath={celeb.profile_path}
            />
          ))}
      </div>

      {/* pagination */}
      <CustomPagination
        totalPage={celebsList?.total_pages ? celebsList?.total_pages : 1}
        page={parseInt(page)}
        onPageChange={(e) => {
          navigate(`/celebs/page/${(e.selected + 1).toString()}`);
        }}
      />
    </div>
  );
};

export default CelebsHomePage;
