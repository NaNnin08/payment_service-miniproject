import {
  PAYMENT_FIND_ONE_CLEAR,
  PAYMENT_FIND_ONE_FAIL,
  PAYMENT_FIND_ONE_REQUEST,
  PAYMENT_FIND_ONE_SUCCESS,
  PAYMENT_ORDER_WALLET_FAIL,
  PAYMENT_ORDER_WALLET_REQUEST,
  PAYMENT_ORDER_WALLET_SUCCESS,
  PAYMENT_TOPUP_BANK_CLEAR,
  PAYMENT_TOPUP_BANK_FAIL,
  PAYMENT_TOPUP_BANK_REQUEST,
  PAYMENT_TOPUP_BANK_SUCCESS,
  PAYMENT_TRANSFER_DATA,
  PAYMENT_TRANSFER_DATA_CLEAR,
} from "../constants/paymentConstants";

export const topupFromBankReducer = (state = {}, action) => {
  switch (action.type) {
    case PAYMENT_TOPUP_BANK_REQUEST:
      return { loading: true };
    case PAYMENT_TOPUP_BANK_SUCCESS:
      return { loading: false, topup: action.payload, isSuccess: true };
    case PAYMENT_TOPUP_BANK_FAIL:
      return { loading: false, error: action.payload };
    case PAYMENT_TOPUP_BANK_CLEAR:
      return { ...state, isSuccess: false, error: false };
    default:
      return state;
  }
};

export const orderWalletReducer = (state = {}, action) => {
  switch (action.type) {
    case PAYMENT_ORDER_WALLET_REQUEST:
      return { loading: true };
    case PAYMENT_ORDER_WALLET_SUCCESS:
      return { loading: false, order: action.payload, isSuccess: true };
    case PAYMENT_ORDER_WALLET_FAIL:
      return { loading: false, error: action.payload };
    case PAYMENT_TOPUP_BANK_CLEAR:
      return { ...state, isSuccess: false, error: false };
    default:
      return state;
  }
};

export const findPaymentByUserReducer = (state = {}, action) => {
  switch (action.type) {
    case PAYMENT_FIND_ONE_REQUEST:
      return { loading: true };
    case PAYMENT_FIND_ONE_SUCCESS:
      return { loading: false, historyPayment: action.payload };
    case PAYMENT_FIND_ONE_FAIL:
      return { loading: false, error: action.payload };
    case PAYMENT_FIND_ONE_CLEAR:
      return {};
    default:
      return state;
  }
};

export const paymentTransfer = (state = {}, action) => {
  switch (action.type) {
    case PAYMENT_TRANSFER_DATA:
      return { transfer_data: action.payload };
    case PAYMENT_TRANSFER_DATA_CLEAR:
      return {};
    default:
      return state;
  }
};
