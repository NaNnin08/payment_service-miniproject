import React, { useEffect, useState } from "react";
import bIcon from "../assets/images/B_icon.svg";

export default function OrderViews() {
  const [order, setOrder] = useState("");
  useEffect(() => {
    setOrder(
      typeof window === "object"
        ? sessionStorage.getItem("bayarOrder")
          ? JSON.parse(sessionStorage.getItem("bayarOrder"))
          : null
        : null
    );
  }, []);
  const handlePay = () => {
    // do something
  };
  return (
    <div className="bg-gray-200">
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
              Order Number: {order.orderNumber}
            </p>
            <p className="font-mono mt-3 ml-10 text-xl">
              Order Amount: Rp.{" "}
              {parseFloat(order.amount).toLocaleString("ID", {
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
