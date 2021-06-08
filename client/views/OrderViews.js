import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { orderFromWallet } from "../actions/paymentAction";
import bIcon from "../assets/images/B_icon.svg";
import { PinInputScreen } from "../components/layout/PinInputScreen";

export default function OrderViews() {
  const { fund } = useSelector((state) => state.userFund);
  const { payment_account } = fund;
  const orderWallet = useSelector((state) => state.orderWallet);
  const {
    isSuccess: orderSuccess,
    order: paymentNumber,
    error: errorPayment,
  } = orderWallet;

  const dispatch = useDispatch();
  const history = useHistory();

  const [order, setOrder] = useState("");
  const [confirm, setConfirm] = useState(false);
  const [payConfirm, setPayConfirm] = useState(false);
  useEffect(() => {
    setOrder(
      typeof window === "object"
        ? sessionStorage.getItem("bayarOrder")
          ? JSON.parse(sessionStorage.getItem("bayarOrder"))
          : null
        : null
    );
  }, []);

  useEffect(() => {
    if (orderSuccess) {
      history.push(
        `/order/wallet/success?orderNumber=${paymentNumber.payt_order_number}&debet=${paymentNumber.payt_credit}&invoice=${paymentNumber.payt_trx_number}`
      );
    }
    if (errorPayment) {
      history.push(`/order/wallet/fail?error=${errorPayment}`);
    }
  }, [orderSuccess, errorPayment]);

  const handlePay = () => {
    setConfirm(true);
  };

  if (payConfirm) {
    const isOrder = {
      payt_paac_account_number: payment_account.paac_account_number,
      payt_type: "order",
      payt_credit: order.amount,
      payt_order_number: order.orderNumber,
    };
    dispatch(orderFromWallet(isOrder));
    setPayConfirm(false);
  }

  return (
    <div className="bg-gray-200 relative">
      {confirm && <PinInputScreen data={setPayConfirm} />}
      <div className="bg-white w-full md:w-2/4 min-h-screen mx-auto relative flex flex-col">
        <div className="mx-auto mt-5">
          <img
            className="w-12 transform -rotate-6"
            src={bIcon}
            alt="bayar icon"
          />
        </div>
        <div className="flex flex-col mt-12">
          <h1 className="text-center font-bold text-2xl">Order Checkout</h1>
          <div className="ml-8">
            <p className="font-mono mt-16 ml-10 text-xl">
              Order Number: {order && order.orderNumber}
            </p>
            <p className="font-mono mt-3 ml-10 text-xl">
              Order Amount: Rp.{" "}
              {order &&
                parseFloat(order.amount).toLocaleString("ID", {
                  minimumFractionDigits: 2,
                })}
            </p>
          </div>
        </div>
        <button
          className="mt-20 bg-blue-500 w-1/2 mx-auto py-3 rounded-2xl shadow-xl text-white font-semibold text-xl"
          onClick={handlePay}
        >
          Pay
        </button>
      </div>
    </div>
  );
}
