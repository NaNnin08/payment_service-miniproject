import React, { useEffect, useState } from "react";
import { SearchIcon } from "@heroicons/react/outline";
import { useDispatch, useSelector } from "react-redux";
import { findOnePaymentByUser } from "../actions/paymentAction";
import { format } from "date-fns";
import {
  ArrowCircleDownIcon,
  ArrowCircleUpIcon,
} from "@heroicons/react/outline";

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
        historyPayment.sort(
          (a, b) => new Date(a.payt_date) - new Date(b.payt_date)
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
        historyPayment.filter((data) => data.payt_type === search.type)
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
            data.payt_type === search.type
        )
      );
      setHistoryPage("");
      setClearSeacrh(true);
    }
  };

  const handleClear = () => {
    setPaymentList(historyPayment);
    setHistoryPage("");
    setSearch({
      start: "",
      end: "",
      type: "",
    });
    setClearSeacrh(false);
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
              .filter((data) => data.payt_type === search.type)
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
                  data.payt_type === search.type
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
              .filter((data) => data.payt_type === search.type)
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
                  data.payt_type === search.type
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
      <table className="w-5/6 mx-auto mt-5 whitespace-nowrap rounded-sm bg-white shadow-md overflow-hidden tableTransaction">
        <thead>
          <tr>
            <th>
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
            </th>
          </tr>
        </thead>
        <tbody>
          {historyPage &&
            historyPage[page] &&
            historyPage[page].map((data) => (
              <tr key={data.payt_id}>
                <td>
                  <div className="flex flex-row md:divide-x-2 divide-gray-100">
                    <div
                      style={{ width: "10%" }}
                      className="text-lg text-center py-1 font-semibold"
                    >
                      <p>{format(new Date(data.payt_date), "MMMM")}</p>
                      <p>{format(new Date(data.payt_date), "dd")}</p>
                    </div>
                    <div style={{ width: "90%" }} className="relative">
                      <div className="flex flex-col mt-2 ml-5">
                        <p className="capitalize mb-1 text-lg">
                          {data.payt_type}
                        </p>
                        <p>{data.payt_trx_number}</p>
                      </div>
                      <div className="flex md:flex-col flex-row md:absolute mt-2 md:mt-0 right-20 top-4">
                        {data.payt_type === "order" ? (
                          <p className="font-semibold font-mono text-red-400 text-lg">
                            - {data.payt_credit}
                          </p>
                        ) : data.payt_type === "topup" ? (
                          <p className="font-semibold font-mono text-green-400 text-lg">
                            + {data.payt_dabet}
                          </p>
                        ) : (
                          <div className=" -mr-10">
                            {data.payt_trx_number_ref && (
                              <p className="font-semibold font-mono text-black text-lg">
                                ref: {data.payt_trx_number_ref}
                              </p>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
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
