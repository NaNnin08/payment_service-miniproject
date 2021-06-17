import React, { useEffect, useState } from "react";
import { SearchIcon } from "@heroicons/react/outline";
import { useDispatch, useSelector } from "react-redux";
import { findOnePaymentByUser } from "../actions/paymentAction";
import { format } from "date-fns";
import {
  ArrowCircleDownIcon,
  ArrowCircleUpIcon,
} from "@heroicons/react/outline";
import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/solid";
import { Helmet } from "react-helmet";

export const TransactionScreen = () => {
  const { fund } = useSelector((state) => state.userFund);
  const { payment_account } = fund;
  const payment = useSelector((state) => state.paymentList);
  const { historyPayment } = payment;

  const dispatch = useDispatch();

  const [paymentList, setPaymentList] = useState("");
  const [historyPage, setHistoryPage] = useState("");
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState({
    start: undefined,
    end: undefined,
    type: undefined,
  });
  const [clearSeacrh, setClearSeacrh] = useState(false);
  const [isSort, setIsSort] = useState("ASC");

  useEffect(() => {
    if (!historyPayment || historyPayment.length === 0) {
      payment_account.paac_account_number &&
        dispatch(findOnePaymentByUser(payment_account.paac_account_number));
    }
    if (historyPayment && historyPayment.length > 0 && !paymentList) {
      setPaymentList(
        historyPayment.sort((a, b) =>
          a.payt_id.length === b.payt_id.length
            ? a.payt_id - b.payt_id
            : a.payt_id.length - b.payt_id.length
        )
      );
    }
  }, [historyPayment, paymentList, dispatch]);

  if (paymentList && !historyPage) {
    const container = [];
    while (paymentList.length) {
      container.push(paymentList.splice(0, 10));
    }
    setHistoryPage(container);
  }

  const handleChange = (name) => (event) => {
    setSearch({ ...search, [name]: event.target.value });
  };

  const handleSearch = () => {
    if (search.type && !search.end && !search.start) {
      setPaymentList(
        historyPayment.filter(
          (data) =>
            new RegExp(search.type, "i").test(data.payt_type) ||
            new RegExp(search.type, "i").test(data.payt_trx_number)
        )
      );
      setHistoryPage("");
      setClearSeacrh(true);
    }
    if (!search.type && !search.end && search.start) {
      setPaymentList(
        historyPayment.filter(
          (data) => new Date(data.payt_date) >= new Date(search.start)
        )
      );
      setHistoryPage("");
      setClearSeacrh(true);
    }
    if (!search.type && search.end && !search.start) {
      setPaymentList(
        historyPayment.filter(
          (data) => new Date(data.payt_date) <= new Date(search.end)
        )
      );
      setHistoryPage("");
      setClearSeacrh(true);
    }
    if (!search.type && search.end && search.start) {
      setPaymentList(
        historyPayment.filter(
          (data) =>
            new Date(data.payt_date) <= new Date(search.end) &&
            new Date(data.payt_date) >= new Date(search.start)
        )
      );
      setHistoryPage("");
      setClearSeacrh(true);
    }
    if (search.type && search.end && search.start) {
      setPaymentList(
        historyPayment.filter(
          (data) =>
            new Date(data.payt_date) <= new Date(search.end) &&
            new Date(data.payt_date) >= new Date(search.start) &&
            (new RegExp(search.type, "i").test(data.payt_type) ||
              new RegExp(search.type, "i").test(data.payt_trx_number))
        )
      );
      setHistoryPage("");
      setClearSeacrh(true);
    }
  };

  const handleClear = () => {
    setPaymentList(
      historyPayment.sort((a, b) =>
        a.payt_id.length === b.payt_id.length
          ? a.payt_id - b.payt_id
          : a.payt_id.length - b.payt_id.length
      )
    );
    setHistoryPage("");
    setSearch({
      start: "",
      end: "",
      type: "",
    });
    setClearSeacrh(false);
    setPage(0);
  };

  const handleSort = () => {
    if (!search.end && !search.start && !search.type) {
      if (isSort === "ASC") {
        setPaymentList(
          historyPayment.sort((a, b) =>
            a.payt_id.length === b.payt_id.length
              ? b.payt_id - a.payt_id
              : a.payt_id.length - b.payt_id.length
          )
        );
        setHistoryPage("");
        setIsSort("DESC");
      } else {
        setPaymentList(
          historyPayment.sort((a, b) =>
            a.payt_id.length === b.payt_id.length
              ? a.payt_id - b.payt_id
              : a.payt_id.length - b.payt_id.length
          )
        );
        setHistoryPage("");
        setIsSort("ASC");
      }
    } else {
      if (isSort === "ASC") {
        if (search.type && !search.end && !search.start) {
          setPaymentList(
            historyPayment
              .filter(
                (data) =>
                  new RegExp(search.type, "i").test(data.payt_type) ||
                  new RegExp(search.type, "i").test(data.payt_trx_number)
              )
              .sort((a, b) =>
                a.payt_id.length === b.payt_id.length
                  ? b.payt_id - a.payt_id
                  : a.payt_id.length - b.payt_id.length
              )
          );
          setHistoryPage("");
          setIsSort("DESC");
        }
        if (!search.type && !search.end && search.start) {
          setPaymentList(
            historyPayment
              .filter(
                (data) => new Date(data.payt_date) >= new Date(search.start)
              )
              .sort((a, b) =>
                a.payt_id.length === b.payt_id.length
                  ? b.payt_id - a.payt_id
                  : a.payt_id.length - b.payt_id.length
              )
          );
          setHistoryPage("");
          setIsSort("DESC");
        }
        if (!search.type && search.end && !search.start) {
          setPaymentList(
            historyPayment
              .filter(
                (data) => new Date(data.payt_date) <= new Date(search.end)
              )
              .sort((a, b) =>
                a.payt_id.length === b.payt_id.length
                  ? b.payt_id - a.payt_id
                  : a.payt_id.length - b.payt_id.length
              )
          );
          setHistoryPage("");
          setIsSort("DESC");
        }
        if (!search.type && search.end && search.start) {
          setPaymentList(
            historyPayment
              .filter(
                (data) =>
                  new Date(data.payt_date) <= new Date(search.end) &&
                  new Date(data.payt_date) >= new Date(search.start)
              )
              .sort((a, b) =>
                a.payt_id.length === b.payt_id.length
                  ? b.payt_id - a.payt_id
                  : a.payt_id.length - b.payt_id.length
              )
          );
          setHistoryPage("");
          setIsSort("DESC");
        }
        if (search.type && search.end && search.start) {
          setPaymentList(
            historyPayment
              .filter(
                (data) =>
                  new Date(data.payt_date) <= new Date(search.end) &&
                  new Date(data.payt_date) >= new Date(search.start) &&
                  (new RegExp(search.type, "i").test(data.payt_type) ||
                    new RegExp(search.type, "i").test(data.payt_trx_number))
              )
              .sort((a, b) =>
                a.payt_id.length === b.payt_id.length
                  ? b.payt_id - a.payt_id
                  : a.payt_id.length - b.payt_id.length
              )
          );
          setHistoryPage("");
          setIsSort("DESC");
        }
      } else {
        if (search.type && !search.end && !search.start) {
          setPaymentList(
            historyPayment
              .filter(
                (data) =>
                  new RegExp(search.type, "i").test(data.payt_type) ||
                  new RegExp(search.type, "i").test(data.payt_trx_number)
              )
              .sort((a, b) =>
                a.payt_id.length === b.payt_id.length
                  ? a.payt_id - b.payt_id
                  : a.payt_id.length - b.payt_id.length
              )
          );
          setHistoryPage("");
          setIsSort("ASC");
        }
        if (!search.type && !search.end && search.start) {
          setPaymentList(
            historyPayment
              .filter(
                (data) => new Date(data.payt_date) >= new Date(search.start)
              )
              .sort((a, b) =>
                a.payt_id.length === b.payt_id.length
                  ? a.payt_id - b.payt_id
                  : a.payt_id.length - b.payt_id.length
              )
          );
          setHistoryPage("");
          setIsSort("ASC");
        }
        if (!search.type && search.end && !search.start) {
          setPaymentList(
            historyPayment
              .filter(
                (data) => new Date(data.payt_date) <= new Date(search.end)
              )
              .sort((a, b) =>
                a.payt_id.length === b.payt_id.length
                  ? a.payt_id - b.payt_id
                  : a.payt_id.length - b.payt_id.length
              )
          );
          setHistoryPage("");
          setIsSort("ASC");
        }
        if (!search.type && search.end && search.start) {
          setPaymentList(
            historyPayment
              .filter(
                (data) =>
                  new Date(data.payt_date) <= new Date(search.end) &&
                  new Date(data.payt_date) >= new Date(search.start)
              )
              .sort((a, b) =>
                a.payt_id.length === b.payt_id.length
                  ? a.payt_id - b.payt_id
                  : a.payt_id.length - b.payt_id.length
              )
          );
          setHistoryPage("");
          setIsSort("ASC");
        }
        if (search.type && search.end && search.start) {
          setPaymentList(
            historyPayment
              .filter(
                (data) =>
                  new Date(data.payt_date) <= new Date(search.end) &&
                  new Date(data.payt_date) >= new Date(search.start) &&
                  (new RegExp(search.type, "i").test(data.payt_type) ||
                    new RegExp(search.type, "i").test(data.payt_trx_number))
              )
              .sort((a, b) =>
                a.payt_id.length === b.payt_id.length
                  ? a.payt_id - b.payt_id
                  : a.payt_id.length - b.payt_id.length
              )
          );
          setHistoryPage("");
          setIsSort("ASC");
        }
      }
    }
  };

  return (
    <div className="bg-gray-100">
      <Helmet>
        <title>Bayar: Activity</title>
      </Helmet>
      <div className="grid grid-cols-6 mt-5 gap-2">
        <div className="col-span-1 col-start-2 w-full">
          <label htmlFor="start" className="relative">
            <p className="absolute z-10 ml-4 mt-1 text-sm">Start</p>
            <input
              type="date"
              className="pt-5 w-full rounded-md text-xs"
              name="start"
              id="start"
              value={search.start}
              onChange={handleChange("start")}
            />
          </label>
        </div>
        <div className="col-span-1 w-full">
          <label htmlFor="start" className="relative">
            <p className="absolute z-10 ml-4 mt-1 text-sm">End</p>
            <input
              type="date"
              className="pt-5 w-full rounded-md text-xs"
              name="end"
              id="end"
              value={search.end}
              onChange={handleChange("end")}
            />
          </label>
        </div>
        <div className="col-span-2 w-full">
          <div className="flex flex-row relative items-center">
            <input
              type="text"
              className="w-full rounded-l-md p-3"
              placeholder="Search activities"
              value={search.type}
              onChange={handleChange("type")}
              onKeyDown={(e) => {
                if (e.code === "Enter") {
                  e.preventDefault();
                  handleSearch();
                }
              }}
            />
            <SearchIcon
              className="absolute w-10 right-0 text-white shadow-md cursor-pointer bg-blue-500 -mr-10 rounded-r-md self-center"
              style={{ padding: "6px 1px" }}
              onClick={handleSearch}
            />
          </div>
        </div>
      </div>
      <div className="relative">
        <h1 className="text-2xl text-blue-500 ml-10 mt-5 flex flex-row">
          All transactions{" "}
          <span className="ml-1 cursor-pointer" onClick={handleSort}>
            {isSort === "ASC" ? (
              <ArrowCircleDownIcon className="w-7" />
            ) : (
              <ArrowCircleUpIcon className="w-7" />
            )}
          </span>
        </h1>
        {clearSeacrh && (
          <h1
            className="hover:underline cursor-pointer text-xl text-blue-500 absolute md:right-32 right-16 -mt-3"
            onClick={handleClear}
          >
            Clear
          </h1>
        )}
      </div>

      <div className="w-full px-4 pt-5">
        <div className="w-full max-w-6xl p-2 mx-auto bg-white rounded-2xl space-y-2">
          {historyPayment && historyPage.length > 0 ? (
            <h1 className="py-5 pl-3 text-xl font-semibold text-left bg-white">
              Completed
            </h1>
          ) : (
            <div>
              <h1 className="pl-3 pt-3 text-xl font-semibold text-center bg-white">
                No transactions yet.
              </h1>
              <h1 className="pl-3 pb-3 text-lg font-semibold text-center bg-white">
                Want to try again with different dates?
              </h1>
            </div>
          )}
          {historyPage &&
            historyPage[page] &&
            historyPage[page].map((data) => (
              <Disclosure>
                {({ open }) => (
                  <>
                    <Disclosure.Button className="flex items-center justify-between w-full px-4 py-2 text-sm font-medium text-left text-gray-700 bg-gray-100 hover:bg-gray-200 focus:outline-none focus-visible:ring focus-visible:ring-gray-500 focus-visible:ring-opacity-75 relative">
                      <div
                        className="absolute w-1 bg-black left-0 top-0"
                        style={{ height: "100%" }}
                      ></div>
                      <div className="flex flex-row md:divide-x-2 divide-gray-100">
                        <div className="text-lg text-center py-1 font-semibold">
                          <p>{format(new Date(data.payt_date), "MMMM")}</p>
                          <p>{format(new Date(data.payt_date), "dd")}</p>
                        </div>
                        <div className="relative mt-3">
                          <div className="flex flex-col mt-2 ml-5 items-center">
                            <p className="capitalize mb-1 text-lg">
                              {data.payt_type === "transferTo" ||
                              data.payt_type === "transferToBank"
                                ? "transfer out"
                                : data.payt_type === "transferFrom"
                                ? "transfer in"
                                : data.payt_type}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="flex">
                        {data.payt_type === "order" ||
                        data.payt_type === "transferTo" ||
                        data.payt_type === "transferToBank" ? (
                          <p className="font-semibold font-mono text-red-400 text-lg mr-20">
                            - {data.payt_credit}
                          </p>
                        ) : data.payt_type === "topup" ||
                          data.payt_type === "transferFrom" ? (
                          <p className="font-semibold font-mono text-green-400 text-lg mr-20">
                            + {data.payt_dabet}
                          </p>
                        ) : data.payt_type === "request" ? (
                          <p className="font-semibold font-mono text-lg mr-20">
                            {data.payt_dabet}
                          </p>
                        ) : null}
                        <ChevronUpIcon
                          className={`${
                            open ? "transform rotate-180" : ""
                          } w-5 h-5 text-blue-500`}
                        />
                      </div>
                    </Disclosure.Button>
                    <Disclosure.Panel className="px-4 pt-4 pb-2 text-base relative">
                      <div
                        className="absolute w-1 bg-gray-300 left-0"
                        style={{ height: "100%", top: "-7px" }}
                      ></div>
                      {data.payt_type === "order" ? (
                        <div className="md:ml-16 ml-5 flex flex-row">
                          <div className="w-1/2">
                            <h1 className="font-semibold">Order</h1>
                            <h1 className="font-mono">
                              {data.payt_order_number}
                            </h1>

                            <h1 className="font-semibold mt-10">
                              Transaction ID
                            </h1>
                            <div>
                              <h1 className="font-mono">
                                {data.payt_trx_number}
                              </h1>
                            </div>
                          </div>
                          <div className="w-1/2 -mt-10">
                            <h1 className="font-semibold mt-10">Details</h1>
                            <div className="flex justify-between mr-10 mt-2">
                              <h1>Payment credit</h1>
                              <h1 className="font-mono">
                                Rp{" "}
                                {parseFloat(data.payt_credit).toLocaleString(
                                  "ID",
                                  {
                                    minimumFractionDigits: 2,
                                  }
                                )}
                              </h1>
                            </div>
                            <div
                              className="bg-black"
                              style={{ width: "95%", height: "1px" }}
                            ></div>
                            <div className="flex justify-between mr-10 mt-2">
                              <h1>Total</h1>
                              <h1 className="font-mono">
                                Rp{" "}
                                {parseFloat(data.payt_credit).toLocaleString(
                                  "ID",
                                  {
                                    minimumFractionDigits: 2,
                                  }
                                )}
                              </h1>
                            </div>
                          </div>
                        </div>
                      ) : data.payt_type === "topup" ? (
                        <div className="md:ml-16 ml-5 flex flex-row">
                          <div className="w-1/2">
                            <h1 className="font-semibold">
                              Topup Wallet Bayar
                            </h1>
                            <h1 className="font-mono">
                              No. Bank/Card: {data.payt_bacc_acc_bank}
                            </h1>

                            <h1 className="font-semibold mt-10">
                              Transaction ID
                            </h1>
                            <div>
                              <h1 className="font-mono">
                                {data.payt_trx_number}
                              </h1>
                            </div>
                          </div>
                          <div className="w-1/2 -mt-10">
                            <h1 className="font-semibold mt-10">Details</h1>
                            <div className="flex justify-between mr-10 mt-2">
                              <h1>Payment dabet</h1>
                              <h1 className="font-mono">
                                Rp{" "}
                                {parseFloat(data.payt_dabet).toLocaleString(
                                  "ID",
                                  {
                                    minimumFractionDigits: 2,
                                  }
                                )}
                              </h1>
                            </div>
                            <div
                              className="bg-black"
                              style={{ width: "95%", height: "1px" }}
                            ></div>
                            <div className="flex justify-between mr-10 mt-2">
                              <h1>Total</h1>
                              <h1 className="font-mono">
                                Rp{" "}
                                {parseFloat(data.payt_dabet).toLocaleString(
                                  "ID",
                                  {
                                    minimumFractionDigits: 2,
                                  }
                                )}
                              </h1>
                            </div>
                          </div>
                        </div>
                      ) : data.payt_type === "refund" ? (
                        <div className="md:ml-16 ml-5 flex flex-row">
                          <div className="w-1/2">
                            <h1 className="font-semibold">Refund</h1>
                            <h1 className="font-mono">
                              ref: {data.payt_trx_number_ref}
                            </h1>

                            <h1 className="font-semibold mt-10">
                              Transaction ID
                            </h1>
                            <div>
                              <h1 className="font-mono">
                                {data.payt_trx_number}
                              </h1>
                            </div>
                          </div>
                        </div>
                      ) : data.payt_type === "transferTo" ? (
                        <div className="md:ml-16 ml-5 flex flex-row">
                          <div className="w-1/2">
                            <h1 className="font-semibold text-red-500">
                              Transfer Out
                            </h1>
                            {data.payt_bacc_acc_bank && (
                              <div>
                                <h1 className="font-semibold mt-3">
                                  From:{" "}
                                  <span className="font-mono font-normal">
                                    Bank/Card
                                  </span>
                                </h1>
                                <h1 className="font-semibold mt-3">
                                  Rek:{" "}
                                  <span className="font-mono font-normal">
                                    {data.payt_bacc_acc_bank}
                                  </span>{" "}
                                </h1>
                              </div>
                            )}
                            <h1 className="font-semibold mt-3">Note:</h1>
                            <h1 className="font-mono max-w-md">
                              {data.payt_desc}
                            </h1>
                            <h1 className="font-semibold mt-10">
                              Transaction ID
                            </h1>
                            <div>
                              <h1 className="font-mono">
                                {data.payt_trx_number}
                              </h1>
                            </div>
                          </div>
                          <div className="w-1/2 -mt-10">
                            <h1 className="font-semibold mt-10">Details</h1>
                            <div className="flex justify-between mr-10 mt-2">
                              <h1>Payment credit</h1>
                              <h1 className="font-mono">
                                Rp{" "}
                                {data.payt_bacc_acc_bank
                                  ? (
                                      parseFloat(data.payt_credit) - 2000
                                    ).toLocaleString("ID", {
                                      minimumFractionDigits: 2,
                                    })
                                  : parseFloat(data.payt_credit).toLocaleString(
                                      "ID",
                                      {
                                        minimumFractionDigits: 2,
                                      }
                                    )}
                              </h1>
                            </div>
                            {data.payt_bacc_acc_bank && (
                              <div className="flex justify-between mr-10 mt-2">
                                <h1>Biaya</h1>
                                <h1 className="font-mono">
                                  Rp{" "}
                                  {parseFloat(2000).toLocaleString("ID", {
                                    minimumFractionDigits: 2,
                                  })}
                                </h1>
                              </div>
                            )}
                            <div
                              className="bg-black"
                              style={{ width: "95%", height: "1px" }}
                            ></div>
                            <div className="flex justify-between mr-10 mt-2">
                              <h1>Total</h1>
                              <h1 className="font-mono">
                                Rp{" "}
                                {parseFloat(data.payt_credit).toLocaleString(
                                  "ID",
                                  {
                                    minimumFractionDigits: 2,
                                  }
                                )}
                              </h1>
                            </div>
                          </div>
                        </div>
                      ) : data.payt_type === "transferFrom" ? (
                        <div className="md:ml-16 ml-5 flex flex-row">
                          <div className="w-1/2">
                            <h1 className="font-semibold text-green-500">
                              Transfer In
                            </h1>
                            <h1 className="font-semibold mt-3">Note:</h1>
                            <h1 className="font-mono max-w-md">
                              {data.payt_desc}
                            </h1>
                            <h1 className="font-semibold mt-10">
                              Transaction ID
                            </h1>
                            <div>
                              <h1 className="font-mono">
                                {data.payt_trx_number}
                              </h1>
                            </div>
                          </div>
                          <div className="w-1/2 -mt-10">
                            <h1 className="font-semibold mt-10">Details</h1>
                            <div className="flex justify-between mr-10 mt-2">
                              <h1>Payment dabet</h1>
                              <h1 className="font-mono">
                                Rp{" "}
                                {parseFloat(data.payt_dabet).toLocaleString(
                                  "ID",
                                  {
                                    minimumFractionDigits: 2,
                                  }
                                )}
                              </h1>
                            </div>
                            <div
                              className="bg-black"
                              style={{ width: "95%", height: "1px" }}
                            ></div>
                            <div className="flex justify-between mr-10 mt-2">
                              <h1>Total</h1>
                              <h1 className="font-mono">
                                Rp{" "}
                                {parseFloat(data.payt_dabet).toLocaleString(
                                  "ID",
                                  {
                                    minimumFractionDigits: 2,
                                  }
                                )}
                              </h1>
                            </div>
                          </div>
                        </div>
                      ) : data.payt_type === "transferToBank" ? (
                        <div className="md:ml-16 ml-5 flex flex-row">
                          <div className="w-1/2">
                            <h1 className="font-semibold text-red-500">
                              Transfer Out
                            </h1>
                            <h1 className="font-semibold mt-3">
                              To:{" "}
                              <span className="font-mono font-normal">
                                Bank/Card
                              </span>
                            </h1>
                            <h1 className="font-semibold mt-3">
                              From:{" "}
                              <span className="font-mono font-normal">
                                Wallet
                              </span>
                            </h1>
                            <h1 className="font-semibold mt-3">
                              Rek:{" "}
                              <span className="font-mono font-normal">
                                {data.payt_bacc_acc_bank}
                              </span>{" "}
                            </h1>
                            <h1 className="font-mono max-w-md">
                              {data.payt_desc}
                            </h1>
                            <h1 className="font-semibold mt-10">
                              Transaction ID
                            </h1>
                            <div>
                              <h1 className="font-mono">
                                {data.payt_trx_number}
                              </h1>
                            </div>
                          </div>
                          <div className="w-1/2 -mt-10">
                            <h1 className="font-semibold mt-10">Details</h1>
                            <div className="flex justify-between mr-10 mt-2">
                              <h1>Payment credit</h1>
                              <h1 className="font-mono">
                                Rp{" "}
                                {(
                                  parseFloat(data.payt_credit) - 2000
                                ).toLocaleString("ID", {
                                  minimumFractionDigits: 2,
                                })}
                              </h1>
                            </div>
                            <div className="flex justify-between mr-10 mt-2">
                              <h1>Biaya</h1>
                              <h1 className="font-mono">
                                Rp{" "}
                                {parseFloat(2000).toLocaleString("ID", {
                                  minimumFractionDigits: 2,
                                })}
                              </h1>
                            </div>
                            <div
                              className="bg-black"
                              style={{ width: "95%", height: "1px" }}
                            ></div>
                            <div className="flex justify-between mr-10 mt-2">
                              <h1>Total</h1>
                              <h1 className="font-mono">
                                Rp{" "}
                                {parseFloat(data.payt_credit).toLocaleString(
                                  "ID",
                                  {
                                    minimumFractionDigits: 2,
                                  }
                                )}
                              </h1>
                            </div>
                          </div>
                        </div>
                      ) : data.payt_type === "request" ? (
                        <div className="md:ml-16 ml-5 flex flex-row">
                          <div className="w-1/2">
                            <h1 className="font-semibold">Request</h1>

                            <h1 className="font-semibold mt-10">
                              Transaction ID
                            </h1>
                            <div>
                              <h1 className="font-mono">
                                {data.payt_trx_number}
                              </h1>
                            </div>
                          </div>
                          <div className="w-1/2 -mt-10">
                            <h1 className="font-semibold mt-10">Details</h1>
                            <div className="flex justify-between mr-10 mt-2">
                              <h1>Payment request</h1>
                              <h1 className="font-mono">
                                Rp{" "}
                                {parseFloat(data.payt_dabet).toLocaleString(
                                  "ID",
                                  {
                                    minimumFractionDigits: 2,
                                  }
                                )}
                              </h1>
                            </div>
                            <div
                              className="bg-black"
                              style={{ width: "95%", height: "1px" }}
                            ></div>
                            <div className="flex justify-between mr-10 mt-2">
                              <h1>Total</h1>
                              <h1 className="font-mono">
                                Rp{" "}
                                {parseFloat(data.payt_dabet).toLocaleString(
                                  "ID",
                                  {
                                    minimumFractionDigits: 2,
                                  }
                                )}
                              </h1>
                            </div>
                          </div>
                        </div>
                      ) : null}
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
            ))}
        </div>
      </div>
      <div className="mt-5 md:ml-28 grid md:grid-cols-6 grid-cols-3">
        {page > 0 && (
          <div
            onClick={() => setPage(Number(page - 1))}
            className="py-2 text-center rounded-lg bg-blue-500 w-32 text-white text-lg col-span-1 cursor-pointer"
          >
            Prev
          </div>
        )}
        {page < historyPage.length - 1 && (
          <div
            onClick={() => setPage(Number(page + 1))}
            className="py-2 text-center rounded-lg bg-blue-500 w-32 text-white text-lg cols-span-1 col-start-6 cursor-pointer"
          >
            Next
          </div>
        )}
      </div>
    </div>
  );
};
