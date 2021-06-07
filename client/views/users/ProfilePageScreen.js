import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addUserAddress,
  deleteUserAddress,
  updateUser,
  updateUserPin,
} from "../../actions/userActions";
import defaulProfile from "../../assets/images/defaultProfile.jpg";
import { format } from "date-fns";
import AlertInput from "../../components/layout/AlertInput";
import { SuccessModalAlert } from "../../components/layout/SuccessModalAlert";
import { PlusIcon, TrashIcon } from "@heroicons/react/outline";
import { Link } from "react-router-dom";

export default function ProfilePageScreen() {
  const userFund = useSelector((state) => state.userFund);
  const { fund } = userFund;
  const dispatch = useDispatch();

  const [userData, setUserData] = useState("");
  const [userPin, setUserPin] = useState("");
  const [addAddr, setAddAddr] = useState("");
  const [confirm, setConfirm] = useState({
    password: "",
    pin: "",
  });
  const [passChange, setPassChange] = useState(false);
  const [pinChange, setPinChange] = useState(false);
  const [isError, setIsError] = useState({
    password: false,
    pin: false,
  });
  const [change, setChange] = useState({
    profile: false,
    email: false,
    phone: false,
    addres: false,
  });

  useEffect(() => {
    if (fund && !userData) {
      setUserData({
        user_id: fund.user_id,
        user_name: fund.user_name,
        user_email: fund.user_email,
        user_birthdate: fund.user_birthdate,
        user_gender: fund.user_gender,
        user_desc: fund.user_desc,
        user_phone: fund.user_phone,
        user_id_card: fund.user_id_card,
      });
    }
  }, [dispatch, fund, userData]);

  if (isError.password || isError.pin) {
    setTimeout(() => {
      setIsError({
        pin: false,
        password: false,
      });
    }, 3000);
  }

  if (passChange) {
    setTimeout(() => {
      setPassChange(false);
    }, 3000);
  }

  if (pinChange) {
    setTimeout(() => {
      setPinChange(false);
    }, 3000);
  }

  const handleChange = (name) => (event) => {
    setUserData({ ...userData, [name]: event.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let user = new FormData();

    user.append("user_id", userData.user_id);
    user.append("user_name", userData.user_name);
    user.append("user_birthdate", userData.user_birthdate);
    user.append("user_gender", userData.user_gender);
    user.append("user_id_card", userData.user_id_card);
    user.append("user_email", userData.user_email);
    user.append("user_phone", userData.user_phone);

    userData.user_password &&
      user.append("user_password", userData.user_password);

    if (userData.user_password) {
      if (userData.user_password === confirm.password) {
        dispatch(updateUser(user, userData.user_id));
        setUserData({
          ...userData,
          user_password: "",
        });
        setConfirm({
          ...confirm,
          password: "",
        });
        setPassChange(true);
      } else {
        setIsError({
          ...isError,
          password: "password and confirm password not same",
        });
      }
    }
    if (!userData.user_password && !userPin) {
      dispatch(updateUser(user, userData.user_id));
      setChange({
        profile: false,
        email: false,
        phone: false,
        addres: false,
      });
    }
    if (userPin) {
      if (userPin.length === 6 && new RegExp("^[0-9]+$").test(userPin)) {
        if (userPin === confirm.pin) {
          const pinUser = {
            paac_account_number: fund.payment_account.paac_account_number,
            pacc_pin_number: userPin,
          };
          dispatch(updateUserPin(pinUser, userData.user_id));
          setUserPin("");
          setConfirm({ ...confirm, pin: "" });
          setPinChange(true);
        } else {
          setIsError({ ...isError, pin: "pin and confirm pin not same" });
        }
      } else {
        setIsError({
          ...isError,
          pin: "pin must contain number and length must 6",
        });
      }
    }
  };

  const addAddress = () => {
    const address = {
      addr_street: addAddr,
      addr_user_id: userData.user_id,
    };
    dispatch(addUserAddress(address));
    setAddAddr("");
    setChange({
      profile: false,
      email: false,
      phone: false,
      addres: false,
    });
  };

  const deleteAddr = (id) => {
    if (window.confirm("Are you sure delete address?")) {
      dispatch(deleteUserAddress(id, userData.user_id));
    }
  };
  return (
    <div
      className="flex md:flex-row flex-col md:w-5/6 w-full mx-auto font-sans
    "
    >
      <div className="md:w-1/2 w-full p-5 space-y-5">
        <div className="bg-white shadow-lg px-3 py-3 flex flex-row relative">
          <div className="ml-1">
            <h1 className="text-2xl">Profile</h1>
            <img
              className="rounded-full mt-2"
              style={{ width: "100px", height: "100px" }}
              src={
                fund && fund.user_avatar
                  ? require("../../../uploads/" + fund.user_avatar).default
                  : defaulProfile
              }
              alt="default profile"
            />
            <Link to="/myaccount/add/profile">
              <p className="font-semibold text-blue-500 mt-2 hover:underline">
                Update Photo
              </p>
            </Link>
          </div>
          <div className="ml-10 mt-5 space-y-2">
            <h1 className="text-2xl font-semibold">
              {change.profile ? (
                <div className="text-lg font-normal">
                  <span>Name: </span>
                  <input
                    type="text"
                    className="lg:ml-3 md:ml-2 ml-1 w-60 rounded-lg"
                    value={userData.user_name}
                    onChange={handleChange("user_name")}
                  />
                </div>
              ) : (
                fund && fund.user_name
              )}
            </h1>
            <h1 className="text-lg">
              Birtdate:
              {change.profile ? (
                <input
                  type="date"
                  className="ml-1 w-60 rounded-lg"
                  value={userData.user_birthdate}
                  onChange={handleChange("user_birthdate")}
                />
              ) : (
                <span className="ml-3">
                  {fund &&
                    format(new Date(fund.user_birthdate), "MMMM do, yyyy")}
                </span>
              )}
            </h1>
            <h1 className="text-lg capitalize">
              Gender:{" "}
              {change.profile ? (
                <select
                  value={userData.user_gender}
                  className="ml-1 w-60 rounded-lg"
                  onChange={handleChange("user_gender")}
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              ) : (
                <span className="ml-3">{fund && fund.user_gender}</span>
              )}
            </h1>
            <h1 className="text-lg capitalize">
              ID Card:{" "}
              {change.profile ? (
                <input
                  type="text"
                  className="ml-1 w-60 rounded-lg"
                  value={userData.user_id_card}
                  onChange={handleChange("user_id_card")}
                />
              ) : (
                <span className="ml-3">{fund && fund.user_id_card}</span>
              )}
            </h1>
            {change.profile ? (
              <div className="relative pb-7">
                <button
                  className="text-blue-500 absolute right-1 font-semibold hover:underline"
                  onClick={handleSubmit}
                >
                  Save
                </button>
                <button
                  className="text-blue-500 absolute right-12 font-semibold hover:underline"
                  onClick={() =>
                    setChange({
                      profile: false,
                      email: false,
                      phone: false,
                      addres: false,
                    })
                  }
                >
                  Cancle
                </button>
              </div>
            ) : (
              <button
                className="text-blue-500 font-semibold absolute right-5 md:bottom-4 bottom-1 hover:underline"
                onClick={() => {
                  setChange({
                    profile: true,
                    email: false,
                    phone: false,
                    addres: false,
                  });
                }}
              >
                Change data
              </button>
            )}
          </div>
        </div>
        <div className="bg-white shadow-lg px-3 py-2 relative space-y-3">
          <h1 className="text-2xl font-semibold">Change password</h1>
          <p className="ml-5 bg-yellow-200 w-60 px-1">
            Fill if you want change password
          </p>
          <div className="mx-5">
            {isError.password && <AlertInput data={isError.password} />}
            {passChange && <SuccessModalAlert data="Change password done" />}
            <form onSubmit={handleSubmit} className="space-y-2">
              <input
                type="password"
                className="w-full rounded-md"
                placeholder="New password"
                value={userData.user_password}
                onChange={handleChange("user_password")}
              />
              <input
                type="password"
                className="w-full rounded-md"
                placeholder="Confirm new password"
                value={confirm.password}
                onChange={(e) =>
                  setConfirm({ ...confirm, password: e.target.value })
                }
              />
              <button
                type="submit"
                className="bg-blue-500 px-3 py-2 text-white font-semibold rounded-2xl"
              >
                Save Change
              </button>
            </form>
          </div>
        </div>
        <div className="bg-white shadow-lg px-3 py-2 relative space-y-3">
          <h1 className="text-2xl font-semibold">Change Pin</h1>
          <p className="ml-5 bg-yellow-200 w-52 px-1">
            Fill if you want change pin
          </p>
          <div className="mx-5">
            {isError.pin && <AlertInput data={isError.pin} />}
            {pinChange && <SuccessModalAlert data="Change pin done" />}
            <form onSubmit={handleSubmit} className="space-y-2">
              <input
                type="password"
                maxLength="6"
                className="w-full rounded-md"
                placeholder="New pin"
                value={userPin}
                onChange={(e) => setUserPin(e.target.value)}
              />
              <input
                type="password"
                maxLength="6"
                className="w-full rounded-md"
                placeholder="Confirm new pin"
                value={confirm.pin}
                onChange={(e) =>
                  setConfirm({ ...confirm, pin: e.target.value })
                }
              />
              <button
                type="submit"
                className="bg-blue-500 px-3 py-2 text-white font-semibold rounded-2xl"
              >
                Save Change
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className="md:w-1/2 w-full p-5 space-y-5">
        <div className="bg-white shadow-lg px-3 py-2 relative space-y-3">
          <h1 className="text-2xl font-semibold">Addresses</h1>
          <button
            className="absolute right-5 w-7 top-0 text-blue-500"
            onClick={() => setChange({ ...change, addres: true })}
          >
            <PlusIcon />
          </button>
          {change.addres && (
            <div>
              <input
                type="text"
                className="-ml-1 w-full rounded-lg"
                value={addAddr}
                onChange={(e) => setAddAddr(e.target.value)}
              />
              <button
                className="text-blue-500 mt-2 right-1 font-semibold hover:underline"
                onClick={addAddress}
              >
                Save
              </button>
              <button
                className="text-blue-500 ml-2 mt-2 right-12 font-semibold hover:underline"
                onClick={() =>
                  setChange({
                    profile: false,
                    email: false,
                    phone: false,
                    addres: false,
                  })
                }
              >
                Cancle
              </button>
            </div>
          )}
          {fund &&
            fund.addresses.map((data) => (
              <div key={data.addr_id} className="flex flex-row relative">
                <p className="ml-2 pb-2 text-lg">{data.addr_street}</p>
                <button
                  className="w-5 absolute right-3"
                  onClick={() => deleteAddr(data.addr_id)}
                >
                  <TrashIcon />
                </button>
              </div>
            ))}
        </div>
        <div className="bg-white shadow-lg px-3 py-2 relative space-y-3">
          <h1 className="text-2xl font-semibold">Email Address</h1>
          <h1 className="text-xl ml-5 pb-3">
            {change.email ? (
              <div className="text-lg font-normal">
                <span>Email: </span>
                <input
                  type="text"
                  className="ml-3 w-4/5 rounded-lg"
                  value={userData.user_email}
                  onChange={handleChange("user_email")}
                />
              </div>
            ) : (
              fund && fund.user_email
            )}
          </h1>
          {change.email ? (
            <div className="relative pb-7">
              <button
                className="text-blue-500 absolute right-1 font-semibold hover:underline"
                onClick={handleSubmit}
              >
                Save
              </button>
              <button
                className="text-blue-500 absolute right-12 font-semibold hover:underline"
                onClick={() =>
                  setChange({
                    profile: false,
                    email: false,
                    phone: false,
                    addres: false,
                  })
                }
              >
                Cancle
              </button>
            </div>
          ) : (
            <button
              className="text-blue-500 font-semibold absolute right-5 bottom-4 hover:underline"
              onClick={() => {
                setChange({
                  profile: false,
                  email: true,
                  phone: false,
                  addres: false,
                });
              }}
            >
              Change data
            </button>
          )}
        </div>
        <div className="bg-white shadow-lg px-3 py-2 relative space-y-3">
          <h1 className="text-2xl font-semibold">Phone Numbers</h1>
          <h1 className="text-xl ml-5 pb-3">
            {change.phone ? (
              <div className="text-lg font-normal">
                <span>Phone: </span>
                <input
                  type="text"
                  className="ml-3 w-4/5 rounded-lg"
                  value={userData.user_phone}
                  onChange={handleChange("user_phone")}
                />
              </div>
            ) : (
              fund && fund.user_phone
            )}
          </h1>
          {change.phone ? (
            <div className="relative pb-7">
              <button
                className="text-blue-500 absolute right-1 font-semibold hover:underline"
                onClick={handleSubmit}
              >
                Save
              </button>
              <button
                className="text-blue-500 absolute right-12 font-semibold hover:underline"
                onClick={() =>
                  setChange({
                    profile: false,
                    email: false,
                    phone: false,
                    addres: false,
                  })
                }
              >
                Cancle
              </button>
            </div>
          ) : (
            <button
              className="text-blue-500 font-semibold absolute right-5 bottom-4 hover:underline"
              onClick={() => {
                setChange({
                  profile: false,
                  email: false,
                  phone: true,
                  addres: false,
                });
              }}
            >
              Change data
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
