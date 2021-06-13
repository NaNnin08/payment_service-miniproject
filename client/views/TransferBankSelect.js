import { ArrowLeftIcon } from "@heroicons/react/outline";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import bIcon from "../assets/images/B_icon.svg";
import bankIcon from "../assets/images/bank.svg";
import cardIcon from "../assets/images/card.svg";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { PAYMENT_TRANSFER_DATA } from "../constants/paymentConstants";
import { useEffect } from "react";

export const TransferBankSelect = () => {
  const { fund } = useSelector((state) => state.userFund);
  const { bank_accounts } = fund;
  const { transfer_data } = useSelector((state) => state.paymentTransfer);

  const dispatch = useDispatch();

  const history = useHistory();

  const [method, setMethod] = useState("");

  const handleNext = () => {
    if (method) {
      dispatch({
        type: PAYMENT_TRANSFER_DATA,
        payload: { bank: method },
      });
    }
  };

  const backHandler = () => {
    history.push(
      new URLSearchParams(location.search).get("from")
        ? new URLSearchParams(location.search).get("from")
        : "/myaccount/summary"
    );
  };

  if (transfer_data) {
    history.push("/transfer/bank/input");
  }

  return (
    <div className="bg-gray-100 flex">
      <div className="mx-auto w-full md:w-1/3 bg-white h-100v">
        <button className="mt-2 ml-2 text-gray-500" onClick={backHandler}>
          <ArrowLeftIcon className="w-10" />
        </button>
        <div className="bg-blue-300 rounded-full shadow-2xl w-16 mx-auto">
          <img src={bIcon} alt="bayar icon" />
        </div>
        <h1 className="text-3xl font-semibold text-center mt-10 mb-10">
          Transfer ke bank Anda
        </h1>
        {bank_accounts &&
          bank_accounts.map((x, index) => (
            <div
              className="border-b-2 border-t-2 border-gray-400 mx-8 p-3 flex"
              key={index}
            >
              <input
                type="radio"
                name="wallet"
                id="bank"
                value={x.baac_acc_bank}
                style={{ width: "30px", height: "30px" }}
                onChange={(e) => setMethod(e.target.value)}
              />
              <label htmlFor="wallet" className="flex">
                <div className="bg-blue-300 bg-opacity-20 rounded-full shadow-2xl w-16 ml-3">
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
                <div className="ml-3">
                  <h1 className="capitalize">{x.baac_type}</h1>
                  <p className="">
                    {"*".repeat(5) + x.baac_acc_bank.substr(5)}
                  </p>
                  <h1 className="font-mono">Biaya: Rp 2000,00</h1>
                </div>
              </label>
            </div>
          ))}
        <div className="flex mt-10">
          <button
            className=" mx-auto bg-blue-500 text-white text-xl px-3 py-2 rounded-3xl"
            onClick={handleNext}
          >
            Berikutnya
          </button>
        </div>
      </div>
    </div>
  );
};
