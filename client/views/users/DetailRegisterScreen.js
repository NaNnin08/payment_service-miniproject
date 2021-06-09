import React, { useEffect, useState } from "react";
import Logo from "../../assets/images/B_icon.svg";
import { ArrowLeftIcon } from "@heroicons/react/solid";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register_2 } from "../../actions/userActions";
import { Helmet } from "react-helmet";

export default function DetailRegisterScreen() {
  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, register, isSuccess } = userRegister;

  const [values, setValues] = useState({
    user_birthdate: null,
    user_gender: null,
    user_phone: null,
    user_id_card: null,
  });
  const history = useHistory();

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  useEffect(() => {
    setValues({ ...values, ...register });
  }, []);

  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();
    const user = { ...values, ...register };
    dispatch(register_2(user));
  };

  if (isSuccess) {
    history.push("/login");
  }

  return (
    <div className="w-5/6 md:w-1/2 lg:w-1/3 mx-auto min-h-screen bg-white shadow p-10 rounded-sm font-serif">
      <Helmet>
        <title>Register</title>
      </Helmet>
      <Link to="/register">
        <div className="w-10 -mt-5 -ml-5 text-gray-400 cursor-pointer">
          <ArrowLeftIcon />
        </div>
      </Link>
      <div className="-mt-5">
        <img className=" w-20 transform -rotate-6 mx-auto" src={Logo} alt="" />
      </div>
      <form className="p-0 mt-10" onSubmit={onSubmit}>
        <div>
          <div className="mt-5">
            <input
              type="text"
              id="user_id_card"
              name="user_id_card"
              className="block w-full p-2 border rounded border-gray-300 focus:outline-none focus:ring-1 focus:ring-black focus:border-transparent  "
              placeholder="No. ID Card"
              onChange={handleChange("user_id_card")}
              required
            />
          </div>
          <div className="mt-5">
            <input
              type="text"
              onFocus={(e) => {
                e.currentTarget.type = "date";
                e.currentTarget.focus();
              }}
              onBlur={(e) => {
                e.currentTarget.type = "text";
                e.currentTarget.blur();
              }}
              id="user_birthdate"
              name="user_birthdate"
              className="block w-full p-2 border rounded border-gray-300 focus:outline-none focus:ring-1 focus:ring-black focus:border-transparent "
              placeholder="Birtdate"
              onChange={handleChange("user_birthdate")}
              required
            />
          </div>
          <div className="mt-5">
            <select
              className="block w-full p-2 border rounded border-gray-300 focus:outline-none focus:ring-1 focus:ring-black focus:border-transparent "
              id="user_gender"
              name="user_gender"
              onChange={handleChange("user_gender")}
            >
              <option value="" disabled selected hidden>
                Select User Gender
              </option>
              <option value="male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          <div className="mt-5">
            <input
              type="text"
              id="user_phone"
              name="user_phone"
              className="block w-full p-2 border rounded border-gray-300 focus:outline-none focus:ring-1 focus:ring-black focus:border-transparent  "
              placeholder="Phone"
              onChange={handleChange("user_phone")}
              required
            />
          </div>
          <div className="mt-10">
            <button
              className="py-3 bg-blue-500 text-white w-full rounded hover:bg-blue-600"
              type="submit"
            >
              Sign Up
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
