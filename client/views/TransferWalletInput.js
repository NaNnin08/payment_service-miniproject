import React, { useState } from "react";
import Cleave from "cleave.js/react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  PAYMENT_FIND_ONE_CLEAR,
  PAYMENT_TRANSFER_DATA,
  PAYMENT_TRANSFER_DATA_CLEAR,
} from "../constants/paymentConstants";
import { ArrowLeftIcon } from "@heroicons/react/outline";
import { useEffect } from "react";

export const TransferWalletInput = () => {
  const [dataTransfer, setDataTransfer] = useState({
    amount: undefined,
    message: undefined,
  });

  const { findEmail } = useSelector((state) => state.emailUser);
  const { fund } = useSelector((state) => state.userFund);
  const { transfer_data } = useSelector((state) => state.paymentTransfer);

  const dispatch = useDispatch();

  const history = useHistory();

  const handleNext = () => {
    const data = {
      from_email: fund.user_email,
      to_email: findEmail.user_email,
      amount: dataTransfer.amount,
      message: dataTransfer.message,
    };

    if (dataTransfer.amount) {
      dispatch({ type: PAYMENT_TRANSFER_DATA, payload: data });
      history.push("/myaccount/transfer/select");
    }
  };

  const backHandler = () => {
    dispatch({ type: PAYMENT_FIND_ONE_CLEAR });
    dispatch({ type: PAYMENT_TRANSFER_DATA_CLEAR });
  };

  if (transfer_data && !dataTransfer.amount) {
    setDataTransfer({
      amount: transfer_data.amount,
      message: transfer_data.message,
    });
  }

  if (!findEmail) {
    history.push("/myaccount/transfer");
  }
  return (
    <div className="bg-gray-100 flex">
      <div className="mx-auto w-full md:w-1/3 bg-white h-100v">
        <button className="mt-2 ml-2 text-gray-500" onClick={backHandler}>
          <ArrowLeftIcon className="w-10" />
        </button>
        <div className="flex flex-row mt-5 ml-5 items-center">
          <img
            src={
              findEmail && findEmail.user_avatar
                ? require("../../uploads/" + findEmail.user_avatar).default
                : require("../assets/images/defaultProfile.jpg")
            }
            alt="user_friend"
            className="rounded-full"
            style={{ width: "90px", height: "90px" }}
          />
          <p className="text-2xl font-semibold ml-5 text-gray-500">
            {findEmail && findEmail.user_email}
          </p>
        </div>
        <div className="flex mt-5">
          <Cleave
            className="mx-auto w-full p-2 border focus:ring-1 focus:ring-white focus:border-transparent text-center font-mono text-3xl"
            style={{ border: 0 }}
            options={{
              numeral: true,
              numeralThousandsGroupStyle: "thousand",
              prefix: "Rp ",
              rawValueTrimPrefix: true,
            }}
            value={dataTransfer.amount}
            onChange={(e) =>
              setDataTransfer({ ...dataTransfer, amount: e.target.rawValue })
            }
          />
        </div>
        <div className="flex mt-5">
          <textarea
            name="pesan"
            id="pesan"
            cols="40"
            rows="3"
            className="mx-auto rounded-xl"
            placeholder="Pesan"
            value={dataTransfer.message}
            onChange={(e) =>
              setDataTransfer({ ...dataTransfer, message: e.target.value })
            }
          ></textarea>
        </div>
        <div className="flex mt-10">
          <button
            className=" mx-auto bg-blue-500 text-white text-xl px-3 py-2 rounded-3xl"
            onClick={handleNext}
          >
            Lanjutkan
          </button>
        </div>
      </div>
    </div>
  );
};
