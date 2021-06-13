import { ArrowLeftIcon } from "@heroicons/react/outline";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import bIcon from "../assets/images/B_icon.svg";
import bankIcon from "../assets/images/bank.svg";
import cardIcon from "../assets/images/card.svg";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { transferBank } from "../actions/paymentAction";

export const TransferBankCheckout = () => {
  const { fund, isSuccess } = useSelector((state) => state.userFund);
  const { transfer_data } = useSelector((state) => state.paymentTransfer);

  const dispatch = useDispatch();

  const history = useHistory();

  const Biaya = 2000;

  const handleNext = () => {
    const data = {
      ...transfer_data,
      from_email: fund.user_email,
      biaya: Biaya,
      amount: parseFloat(transfer_data.amount) + parseFloat(Biaya),
    };
    dispatch(transferBank(data));
  };

  const backHandler = () => {
    history.push("/transfer/bank/input");
  };

  if (!transfer_data || !transfer_data.amount) {
    history.push("/transfer/bank/input");
  }

  if (isSuccess) {
    history.push(
      `/wallet/transfer/success?toWalletAmount=${transfer_data.amount}&toWalletEmail=${transfer_data.bank}&from=/myaccount/summary`
    );
  }
  return (
    <div className="bg-gray-100 flex">
      <div
        className="mx-auto w-full md:w-1/3 bg-white"
        style={{ height: "100%" }}
      >
        <button className="mt-2 ml-2 text-gray-500" onClick={backHandler}>
          <ArrowLeftIcon className="w-10" />
        </button>
        <div className="bg-blue-300 rounded-full shadow-2xl w-16 mx-auto">
          <img src={bIcon} alt="bayar icon" />
        </div>
        <h1 className="text-2xl text-center mt-10">Periksa transfer Anda</h1>
        <div className="mt-5">
          <h1 className="text-center font-mono text-3xl">
            Rp{" "}
            {transfer_data &&
              transfer_data.amount &&
              parseFloat(transfer_data.amount).toLocaleString("ID", {
                minimumFractionDigits: 2,
              })}
          </h1>
          <h1
            className="text-center font-serif text-md text-blue-500 cursor-pointer"
            onClick={backHandler}
          >
            Edit jumlah
          </h1>
        </div>
        <div className="mt-5 border-t-2 border-gray-400 mx-8 p-3 flex relative">
          <div className="absolute top-1 font-serif font-semibold">
            Transfer dari
          </div>
          <div className="bg-blue-300 rounded-full shadow-2xl w-16 ml-3 mt-5">
            <img src={bIcon} alt="bayar icon" />
          </div>
          <div className="ml-3 mt-6">
            <h1>Saldo Bayar</h1>
            <h1 className="font-mono">
              Rp {fund && fund.payment_account.pacc_saldo}{" "}
              <span className="font-semibold">tersedia</span>
            </h1>
          </div>
        </div>
        {fund &&
          fund.bank_accounts &&
          transfer_data &&
          fund.bank_accounts
            .filter((y) => y.baac_acc_bank === transfer_data.bank)
            .map((x, index) => (
              <div
                className="border-b-2 border-t-2 border-gray-400 mx-8 p-3 flex relative"
                key={index}
              >
                <div className="absolute top-1 font-serif font-semibold">
                  Transfer ke
                </div>
                <div className="bg-blue-300 bg-opacity-20 rounded-full shadow-2xl w-16 ml-3 mt-10">
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
                <div className="ml-3 mt-6">
                  <h1 className="capitalize">{x.baac_type}</h1>
                  <p className="">
                    {"*".repeat(5) + x.baac_acc_bank.substr(5)}
                  </p>
                  <h1 className="font-mono">Biaya: Rp 2000,00</h1>
                </div>
              </div>
            ))}
        <div className="mt-5">
          <div className="flex flex-row justify-between mx-10">
            <h1 className="font-serif font-semibold">Jumlah transfer</h1>
            <p className="font-mono">
              Rp{" "}
              {transfer_data &&
                transfer_data.amount &&
                parseFloat(transfer_data.amount).toLocaleString("ID", {
                  minimumFractionDigits: 2,
                })}
            </p>
          </div>
          <div className="flex flex-row justify-between mx-10 mb-2">
            <h1 className="font-serif font-semibold">Biaya</h1>
            <p className="font-mono">
              Rp{" "}
              {transfer_data &&
                transfer_data.amount &&
                parseFloat(Biaya).toLocaleString("ID", {
                  minimumFractionDigits: 2,
                })}
            </p>
          </div>
          <div className="mx-10 bg-gray-500" style={{ height: "1px" }}></div>
          <div className="flex flex-row justify-between mx-10">
            <h1 className="font-serif font-semibold">Jumlah transfer</h1>
            <p className="font-mono">
              Rp{" "}
              {transfer_data &&
                transfer_data.amount &&
                (parseFloat(transfer_data.amount) + Biaya).toLocaleString(
                  "ID",
                  {
                    minimumFractionDigits: 2,
                  }
                )}
            </p>
          </div>
        </div>
        <div className="flex mt-10">
          <button
            className=" mx-auto mb-5 bg-blue-500 text-white text-xl px-3 py-2 rounded-3xl"
            onClick={handleNext}
          >
            Bayar Rp
            {transfer_data &&
              transfer_data.amount &&
              (parseFloat(transfer_data.amount) + Biaya).toLocaleString("ID", {
                minimumFractionDigits: 2,
              })}
          </button>
        </div>
      </div>
    </div>
  );
};
