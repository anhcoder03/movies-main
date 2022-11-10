import React from "react";

import PropTypes from "prop-types";

import Portal from "../common/Portal";
import { useLocation } from "react-router-dom";
import { useEffect, useRef } from "react";

const FDTrailerModal = ({ visible, onClose, children, bodyClassName = "" }) => {
  const { pathname } = useLocation();
  const closeFunc = useRef(onClose);

  // close modal when pathname was changed
  useEffect(() => {
    closeFunc.current();
  }, [pathname]);

  return (
    <Portal
      visible={visible}
      onClose={onClose}
      containerClassName="fixed z-[9999] inset-0 flex items-center justify-center"
      bodyStyle={{ transition: "all 250ms" }}
      bodyClassName={`relative z-10 content ${bodyClassName}`}
    >
      {children}
    </Portal>
  );
};

FDTrailerModal.propTypes = {
  bodyClassName: PropTypes.string,
  onClose: PropTypes.func,
  children: PropTypes.node,
  visible: PropTypes.bool,
};

export default FDTrailerModal;
