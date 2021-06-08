import React, { useEffect } from "react";
import { XIcon } from "@heroicons/react/outline";
import checkIcon from "../../assets/images/checked1.svg";

export const ErrorAlert = ({ match }) => {
  return (
    <div className="bg-gray-200">
      <div className="bg-white md:w-2/4 min-h-screen mx-auto relative flex flex-col">
        <div
          className="w-8 text-gray-400 absolute right-5 mt-2 cursor-pointer"
          onClick={
            match.params.action === "order"
              ? () => window.close()
              : () =>
                  history.push(new URLSearchParams(location.search).get("from"))
          }
        >
          <XIcon />
        </div>
        <div className="mx-auto mt-20">
          <XIcon className="w-32 text-red-500 bg-red-200 bg-opacity-50 rounded-full" />
        </div>
        <div className="font-serif text-2xl mx-auto capitalize mt-20 text-red-500 text-center">
          <p>{new URLSearchParams(location.search).get("error")}</p>
        </div>
        <button
          className="bg-blue-500 w-1/2 mt-20 mx-auto py-3 rounded-2xl text-white text-lg font-semibold"
          onClick={
            match.params.action === "order"
              ? () => window.close()
              : () =>
                  history.push(new URLSearchParams(location.search).get("from"))
          }
        >
          Done
        </button>
      </div>
    </div>
  );
};
