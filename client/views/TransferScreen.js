import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { findOneEmail } from "../actions/userActions";
import AlertInput from "../components/layout/AlertInput";

export const TransferScreen = () => {
  const [email, setEmail] = useState("");
  const [isError, setIsError] = useState(false);

  const history = useHistory();

  const { findEmail, error } = useSelector((state) => state.emailUser);
  const { fund } = useSelector((state) => state.userFund);
  const { user_email } = fund;

  const dispatch = useDispatch();

  const nextHandler = () => {
    if (email) {
      if (
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
          email
        )
      ) {
        if (email !== user_email) {
          dispatch(findOneEmail(email));
        } else {
          setIsError("Email must not same with email login");
        }
      } else {
        setIsError("Format email invalid");
      }
    }
  };

  if (findEmail) {
    history.push("/myaccount/transfer/input");
  }

  useEffect(() => {
    if (error) {
      setIsError(error);
    }
  }, [error]);

  if (isError) {
    setTimeout(() => {
      setIsError(false);
    }, 3000);
  }
  return (
    <div className="bg-gray-100 relative">
      <div className="w-1/2 p-10 bg-white mx-auto mt-10 flex flex-col">
        <h1 className="pt-5 pl-3 text-2xl font-semibold text-gray-500">
          Send payment to
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
          onBlur={(e) => setEmail(e.target.value)}
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
