import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet";
import checkIcon from "../assets/images/checked1.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import { findOneUser, signin } from "../actions/userActions";

export const ModalSignupSuccess = () => {
  const history = useHistory();
  const location = useLocation();

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const userFund = useSelector((state) => state.userFund);
  const { fund } = userFund;

  const dispatch = useDispatch();

  if (location.signup) {
    const { user_email, user_password } = location.signup;
    setTimeout(() => {
      dispatch(signin(user_email, user_password));
    }, 3000);
  }

  useEffect(() => {
    if (userInfo && !fund) {
      dispatch(findOneUser(userInfo.users.user_id));
    }
    if (fund) {
      history.push({
        pathname: "/myaccount/summary",
        userNew: true,
      });
    }
  }, [userInfo, history, fund]);
  return (
    <div className="bg-gray-100 min-h-screen flex items-center font-serif">
      <Helmet>
        <title>Signup Success</title>
      </Helmet>

      <div className="w-5/6 md:w-1/2 lg:w-1/3 mx-auto bg-white shadow p-10 rounded-sm flex">
        <div className="mx-auto">
          <h1 className="text-2xl font-semibold">Signup Success</h1>
          <img
            className="w-28 mt-5 mx-auto transform -rotate-6"
            src={checkIcon}
            alt="bayar icon"
          />
          <p className="mt-5 text-center">
            Please wait, you will redirect{" "}
            <FontAwesomeIcon size="1x" icon={faCircleNotch} spin />
          </p>
        </div>
      </div>
    </div>
  );
};
