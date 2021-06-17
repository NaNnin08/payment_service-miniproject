import React, { useRef, useState } from "react";
import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";
import AlertInput from "../components/layout/AlertInput";
import { HeaderSendAndRequest } from "../components/layout/HeaderSendAndRequest";
import { ModalRequest } from "./ModalRequest";

export const RequestScreen = () => {
  const [email, setEmail] = useState("");
  const [isError, setIsError] = useState(false);
  const [requestModal, setRequestModal] = useState(false);

  const cancelButtonRef = useRef();

  const { fund } = useSelector((state) => state.userFund);
  const { user_email } = fund;

  const nextHandler = () => {
    if (email) {
      if (
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
          email
        )
      ) {
        if (email !== user_email) {
          setRequestModal(true);
        } else {
          setIsError("Email must not same with email login");
        }
      } else {
        setIsError("Format email invalid");
      }
    }
  };

  if (isError) {
    setTimeout(() => {
      setIsError(false);
    }, 3000);
  }
  return (
    <div className="bg-gray-100 relative">
      <Helmet>
        <title>Bayar: Request Money</title>
      </Helmet>
      <HeaderSendAndRequest />
      <ModalRequest
        cancelButtonRef={cancelButtonRef}
        pinModal={requestModal}
        setPinModal={setRequestModal}
        email={email}
      />
      <div className="md:w-1/2 w-full p-10 bg-white mx-auto mt-10 flex flex-col">
        <h1 className="pt-5 pl-3 text-2xl font-semibold text-gray-500">
          Request payment to
        </h1>
        {isError && (
          <div className="mx-12">
            <AlertInput data={isError} />
          </div>
        )}
        <input
          type="text"
          placeholder="Email address"
          className="mt-5 mx-12 rounded-md"
          onChange={(e) => setEmail(e.target.value)}
          onKeyDown={(e) => {
            if (e.code === "Enter") {
              e.preventDefault();
              nextHandler();
            }
          }}
        />
        <button
          className="my-5 ml-10 self-start bg-blue-500 text-white text-lg py-2 rounded-3xl px-4"
          onClick={nextHandler}
        >
          Next
        </button>
      </div>
    </div>
  );
};
