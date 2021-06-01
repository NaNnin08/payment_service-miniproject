import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Navbar from "../components/layout/Navbar";

export default function MainLayout(props) {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const history = useHistory();

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    }
  }, [history, userInfo]);
  return (
    <div className="bg-gray-200">
      <Helmet>
        <title>Payment</title>
        <link rel="shortcut icon" href={""} />
      </Helmet>
      <div className="grid grid-rows-layout grid-cols-1 h-100v">
        <Navbar />
        <main className="row-span-1">
          <h1 className="">Mainlayout</h1>
          {props.children}
        </main>
        <footer className="row-span-1 bg-black text-white flex items-center">
          footer
        </footer>
      </div>
    </div>
  );
}
