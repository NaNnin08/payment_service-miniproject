import React from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/images/B_icon_navbar.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

export default function Landing() {
  return (
    <div>
      <header className="row-span-1 bg-blue-700 text-white flex items-center text-lg font-semibold relative">
        <div className="flex items-center ml-40">
          <img className="w-10 transform -rotate-6" src={Logo} alt="" />
        </div>
        <div className="absolute right-10">
          <Link to="/login">login</Link>
        </div>
      </header>
      <div className="text-blue-500">
        <FontAwesomeIcon size="10x" icon={faSpinner} spin />
      </div>
    </div>
  );
}
