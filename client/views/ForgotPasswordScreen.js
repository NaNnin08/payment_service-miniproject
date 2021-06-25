import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { findOneEmail, postForgotPasswordAction } from "../actions/userActions";
import Logo from "../assets/images/bayar-logo.svg";
import AlertInput from "../components/layout/AlertInput";
import LoadingScreen from "../components/layout/LoadingScreen";

export const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState("");
  const [isError, setIsError] = useState(false);

  const { error, findEmail } = useSelector((state) => state.emailUser);

  const { isSuccess, loading } = useSelector((state) => state.forgotPass);

  const dispatch = useDispatch();

  const history = useHistory();

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

  useEffect(() => {
    if (findEmail) {
      const data = {
        email: findEmail.user_email,
        token: findEmail.user_id,
      };

      dispatch(postForgotPasswordAction(data));
    }
  }, [dispatch, findEmail]);

  if (isSuccess) {
    history.push("/forgor_password_success");
  }

  const onSubmit = (e) => {
    e.preventDefault();
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
  return (
    <div className="bg-gray-100 min-h-screen flex items-center font-serif">
      {loading && <LoadingScreen />}
      <div className="w-5/6 md:w-1/2 lg:w-1/3 mx-auto bg-white shadow p-10 rounded-sm">
        <div className="-mt-5">
          <img className="w-1/2 mx-auto" src={Logo} alt="" />
        </div>
        <div className="text-center mt-7">
          <h1 className="text-2xl font-semibold">Forgot Password</h1>
          <p className="mt-2">
            No Problem! Enter your email below and we will send you an email
            with instruction to reset your password.
          </p>
        </div>
        {isError && <AlertInput data={isError} />}
        <form method="POST" action="#" className="p-0" onSubmit={onSubmit}>
          <div className="mt-5">
            <input
              type="text"
              id="user_email"
              name="user_email"
              className="block w-full p-2 border rounded border-gray-300 focus:outline-none focus:ring-1 focus:ring-black focus:border-transparent "
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mt-10">
            <button
              type="submit"
              className="py-3 bg-blue-500 text-white w-full rounded hover:bg-blue-600 focus:outline-none"
            >
              Send Reset Link
            </button>
            <h1 className="text-center mt-5">
              Back to{" "}
              <span
                className="text-blue-500 cursor-pointer hover:underline"
                onClick={() => history.push("/login")}
              >
                Login
              </span>
            </h1>
          </div>
        </form>
      </div>
    </div>
  );
};
