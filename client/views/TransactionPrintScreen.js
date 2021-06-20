import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { findPaymentByIdAction } from "../actions/paymentAction";
import LoadingScreen from "../components/layout/LoadingScreen";
import BayarIcon from "../assets/images/B_icon.svg";
import { format } from "date-fns";
import { PrinterIcon, ArrowLeftIcon } from "@heroicons/react/solid";
import { useHistory } from "react-router-dom";

export const TransactionPrintScreen = ({ match }) => {
  const { payment } = useSelector((state) => state.paymentById);
  const dispatch = useDispatch();

  const history = useHistory();

  useEffect(() => {
    dispatch(findPaymentByIdAction(match.params.id));
  }, []);
  return (
    <div>
      {payment ? (
        <div>
          <div className="flex flex-rows -mb-2 md:-mb-5 mt-2 mx-5 space-x-5 justify-between md:justify-start text-gray-400 no-print">
            <ArrowLeftIcon
              className="w-10 cursor-pointer"
              onClick={() => history.goBack()}
            />
            <PrinterIcon
              className="w-10 cursor-pointer"
              onClick={() => window.print()}
            />
          </div>
          <div
            className="bg-white mx-auto py-10 px-5 my-5 shadow-lg"
            style={{ width: "80%" }}
          >
            <img
              src={BayarIcon}
              alt="bayar icon"
              className="mx-auto mb-10 transform -rotate-3"
            />
            <div
              className="mx-auto mb-5"
              style={{
                height: "1px",
                borderTop: "1px black dotted",
                width: "95%",
              }}
            ></div>
            <div className="mr-5">
              {payment.payt_type === "order" ? (
                <div className="md:ml-16 ml-5 flex flex-col md:flex-row">
                  <div className="w-full md:w-1/2">
                    <h1 className="font-semibold">Date:</h1>
                    <h1 className="font-mono mb-3">
                      {format(
                        new Date(payment.payt_date),
                        "eeee, dd MMMM yyyy, ppp"
                      )}
                    </h1>

                    <h1 className="font-semibold">Order</h1>
                    <h1 className="font-mono">{payment.payt_order_number}</h1>

                    <h1 className="font-semibold mt-10">Transaction ID</h1>
                    <div>
                      <h1 className="font-mono">{payment.payt_trx_number}</h1>
                    </div>
                  </div>
                  <div className="w-full md:w-1/2 md:-mt-10">
                    <h1 className="font-semibold mt-10">Details</h1>
                    <div className="flex justify-between mr-10 mt-2">
                      <h1>Payment credit</h1>
                      <h1 className="font-mono">
                        Rp{" "}
                        {parseFloat(payment.payt_credit).toLocaleString("ID", {
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
                        {parseFloat(payment.payt_credit).toLocaleString("ID", {
                          minimumFractionDigits: 2,
                        })}
                      </h1>
                    </div>
                  </div>
                </div>
              ) : payment.payt_type === "topup" ? (
                <div className="md:ml-16 ml-5 flex flex-col md:flex-row">
                  <div className="w-full md:w-1/2">
                    <h1 className="font-semibold">Date:</h1>
                    <h1 className="font-mono mb-3">
                      {format(
                        new Date(payment.payt_date),
                        "eeee, dd MMMM yyyy, ppp"
                      )}
                    </h1>

                    <h1 className="font-semibold">Topup Wallet Bayar</h1>
                    <h1 className="font-mono">
                      No. Bank/Card: {payment.payt_bacc_acc_bank}
                    </h1>

                    <h1 className="font-semibold mt-10">Transaction ID</h1>
                    <div>
                      <h1 className="font-mono">{payment.payt_trx_number}</h1>
                    </div>
                  </div>
                  <div className="w-full md:w-1/2 md:-mt-10">
                    <h1 className="font-semibold mt-10">Details</h1>
                    <div className="flex justify-between mr-10 mt-2">
                      <h1>Payment dabet</h1>
                      <h1 className="font-mono">
                        Rp{" "}
                        {parseFloat(payment.payt_dabet).toLocaleString("ID", {
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
                        {parseFloat(payment.payt_dabet).toLocaleString("ID", {
                          minimumFractionDigits: 2,
                        })}
                      </h1>
                    </div>
                  </div>
                </div>
              ) : payment.payt_type === "refund" ? (
                <div className="md:ml-16 ml-5 flex flex-row">
                  <div className="w-full md:w-1/2">
                    <h1 className="font-semibold">Date:</h1>
                    <h1 className="font-mono mb-3">
                      {format(
                        new Date(payment.payt_date),
                        "eeee, dd MMMM yyyy, ppp"
                      )}
                    </h1>

                    <h1 className="font-semibold">Refund</h1>
                    <h1 className="font-mono">
                      ref: {payment.payt_trx_number_ref}
                    </h1>

                    <h1 className="font-semibold mt-10">Transaction ID</h1>
                    <div>
                      <h1 className="font-mono">{payment.payt_trx_number}</h1>
                    </div>
                  </div>
                </div>
              ) : payment.payt_type === "transferTo" ? (
                <div className="md:ml-16 ml-5 flex flex-col md:flex-row">
                  <div className="w-full md:w-1/2">
                    <h1 className="font-semibold">Date:</h1>
                    <h1 className="font-mono mb-3">
                      {format(
                        new Date(payment.payt_date),
                        "eeee, dd MMMM yyyy, ppp"
                      )}
                    </h1>

                    <h1 className="font-semibold text-red-500">Transfer Out</h1>
                    {payment.payt_bacc_acc_bank && (
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
                            {payment.payt_bacc_acc_bank}
                          </span>{" "}
                        </h1>
                      </div>
                    )}
                    <h1 className="font-semibold mt-3">Note:</h1>
                    <h1 className="font-mono max-w-md">{payment.payt_desc}</h1>
                    <h1 className="font-semibold mt-10">Transaction ID</h1>
                    <div>
                      <h1 className="font-mono">{payment.payt_trx_number}</h1>
                    </div>
                  </div>
                  <div className="w-full md:w-1/2 md:-mt-10">
                    <h1 className="font-semibold mt-10">Details</h1>
                    <div className="flex justify-between mr-10 mt-2">
                      <h1>Payment credit</h1>
                      <h1 className="font-mono">
                        Rp{" "}
                        {payment.payt_bacc_acc_bank
                          ? (
                              parseFloat(payment.payt_credit) - 2000
                            ).toLocaleString("ID", {
                              minimumFractionDigits: 2,
                            })
                          : parseFloat(payment.payt_credit).toLocaleString(
                              "ID",
                              {
                                minimumFractionDigits: 2,
                              }
                            )}
                      </h1>
                    </div>
                    {payment.payt_bacc_acc_bank && (
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
                        {parseFloat(payment.payt_credit).toLocaleString("ID", {
                          minimumFractionDigits: 2,
                        })}
                      </h1>
                    </div>
                  </div>
                </div>
              ) : payment.payt_type === "transferFrom" ? (
                <div className="md:ml-16 ml-5 flex flex-col md:flex-row">
                  <div className="w-full md:w-1/2">
                    <h1 className="font-semibold">Date:</h1>
                    <h1 className="font-mono mb-3">
                      {format(
                        new Date(payment.payt_date),
                        "eeee, dd MMMM yyyy, ppp"
                      )}
                    </h1>

                    <h1 className="font-semibold text-green-500">
                      Transfer In
                    </h1>
                    <h1 className="font-semibold mt-3">Note:</h1>
                    <h1 className="font-mono max-w-md">{payment.payt_desc}</h1>
                    <h1 className="font-semibold mt-10">Transaction ID</h1>
                    <div>
                      <h1 className="font-mono">{payment.payt_trx_number}</h1>
                    </div>
                  </div>
                  <div className="w-full md:w-1/2 md:-mt-10">
                    <h1 className="font-semibold mt-10">Details</h1>
                    <div className="flex justify-between mr-10 mt-2">
                      <h1>Payment dabet</h1>
                      <h1 className="font-mono">
                        Rp{" "}
                        {parseFloat(payment.payt_dabet).toLocaleString("ID", {
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
                        {parseFloat(payment.payt_dabet).toLocaleString("ID", {
                          minimumFractionDigits: 2,
                        })}
                      </h1>
                    </div>
                  </div>
                </div>
              ) : payment.payt_type === "transferToBank" ? (
                <div className="md:ml-16 ml-5 flex flex-col md:flex-row">
                  <div className="w-full md:w-1/2">
                    <h1 className="font-semibold">Date:</h1>
                    <h1 className="font-mono mb-3">
                      {format(
                        new Date(payment.payt_date),
                        "eeee, dd MMMM yyyy, ppp"
                      )}
                    </h1>

                    <h1 className="font-semibold text-red-500">Transfer Out</h1>
                    <h1 className="font-semibold mt-3">
                      To:{" "}
                      <span className="font-mono font-normal">Bank/Card</span>
                    </h1>
                    <h1 className="font-semibold mt-3">
                      From:{" "}
                      <span className="font-mono font-normal">Wallet</span>
                    </h1>
                    <h1 className="font-semibold mt-3">
                      Rek:{" "}
                      <span className="font-mono font-normal">
                        {payment.payt_bacc_acc_bank}
                      </span>{" "}
                    </h1>
                    <h1 className="font-mono max-w-md">{payment.payt_desc}</h1>
                    <h1 className="font-semibold mt-10">Transaction ID</h1>
                    <div>
                      <h1 className="font-mono">{payment.payt_trx_number}</h1>
                    </div>
                  </div>
                  <div className="w-full md:w-1/2 md:-mt-10">
                    <h1 className="font-semibold mt-10">Details</h1>
                    <div className="flex justify-between mr-10 mt-2">
                      <h1>Payment credit</h1>
                      <h1 className="font-mono">
                        Rp{" "}
                        {(
                          parseFloat(payment.payt_credit) - 2000
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
                        {parseFloat(payment.payt_credit).toLocaleString("ID", {
                          minimumFractionDigits: 2,
                        })}
                      </h1>
                    </div>
                  </div>
                </div>
              ) : payment.payt_type === "request" ? (
                <div className="md:ml-16 ml-5 flex flex-col md:flex-row">
                  <div className="w-full md:w-1/2">
                    <h1 className="font-semibold">Date:</h1>
                    <h1 className="font-mono mb-3">
                      {format(
                        new Date(payment.payt_date),
                        "eeee, dd MMMM yyyy, ppp"
                      )}
                    </h1>

                    <h1 className="font-semibold">Request</h1>

                    <h1 className="font-semibold mt-10">Transaction ID</h1>
                    <div>
                      <h1 className="font-mono">{payment.payt_trx_number}</h1>
                    </div>
                  </div>
                  <div className="w-full md:w-1/2 md:-mt-10">
                    <h1 className="font-semibold mt-10">Details</h1>
                    <div className="flex justify-between mr-10 mt-2">
                      <h1>Payment request</h1>
                      <h1 className="font-mono">
                        Rp{" "}
                        {parseFloat(payment.payt_dabet).toLocaleString("ID", {
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
                        {parseFloat(payment.payt_dabet).toLocaleString("ID", {
                          minimumFractionDigits: 2,
                        })}
                      </h1>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
            <div
              className="mx-auto mt-5"
              style={{
                height: "1px",
                borderTop: "1px black dotted",
                width: "95%",
              }}
            ></div>
          </div>
        </div>
      ) : (
        <LoadingScreen />
      )}
    </div>
  );
};
