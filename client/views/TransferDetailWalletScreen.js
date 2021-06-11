import React from "react";
import Cleave from "cleave.js/react";
import { useState } from "react";

export const TransferDetailWalletScreen = ({ data }) => {
  const [dataTransfer, setDataTransfer] = useState({
    amount: undefined,
    message: undefined,
  });

  const handleNext = () => {};
  return (
    <div
      className="bg-gray-100 w-full absolute top-0 -mt-10 flex z-10"
      style={{ height: "86vh" }}
    >
      <div className="mx-auto w-full md:w-1/3 bg-white">
        <div className="flex flex-row mt-5 ml-5 items-center">
          <img
            src={
              data.user_avatar
                ? require("../../uploads/" + data.user_avatar).default
                : require("../assets/images/defaultProfile.jpg")
            }
            alt="user_friend"
            className="rounded-full"
            style={{ width: "90px", height: "90px" }}
          />
          <p className="text-2xl font-semibold ml-5 text-gray-500">
            {data.user_email}
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
