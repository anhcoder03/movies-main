import React, { useState, useEffect, useRef } from "react";

import LogoImg from "../../assets/images/logo.png";

import {
  BsArrowRightCircleFill,
  BsGrid1X2Fill,
  BsPlayCircleFill,
} from "react-icons/bs";
import { FaUserCircle } from "react-icons/fa";
import { IoMdLogOut, IoMdLogIn } from "react-icons/io";
import { HiOutlineMenuAlt1 } from "react-icons/hi";

import { Link, NavLink, useNavigate } from "react-router-dom";

import axios from "axios";

import avatarDefault from "../../assets/images/avatar_default.png";

import Loader from "../common/Loader";
import useBuildApiPath from "../../hooks/useBuildApiPath";
import { useSelector, useDispatch } from "react-redux";
import { setLoginInfo } from "../../redux/slices/loginInfoSlice";

const MenuSideBar = () => {
  const loginInfo = useSelector((state) => state.loginInfo);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [showMenu, setShowMenu] = useState(false);

  const avatarPath = useBuildApiPath({
    tag: "Img500",
    imgPath: loginInfo?.avatar,
  });

  const menuClickHanler = () => {
    setShowMenu(!showMenu);
  };

  const navClickHandler = () => {
    setShowMenu(false);
  };

  const logOutApiPaths = useBuildApiPath({
    tag: "Logout",
  });

  const logoutHandler = async () => {
    try {
      setLoading(true);
      const res_delete_session = await axios.delete(logOutApiPaths, {
        data: { session_id: loginInfo.session_id },
      });

      if (res_delete_session.data.success) {
        localStorage.clear();
        dispatch(
          setLoginInfo({
            session_id: "",
            user_id: "",
            username: "",
            avatar: "",
            logout: true,
          })
        );
        setLoading(false);
        setShowMenu(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      navigate("/error");
    }
  };

  // close menu when click outside
  const menu = useRef();

  useEffect(() => {
    const clickOutSideHandler = (event) => {
      const { target } = event;
      if (!menu.current.contains(target)) {
        setShowMenu(false);
      }
    };

    if (showMenu) {
      window.addEventListener("click", clickOutSideHandler);
    }

    return () => {
      window.removeEventListener("click", clickOutSideHandler);
    };
  }, [showMenu]);

  return (
    <div
      ref={menu}
      className={`${
        showMenu ? "h-[456px]" : "h-[74px]"
      } fixed top-0 right-0 left-0 z-[100] flex w-full select-none flex-col overflow-hidden bg-[#181818] p-5 text-[#ececec] transition-all duration-200 ease-linear lg:relative lg:z-auto lg:h-screen lg:w-[24%] lg:justify-between lg:border-r-2 lg:border-[#353535] lg:px-2 xl:w-[17%] 2xl:w-[13%] 2xl:px-0`}
    >
      <HiOutlineMenuAlt1
        onClick={menuClickHanler}
        className="visible absolute right-5 top-0 flex h-[74px]  text-3xl transition-all hover:cursor-pointer hover:text-primary lg:hidden"
      ></HiOutlineMenuAlt1>

      <div className="flex flex-col gap-y-6 lg:ml-2 lg:gap-y-10 xl:ml-3">
        <img
          className="w-[55px] justify-self-center hover:cursor-pointer lg:w-[45%] xl:w-[65%] 2xl:ml-1 2xl:w-[55%]"
          src={LogoImg}
          alt="logo"
          onClick={() => {
            setShowMenu(false);
            navigate("/");
          }}
        />

        <div className="flex flex-col gap-y-3 xl:gap-y-6 ">
          <h4 className="font-medium  uppercase text-[#505050] lg:tracking-[2px] 2xl:text-base 2xl:tracking-[2px]">
            Categories
          </h4>

          <div className="ml-3 flex flex-col gap-y-6 xl:ml-2 xl:gap-y-6">
            <NavLink
              className={({ isActive }) =>
                (isActive ? "text-primary" : "") +
                " " +
                "flex items-center leading-[25px] transition-colors hover:text-primary 2xl:text-base"
              }
              to="movies"
              onClick={navClickHandler}
            >
              <BsPlayCircleFill className="mr-[6px] inline-block " />
              Movies
            </NavLink>

            <NavLink
              className={({ isActive }) =>
                (isActive ? "text-primary" : "") +
                " " +
                "flex items-center leading-[25px] transition-colors hover:text-primary 2xl:text-base"
              }
              to="tvseries"
              onClick={navClickHandler}
            >
              <BsGrid1X2Fill className="mr-[6px] inline-block lg:text-[12px] 2xl:text-sm" />
              TV Series
            </NavLink>

            <NavLink
              className={({ isActive }) =>
                (isActive ? "text-primary" : "") +
                " " +
                "flex items-center leading-[25px] transition-colors hover:text-primary 2xl:text-base"
              }
              to="celebs"
              onClick={navClickHandler}
            >
              <FaUserCircle className="mr-[6px] inline-block lg:text-[15px] 2xl:text-[17px]" />
              Celebs
            </NavLink>
          </div>
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-y-3 lg:mt-0 lg:gap-y-4 2xl:gap-y-6">
        <h4 className="font-medium uppercase text-[#505050] lg:ml-2 xl:ml-3 xl:tracking-[2px]">
          General
        </h4>

        <div className="ml-3 flex flex-col lg:ml-5">
          {loginInfo.session_id && (
            <>
              {!loading ? (
                <Link
                  className="flex items-center transition-colors hover:text-primary"
                  onClick={logoutHandler}
                >
                  <IoMdLogOut className="mr-[6px] inline-block text-[19px] lg:text-base 2xl:text-[18px]" />
                  Log out
                </Link>
              ) : (
                <Loader
                  classWidth="w-5"
                  classHeight="h-5"
                  classBorder="border-2"
                  classMargin="mt-0"
                  loading={loading}
                />
              )}
            </>
          )}

          {!loginInfo.session_id && (
            <Link
              className="flex items-center transition-colors hover:text-primary"
              to="login"
              onClick={navClickHandler}
            >
              <IoMdLogIn className="mr-[6px] inline-block text-[19px] lg:text-base 2xl:text-[18px]" />
              Log in
            </Link>
          )}
        </div>

        {loginInfo.session_id && (
          <div className="mt-4 flex flex-col items-center justify-start border-t-2 border-t-primary pt-[20px] lg:justify-center lg:border-0 lg:pt-0 2xl:p-2">
            <img
              className="mr-[6px] inline-block h-[35px] w-[35px] rounded-full border-2 border-primary  object-cover lg:mb-[6px] lg:mr-0"
              src={loginInfo.avatar ? avatarPath : avatarDefault}
              alt="avatar img"
            />

            <span className="block w-full truncate text-center text-primary">
              {loginInfo.username}
            </span>
          </div>
        )}

        {!loginInfo.session_id && (
          <Link
            to={"signup"}
            onClick={navClickHandler}
            className="mt-9 flex w-full items-center justify-center rounded-[10px] bg-primary py-2 font-bold uppercase transition-colors hover:bg-red-400 lg:mx-auto lg:mt-0 lg:w-full lg:text-sm 2xl:w-[82%] 2xl:text-base"
          >
            Sign up
            <BsArrowRightCircleFill className="ml-[6px] inline-block lg:text-sm 2xl:text-[18px]" />
          </Link>
        )}
      </div>
    </div>
  );
};

export default MenuSideBar;
