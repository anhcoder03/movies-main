import React from "react";

import ReactPaginate from "react-paginate";

import PropTypes from "prop-types";

const CustomPagination = ({ totalPage, onPageChange, page }) => {
  return (
    <>
      <ReactPaginate
        pageCount={totalPage >= 500 ? 500 : totalPage}
        className="mt-10 flex flex-wrap items-center justify-center gap-x-2 gap-y-[6px] text-[15px] text-[#ececec] lg:gap-x-3 lg:text-base"
        pageLinkClassName="bg-[#33292E] bg-opacity-80  transition-all hover:bg-opacity-100 py-1 px-2 rounded-[5px]"
        previousClassName="bg-[#33292E] bg-opacity-80  transition-all hover:bg-opacity-100 py-1 px-2 rounded-[5px]"
        nextClassName="bg-[#33292E] bg-opacity-80  transition-all hover:bg-opacity-100 py-1 px-2 rounded-[5px]"
        activeClassName="text-primary"
        disabledClassName="opacity-40"
        disabledLinkClassName="hover:cursor-default"
        renderOnZeroPageCount={null}
        forcePage={parseInt(page) - 1}
        disableInitialCallback={true}
        pageRangeDisplayed={2}
        marginPagesDisplayed={window.innerHeight <= 1024 ? 1 : 3}
        onPageChange={onPageChange}
      />
    </>
  );
};

CustomPagination.propTypes = {
  totalPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
};

export default CustomPagination;
