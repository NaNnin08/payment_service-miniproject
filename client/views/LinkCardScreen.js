import React, { useEffect, useState } from "react";
import bIcon from "../assets/images/B_icon.svg";
import { XIcon } from "@heroicons/react/outline";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { bankAccFindById, bankLink } from "../actions/bankActions";
import { BANK_CLEAR_SEARCH } from "../constants/bankConstants";
import cardIcon from "../assets/images/card.svg";
import checkIcon from "../assets/images/checked1.svg";
import cardSecurityIcon from "../assets/images/card_security.svg";
import AlertBox from "../components/layout/AlertInput";
import Cleave from "cleave.js/react";
import { motion } from "framer-motion";

export default function LinkCardScreen() {
  const [values, setValues] = useState({
    baac_acc_bank: "",
    bacc_pin_number: "",
    baac_end_date: "",
    err: false,
  });
  const [validation, setValidation] = useState(false);
  const history = useHistory();

  const user = useSelector((state) => state.userFund);
  const { fund, isSuccess } = user;
  const bankACC = useSelector((state) => state.bankAcc);
  const { acc } = bankACC;
  const dispatch = useDispatch();

  useEffect(() => {
    if (values.baac_acc_bank.length > 5) {
      dispatch(bankAccFindById(values.baac_acc_bank));
    }
    if (values.baac_acc_bank.length === 0) {
      dispatch({ type: BANK_CLEAR_SEARCH });
    }
    if (acc) {
      if (
        values.baac_acc_bank === acc.baac_acc_bank &&
        values.baac_end_date === acc.baac_end_date &&
        values.bacc_pin_number === acc.bacc_pin_number
      ) {
        setValidation(true);
      }
    }
    if (values.baac_end_date.length === 5) {
      const arr = values.baac_end_date.split("/");
      const date = `20${arr[1]}-${arr[0]}-01`;
      setValues({ ...values, baac_end_date: date });
    }
  }, [values]);

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  if (isSuccess) {
    history.push(
      `/add/card/success?id=${values.baac_acc_bank}&from=/myaccount/money`
    );
  }

  const onSubmit = (e) => {
    e.preventDefault();
    const update = {
      baac_acc_bank: values.baac_acc_bank,
      baac_user_id: fund.user_id,
    };
    if (validation) {
      dispatch(bankLink(update));
    } else {
      setValues({ ...values, err: true });
    }
  };

  const clearSearch = () => {
    dispatch({ type: BANK_CLEAR_SEARCH });
  };
  return (
    <motion.div className="bg-gray-200">
      <motion.div
        initial={{ y: "700px" }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.12, 0, 0.39, 0] }}
        onAnimationStart={() => document.body.classList.add("overflow-hidden")}
        onAnimationComplete={() =>
          document.body.classList.remove("overflow-hidden")
        }
        exit={{ y: "700px" }}
        className="bg-white w-full md:w-2/4 min-h-screen mx-auto relative flex flex-col"
      >
        <Link to="/myaccount/money">
          <div
            className="w-8 text-gray-400 absolute right-5 mt-2"
            onClick={clearSearch}
          >
            <XIcon />
          </div>
        </Link>
        <div className="mx-auto mt-5">
          <img
            className="w-12 transform -rotate-6"
            src={bIcon}
            alt="bayar icon"
          />
        </div>
        <div className="mt-10 font-thin">
          <div className="flex">
            <h1 className="text-3xl mx-auto">Link a card</h1>
          </div>
        </div>
        <div className="mx-auto mt-10">
          <img
            className="w-24 transform -rotate-6"
            src={cardIcon}
            alt="card icon"
          />
        </div>
        <div className="w-1/2 mx-auto mt-5 relative">
          <form onSubmit={onSubmit}>
            {values.err && <AlertBox data="data tidak sesuai" />}
            <div className="mt-5">
              <input
                type="text"
                id="baac_acc_bank"
                name="baac_acc_bank"
                className="block w-full p-2 border rounded border-gray-300 focus:outline-none focus:ring-1 focus:ring-black focus:border-transparent  "
                placeholder="Credit card number"
                onChange={handleChange("baac_acc_bank")}
                required
              />
            </div>
            {acc &&
              (acc.baac_type === "card" ? (
                <div className="absolute right-0 -mr-6 -mt-7">
                  <img className="w-5" src={checkIcon} alt="true" />
                </div>
              ) : (
                <AlertBox data="account number aren't credit card" />
              ))}
            <div className="mt-5">
              <Cleave
                className="block w-full p-2 border rounded border-gray-300 focus:outline-none focus:ring-1 focus:ring-black focus:border-transparent"
                placeholder="Expiration date"
                onChange={handleChange("baac_end_date")}
                options={{ date: true, datePattern: ["m", "y"] }}
              />
            </div>
            <div className="mt-5 flex flex-row">
              <input
                type="password"
                id="bacc_pin_number"
                name="bacc_pin_number"
                className="block p-2 border rounded border-gray-300 focus:outline-none focus:ring-1 focus:ring-black focus:border-transparent w-5/6"
                placeholder="Security code"
                maxLength="3"
                onChange={handleChange("bacc_pin_number")}
                required
              />
              <img
                className="w-1/6 ml-3"
                src={cardSecurityIcon}
                alt="card icon"
              />
            </div>
            <div className="mt-10">
              <button
                type="submit"
                className="py-3 bg-blue-500 text-white w-full rounded-2xl hover:bg-blue-600"
              >
                Link card
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </motion.div>
  );
}
