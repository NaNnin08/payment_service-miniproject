import { ArrowLeftIcon } from "@heroicons/react/outline";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import bIcon from "../assets/images/B_icon.svg";
import Cleave from "cleave.js/react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import {
  PAYMENT_TRANSFER_DATA,
  PAYMENT_TRANSFER_DATA_CLEAR,
} from "../constants/paymentConstants";
import { useEffect } from "react";

export const TransferBankInput = () => {
  const { fund } = useSelector((state) => state.userFund);
  const {
    payment_account: { pacc_saldo },
  } = fund;
  const { transfer_data } = useSelector((state) => state.paymentTransfer);

  const dispatch = useDispatch();

  const history = useHistory();

  const [method, setMethod] = useState("");
  const [state, setState] = useState(false);

  useEffect(() => {
    if (transfer_data) {
      setMethod(transfer_data.amount ? transfer_data.amount : "");
    }
  }, []);

  const handleNext = () => {
    if (parseFloat(method) <= parseFloat(pacc_saldo) - 2000) {
      dispatch({
        type: PAYMENT_TRANSFER_DATA,
        payload: { ...transfer_data, amount: method },
      });
      setState(true);
    }
  };

  const backHandler = () => {
    dispatch({ type: PAYMENT_TRANSFER_DATA_CLEAR });
    history.push("/transfer/bank");
  };

  if (transfer_data && transfer_data.amount && state) {
    history.push("/transfer/bank/checkout");
  }

  if (!transfer_data || !transfer_data.bank) {
    history.push("/transfer/bank");
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
          Jumlah transfer
        </h1>
        <Cleave
          className="mx-auto w-full p-2 border focus:ring-1 focus:ring-white focus:border-transparent text-center font-mono text-3xl"
          style={{ border: 0 }}
          options={{
            numeral: true,
            numeralThousandsGroupStyle: "thousand",
            prefix: "Rp ",
            rawValueTrimPrefix: true,
          }}
          value={method}
          onChange={(e) => setMethod(e.target.rawValue)}
        />
        <div className="mt-5">
          <h1 className="text-center font-mono text-lg">
            Rp{" "}
            {parseFloat(pacc_saldo).toLocaleString("ID", {
              minimumFractionDigits: 2,
            })}
          </h1>
          <h1 className="text-center font-serif text-lg">
            Saldo yang tersedia
          </h1>
        </div>
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
