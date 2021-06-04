import React, { useEffect, useState } from "react";
import bankIcon from "../assets/images/bank.svg";
import cardIcon from "../assets/images/card.svg";
import { useLocation, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { bankRemoveCard } from "../actions/bankActions";

export default function WalletChildScreen({ idBank, accBank, match }) {
  const [bank_id, setBank_id] = useState("");
  const [bank_acc, setBank_acc] = useState("");

  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    setBank_acc("");
    setBank_id("");
  }, [location.search]);

  useEffect(() => {
    if (!bank_acc) {
      setBank_acc(
        accBank &&
          accBank.find(
            (x) =>
              x.baac_acc_bank === new URLSearchParams(location.search).get("id")
          )
      );
    }
    if (!bank_id && bank_acc) {
      setBank_id(
        idBank &&
          idBank.find((y) => y.bank_id === bank_acc.baac_bank_id).bank_name
      );
    }
  }, [bank_acc, bank_id, dispatch]);

  const removeBankCard = () => {
    history.push(
      `/remove/${bank_acc.baac_type}/success?id=${bank_acc.baac_acc_bank}&from=${location.pathname}`
    );
    dispatch(bankRemoveCard(bank_acc.baac_acc_bank, bank_acc.baac_user_id));
  };

  return (
    <div>
      <div className="bg-white mt-10 p-5 text-2xl flex flex-col">
        <div className="mx-auto">
          <div className="w-24">
            <img
              src={
                bank_acc.baac_type === "debit"
                  ? bankIcon
                  : bank_acc.baac_type === "card"
                  ? cardIcon
                  : null
              }
              alt=""
            />
          </div>
        </div>
        <div className="mx-auto max-w-md text-center">
          <h1 className="mb-5 -ml-8 mt-8 ">{bank_id}</h1>
          <p className="text-lg mt-2 capitalize">{bank_acc.baac_type}</p>
          <p className="text-lg mt-2">
            {bank_acc && "*".repeat(5) + bank_acc.baac_acc_bank.substr(5)}
          </p>
        </div>
      </div>
      <div className="flex flex-col mt-10 w-1/2 mx-auto border border-gray-300 border-l-0 border-r-0 p-3">
        <button
          className="text-blue-500 hover:text-black text-lg"
          onClick={() => removeBankCard()}
        >
          remove
        </button>
      </div>
    </div>
  );
}
