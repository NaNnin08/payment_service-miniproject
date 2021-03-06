import React, { useEffect, useState, Fragment, useRef } from "react";
import { Menu, Transition, Disclosure } from "@headlessui/react";
import MoneyIcon from "../assets/images/money_icon.svg";
import bankIcon from "../assets/images/bank.svg";
import cardIcon from "../assets/images/card.svg";
import transferIn from "../assets/images/transfer_in.svg";
import transferOut from "../assets/images/transfer_out.svg";
import { DotsVerticalIcon, ShoppingBagIcon } from "@heroicons/react/solid";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { Helmet } from "react-helmet";
import {
  findOnePaymentByUser,
  getPagingPaymentAction,
} from "../actions/paymentAction";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMoneyBill,
  faMoneyBillWave,
} from "@fortawesome/free-solid-svg-icons";
import { ModalSetPin } from "./ModalSetPin";

export default function SummaryScreen() {
  const [wallet, setWallet] = useState({});
  const [bank, setBank] = useState([]);
  const userFund = useSelector((state) => state.userFund);
  const { fund } = userFund;

  // const payment = useSelector((state) => state.paymentList);
  // const { historyPayment } = payment;

  const { pagingPayment: historyPayment } = useSelector(
    (state) => state.paging
  );

  const dispatch = useDispatch();

  const [paymentList, setPaymentList] = useState("");
  const [pinModal, setPinModal] = useState(false);

  const history = useHistory();

  useEffect(() => {
    if (fund) {
      setWallet(fund.payment_account);
      setBank(fund.bank_accounts);
      // dispatch(findOnePaymentByUser(fund.payment_account.paac_account_number));
    }
    if (fund && fund.payment_account) {
      if (!fund.payment_account.pacc_pin_number) {
        setPinModal(true);
      }
    }
  }, []);

  // useEffect(() => {
  //   if (historyPayment && !paymentList) {
  //     setPaymentList(
  //       historyPayment.sort((a, b) =>
  //         a.payt_id.length === b.payt_id.length
  //           ? b.payt_id - a.payt_id
  //           : a.payt_id.length - b.payt_id.length
  //       )
  //     );
  //   }
  // }, [historyPayment]);

  useEffect(() => {
    if (fund && fund.payment_account) {
      dispatch(
        getPagingPaymentAction(
          `/api/payt/payment/paging/${fund.payment_account.paac_account_number}`,
          { size: 5, order: "DESC" }
        )
      );
    }
  }, [dispatch]);

  // if (paymentList && paymentList.length > 5) {
  //   const container = paymentList.splice(0, 5);
  //   setPaymentList(container);
  // }

  const cancelButtonRef = useRef();

  return (
    <div className="min-h-screen w-5/6 flex flex-col md:flex-row mx-auto bg-gray-100">
      <Helmet>
        <title>Bayar: Summary</title>
      </Helmet>
      <ModalSetPin
        cancelButtonRef={cancelButtonRef}
        pinModal={pinModal}
        setPinModal={setPinModal}
      />
      <div className="md:w-2/3 mb-5">
        <div className="bg-white w-5/6 mx-auto mt-10 rounded-xl shadow-lg p-5 text-lg relative">
          <>
            <div className="absolute right-5 ">
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="w-6">
                    <DotsVerticalIcon />
                  </Menu.Button>
                </div>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 -mr-16 md:-mr-24 -mt-2 w-32 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg">
                    <div className="p-2">
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            to="/myaccount/money"
                            className={`${
                              active
                                ? "bg-violet-500 text-blue-500"
                                : "text-gray-900"
                            } group flex rounded-md items-center w-32 px-2 py-2 text-sm`}
                          >
                            Go to Bayar balance
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            to="/myaccount/topup/balance"
                            className={`${
                              active
                                ? "bg-violet-500 text-blue-500"
                                : "text-gray-900"
                            } group flex rounded-md items-center w-32 px-2 py-2 text-sm`}
                          >
                            Add Balance
                          </Link>
                        )}
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          </>
          <Link to="/myaccount/money">
            <h1 className="text-blue-700 hover:underline mb-5">
              Bayar balance
            </h1>
          </Link>
          <p className="mt-2 text-3xl relative ml-6">
            <span className="absolute -ml-6 -mt-2 text-lg">Rp</span>
            <span className="font-mono">
              {parseFloat(wallet.pacc_saldo).toLocaleString("ID", {
                minimumFractionDigits: 2,
              })}
            </span>
          </p>
          <p className="text-sm font-thin font-mono">Available</p>
          <Link
            to={
              fund && fund.bank_accounts.length > 0
                ? "/transfer/bank?from=/myaccount/summary"
                : "#"
            }
          >
            <button className="border border-blue-700 rounded-xl p-1 text-blue-700 hover:text-blue-900 hover:border-blue-900 text-base mt-5">
              Transfer Funds
            </button>
          </Link>
        </div>
        <div></div>
      </div>
      <div className="md:w-1/3">
        <div className="md:flex md:py-5 hidden">
          <div className="grid grid-cols-3 w-full lg:gap-16 xl:gap-20 relative">
            <Link to="/myaccount/transfer" className="col-span-1 ml-2">
              <div className="hover:underline">
                <img
                  className="w-16 h-10v bg-blue-500 p-3 rounded-full transform rotate-180"
                  src={MoneyIcon}
                  alt="money send"
                />
                <p className="text-center mt-1 ">Send</p>
              </div>
            </Link>
            <Link to="/myaccount/transfer/request" className="col-span-1">
              <div className="hover:underline">
                <img
                  className="w-16 h-10v bg-blue-500 p-3 rounded-full"
                  src={MoneyIcon}
                  alt="money send"
                />
                <p className="text-center mt-1">Request</p>
              </div>
            </Link>
            <Disclosure as="div" className="">
              {({ open }) => (
                <>
                  <Disclosure.Button className="hover:underline cursor-pointer col-span-1 mr-2 focus:outline-none">
                    <div className="w-16 text-blue-500 bg-white border border-blue-500 p-3 rounded-full relative h-10v">
                      {open ? (
                        <div>
                          <DotsVerticalIcon className="transform rotate-45 absolute top-0 -ml-3" />
                          <DotsVerticalIcon className="transform -rotate-45 absolute top-0 -ml-3" />
                        </div>
                      ) : (
                        <DotsVerticalIcon />
                      )}
                    </div>
                    <p className="text-center mt-2">
                      {open ? "Close" : "More"}
                    </p>
                  </Disclosure.Button>
                  <Disclosure.Panel className="h-7v">
                    <Transition
                      enter="transform transition ease-linear duration-300"
                      enterFrom="-translate-y-10 opacity-0 scale-y-0"
                      enterTo="translate-y-0 opacity-100 scale-y-100"
                      className="absolute left-5 bg-blue-500 rounded text-white font-serif text-lg flex flex-col pl-5 py-2 h-12v"
                      style={{ width: "95%" }}
                    >
                      <Link
                        className="hover:text-gray-300"
                        to="/myaccount/money"
                      >
                        Go to Bayar balance
                      </Link>
                      <div
                        style={{
                          height: "1px",
                          width: "120%",
                          borderTop: "1px white dotted",
                        }}
                        className="-ml-5"
                      ></div>
                      <Link
                        className="hover:text-gray-300"
                        to="/myaccount/topup/balance"
                      >
                        Add Balance
                      </Link>
                    </Transition>
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
          </div>
        </div>
        <div className="p-5 text-lg">
          <Link to="/myaccount/transaction">
            <h1 className="text-blue-700 hover:underline">Recent activity</h1>
          </Link>
          {historyPayment && historyPayment.rows.length > 0 ? (
            historyPayment.rows.map((data) => (
              <div
                key={data.payt_id}
                className="border-b-2 border-gray-300 bg-white flex flex-row space-x-7 cursor-pointer"
                onClick={() =>
                  history.push({
                    pathname: "/myaccount/transaction/detail/" + data.payt_id,
                  })
                }
              >
                <div className="ml-5 mt-3">
                  {data.payt_type === "order" ? (
                    <ShoppingBagIcon className="w-10 text-blue-500 bg-blue-300 rounded-full bg-opacity-50" />
                  ) : data.payt_type === "topup" ? (
                    <FontAwesomeIcon
                      className="text-green-500 bg-green-300 rounded-full bg-opacity-50"
                      size="2x"
                      icon={faMoneyBillWave}
                    />
                  ) : data.payt_type === "refund" ||
                    data.payt_type === "request" ? (
                    <FontAwesomeIcon size="2x" icon={faMoneyBill} />
                  ) : data.payt_type === "transferFrom" ? (
                    <img src={transferIn} className="w-10" alt="transfer_in" />
                  ) : (
                    <img
                      src={transferOut}
                      className="w-10"
                      alt="transfer_out"
                    />
                  )}
                </div>
                <div className="flex flex-col lg:flex-row space-x-2 py-2">
                  <h1 className="capitalize text-lg">
                    {data.payt_type === "transferFrom"
                      ? "transfer in"
                      : data.payt_type === "transferTo" ||
                        data.payt_type === "transferToBank"
                      ? "transfer out"
                      : data.payt_type}
                  </h1>
                  <div className="mt-1">
                    {data.payt_type === "order" ||
                    data.payt_type === "transferTo" ||
                    data.payt_type === "transferToBank" ? (
                      <p className="font-semibold font-mono text-red-400 text-sm">
                        - {data.payt_credit}
                      </p>
                    ) : data.payt_type === "topup" ||
                      data.payt_type === "transferFrom" ? (
                      <p className="font-semibold font-mono text-green-400 text-sm">
                        + {data.payt_dabet}
                      </p>
                    ) : data.payt_type === "refund" ? (
                      <div className="">
                        {data.payt_trx_number_ref && (
                          <p className="font-semibold font-mono text-black text-sm">
                            ref: {data.payt_trx_number_ref}
                          </p>
                        )}
                      </div>
                    ) : data.payt_type === "request" ? (
                      <p className="font-semibold font-mono text-black text-sm">
                        {data.payt_dabet}
                      </p>
                    ) : null}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="mt-2">
              See when payment come in, and when they go out, You'll find your
              recent Bayar activity here.
            </p>
          )}
        </div>
        <div className="p-5 text-lg">
          <Link to="/myaccount/money">
            <h1 className="text-blue-700 hover:underline">Bank and cards</h1>
          </Link>
          {bank ? (
            bank.map((data, index) => (
              <Link
                key={index}
                className="flex flex-row items-center mt-2 pb-2 border-b-2 border-dotted"
                to={{
                  pathname: "/myaccount/money",
                  search: `?id=${data.baac_acc_bank}`,
                }}
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
              </Link>
            ))
          ) : (
            <p className="mt-2">
              Shop and send payment more securely. Link your credit card now.
            </p>
          )}
          <Link to="/myaccount/money/account/new">
            <button className="border border-blue-700 rounded-xl px-3 py-1 text-blue-700 hover:text-blue-900 hover:border-blue-900 text-sm mt-3">
              Link a Card or Bank
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
