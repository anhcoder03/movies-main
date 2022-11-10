import React from "react";

import { TiWarning } from "react-icons/ti";

const ErrorPage = ({ msg }) => {
  return (
    <div className="PageNotFound flex h-screen items-center justify-center px-4 text-center text-2xl text-primary lg:text-4xl 2xl:text-5xl">
      <p>
        <TiWarning className="mr-2 inline-block text-3xl lg:text-5xl 2xl:text-6xl" />
        {msg}
      </p>
    </div>
  );
};

export default ErrorPage;
