import React, { useEffect, useState } from "react";
import MoneyIcon from "../assets/images/money_icon.svg";
import bankIcon from "../assets/images/bank.svg";
import cardIcon from "../assets/images/card.svg";
import { DotsVerticalIcon } from "@heroicons/react/solid";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function SummaryScreen() {
  const [wallet, setWallet] = useState({});
  const [bank, setBank] = useState([]);
  const userFund = useSelector((state) => state.userFund);
  const { fund } = userFund;
  useEffect(() => {
    setWallet(fund.payment_account);
    setBank(fund.bank_accounts);
  }, []);

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
              {parseFloat(wallet.pacc_saldo).toLocaleString("en-US", {
                minimumFractionDigits: 2,
              })}
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
          {bank ? (
            bank.map((data, index) => (
              <div
                key={index}
                className="flex flex-row items-center mt-2 pb-2 border-b-2 border-dotted"
              >
                <div>
                  <img
                    className="w-10"
                    src={
                      data.baac_type === "debit"
                        ? bankIcon
                        : data.baac_type === "card"
                        ? cardIcon
                        : null
                    }
                    alt="bank icon"
                  />
                </div>
                <div className="ml-2 font-thin font-mono">
                  <p className="text-sm">{data.baac_owner}</p>
                  <p className="text-xs">
                    {data.baac_type}{" "}
                    {"*".repeat(5) + data.baac_acc_bank.substr(5)}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="mt-2">
              Shop and send payment more securely. Link your credit card now.
            </p>
          )}

          <button className="border border-blue-700 rounded-xl px-3 py-1 text-blue-700 hover:text-blue-900 hover:border-blue-900 text-sm mt-3">
            Link a Card or Bank
          </button>
        </div>
      </div>
    </div>
  );
}
