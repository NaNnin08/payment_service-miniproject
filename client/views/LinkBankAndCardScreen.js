import React from "react";
import { Link } from "react-router-dom";
import bIcon from "../assets/images/B_icon.svg";
import { XIcon } from "@heroicons/react/outline";
import addBank from "../assets/images/addBank.svg";
import addCard from "../assets/images/credit-cards-payment 1.svg";
import { motion } from "framer-motion";

export default function LinkBankAndCardScreen() {
  return (
    <div className="bg-gray-200">
      <motion.div
        exit={{ y: "700px" }}
        transition={{ duration: 0.8, ease: [0.12, 0, 0.39, 0] }}
        onAnimationStart={() => document.body.classList.add("overflow-hidden")}
        onAnimationComplete={() =>
          document.body.classList.remove("overflow-hidden")
        }
        className="bg-white w-full md:w-2/4 min-h-screen mx-auto relative flex flex-col"
      >
        <Link to="/myaccount/money">
          <div className="w-8 text-gray-400 absolute right-5 mt-2">
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
        <div className="flex flex-col mt-20">
          <div className="text-blue-500 font-semibold pb-3 hover:text-blue-700 mx-auto border-b-2 border-dotted w-1/2">
            <Link to="/myaccount/money/banks/new" className="flex flex-row">
              <img className="h-7v ml-3" src={addBank} alt="link bank" />
              <div className="-mt-3 ml-2">
                <p className="mt-3">Link a bank</p>
                <p className="text-sm text-black font-normal">
                  Withdraw funds you receive to your bank account
                </p>
              </div>
            </Link>
          </div>
          <div className="text-blue-500 font-semibold mt-5 pb-3 hover:text-blue-700 mx-auto border-b-2 border-dotted w-1/2">
            <Link to="/myaccount/money/card/new" className="flex flex-row">
              <img className="h-7v" src={addCard} alt="link card" />
              <div className="-mt-3 ml-5">
                <p className="mt-3">Link a card</p>
                <p className="text-sm text-black font-normal">
                  Keep your card info secure when shopping
                </p>
              </div>
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
