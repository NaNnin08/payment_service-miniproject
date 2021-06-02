import React from "react";
import MoneyIcon from "../assets/images/money_icon.svg";
import { DotsVerticalIcon } from "@heroicons/react/solid";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function SummaryScreen() {
  const { fund } = useSelector((state) => state.userFund);
  const { payment_account } = fund;
  return (
    <div className="min-h-screen w-5/6 flex flex-col md:flex-row mx-auto bg-gray-100">
      <div className="md:w-2/3 mb-5">
        <div className="bg-white w-5/6 mx-auto mt-10 rounded-xl shadow-lg p-5 text-lg relative">
          <div className="w-6 absolute right-5 cursor-pointer">
            <DotsVerticalIcon />
          </div>
          <Link to="/myaccount/money">
            <h1 className="text-blue-700 hover:underline mb-5">
              Bayar balance
            </h1>
          </Link>
          <p className="mt-2 text-3xl relative ml-6">
            <span className="absolute -ml-6 -mt-2 text-lg">Rp</span>
            <span className="font-mono">
              {parseFloat(payment_account.pacc_saldo).toLocaleString(
                navigator.language,
                {
                  minimumFractionDigits: 2,
                }
              )}
            </span>
          </p>
          <p className="text-sm font-thin font-mono">Available</p>
          <button className="border border-blue-700 rounded-xl p-1 text-blue-700 hover:text-blue-900 hover:border-blue-900 text-base mt-5">
            Transfer Funds
          </button>
        </div>
      </div>
      <div className="md:w-1/3">
        <div className="md:flex py-5 hidden">
          <div className="mx-auto flex flex-row space-x-20">
            <Link>
              <div className="hover:underline">
                <img
                  className="w-16 bg-blue-500 p-3 rounded-full"
                  src={MoneyIcon}
                  alt="money send"
                />
                <p className="text-center mt-1 ">Send</p>
              </div>
            </Link>
            <Link>
              <div className="hover:underline">
                <img
                  className="w-16 bg-blue-500 p-3 rounded-full transform rotate-180"
                  src={MoneyIcon}
                  alt="money send"
                />
                <p className="text-center mt-1">Request</p>
              </div>
            </Link>
            <div className="hover:underline cursor-pointer">
              <div className="w-16 text-blue-500 bg-white border border-blue-500 p-3 rounded-full">
                <DotsVerticalIcon />
              </div>
              <p className="text-center mt-2">More</p>
            </div>
          </div>
        </div>
        <div className="p-5 text-lg">
          <Link>
            <h1 className="text-blue-700 hover:underline">Recent activity</h1>
          </Link>
          <p className="mt-2">
            See when payment come in, and when they go out, You'll find your
            recent Bayar activity here.
          </p>
        </div>
        <div className="p-5 text-lg">
          <Link>
            <h1 className="text-blue-700 hover:underline">Bank and cards</h1>
          </Link>
          <p className="mt-2">
            Shop and send payment more securely. Link your credit card now.
          </p>
          <button className="border border-blue-700 rounded-xl px-3 py-1 text-blue-700 hover:text-blue-900 hover:border-blue-900 text-sm mt-3">
            Link a Card or Bank
          </button>
        </div>
      </div>
    </div>
  );
}
