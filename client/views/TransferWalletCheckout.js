import { ArrowRightIcon } from "@heroicons/react/outline";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import bIcon from "../assets/images/B_icon.svg";
import bankIcon from "../assets/images/bank.svg";
import cardIcon from "../assets/images/card.svg";
import { useHistory } from "react-router-dom";
import { transferWallet } from "../actions/paymentAction";

export const TransferWalletCheckout = () => {
  const { transfer_data } = useSelector((state) => state.paymentTransfer);
  const { isSuccess, error } = useSelector((state) => state.userFund);

  const dispatch = useDispatch();

  const history = useHistory();

  const Biaya = transfer_data
    ? transfer_data.method === "wallet"
      ? 0
      : 2000
    : null;

  const handleNext = () => {
    if (transfer_data.method === "wallet") {
      dispatch(transferWallet(transfer_data));
    } else {
      const data = {
        ...transfer_data,
        sum: parseFloat(transfer_data.amount) + Biaya,
      };
      console.log(data);
    }
  };

  if (isSuccess) {
    history.push(
      `/wallet/transfer/success?toWalletAmount=${transfer_data.amount}&toWalletEmail=${transfer_data.to_email}&from=/myaccount/summary`
    );
  }

  const backHandler = () => {
    history.push("/myaccount/transfer/select");
  };

  if (!transfer_data) {
    history.push("/myaccount/transfer");
  }

  return (
    <div className="bg-gray-100 flex">
      <div className="mx-auto w-full md:w-1/3 bg-white h-100v">
        <button
          className="mt-10 mx-10 text-gray-500 flex relative w-full items-center"
          onClick={backHandler}
        >
          <h1 className="text-lg text-black">Anda mengirim dengan</h1>
          <ArrowRightIcon className="w-5 absolute right-24" />
        </button>
        <div className="mt-5 mx-8 p-3 flex">
          <div className="bg-blue-300 rounded-full shadow-2xl w-10 ml-3">
            <img
              src={
                transfer_data &&
                (transfer_data.method === "debit"
                  ? bankIcon
                  : transfer_data.method === "card"
                  ? cardIcon
                  : bIcon)
              }
              alt="bayar icon"
            />
          </div>
          <div className="ml-3 flex items-center relative w-full text-lg text-gray-500 font-serif">
            <h1>Saldo Bayar</h1>
            <h1 className="font-mono absolute right-2">
              Rp{" "}
              {transfer_data &&
                parseFloat(transfer_data.amount).toLocaleString("ID", {
                  minimumFractionDigits: 2,
                })}
            </h1>
          </div>
        </div>
        <div className="ml-3 flex items-center relative w-full text-lg font-serif mx-10 mt-10">
          <h1>Biaya Bayar</h1>
          <h1 className="font-mono absolute right-10">
            Rp{" "}
            {parseFloat(Biaya).toLocaleString("ID", {
              minimumFractionDigits: 2,
            })}
          </h1>
        </div>
        <div className="ml-3 flex items-center relative w-full text-lg font-serif mx-10 mt-5">
          <h1>Anda akan membayar</h1>
          <h1 className="font-mono absolute right-10">
            Rp{" "}
            {transfer_data &&
              (parseFloat(transfer_data.amount) + Biaya).toLocaleString("ID", {
                minimumFractionDigits: 2,
              })}
          </h1>
        </div>
        <div className="flex mt-16">
          <button
            className=" mx-auto bg-blue-500 text-white text-xl px-3 py-2 rounded-3xl"
            onClick={handleNext}
          >
            Kirim Wallet Sekarang
          </button>
        </div>
      </div>
    </div>
  );
};
