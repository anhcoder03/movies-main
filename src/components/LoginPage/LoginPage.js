import React, { useState, useEffect } from "react";

import { BsCheckLg } from "react-icons/bs";

import bgImage from "../../assets/images/login_bg.jpg";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { useNavigate } from "react-router-dom";
import Loader from "../common/Loader";
import { useDispatch, useSelector } from "react-redux";
import {
  getLoginInfo,
  setShowErrorMsg,
} from "../../redux/slices/loginInfoSlice";

// Yup validation schema
const validationSchema = yup.object({
  username: yup.string().required("Please enter your Username!"),
  password: yup.string().required("Please enter your Password!"),
});

const LoginPage = () => {
  const [checked, setChecked] = useState(false);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setFocus,
    reset,
    getValues,
  } = useForm({ resolver: yupResolver(validationSchema), mode: "onChange" });

  const [loadingImgBg, setLoadingImgBg] = useState(true);

  const dispatch = useDispatch();
  const loginInfo = useSelector((state) => state.loginInfo);

  const loginHandler = () => {
    if (isValid) {
      const { username, password } = getValues();
      dispatch(getLoginInfo({ username, password }));
    }
  };

  useEffect(() => {
    setFocus("username");
  }, [setFocus]);

  useEffect(() => {
    if (loginInfo.session_id) {
      // reset form
      reset({
        username: "",
        password: "",
        showPassword: false,
      });
      // hide error message
      dispatch(setShowErrorMsg(false));
      // uncheck check box
      setChecked(false);
      // navigate to home page
      navigate(-1);
    }

    // nav to error page
    if (loginInfo.error) {
      navigate("/error");
    }
  }, [navigate, reset, loginInfo.session_id, loginInfo.error, dispatch]);

  return (
    <div className="LoginPage bg_overlay relative flex h-screen w-full items-center justify-center">
      <img
        src={bgImage}
        alt="bg-img"
        className="absolute inset-0 h-screen object-cover"
        onLoad={() => {
          setLoadingImgBg(false);
        }}
      />

      {/* loader */}
      <Loader
        classWidth="w-[50px]"
        classHeight="h-[50px]"
        classBorder="border-[4px]"
        classMargin="mt-0 z-50"
        loading={loadingImgBg}
      />

      {!loadingImgBg && (
        <div className="z-50 w-[94%] rounded-[15px] bg-[#181818] bg-opacity-90 p-10 text-[#ececec] sm:w-[75%] md:w-[60%] lg:w-[65%] xl:w-[60%] 2xl:w-[50%]">
          <h3 className="mb-4 text-2xl font-bold tracking-[2px]">LOGIN</h3>
          <form
            className="flex flex-col gap-y-6 lg:gap-y-5"
            onSubmit={handleSubmit(loginHandler)}
          >
            <div className="relative flex flex-col">
              <label htmlFor="username">User name:</label>
              <input
                {...register("username")}
                className="mt-2 rounded-[10px]  border-2 border-transparent bg-[#ececec] p-[6px] text-[#181818] hover:border-primary focus:border-primary focus:outline-none"
                type="text"
                id="username"
                name="username"
                placeholder="Enter Username"
              />
              {errors?.username && (
                <p className="absolute -bottom-7 right-0 text-base font-medium text-primary">
                  {errors.username?.message}
                </p>
              )}
            </div>
            <div className="relative flex flex-col">
              <label htmlFor="password">Password:</label>
              <input
                {...register("password")}
                className="mt-2 rounded-[10px]  border-2 border-transparent bg-[#ececec] p-[6px] text-[#181818] hover:border-primary focus:border-primary focus:outline-none"
                type={checked ? "text" : "password"}
                id="password"
                name="password"
                placeholder="Enter Password"
              />
              {errors?.password && (
                <p className="absolute -bottom-7 right-0 text-base font-medium text-primary">
                  {errors.password?.message}
                </p>
              )}
            </div>
            <div className="relative flex items-center gap-x-1">
              <input
                {...register("showPassword")}
                type="checkbox"
                id="showPass"
                name="showPass"
                className="hidden"
                onChange={(e) => {
                  setChecked(e.target.checked);
                }}
                checked={checked}
              />
              <label
                htmlFor="showPass"
                className={`${
                  checked ? "bg-primary" : "bg-gray-400"
                } absolute top-1/2 flex h-4 w-4 -translate-y-1/2  cursor-pointer items-center justify-center rounded transition-all`}
              >
                <BsCheckLg
                  className={`text-xs ${
                    checked ? "opacity-100" : "opacity-0"
                  } z-50 transition-all`}
                />
              </label>
              <label htmlFor="showPass" className="ml-5 cursor-pointer">
                Show password
              </label>
            </div>
            {loginInfo.showErrorMsg && (
              <p className="text-primary">
                The username or password is invalid. Please try again!
              </p>
            )}
            <button
              type="submit"
              className={`${
                loginInfo.loading
                  ? "hover:cursor-default"
                  : "hover:cursor-pointer hover:bg-red-400"
              } flex h-[43px] select-none items-center justify-center rounded-[10px] bg-primary py-2 text-[18px] font-bold`}
              disabled={loginInfo.loading}
            >
              {loginInfo.loading ? (
                <div className="mx-auto h-5 w-5 animate-spin rounded-full border-2 border-t-2 border-white border-t-transparent"></div>
              ) : (
                "LOGIN"
              )}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default LoginPage;
