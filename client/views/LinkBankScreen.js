import React, { useEffect, useState } from "react";
import bIcon from "../assets/images/B_icon.svg";
import { XIcon } from "@heroicons/react/outline";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { bankFindById } from "../actions/bankActions";
import { BANK_CLEAR_SEARCH } from "../constants/bankConstants";

export default function LinkBankScreen() {
  const [values, setValues] = useState({
    baac_bank_id: "",
    baac_acc_bank: "",
  });

  const bank = useSelector((state) => state.bank);
  const { bankId } = bank;
  const dispatch = useDispatch();

  useEffect(() => {
    if (values.baac_bank_id.length === 3) {
      dispatch(bankFindById(values.baac_bank_id));
    }
    if (values.baac_bank_id.length === 0) {
      dispatch({ type: BANK_CLEAR_SEARCH });
    }
  }, [values]);

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    // to do something
  };
  return (
    <div className="bg-gray-200">
      <div className="bg-white w-2/4 min-h-screen mx-auto relative flex flex-col">
        <Link to="/myaccount/money">
          <div
            className="w-8 text-gray-400 absolute right-5 mt-2"
            onClick={() => dispatch({ type: BANK_CLEAR_SEARCH })}
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
        <div className="mt-14 font-thin">
          <div className="flex -ml-20">
            <h1 className="text-3xl mx-auto">Link a bank account</h1>
          </div>
          <p className="mt-5 max-w-xs mx-auto text-left">
            The safety and security of your bank account is protected by Bayar.{" "}
            <span className="font-bold">
              You can only link a bank account in Indonesian rupiah.
            </span>
          </p>
        </div>
        <div className="w-1/2 mx-auto">
          <form onSubmit={onSubmit}>
            <div className="mt-5">
              <input
                type="text"
                id="baac_bank_id"
                name="baac_bank_id"
                className="block w-full p-2 border rounded border-gray-300 focus:outline-none focus:ring-1 focus:ring-black focus:border-transparent "
                placeholder="Bank code"
                onChange={handleChange("baac_bank_id")}
                required
              />
              {bankId && (
                <p className="font-thin text-sm mt-2 ml-1">
                  {bankId.bank_name}
                </p>
              )}
            </div>
            <div className="mt-5">
              <input
                type="password"
                id="baac_acc_bank"
                name="baac_acc_bank"
                className="block w-full p-2 border rounded border-gray-300 focus:outline-none focus:ring-1 focus:ring-black focus:border-transparent  "
                placeholder="Account Number"
                onChange={handleChange("baac_acc_bank")}
                required
              />
            </div>
            <div className="mt-10">
              <p className="text-xs font-thin">
                Be sure to double-check your account number. Banks may not flag
                errors until you send payment.
              </p>
            </div>
            <div className="mt-3">
              <button
                type="submit"
                className="py-3 bg-blue-500 text-white w-full rounded-2xl hover:bg-blue-600"
              >
                Link your Bank
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
