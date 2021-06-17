import React from "react";
import { Link, useLocation } from "react-router-dom";

export const HeaderSendAndRequest = () => {
  const location = useLocation();
  return (
    <div className="w-full bg-white border-b-2 border-gray-200">
      <div className=" w-full md:w-1/2 md:mx-auto ml-20 font-serif text-lg py-4 flex md:space-x-20 space-x-10">
        <div className="relative h-5v cursor-pointer">
          <Link to="/myaccount/transfer">
            <h1
              className={
                "pb-4 border-black " +
                (location.pathname == "/myaccount/transfer"
                  ? "border-b-2 text-black"
                  : "text-gray-500")
              }
            >
              Send
            </h1>
          </Link>
        </div>
        <div className="relative h-5v cursor-pointer">
          <Link to="/myaccount/transfer/request">
            <h1
              className={
                "pb-4 border-black " +
                (location.pathname == "/myaccount/transfer/request"
                  ? "border-b-2 text-black"
                  : "text-gray-500")
              }
            >
              Request
            </h1>
          </Link>
        </div>
      </div>
    </div>
  );
};
