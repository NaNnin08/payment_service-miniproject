import React, { useState } from "react";
import Cleave from "cleave.js/react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { PAYMENT_TRANSFER_DATA } from "../constants/paymentConstants";

export const TransferWalletInput = () => {
  const [dataTransfer, setDataTransfer] = useState({
    amount: undefined,
    message: undefined,
  });

  const { findEmail } = useSelector((state) => state.emailUser);
  const { fund } = useSelector((state) => state.userFund);

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
      history.push("/myaccount/transfer/detail");
    }
  };

  if (!findEmail) {
    history.push("/myaccount/transfer");
  }
  return (
    <div className="bg-gray-100 flex">
      <div className="mx-auto w-full md:w-1/3 bg-white h-100v">
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
            onBlur={(e) =>
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
            onBlur={(e) =>
              setDataTransfer({ ...dataTransfer, message: e.target.value })
            }
          ></textarea>
        </div>
        <div className="flex mt-10">
          <button
            className=" mx-auto bg-blue-500 text-white text-xl p-3 rounded-3xl"
            onClick={handleNext}
          >
            Lanjutkan
          </button>
        </div>
      </div>
    </div>
  );
};
