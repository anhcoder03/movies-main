import React from "react";

import PropTypes from "prop-types";

const Loader = ({
  classWidth,
  classHeight,
  classBorder,
  classMargin,
  loading,
}) => {
  return (
    <div
      className={`${
        loading ? "opacity-1 block" : "opacity-0 hidden"
      }  ${classWidth} ${classHeight} ${classBorder} ${classMargin} border-y-primary border-l-primary border-r-transparent rounded-full animate-spin mx-auto  transtion-all`}
    ></div>
  );
};

Loader.propTypes = {
  classWidth: PropTypes.string,
  classHeight: PropTypes.string,
  classBorder: PropTypes.string,
  classMargin: PropTypes.string,
  loading: PropTypes.bool,
};

export default Loader;
