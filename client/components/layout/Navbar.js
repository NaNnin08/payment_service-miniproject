import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { signout } from "../../actions/userActions";
import Logo from "../../assets/images/B_icon_navbar.svg";
import { useHistory, useLocation } from "react-router-dom";

export default function Navbar() {
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const signoutHandler = () => {
    history.push("/signin");
    dispatch(signout());
  };
  return (
    <header className="row-span-1 bg-blue-700 text-white flex items-center font-sans relative">
      <div className="flex items-center ml-40">
        <img className="w-10 transform -rotate-6" src={Logo} alt="bayarLogo" />
      </div>
      <div className="flex items-center ml-8 text-sm space-x-5">
        <Link to="/myaccount/summary">
          <h1
            className={
              "p-1 " +
              (location.pathname == "/myaccount/summary"
                ? "border-b-2"
                : "hover:border-b-2")
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
                ? "border-b-2"
                : "hover:border-b-2")
            }
          >
            Wallet
          </h1>
        </Link>
      </div>
      <div className="absolute right-10">
        <button className="text-sm hover:border-b-2" onClick={signoutHandler}>
          LOG OUT
        </button>
      </div>
    </header>
  );
}
