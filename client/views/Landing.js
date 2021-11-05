import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Transition } from "@headlessui/react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronUpIcon,
} from "@heroicons/react/solid";
import { Disclosure } from "@headlessui/react";
import image1 from "../assets/images/image1.jpg";
import image2 from "../assets/images/image2.jpg";
import image3 from "../assets/images/image3.jpg";
import worldIcon from "../assets/images/globe1.svg";
import shieldIcon from "../assets/images/shield1.svg";
import securityIcon from "../assets/images/cyber-security1.svg";
import { useSelector } from "react-redux";

export default function Landing() {
  const [navBarTransparant, setNavBarTransparant] = useState(true);
  const [carosel, setCarosel] = useState({
    image1: false,
    image2: false,
    image3: true,
  });
  const [autoSlide, setAutoSlide] = useState(false);

  const { userInfo } = useSelector((state) => state.userSignin);

  const history = useHistory();

  if (userInfo) {
    history.push("/myaccount/summary");
  }

  useEffect(() => {
    const changeNavbar = () => {
      if (window.scrollY >= 80) {
        setNavBarTransparant(false);
      } else {
        setNavBarTransparant(true);
      }
    };
    window.addEventListener("scroll", changeNavbar);

    const timeout = setTimeout(() => {
      if (carosel.image1 && autoSlide) {
        setCarosel({ image1: false, image2: false, image3: true });
        setAutoSlide(false);
      } else if (carosel.image2 && autoSlide) {
        setCarosel({ image1: true, image2: false, image3: false });
        setAutoSlide(false);
      } else if (carosel.image3 && autoSlide) {
        setCarosel({ image1: false, image2: true, image3: false });
        setAutoSlide(false);
      }
    }, 5000);

    return () => {
      window.removeEventListener("scroll", changeNavbar);
      clearTimeout(timeout);
    };
  }, [carosel, autoSlide]);

  const handleNext = () => {
    if (carosel.image1) {
      setCarosel({
        image1: false,
        image2: true,
        image3: false,
      });
    }
    if (carosel.image2) {
      setCarosel({
        image1: false,
        image2: false,
        image3: true,
      });
    }
    if (carosel.image3) {
      setCarosel({
        image1: true,
        image2: false,
        image3: false,
      });
    }
  };

  const handlePrev = () => {
    if (carosel.image2) {
      setCarosel({
        image1: true,
        image2: false,
        image3: false,
      });
    }
    if (carosel.image3) {
      setCarosel({
        image1: false,
        image2: true,
        image3: false,
      });
    }
    if (carosel.image1) {
      setCarosel({
        image1: false,
        image2: false,
        image3: true,
      });
    }
  };
  return (
    <div className="min-h-screen">
      {/* //Navbar */}
      <header
        className={
          "h-10v  flex items-center z-50 text-lg font-semibold fixed top-0 w-full " +
          (navBarTransparant
            ? "bg-opacity-0 text-white border-white"
            : "bg-opacity-100 bg-white text-black")
        }
        style={{ borderBottomWidth: "1px" }}
      >
        <div className="flex items-center lg:ml-40 md:ml-32 ml-10 w-32">
          <svg
            viewBox="0 0 291 95"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="Frame 1">
              <g id="Bayar">
                <path
                  d="M90.76 72V32.544L89.32 25.344L90.76 21.024H109.48C113.128 21.024 116.272 21.456 118.912 22.32C121.6 23.136 123.688 24.48 125.176 26.352C126.664 28.224 127.408 30.72 127.408 33.84C127.408 35.76 127.072 37.584 126.4 39.312C125.776 40.992 124.696 42.408 123.16 43.56C126.184 44.616 128.488 46.2 130.072 48.312C131.656 50.424 132.448 53.232 132.448 56.736C132.448 62.064 130.96 65.952 127.984 68.4C125.008 70.8 120.52 72 114.52 72H90.76ZM100.84 41.544H110.776C114.808 41.544 116.824 39.768 116.824 36.216C116.824 34.44 116.416 33.024 115.6 31.968C114.784 30.912 113.176 30.384 110.776 30.384H100.84V41.544ZM100.84 62.64H113.8C116.344 62.64 118.192 62.064 119.344 60.912C120.544 59.76 121.144 58.152 121.144 56.088C121.144 54.12 120.496 52.632 119.2 51.624C117.952 50.616 115.912 50.112 113.08 50.112H100.84V62.64ZM149.024 72.72C145.808 72.72 143.072 71.904 140.816 70.272C138.608 68.592 137.504 66 137.504 62.496C137.504 58.8 138.68 55.992 141.032 54.072C143.384 52.104 146.528 51.12 150.464 51.12C153.344 51.12 155.528 51.36 157.016 51.84C158.552 52.32 159.56 52.68 160.04 52.92L160.544 52.488C160.544 51.048 160.424 49.776 160.184 48.672C159.944 47.568 159.392 46.728 158.528 46.152C157.664 45.528 156.32 45.216 154.496 45.216C151.232 45.216 148.304 45.48 145.712 46.008C143.168 46.536 141.152 47.016 139.664 47.448V39.528C141.152 39 143.408 38.52 146.432 38.088C149.456 37.608 152.72 37.368 156.224 37.368C159.2 37.368 161.624 37.776 163.496 38.592C165.416 39.36 166.88 40.416 167.888 41.76C168.944 43.104 169.664 44.592 170.048 46.224C170.48 47.808 170.696 49.392 170.696 50.976V60.552L172.136 67.824L170.696 72.072H161.264V68.544L160.544 68.184C160.16 68.664 159.488 69.264 158.528 69.984C157.616 70.704 156.368 71.352 154.784 71.928C153.248 72.456 151.328 72.72 149.024 72.72ZM152.984 64.728C155.048 64.728 156.656 64.536 157.808 64.152C159.008 63.768 159.92 63.384 160.544 63V61.632C160.544 60.72 159.992 59.808 158.888 58.896C157.832 57.984 156.08 57.528 153.632 57.528C151.808 57.528 150.464 57.888 149.6 58.608C148.736 59.328 148.304 60.24 148.304 61.344C148.304 62.496 148.712 63.36 149.528 63.936C150.344 64.464 151.496 64.728 152.984 64.728Z"
                  fill={navBarTransparant ? "#B6B0B0" : "black"}
                />
                <path
                  d="M181.991 89.496L171.839 85.896L174.719 77.328L184.799 80.208C186.191 80.208 187.367 79.776 188.327 78.912C189.287 78.096 190.079 77.04 190.703 75.744C191.375 74.496 191.855 73.224 192.143 71.928H185.447L177.527 47.304L176.159 37.944H186.959L192.359 63.864H193.799L199.199 37.944H209.999C209.999 37.944 209.831 38.712 209.495 40.248C209.207 41.736 208.775 43.728 208.199 46.224C207.671 48.72 207.023 51.48 206.255 54.504C205.535 57.48 204.767 60.504 203.951 63.576C203.135 66.6 202.295 69.384 201.431 71.928C200.135 75.912 198.695 79.2 197.111 81.792C195.575 84.384 193.631 86.304 191.279 87.552C188.927 88.848 185.831 89.496 181.991 89.496ZM225.102 72.72C221.886 72.72 219.15 71.904 216.894 70.272C214.686 68.592 213.582 66 213.582 62.496C213.582 58.8 214.758 55.992 217.11 54.072C219.462 52.104 222.606 51.12 226.542 51.12C229.422 51.12 231.606 51.36 233.094 51.84C234.63 52.32 235.638 52.68 236.118 52.92L236.622 52.488C236.622 51.048 236.502 49.776 236.262 48.672C236.022 47.568 235.47 46.728 234.606 46.152C233.742 45.528 232.398 45.216 230.574 45.216C227.31 45.216 224.382 45.48 221.79 46.008C219.246 46.536 217.23 47.016 215.742 47.448V39.528C217.23 39 219.486 38.52 222.51 38.088C225.534 37.608 228.798 37.368 232.302 37.368C235.278 37.368 237.702 37.776 239.574 38.592C241.494 39.36 242.958 40.416 243.966 41.76C245.022 43.104 245.742 44.592 246.126 46.224C246.558 47.808 246.774 49.392 246.774 50.976V60.552L248.214 67.824L246.774 72.072H237.342V68.544L236.622 68.184C236.238 68.664 235.566 69.264 234.606 69.984C233.694 70.704 232.446 71.352 230.862 71.928C229.326 72.456 227.406 72.72 225.102 72.72ZM229.062 64.728C231.126 64.728 232.734 64.536 233.886 64.152C235.086 63.768 235.998 63.384 236.622 63V61.632C236.622 60.72 236.07 59.808 234.966 58.896C233.91 57.984 232.158 57.528 229.71 57.528C227.886 57.528 226.542 57.888 225.678 58.608C224.814 59.328 224.382 60.24 224.382 61.344C224.382 62.496 224.79 63.36 225.606 63.936C226.422 64.464 227.574 64.728 229.062 64.728ZM255.189 72V49.464L253.677 42.264L255.189 37.944H262.101L263.541 39.6C263.541 39.6 263.853 39.408 264.477 39.024C265.149 38.592 266.085 38.184 267.285 37.8C268.485 37.416 269.949 37.224 271.677 37.224C272.637 37.224 273.597 37.296 274.557 37.44C275.517 37.584 276.261 37.776 276.789 38.016L281.469 42.696L277.509 49.752L267.645 44.784L265.125 45.792V72H255.189Z"
                  fill={navBarTransparant ? "#B6B0B0" : "#001AFF"}
                />
              </g>
              <g id="B_icon">
                <path
                  id="B"
                  d="M20.68 78V25.392L18.76 15.792L20.68 10.032H45.64C50.504 10.032 54.696 10.608 58.216 11.76C61.8 12.848 64.584 14.64 66.568 17.136C68.552 19.632 69.544 22.96 69.544 27.12C69.544 29.68 69.096 32.112 68.2 34.416C67.368 36.656 65.928 38.544 63.88 40.08C67.912 41.488 70.984 43.6 73.096 46.416C75.208 49.232 76.264 52.976 76.264 57.648C76.264 64.752 74.28 69.936 70.312 73.2C66.344 76.4 60.36 78 52.36 78H20.68ZM34.12 37.392H47.368C52.744 37.392 55.432 35.024 55.432 30.288C55.432 27.92 54.888 26.032 53.8 24.624C52.712 23.216 50.568 22.512 47.368 22.512H34.12V37.392ZM34.12 65.52H51.4C54.792 65.52 57.256 64.752 58.792 63.216C60.392 61.68 61.192 59.536 61.192 56.784C61.192 54.16 60.328 52.176 58.6 50.832C56.936 49.488 54.216 48.816 50.44 48.816H34.12V65.52Z"
                  fill="black"
                />
                <path
                  id="B_2"
                  d="M7.68 78V25.392L5.76 15.792L7.68 10.032H32.64C37.504 10.032 41.696 10.608 45.216 11.76C48.8 12.848 51.584 14.64 53.568 17.136C55.552 19.632 56.544 22.96 56.544 27.12C56.544 29.68 56.096 32.112 55.2 34.416C54.368 36.656 52.928 38.544 50.88 40.08C54.912 41.488 57.984 43.6 60.096 46.416C62.208 49.232 63.264 52.976 63.264 57.648C63.264 64.752 61.28 69.936 57.312 73.2C53.344 76.4 47.36 78 39.36 78H7.68ZM21.12 37.392H34.368C39.744 37.392 42.432 35.024 42.432 30.288C42.432 27.92 41.888 26.032 40.8 24.624C39.712 23.216 37.568 22.512 34.368 22.512H21.12V37.392ZM21.12 65.52H38.4C41.792 65.52 44.256 64.752 45.792 63.216C47.392 61.68 48.192 59.536 48.192 56.784C48.192 54.16 47.328 52.176 45.6 50.832C43.936 49.488 41.216 48.816 37.44 48.816H21.12V65.52Z"
                  fill={navBarTransparant ? "#B6B0B0" : "#0037FA"}
                />
              </g>
            </g>
          </svg>
        </div>
        <div className="absolute right-10 flex flex-row space-x-3">
          <div
            className={
              "px-2 py-1 rounded-xl text-sm " +
              (navBarTransparant
                ? "border border-white"
                : "border border-blue-500 text-blue-500")
            }
          >
            <Link to="/login">Log In</Link>
          </div>
          <div
            className={
              "px-2 py-1 rounded-xl text-sm " +
              (navBarTransparant
                ? "text-black bg-white"
                : "text-white bg-blue-500")
            }
          >
            <Link to="/register">Sign Up</Link>
          </div>
        </div>
      </header>
      {/* //Slider */}
      <div className="relative z-0 flex items-end md:items-center">
        <button
          className="absolute text-white hover:text-blue-500 focus:outline-none z-50"
          onClick={handleNext}
        >
          <ChevronLeftIcon className="w-28" />
        </button>
        <button
          className="absolute right-0 text-white hover:text-blue-500 focus:outline-none z-50"
          onClick={handlePrev}
        >
          <ChevronRightIcon className="w-28" />
        </button>
        <div className="absolute bottom-0 w-full z-50">
          <div className="flex">
            <div className="mx-auto space-x-3">
              <button
                className="w-3 focus:outline-none"
                onClick={() =>
                  setCarosel({
                    image1: false,
                    image2: false,
                    image3: true,
                  })
                }
              >
                <svg
                  viewBox="0 0 56 45"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <ellipse
                    cx="28"
                    cy="22.5"
                    rx="28"
                    ry="22.5"
                    fill={carosel.image3 ? "#000000" : "#C4C4C4"}
                  />
                </svg>
              </button>
              <button
                className="w-3 focus:outline-none"
                onClick={() =>
                  setCarosel({
                    image1: false,
                    image2: true,
                    image3: false,
                  })
                }
              >
                <svg
                  viewBox="0 0 56 45"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <ellipse
                    cx="28"
                    cy="22.5"
                    rx="28"
                    ry="22.5"
                    fill={carosel.image2 ? "#000000" : "#C4C4C4"}
                  />
                </svg>
              </button>
              <button
                className="w-3 focus:outline-none"
                onClick={() =>
                  setCarosel({
                    image1: true,
                    image2: false,
                    image3: false,
                  })
                }
              >
                <svg
                  viewBox="0 0 56 45"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <ellipse
                    cx="28"
                    cy="22.5"
                    rx="28"
                    ry="22.5"
                    fill={carosel.image1 ? "#000000" : "#C4C4C4"}
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div>
          {carosel.image1 ? (
            <Transition
              show={carosel.image1}
              enter="transition-opacity duration-75"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity duration-150"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="absolute w-full h-90v bg-black bg-opacity-50 text-white flex items-center">
                <div className="w-1/2 md:ml-32 mx-auto">
                  <p className="md:text-5xl text-2xl font-semibold -mt-20">
                    THE NEW WAY TO SHOP AND PAY
                  </p>
                  <p className="mt-5 font-semibold md:text-xl">
                    With Bayar, it’s now a lot safer, easier and faster for you
                    to shop and pay online across all your favourite stores.
                  </p>
                  <div className="absolute w-32 md:w-1/6 text-center mt-5">
                    <Link to="/login">
                      <div
                        className={
                          "py-2 rounded-xl text-xl font-medium bg-blue-500 text-white"
                        }
                      >
                        Log In
                      </div>
                    </Link>
                    <Link to="/register">
                      <div
                        className={
                          "py-2 rounded-xl text-xl font-medium border border-white text-white mt-3"
                        }
                      >
                        Sign Up
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
              <img
                className="object-cover w-screen h-90v"
                src={image1}
                alt="shopping1"
                onLoad={() => setAutoSlide(true)}
              />
            </Transition>
          ) : carosel.image2 ? (
            <Transition
              show={carosel.image2}
              enter="transition-opacity duration-75"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity duration-150"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="absolute w-full h-90v bg-black bg-opacity-50 text-white flex items-center">
                <div className="w-1/2 md:ml-32 mx-auto">
                  <p className="md:text-4xl text-xl font-semibold -mt-20">
                    GROWING YOUR BUSINESS? THEN IT'S TIME TO ADD BAYAR
                  </p>
                  <p className="mt-5 font-semibold md:text-xl">
                    With a Bayar, you enjoy access to 240+ million more
                    potential customers, along with a suite of management tools,
                    invoicing options and payment methods.
                  </p>
                  <div className="absolute w-32 md:w-1/6 text-center mt-5">
                    <Link to="/register">
                      <div
                        className={
                          "py-2 rounded-xl text-xl font-medium bg-blue-500 text-white"
                        }
                      >
                        Sign Up
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
              <img
                className="object-cover w-screen h-90v"
                src={image2}
                alt="shopping1"
                onLoad={() => setAutoSlide(true)}
              />
            </Transition>
          ) : (
            <Transition
              show={carosel.image3}
              enter="transition-opacity duration-75"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity duration-150"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="absolute w-full h-90v bg-black bg-opacity-50 text-white flex items-center">
                <div className="w-1/2 md:ml-32 mx-auto relative">
                  <p className="md:text-5xl text-2xl font-semibold -mt-20">
                    OUTWIN THE NORM WITH BAYAR
                  </p>
                  <p className="mt-5 font-semibold md:text-xl">
                    Go all out and shop out of the ordinary from millions of
                    merchants around the world.
                  </p>
                  <p className="mt-5 font-semibold md:text-xl">
                    With Bayar, you can shop for unique gifts seamlessly and
                    safer at home, at work, or even on the go.
                  </p>
                  <div className="absolute w-32 md:w-1/6 text-center mt-5">
                    <Link to="/login">
                      <div
                        className={
                          "py-2 rounded-xl text-xl font-medium bg-blue-500 text-white"
                        }
                      >
                        Log In
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
              <img
                className="object-cover w-screen h-90v"
                src={image3}
                alt="shopping1"
                onLoad={() => setAutoSlide(true)}
              />
            </Transition>
          )}
        </div>
      </div>
      <div className="flex mt-10 pb-5 relative">
        <h1 className="md:text-5xl text-3xl mx-auto font-semibold">
          Transact Safely and Easily
        </h1>
        <div
          className="bg-blue-500 w-20 md:w-28 absolute bottom-0 left-40p md:left-45p"
          style={{ height: "4px" }}
        ></div>
      </div>
      <div className="md:flex mt-16 hidden">
        <div className="mx-auto flex flex-col md:flex-row md:space-x-40 lg:space-x-60">
          <div className="relative">
            <div className="">
              <img className="h-20v" src={worldIcon} alt="world icon" />
            </div>
            <div className="absolute mt-5 -ml-10 text-center">
              <h1 className="text-xl font-semibold ml-4">All-in-one Service</h1>
              <p className="mt-5 text-md">
                Transact with ease, send money, buy pulsa, pay bills and
                e-commerce purchases.
              </p>
            </div>
          </div>
          <div className="relative">
            <div className="w-full">
              <img className="h-20v -ml-5" src={shieldIcon} alt="world icon" />
            </div>
            <div className="absolute mt-5 -ml-10 text-center">
              <h1 className="text-xl font-semibold -ml-4">Advanced System</h1>
              <p className="mt-5 text-md -ml-10">
                Bayar has a world class security technology that provides 24
                hours protection for all network systems.
              </p>
            </div>
          </div>
          <div className="relative">
            <img className="h-20v -ml-4" src={securityIcon} alt="world icon" />
            <div className="absolute mt-5 -ml-10 text-center">
              <h1 className="text-xl font-semibold -ml-4">
                Guaranteed Security
              </h1>
              <p className="mt-5 text-md -ml-10">
                Bayar ensures 100% secured protection with money back guarantee.
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* //topdown menu */}
      <div className="w-full px-4 pt-16 block md:hidden">
        <div className="w-full p-2 mx-auto bg-white rounded-2xl">
          <Disclosure>
            {({ open }) => (
              <div className="border border-l-0 border-r-0 border-gray-300">
                <Disclosure.Button className="flex w-full px-4 py-5 text-xl items-center text-left relative focus:outline-none">
                  <img className="h-10v" src={worldIcon} alt="world icon" />
                  <span className="ml-3 text-2xl">All-in-one Service</span>
                  <ChevronUpIcon
                    className={`absolute right-2 top-1 ${
                      open ? "transform rotate-180" : ""
                    } w-10 h-10`}
                  />
                </Disclosure.Button>
                <Disclosure.Panel className="pt-3 pl-5 pb-3 text-lg">
                  Transact with ease, send money, buy pulsa, pay bills and
                  e-commerce purchases.
                </Disclosure.Panel>
              </div>
            )}
          </Disclosure>
          <Disclosure>
            {({ open }) => (
              <div className="border border-l-0 border-r-0 border-gray-300">
                <Disclosure.Button className="flex w-full px-4 py-5 text-xl items-center text-left relative focus:outline-none">
                  <img className="h-10v" src={shieldIcon} alt="world icon" />
                  <span className="ml-3 text-2xl">Advanced System</span>
                  <ChevronUpIcon
                    className={`absolute right-2 top-1 ${
                      open ? "transform rotate-180" : ""
                    } w-10 h-10`}
                  />
                </Disclosure.Button>
                <Disclosure.Panel className="pt-3 pl-5 pb-3 text-lg">
                  Bayar has a world class security technology that provides 24
                  hours protection for all network systems.
                </Disclosure.Panel>
              </div>
            )}
          </Disclosure>
          <Disclosure>
            {({ open }) => (
              <div className="border border-l-0 border-r-0 border-gray-300">
                <Disclosure.Button className="flex w-full px-4 py-5 text-xl items-center text-left relative focus:outline-none">
                  <img className="h-10v" src={worldIcon} alt="world icon" />
                  <span className="ml-3 text-2xl">Guaranteed Security</span>
                  <ChevronUpIcon
                    className={`absolute right-2 top-1 ${
                      open ? "transform rotate-180" : ""
                    } w-10 h-10`}
                  />
                </Disclosure.Button>
                <Disclosure.Panel className="pt-3 pl-5 pb-3 text-lg">
                  Bayar ensures 100% secured protection with money back
                  guarantee.
                </Disclosure.Panel>
              </div>
            )}
          </Disclosure>
        </div>
      </div>
      <div className="relative" style={{ minHeight: "50vh" }}>
        <footer
          className={
            "absolute w-full bottom-0 bg-blueGray-200 pt-2 pb-2 row-span-1"
          }
        >
          <div className="container mx-auto">
            <div className="border-t-2 border-gray-300 flex flex-col items-center">
              <div className="sm:w-2/3 text-center py-4">
                <p className="text-sm  font-thin">
                  © 2021 by Nida Sunandar | Code.id
                </p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
