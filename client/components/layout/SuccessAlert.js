import React, { useEffect } from "react";
import { XIcon } from "@heroicons/react/outline";
import checkIcon from "../../assets/images/checked1.svg";
import { useHistory, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  BANK_CLEAR_SEARCH,
  BANK_LINK_CLEAR,
} from "../../constants/bankConstants";
import { PAYMENT_TOPUP_BANK_CLEAR } from "../../constants/paymentConstants";

export default function SuccessAlert({ match }) {
  const history = useHistory();
  const location = useLocation();
  const user = useSelector((state) => state.userFund);
  const { isSuccess: userSuccess } = user;
  const payment = useSelector((state) => state.payment);
  const { isSuccess: paymentSuccess } = payment;
  const dispatch = useDispatch();

  useEffect(() => {
    if (userSuccess) {
      dispatch({ type: BANK_LINK_CLEAR });
    }
    if (paymentSuccess) {
      dispatch({ type: PAYMENT_TOPUP_BANK_CLEAR });
      dispatch({ type: BANK_CLEAR_SEARCH });
    }
  }, []);

  return (
    <div className="bg-gray-200">
      <div className="bg-white w-2/4 min-h-screen mx-auto relative flex flex-col">
        <div
          className="w-8 text-gray-400 absolute right-5 mt-2 cursor-pointer"
          onClick={() =>
            history.push(new URLSearchParams(location.search).get("from"))
          }
        >
          <XIcon />
        </div>
        <div className="mx-auto mt-20">
          <img
            className="w-32 transform -rotate-6"
            src={checkIcon}
            alt="bayar icon"
          />
        </div>
        <div className="font-serif text-2xl mx-auto capitalize mt-10 text-center">
          <p>
            {match.params.action} {match.params.type}
          </p>
          <p>
            {location.search &&
              "*".repeat(5) +
                new URLSearchParams(location.search).get("id").substr(5)}
          </p>
          {match.params.action === "topup" && (
            <div className="mt-10 font-thin text-left font-mono">
              <p>
                Amount: Rp. {new URLSearchParams(location.search).get("debet")}
              </p>
              <p className="mt-2">
                Invoice: {new URLSearchParams(location.search).get("invoice")}
              </p>
            </div>
          )}
        </div>
        <button
          className="bg-blue-500 w-1/2 mt-20 mx-auto py-3 rounded-2xl text-white text-lg font-semibold"
          onClick={() =>
            history.push(new URLSearchParams(location.search).get("from"))
          }
        >
          Done
        </button>
      </div>
    </div>
  );
}
