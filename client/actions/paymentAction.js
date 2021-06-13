import axios from "axios";
import {
  PAYMENT_FIND_ONE_FAIL,
  PAYMENT_FIND_ONE_REQUEST,
  PAYMENT_FIND_ONE_SUCCESS,
  PAYMENT_ORDER_WALLET_FAIL,
  PAYMENT_ORDER_WALLET_REQUEST,
  PAYMENT_ORDER_WALLET_SUCCESS,
  PAYMENT_TOPUP_BANK_FAIL,
  PAYMENT_TOPUP_BANK_REQUEST,
  PAYMENT_TOPUP_BANK_SUCCESS,
  PAYMENT_TRANSFER_BANK_FAIL,
  PAYMENT_TRANSFER_BANK_REQUEST,
  PAYMENT_TRANSFER_BANK_SUCCESS,
  PAYMENT_TRANSFER_WALLET_BANK_FAIL,
  PAYMENT_TRANSFER_WALLET_BANK_REQUEST,
  PAYMENT_TRANSFER_WALLET_BANK_SUCCESS,
  PAYMENT_TRANSFER_WALLET_FAIL,
  PAYMENT_TRANSFER_WALLET_REQUEST,
  PAYMENT_TRANSFER_WALLET_SUCCESS,
} from "../constants/paymentConstants";

export const topupFromBank = (topup) => async (dispatch) => {
  dispatch({ type: PAYMENT_TOPUP_BANK_REQUEST });
  try {
    const { data } = await axios.post("/api/payt/topup", topup);
    dispatch({ type: PAYMENT_TOPUP_BANK_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PAYMENT_TOPUP_BANK_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const orderFromWallet = (order) => async (dispatch) => {
  dispatch({ type: PAYMENT_ORDER_WALLET_REQUEST });
  try {
    const { data } = await axios.post("/api/payt/order", order);
    dispatch({ type: PAYMENT_ORDER_WALLET_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PAYMENT_ORDER_WALLET_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const findOnePaymentByUser = (idUser) => async (dispatch) => {
  dispatch({ type: PAYMENT_FIND_ONE_REQUEST });
  try {
    const { data } = await axios.get("/api/payt/user/" + idUser);
    if (data.length > 0) {
      dispatch({ type: PAYMENT_FIND_ONE_SUCCESS, payload: data });
    } else {
      dispatch({
        type: PAYMENT_FIND_ONE_FAIL,
        payload: "Data not found",
      });
    }
  } catch (error) {
    dispatch({
      type: PAYMENT_FIND_ONE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const transferWallet = (payment) => async (dispatch) => {
  dispatch({ type: PAYMENT_TRANSFER_WALLET_REQUEST });
  try {
    const { data } = await axios.post("/api/payt/transferWallet", payment);
    sessionStorage.removeItem("fund");
    sessionStorage.setItem("fund", JSON.stringify(data));
    dispatch({ type: PAYMENT_TRANSFER_WALLET_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PAYMENT_TRANSFER_WALLET_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const transferWalletBank = (payment) => async (dispatch) => {
  dispatch({ type: PAYMENT_TRANSFER_WALLET_BANK_REQUEST });
  try {
    const { data } = await axios.post("/api/payt/transferWalletBank", payment);
    sessionStorage.removeItem("fund");
    sessionStorage.setItem("fund", JSON.stringify(data));
    dispatch({ type: PAYMENT_TRANSFER_WALLET_BANK_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PAYMENT_TRANSFER_WALLET_BANK_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const transferBank = (payment) => async (dispatch) => {
  dispatch({ type: PAYMENT_TRANSFER_BANK_REQUEST });
  try {
    const { data } = await axios.post("/api/payt/transferBank", payment);
    sessionStorage.removeItem("fund");
    sessionStorage.setItem("fund", JSON.stringify(data));
    dispatch({ type: PAYMENT_TRANSFER_BANK_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PAYMENT_TRANSFER_BANK_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
