import React, { useState } from "react";

import bgImage from "../../assets/images/login_bg.jpg";
import Loader from "../common/Loader";

const SignUpPage = () => {
  const [loading, setLoading] = useState(true);

  return (
    <div className="SignUpPage bg_overlay flex h-[100vh] w-full items-center p-10">
      {/* loader */}
      <Loader
        classWidth="w-[50px]"
        classHeight="h-[50px]"
        classBorder="border-[4px]"
        classMargin="mt-0 z-50"
        loading={loading}
      />

      <img
        src={bgImage}
        alt="bg-img"
        className="absolute inset-0 h-screen object-cover"
        onLoad={() => {
          setLoading(false);
        }}
      />

      {!loading && (
        <h2 className="z-50 text-center text-3xl leading-[45px] text-[#ececec]">
          This web uses The movie DB API, so please go to the main page of The
          movie DB
          <a
            href="https://www.themoviedb.org/signup"
            target="_blank"
            rel="noopener noreferrer"
            className="trasition-all px-2 text-primary hover:text-red-400"
          >
            here
          </a>
          to sign up for an account.
        </h2>
      )}
    </div>
  );
};

export default SignUpPage;
