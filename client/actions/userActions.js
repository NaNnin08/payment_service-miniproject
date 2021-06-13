import axios from "axios";
import { BANK_CLEAR_SEARCH } from "../constants/bankConstants";
import {
  PAYMENT_FIND_ONE_CLEAR,
  PAYMENT_TRANSFER_DATA_CLEAR,
} from "../constants/paymentConstants";
import {
  USER_ADD_ADDRESS_FAIL,
  USER_ADD_ADDRESS_REQUEST,
  USER_ADD_ADDRESS_SUCCESS,
  USER_DELETE_ADDRESS_FAIL,
  USER_DELETE_ADDRESS_REQUEST,
  USER_DELETE_ADDRESS_SUCCESS,
  USER_FIND_ONE_EMAIL_FAIL,
  USER_FIND_ONE_EMAIL_REQUEST,
  USER_FIND_ONE_EMAIL_SUCCESS,
  USER_FIND_ONE_FAIL,
  USER_FIND_ONE_REQUEST,
  USER_FIND_ONE_SUCCESS,
  USER_REGISTER_FAIL_1,
  USER_REGISTER_FAIL_2,
  USER_REGISTER_REQUEST_1,
  USER_REGISTER_REQUEST_2,
  USER_REGISTER_SUCCESS_1,
  USER_REGISTER_SUCCESS_2,
  USER_SIGNIN_FAIL,
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  USER_SIGNOUT,
  USER_UPDATE_FAIL,
  USER_UPDATE_PIN_FAIL,
  USER_UPDATE_PIN_REQUEST,
  USER_UPDATE_PIN_SUCCESS,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
} from "../constants/userConstants";

export const signin = (email, password) => async (dispatch) => {
  dispatch({ type: USER_SIGNIN_REQUEST, payload: { email, password } });
  const user = {
    user_email: email,
    user_password: password,
  };
  try {
    const { data } = await axios.post("/api/users/signin", user);
    dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
    sessionStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_SIGNIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const signout = () => (dispatch) => {
  sessionStorage.removeItem("userInfo");
  sessionStorage.removeItem("fund");
  dispatch({ type: USER_SIGNOUT });
  dispatch({ type: BANK_CLEAR_SEARCH });
  dispatch({ type: PAYMENT_FIND_ONE_CLEAR });
  dispatch({ type: PAYMENT_TRANSFER_DATA_CLEAR });
};

export const register_1 = (user) => async (dispatch) => {
  dispatch({ type: USER_REGISTER_REQUEST_1, payload: user });
  try {
    let isSame = false;
    const { data } = await axios.get("/api/users/");
    console.log(data);
    for (let x of data) {
      if (x.user_email === user.user_email) {
        dispatch({
          type: USER_REGISTER_FAIL_1,
          payload: "Email sudah terdaftar",
        });
        isSame = true;
        break;
      } else {
        isSame = false;
      }
    }
    if (!isSame) {
      dispatch({ type: USER_REGISTER_SUCCESS_1, payload: user });
    }
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL_1,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const register_2 = (user) => async (dispatch) => {
  dispatch({ type: USER_REGISTER_REQUEST_2, payload: user });
  try {
    const { data } = await axios.post("/api/users/signup", user);
    dispatch({ type: USER_REGISTER_SUCCESS_2, payload: data });
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL_2,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const findOneUser = (id) => async (dispatch) => {
  dispatch({ type: USER_FIND_ONE_REQUEST, payload: id });
  try {
    const { data } = await axios.get(`/api/users/${id}`);
    dispatch({ type: USER_FIND_ONE_SUCCESS, payload: data });
    sessionStorage.setItem("fund", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_FIND_ONE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateUser = (user, id) => async (dispatch) => {
  dispatch({ type: USER_UPDATE_REQUEST, payload: user });
  try {
    const { data } = await axios.put(`/api/users/${id}`, user);
    sessionStorage.removeItem("fund");
    sessionStorage.setItem("fund", JSON.stringify(data));
    dispatch({ type: USER_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: USER_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateUserPin = (pin, id) => async (dispatch) => {
  dispatch({ type: USER_UPDATE_PIN_REQUEST });
  try {
    await axios.put(`/api/paac/${pin.paac_account_number}`, pin);
    const { data } = await axios.get(`/api/users/${id}`);
    sessionStorage.removeItem("fund");
    sessionStorage.setItem("fund", JSON.stringify(data));
    dispatch({ type: USER_UPDATE_PIN_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: USER_UPDATE_PIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const addUserAddress = (address) => async (dispatch) => {
  dispatch({ type: USER_ADD_ADDRESS_REQUEST });
  try {
    await axios.post(`/api/address`, address);
    const { data } = await axios.get(`/api/users/${address.addr_user_id}`);
    sessionStorage.removeItem("fund");
    sessionStorage.setItem("fund", JSON.stringify(data));
    dispatch({ type: USER_ADD_ADDRESS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: USER_ADD_ADDRESS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteUserAddress = (id, userId) => async (dispatch) => {
  dispatch({ type: USER_DELETE_ADDRESS_REQUEST });
  try {
    await axios.delete(`/api/address/${id}`);
    const { data } = await axios.get(`/api/users/${userId}`);
    sessionStorage.removeItem("fund");
    sessionStorage.setItem("fund", JSON.stringify(data));
    dispatch({ type: USER_DELETE_ADDRESS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: USER_DELETE_ADDRESS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const findOneEmail = (id) => async (dispatch) => {
  dispatch({ type: USER_FIND_ONE_EMAIL_REQUEST });
  try {
    const { data } = await axios.get(`/api/users/email/${id}`);
    dispatch({ type: USER_FIND_ONE_EMAIL_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: USER_FIND_ONE_EMAIL_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
