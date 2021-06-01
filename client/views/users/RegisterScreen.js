import React, { useEffect, useState } from "react";
import Logo from "../../assets/images/B_icon.svg";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register_1 } from "../../actions/userActions";
import AlertInput from "../../components/layout/AlertInput";

export default function RegisterScreen() {
  const [values, setValues] = useState({
    user_name: null,
    user_email: null,
    user_password: null,
  });
  const [confirm, setConfirm] = useState("");
  const [isError, setIsError] = useState("");
  const history = useHistory();

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, register } = userRegister;

  useEffect(() => {
    setValues({ ...register });
  }, [register]);

  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();
    if (values.user_password === confirm) {
      dispatch(register_1(values));
      if (register) {
        history.push("/registerDetail");
      } else if (error) {
        setIsError(error);
      }
    } else {
      setIsError("Password dan Confirm password tidak sama");
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center font-serif">
      <div className="w-5/6 md:w-1/2 lg:w-1/3 mx-auto min-h-screen bg-white shadow p-10 rounded-sm">
        <div className="-mt-5">
          <img
            className=" w-20 transform -rotate-6 mx-auto"
            src={Logo}
            alt=""
          />
        </div>
        {isError && <AlertInput data={isError} />}
        <form className="p-0 mt-10" onSubmit={onSubmit}>
          <div>
            <div className="mt-5">
              <input
                type="text"
                id="user_name"
                name="user_name"
                className="block w-full p-2 border rounded border-gray-300 focus:outline-none focus:ring-1 focus:ring-black focus:border-transparent "
                placeholder="Name"
                value={values.user_name}
                onChange={handleChange("user_name")}
                required
              />
            </div>
            <div className="mt-5">
              <input
                type="text"
                id="user_email"
                name="user_email"
                className="block w-full p-2 border rounded border-gray-300 focus:outline-none focus:ring-1 focus:ring-black focus:border-transparent  "
                placeholder="Email"
                value={values.user_email}
                onChange={handleChange("user_email")}
                required
              />
            </div>
            <div className="mt-5">
              <input
                type="password"
                id="user_password"
                name="user_password"
                className="block w-full p-2 border rounded border-gray-300 focus:outline-none focus:ring-1 focus:ring-black focus:border-transparent  "
                placeholder="Password"
                value={values.user_password}
                onChange={handleChange("user_password")}
                required
              />
            </div>
            <div className="mt-5">
              <input
                type="password"
                id="confirm_user_password"
                name="confirm_user_password"
                className="block w-full p-2 border rounded border-gray-300 focus:outline-none focus:ring-1 focus:ring-black focus:border-transparent  "
                placeholder="Confirm Password"
                onChange={(e) => setConfirm(e.target.value)}
                required
              />
            </div>
            <div className="mt-10">
              <button
                className="py-3 bg-blue-500 text-white w-full rounded hover:bg-blue-600"
                type="submit"
              >
                Next
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
