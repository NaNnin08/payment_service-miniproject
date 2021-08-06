import React, { useEffect, useState } from "react";
import { getPagingPaymentAction } from "../actions/paymentAction";
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
import Pagination from "@material-ui/lab/Pagination";

export const TransactionScreenV2 = () => {
  const { pagingPayment } = useSelector((state) => state.paging);
  const dispatch = useDispatch();

  const [page, setPage] = useState(1);
  const [search, setSeacrh] = useState("");

  const getRequestParams = (search, page) => {
    let params = {};

    if (page) {
      params["page"] = page - 1;
    }

    if (search) {
      params["cari"] = search;
    }

    return params;
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    const params = getRequestParams(search, page);

    dispatch(getPagingPaymentAction("/api/payt/payment/paging", params));
  }, [dispatch, page]);

  return (
    <div>
      <div className="w-2/3 mx-auto">
        {pagingPayment &&
          pagingPayment.rows &&
          pagingPayment.rows.map((data, index) => (
            <Disclosure key={index}>
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
                        <p className="font-semibold font-mono text-red-400 text-lg  mr-0 md:mr-20">
                          - {data.payt_credit}
                        </p>
                      ) : data.payt_type === "topup" ||
                        data.payt_type === "transferFrom" ? (
                        <p className="font-semibold font-mono text-green-400 text-lg mr-0 md:mr-20">
                          + {data.payt_dabet}
                        </p>
                      ) : data.payt_type === "request" ? (
                        <p className="font-semibold font-mono text-lg mr-0 md:mr-20">
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
                          <h1 className="font-semibold">Topup Wallet Bayar</h1>
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
      <Pagination
        className="my-10"
        count={pagingPayment ? pagingPayment.totalPages : 1}
        page={page}
        siblingCount={1}
        boundaryCount={1}
        variant="outlined"
        shape="rounded"
        onChange={handlePageChange}
      />
    </div>
  );
};
