import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";

export const LoadingScereenWhite = () => {
  return (
    <div className="bg-white min-h-screen absolute min-w-full z-50 flex items-center">
      <div className="text-blue-700 mx-auto">
        <FontAwesomeIcon size="10x" icon={faCircleNotch} spin />
      </div>
    </div>
  );
};
