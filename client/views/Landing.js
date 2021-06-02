import React from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/images/B_icon_navbar.svg";

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
    </div>
  );
}
