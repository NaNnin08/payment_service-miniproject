import React, { useEffect, useState } from "react";
import { CreditCardIcon } from "@heroicons/react/outline";
import addBank from "../assets/images/addBank.svg";
import addCard from "../assets/images/credit-cards-payment 1.svg";
import bIcon from "../assets/images/B_icon.svg";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import segi3 from "../assets/images/Polygon 1.svg";
import { bankFindById } from "../actions/bankActions";
import bankIcon from "../assets/images/bank.svg";
import cardIcon from "../assets/images/card.svg";
import { useLocation, Switch, Route } from "react-router-dom";
import WalletChildScreen from "./WalletChildScreen";

export default function WalletScreen(props) {
  const [wallet, setWallet] = useState({});
  const [isBank, setIsBank] = useState("");
  const [isBalance, setIsBalance] = useState(true);
  const [idBank, setIdBank] = useState();
  const location = useLocation();
  const userFund = useSelector((state) => state.userFund);
  const { fund } = userFund;
  const bank = useSelector((state) => state.bank);
  const { bankId } = bank;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(bankFindById(""));
    fund.payment_account && setWallet(fund.payment_account);
    fund.payment_account && setIsBank(fund.bank_accounts);
  }, [dispatch, fund]);
  return (
    <div className="min-h-screen bg-gray-100">
      {fund ? (
        isBank.length > 0 ? null : (
          <div className="bg-gray-800 h-40v ">
            <div className="flex flex-row w-2/3 mx-auto">
              <div className="w-1/3 hidden md:block">
                <div className="w-52 md:-ml-10 lg:mt-5 lg:ml-8 text-gray-100 transform -rotate-6">
                  <CreditCardIcon />
                </div>
              </div>
              <div className="md:w-2/3 w-full text-gray-100">
                <div className="mt-10">
                  <p className="text-2xl">Link a new card</p>
                  <p className="mt-2 max-w-lg">
                    Join with other customer who use Bayar to pay for everyday
                    purchases any time, any day, any where
                  </p>
                  <button className="border border-gray-100 rounded-xl px-5 py-3 hover:border-gray-400 text-sm mt-10">
                    Link a Card or Bank
                  </button>
                </div>
              </div>
            </div>
          </div>
        )
      ) : null}
      <div className="w-5/6 flex flex-row mx-auto">
        <div className="md:w-1/4 w-full">
          <div className="flex flex-row space-x-6 mx-20 md:mx-auto md:-ml-7 lg:ml-5 mt-5">
            <div className="text-blue-500 font-semibold hover:text-blue-700">
              <Link to="/myaccount/money/banks/new">
                <img className="h-7v ml-3" src={addBank} alt="link bank" />
                <p className="mt-3 -ml-3">Link a bank</p>
              </Link>
            </div>
            <div className="border border-black border-dotted h-10v my-auto"></div>
            <div className="text-blue-500 font-semibold hover:text-blue-700">
              <Link>
                <img className="h-7v ml-3" src={addCard} alt="link card" />
                <p className="mt-3 -ml-2">Link a card</p>
              </Link>
            </div>
          </div>
          <div className="flex flex-row mt-10 border border-gray-300 border-l-0 border-r-0 relative">
            <div className="w-1/3 p-3 flex items-center">
              <div className="bg-blue-300 rounded-full shadow-2xl">
                <img src={bIcon} alt="bayar icon" />
              </div>
            </div>
            <div className="w-2/3">
              <div className="p-5 text-lg relative -ml-2">
                <Link to="/myaccount/money">
                  <h1
                    className="text-blue-700 hover:text-black"
                    onClick={() => setIsBalance(true)}
                  >
                    Bayar balance
                  </h1>
                </Link>
                <p className="mt-2 text-xl relative ml-6">
                  <span className="absolute -ml-5 -mt-1 text-sm">Rp</span>
                  <span className="font-mono">
                    {parseFloat(wallet.pacc_saldo).toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                    })}
                  </span>
                </p>
                <p className="text-sm font-thin font-mono">Available</p>
              </div>
            </div>
            {location.search === "" && (
              <div className="absolute right-0 -mr-16 mt-3 opacity-50 hidden md:block">
                <img src={segi3} alt="" />
              </div>
            )}
          </div>
          {fund
            ? isBank.length > 0
              ? isBank.map((x, index) => (
                  <div
                    className="flex flex-row border border-gray-300 border-l-0 border-r-0 relative"
                    key={index}
                  >
                    <div className="w-1/3 p-3 flex items-center">
                      <div>
                        <img
                          src={
                            x.baac_type === "debit"
                              ? bankIcon
                              : x.baac_type === "card"
                              ? cardIcon
                              : null
                          }
                          alt="bayar icon"
                        />
                      </div>
                    </div>
                    <div className="w-2/3">
                      <div className="p-5 text-lg relative -ml-2">
                        <Link
                          to={{
                            pathname: "/myaccount/money",
                            search: `?id=${x.baac_acc_bank}`,
                          }}
                        >
                          <h1
                            className="text-blue-700 hover:text-black truncate"
                            onClick={() => setIsBalance(false)}
                          >
                            {bankId
                              ? bankId.find((y) => y.bank_id === x.baac_bank_id)
                                  .bank_name
                              : null}
                          </h1>
                          <p className="text-xs mt-2">
                            {x.baac_type}{" "}
                            {"*".repeat(5) + x.baac_acc_bank.substr(5)}
                          </p>
                        </Link>
                      </div>
                    </div>
                    {location.search === `?id=${x.baac_acc_bank}` && (
                      <div className="absolute right-0 -mr-16 -mt-1 opacity-50 hidden md:block">
                        <img src={segi3} alt="" />
                      </div>
                    )}
                  </div>
                ))
              : null
            : null}
        </div>
        <div className="w-3/4 bg-white hidden md:block min-h-screen">
          {isBalance ? (
            <div>
              <div className="bg-white mt-10 p-5 text-2xl flex">
                <div className="mx-auto">
                  <div className="bg-blue-300 rounded-full shadow-2xl w-24">
                    <img src={bIcon} alt="bayar icon" />
                  </div>
                  <h1 className="mb-5 -ml-8 mt-8">Bayar balance</h1>
                  <p className="mt-2 -ml-5 text-3xl relative">
                    <span className="absolute -ml-6 -mt-2 text-lg">Rp</span>
                    <span className="font-mono">
                      {parseFloat(wallet.pacc_saldo).toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                      })}
                    </span>
                  </p>
                  <p className="text-sm font-thin font-mono">Available</p>
                  <button className="border border-blue-700 rounded-2xl -ml-8 px-5 py-2 text-blue-700 hover:text-blue-900 hover:border-blue-900 text-base mt-5">
                    Transfer Funds
                  </button>
                </div>
              </div>
              <div className="flex flex-col mt-10 w-1/2 mx-auto border border-gray-300 border-l-0 border-r-0 p-3">
                <p className="mx-auto font-semibold text-xl">
                  Bayar works without a balance
                </p>
                <p className="text-center mt-3">
                  you can still use Bayar to shop or send payment when your
                  balance is zero with connect bank or card to Bayar
                </p>
              </div>
            </div>
          ) : (
            <WalletChildScreen idBank={bankId} accBank={isBank} />
          )}
        </div>
      </div>
    </div>
  );
}
