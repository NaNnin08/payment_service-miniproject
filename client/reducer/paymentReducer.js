import {
  PAYMENT_FIND_ONE_CLEAR,
  PAYMENT_FIND_ONE_FAIL,
  PAYMENT_FIND_ONE_ID_FAIL,
  PAYMENT_FIND_ONE_ID_REQUEST,
  PAYMENT_FIND_ONE_ID_SUCCESS,
  PAYMENT_FIND_ONE_REQUEST,
  PAYMENT_FIND_ONE_SUCCESS,
  PAYMENT_MIDTRANS_TOKEN_FAIL,
  PAYMENT_MIDTRANS_TOKEN_REQUEST,
  PAYMENT_MIDTRANS_TOKEN_SUCCESS,
  PAYMENT_ORDER_WALLET_FAIL,
  PAYMENT_ORDER_WALLET_REQUEST,
  PAYMENT_ORDER_WALLET_SUCCESS,
  PAYMENT_PAGING_FAIL,
  PAYMENT_PAGING_REQUEST,
  PAYMENT_PAGING_SUCCESS,
  PAYMENT_REQUEST_WALLET_CLEAR,
  PAYMENT_REQUEST_WALLET_FAIL,
  PAYMENT_REQUEST_WALLET_REQUEST,
  PAYMENT_REQUEST_WALLET_SUCCESS,
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

export const findPagingPaymentByUserReducer = (state = {}, action) => {
  switch (action.type) {
    case PAYMENT_PAGING_REQUEST:
      return { loading: true };
    case PAYMENT_PAGING_SUCCESS:
      return { loading: false, pagingPayment: action.payload };
    case PAYMENT_PAGING_FAIL:
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

export const requestPaymentReducer = (state = {}, action) => {
  switch (action.type) {
    case PAYMENT_REQUEST_WALLET_REQUEST:
      return { loading: true };
    case PAYMENT_REQUEST_WALLET_SUCCESS:
      return { loading: false, message: action.payload, isSuccess: true };
    case PAYMENT_REQUEST_WALLET_FAIL:
      return { loading: false, error: action.payload };
    case PAYMENT_REQUEST_WALLET_CLEAR:
      return {};
    default:
      return state;
  }
};

export const findPaymentByIdReducer = (state = {}, action) => {
  switch (action.type) {
    case PAYMENT_FIND_ONE_ID_REQUEST:
      return { loading: true };
    case PAYMENT_FIND_ONE_ID_SUCCESS:
      return { loading: false, payment: action.payload };
    case PAYMENT_FIND_ONE_ID_FAIL:
      return { loading: false, error: action.payload };
    case PAYMENT_REQUEST_WALLET_CLEAR:
      return {};
    default:
      return state;
  }
};

export const requestTokenMidtrans = (state = {}, action) => {
  switch (action.type) {
    case PAYMENT_MIDTRANS_TOKEN_REQUEST:
      return { loading: true };
    case PAYMENT_MIDTRANS_TOKEN_SUCCESS:
      return { loading: false, data: action.payload, isSuccess: true };
    case PAYMENT_MIDTRANS_TOKEN_FAIL:
      return { loading: false, error: action.payload };
    case PAYMENT_REQUEST_WALLET_CLEAR:
      return {};
    default:
      return state;
  }
};
