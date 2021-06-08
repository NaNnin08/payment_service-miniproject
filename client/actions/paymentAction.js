import axios from "axios";
import {
  PAYMENT_ORDER_WALLET_FAIL,
  PAYMENT_ORDER_WALLET_REQUEST,
  PAYMENT_ORDER_WALLET_SUCCESS,
  PAYMENT_TOPUP_BANK_FAIL,
  PAYMENT_TOPUP_BANK_REQUEST,
  PAYMENT_TOPUP_BANK_SUCCESS,
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
    localStorage.setItem("orderInvoice", JSON.stringify(data));
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
