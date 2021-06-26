import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { updateUser } from "../actions/userActions";
import Logo from "../assets/images/bayar-logo.svg";
import checkIcon from "../assets/images/checked1.svg";
import AlertInput from "../components/layout/AlertInput";
import LoadingScreen from "../components/layout/LoadingScreen";

export const ResetPasswordScreen = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [successSend, setSuccessSend] = useState(false);

  const { isSuccess, loading, error } = useSelector((state) => state.userFund);

  const dispatch = useDispatch();

  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    if (error) {
      setIsError(error);
    }
    if (loading) {
      setIsLoading(true);
    }
  }, [error, loading]);

  if (isError) {
    setTimeout(() => {
      setIsError(false);
    }, 3000);
  }

  useEffect(() => {
    if (isSuccess) {
      setSuccessSend(true);
      setIsLoading(false);
    }
  }, [isSuccess]);

  const onSubmit = (e) => {
    e.preventDefault();
    if (newPassword === confirmNewPassword) {
      let user = new FormData();
      user.append("user_password", newPassword);

      const user_id = new URLSearchParams(location.search).get("token");

      dispatch(updateUser(user, user_id));
    } else {
      setIsError("password and confirm password not same");
    }
  };
  return (
    <div className="bg-gray-100 min-h-screen flex items-center font-serif">
      {isLoading && <LoadingScreen />}
      <div className="w-5/6 md:w-1/2 lg:w-1/3 mx-auto bg-white shadow p-10 rounded-sm">
        <div className="-mt-5">
          <img className="w-1/2 mx-auto" src={Logo} alt="" />
        </div>
        {successSend ? (
          <div>
            <div className="text-center mt-7">
              <h1 className="text-2xl font-semibold">Password Reset Success</h1>
              <img
                className="w-28 mt-5 mx-auto transform -rotate-6"
                src={checkIcon}
                alt="bayar icon"
              />
              <p className="my-5 max-w-sm mx-auto">
                Awesome. You have successfully reset the password for your
                account
              </p>
            </div>
            <button
              className="py-3 bg-blue-500 text-white w-full rounded hover:bg-blue-600 focus:outline-none"
              onClick={() => history.push("/login")}
            >
              Log In
            </button>
          </div>
        ) : (
          <div>
            <div className="text-center mt-7">
              <h1 className="text-2xl font-semibold">Enter New Password</h1>
              <p className="mt-2">
                Looks like you are trying to reset the password for the account.
                Please enter your new password twice. So we can verify you typed
                it correclty.
              </p>
            </div>
            {isError && <AlertInput data={isError} />}
            <form method="POST" action="#" className="p-0" onSubmit={onSubmit}>
              <div className="mt-5 space-y-2">
                <input
                  type="password"
                  className="w-full rounded-md"
                  placeholder="New password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <input
                  type="password"
                  className="w-full rounded-md"
                  placeholder="Confirm new password"
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                />
              </div>
              <div className="mt-5">
                <button
                  type="submit"
                  className="py-3 bg-blue-500 text-white w-full rounded hover:bg-blue-600 focus:outline-none"
                >
                  Change password
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
