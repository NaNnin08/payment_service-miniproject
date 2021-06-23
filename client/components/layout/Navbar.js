import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { signout } from "../../actions/userActions";
import Logo from "../../assets/images/B_icon_navbar.svg";
import { useHistory, useLocation } from "react-router-dom";
import { CogIcon, MenuIcon, XIcon } from "@heroicons/react/outline";
import { AnimatePresence, motion } from "framer-motion";
import { Transition } from "@headlessui/react";

export default function Navbar() {
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const signoutHandler = () => {
    dispatch(signout());
  };

  const [navbar, setNavbar] = useState(false);

  const navbarSlider = useRef(null);

  return (
    <AnimatePresence>
      <div className="row-span-1 bg-blue-700 text-white flex items-center font-sans relative no-print">
        <div className="flex items-center ml-10 md:ml-24 lg:ml-32 xl:ml-40">
          <Link to="/myaccount/summary">
            <img
              className="w-10 transform -rotate-6"
              src={Logo}
              alt="bayarLogo"
            />
          </Link>
        </div>
        <div className="hidden md:flex items-center ml-8 text-sm space-x-5">
          <Link to="/myaccount/summary">
            <h1
              className={
                "p-1 " +
                (location.pathname == "/myaccount/summary"
                  ? "border-bottom"
                  : "border-bottom-hover")
              }
            >
              Ringkasan
            </h1>
          </Link>
          <Link to="/myaccount/money">
            <h1
              className={
                "p-1 " +
                (location.pathname == "/myaccount/money"
                  ? "border-bottom"
                  : "border-bottom-hover")
              }
            >
              Wallet
            </h1>
          </Link>
          <Link to="/myaccount/transfer">
            <h1
              className={
                "p-1 " +
                (location.pathname == "/myaccount/transfer" ||
                location.pathname == "/myaccount/transfer/request"
                  ? "border-bottom"
                  : "border-bottom-hover")
              }
            >
              Kirim
            </h1>
          </Link>
          <Link to="/myaccount/transaction">
            <h1
              className={
                "p-1 " +
                (location.pathname == "/myaccount/transaction"
                  ? "border-bottom"
                  : "border-bottom-hover")
              }
            >
              Aktivitas
            </h1>
          </Link>
        </div>
        <div className="absolute right-10 hidden md:flex flex-row">
          <Link to="/myaccount/profile">
            <button className="w-8 pb-1 mr-3 focus:outline-none">
              <CogIcon className="hover:animate-spin-5-f focus:outline-none" />
            </button>
          </Link>
          <button className="text-sm border-bottom-hover" onClick={signoutHandler}>
            LOG OUT
          </button>
        </div>
        <div
          className="absolute right-0 block md:hidden mr-5 cursor-pointer"
          onClick={() => setNavbar(true)}
        >
          <MenuIcon className="w-10" />
        </div>
        <Transition
          show={navbar}
          className="md:hidden block fixed top-0 left-0 h-100v w-full bg-black bg-opacity-50 z-50"
        >
          <Transition.Child
            enter="transform transition ease-linear duration-300"
            enterFrom="translate-x-64"
            enterTo="translate-x-0"
            leave="transform transition ease-linear duration-300"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-64"
            className="bg-blue-700 w-1/2 h-100v absolute right-0 flex flex-col"
          >
            <div
              className="cursor-pointer flex flex-row-reverse py-2 pr-2 -mb-7"
              onClick={() => setNavbar(false)}
            >
              <XIcon className="w-10" />
            </div>
            <div className="ml-3 mt-3 flex flex-col space-y-2 text-xl font-medium border-b-2 border-white pb-2">
              <Link to="/myaccount/summary" onClick={() => setNavbar(false)}>
                <h1 className="hover:text-black">Ringkasan</h1>
              </Link>
              <Link to="/myaccount/money" onClick={() => setNavbar(false)}>
                <h1 className="hover:text-black">Wallet</h1>
              </Link>
              <Link to="/myaccount/transfer" onClick={() => setNavbar(false)}>
                <h1 className="hover:text-black">Kirim</h1>
              </Link>
              <Link
                to="/myaccount/transaction"
                onClick={() => setNavbar(false)}
              >
                <h1 className="hover:text-black">Aktivitas</h1>
              </Link>
            </div>
            <div className="flex flex-row ml-3 mt-3 ">
              <Link to="/myaccount/profile">
                <button
                  className="w-8 pb-1 mr-3 hover:text-black"
                  onClick={() => setNavbar(false)}
                >
                  <CogIcon className="" />
                </button>
              </Link>
              <button
                className="text-lg font-semibold hover:text-black"
                onClick={signoutHandler}
              >
                LOG OUT
              </button>
            </div>
          </Transition.Child>
        </Transition>
      </div>
    </AnimatePresence>
  );
}
