import React, { useEffect, useState } from "react";
import { style } from "../../assets/styles/style";
import Logo from "../../assets/images/bayar-logo.svg";
import AlertInput from "../../components/layout/AlertInput";
import { useDispatch, useSelector } from "react-redux";
import { signin } from "../../actions/userActions";
import { useHistory } from "react-router-dom";

export default function LoginScreen() {
  const [values, setValues] = useState({
    user_email: "",
    user_password: "",
    error: false,
  });

  const history = useHistory();

  const userSignin = useSelector((state) => state.userSignin);
  const { loading, userInfo, error } = userSignin;

  const dispatch = useDispatch();

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (values.user_email && values.user_password) {
      dispatch(signin(values.user_email, values.user_password));
    }
  };

  useEffect(() => {
    if (userInfo) {
      history.push("/myaccount/summary");
    }
  }, [history, userInfo]);
  return (
    <div className="bg-gray-100 min-h-screen flex items-center font-serif">
      <div className="w-5/6 md:w-1/2 lg:w-1/3 mx-auto bg-white shadow p-10 rounded-sm">
        <div className="-mt-5">
          <img className="w-1/2 mx-auto" src={Logo} alt="" />
        </div>
        {error && <AlertInput data={"Email dan Password tidak sesuai"} />}
        <form method="POST" action="#" className="p-0" onSubmit={onSubmit}>
          <div className="mt-5">
            <input
              type="text"
              id="user_email"
              name="user_email"
              className="block w-full p-2 border rounded border-gray-300 focus:outline-none focus:ring-1 focus:ring-black focus:border-transparent "
              placeholder="Email"
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
              onChange={handleChange("user_password")}
              required
            />
          </div>
          <div className="mt-10">
            <button
              type="submit"
              className="py-3 bg-blue-500 text-white w-full rounded hover:bg-blue-600"
            >
              Log In
            </button>
          </div>
        </form>
        <div className="flex flex-row mt-7 xl:ml-3">
          <div style={style.hairline} className=""></div>
          <p
            style={style.loginButtonBelowText1}
            className="-mt-3 m-1 text-base"
          >
            or
          </p>
          <div style={style.hairline} className=""></div>
        </div>
        <div className="mt-5">
          <button
            className="py-3 bg-gray-300 text-gray-800 w-full rounded hover:bg-gray-400"
            onClick={() => history.push("/register")}
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}
