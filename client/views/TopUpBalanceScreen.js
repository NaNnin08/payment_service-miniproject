import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import bIcon from "../assets/images/B_icon.svg";
import { XIcon } from "@heroicons/react/outline";
import { useDispatch, useSelector } from "react-redux";
import { findOnePaymentByUser, topupFromBank } from "../actions/paymentAction";
import { findOneUser } from "../actions/userActions";
import { PAYMENT_TOPUP_BANK_CLEAR } from "../constants/paymentConstants";
import AlertInput from "../components/layout/AlertInput";
import { bankFindById } from "../actions/bankActions";
import { BANK_CLEAR_SEARCH } from "../constants/bankConstants";

export default function TopUpBalanceScreen() {
  const history = useHistory();

  const user = useSelector((state) => state.userFund);
  const { fund } = user;
  const bank = useSelector((state) => state.bank);
  const { bankId } = bank;
  const payment = useSelector((state) => state.payment);
  const { topup, isSuccess, error } = payment;
  const dispatch = useDispatch();

  const [values, setValues] = useState({
    payt_paac_account_number: undefined,
    payt_bacc_acc_bank: undefined,
    payt_type: "topup",
    payt_dabet: undefined,
  });

  useEffect(() => {
    if (!bankId) {
      dispatch(bankFindById(""));
    }
  }, []);

  useEffect(() => {
    if (fund && !values.payt_paac_account_number) {
      setValues({
        ...values,
        payt_paac_account_number: fund.payment_account.paac_account_number,
      });
    }
  }, [values]);

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  useEffect(() => {
    if (isSuccess) {
      dispatch(findOneUser(fund.user_id));
      dispatch(findOnePaymentByUser(fund.payment_account.paac_account_number));
      history.push(
        `/topup/debit/success?id=${values.payt_bacc_acc_bank}&debet=${values.payt_dabet}&invoice=${topup.payt_trx_number}&from=/myaccount/summary`
      );
    }
  }, [dispatch, isSuccess]);

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(topupFromBank(values));
  };

  const clearSearch = () => {
    dispatch({ type: PAYMENT_TOPUP_BANK_CLEAR });
    dispatch({ type: BANK_CLEAR_SEARCH });
  };
  return (
    <div className="bg-gray-200">
      <div className="bg-white w-full md:w-2/4 min-h-screen mx-auto relative flex flex-col">
        <Link to="/myaccount/summary">
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
        <div className="lg:ml-44 ml-32 mt-10">
          <h1 className="text-2xl">Add Balance</h1>
          <p className="mt-5">Add balance from your bank</p>
        </div>
        <div className="w-2/3 mx-auto">
          {error && <AlertInput data={error} />}
          <form onSubmit={onSubmit}>
            <div className="mt-5">
              <select
                className="block w-full p-2 border rounded border-gray-300 focus:outline-none focus:ring-1 focus:ring-black focus:border-transparent "
                id="payt_bacc_acc_bank"
                name="payt_bacc_acc_bank"
                onChange={handleChange("payt_bacc_acc_bank")}
              >
                <option value="Select Account Bank" disabled selected hidden>
                  Select Account Bank
                </option>
                {fund &&
                  fund.bank_accounts
                    .filter((x) => x.baac_type === "debit")
                    .map((data) => (
                      <option
                        value={data.baac_acc_bank}
                        key={data.baac_acc_bank}
                      >
                        {data.baac_acc_bank}
                        {"-"}
                        {bankId &&
                          bankId.find((y) => y.bank_id === data.baac_bank_id)
                            .bank_name}
                      </option>
                    ))}
              </select>
            </div>
            <div className="mt-5">
              <input
                type="text"
                id="payt_dabet"
                name="payt_dabet"
                className="block w-full p-2 border rounded border-gray-300 focus:outline-none focus:ring-1 focus:ring-black focus:border-transparent  "
                placeholder="Amount"
                onChange={handleChange("payt_dabet")}
                required
              />
            </div>
            <div className="mt-3 font-thin text-sm">
              <p>To your balance</p>
              <p className="mt-5">No fees when adding balance from your bank</p>
              <p className="mt-5">
                Remember, you dont't need a balance in your account to send or
                spend when you have a linked bank or card
              </p>
            </div>
            <div className="mt-3">
              <button
                type="submit"
                className="py-3 bg-blue-500 text-white w-full rounded-2xl hover:bg-blue-600"
              >
                Add Balance
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
