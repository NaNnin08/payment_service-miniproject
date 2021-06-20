import {
  BANK_LINK_CLEAR,
  BANK_LINK_FAIL,
  BANK_LINK_REQUEST,
  BANK_LINK_SUCCESS,
  BANK_REMOVE_FAIL,
  BANK_REMOVE_REQUEST,
  BANK_REMOVE_SUCCESS,
} from "../constants/bankConstants";
import {
  PAYMENT_FIND_ONE_CLEAR,
  PAYMENT_TRANSFER_BANK_FAIL,
  PAYMENT_TRANSFER_BANK_REQUEST,
  PAYMENT_TRANSFER_BANK_SUCCESS,
  PAYMENT_TRANSFER_WALLET_BANK_FAIL,
  PAYMENT_TRANSFER_WALLET_BANK_REQUEST,
  PAYMENT_TRANSFER_WALLET_BANK_SUCCESS,
  PAYMENT_TRANSFER_WALLET_CLEAR,
  PAYMENT_TRANSFER_WALLET_FAIL,
  PAYMENT_TRANSFER_WALLET_REQUEST,
  PAYMENT_TRANSFER_WALLET_SUCCESS,
} from "../constants/paymentConstants";
import {
  USER_ADD_ADDRESS_FAIL,
  USER_ADD_ADDRESS_REQUEST,
  USER_ADD_ADDRESS_SUCCESS,
  USER_CLOSE_ACCOUNT_FAIL,
  USER_CLOSE_ACCOUNT_REQUEST,
  USER_CLOSE_ACCOUNT_SUCCESS,
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

export const userSigninReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_SIGNIN_REQUEST:
      return { loading: true };
    case USER_SIGNIN_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_SIGNIN_FAIL:
      return { loading: false, error: action.payload };
    case USER_SIGNOUT:
      return {};
    default:
      return state;
  }
};

export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST_1:
      return { loading: true };
    case USER_REGISTER_SUCCESS_1:
      return { loading: false, register: action.payload };
    case USER_REGISTER_FAIL_1:
      return { loading: false, error: action.payload };
    case USER_REGISTER_REQUEST_2:
      return { ...state, loading: true };
    case USER_REGISTER_SUCCESS_2:
      return { loading: false, isSuccess: true };
    case USER_REGISTER_FAIL_2:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const userFindOneReduccer = (state = {}, action) => {
  switch (action.type) {
    case USER_FIND_ONE_REQUEST:
      return { ...state, loading: true };
    case USER_FIND_ONE_SUCCESS:
      return { ...state, loading: false, fund: action.payload };
    case USER_FIND_ONE_FAIL:
      return { ...state, loading: false, error: action.payload };
    case USER_SIGNOUT:
      return {};
    case BANK_REMOVE_REQUEST:
      return { loading: true };
    case BANK_REMOVE_SUCCESS:
      return { loading: false, fund: action.payload, isSuccess: true };
    case BANK_REMOVE_FAIL:
      return { loading: false, error: action.payload };
    case BANK_LINK_REQUEST:
      return { loading: true };
    case BANK_LINK_SUCCESS:
      return { loading: false, fund: action.payload, isSuccess: true };
    case BANK_LINK_CLEAR:
    case PAYMENT_TRANSFER_WALLET_CLEAR:
      return { ...state, isSuccess: false };
    case BANK_LINK_FAIL:
      return { loading: false, error: action.payload };
    case USER_UPDATE_REQUEST:
      return { loading: true };
    case USER_UPDATE_SUCCESS:
      return { loading: false, fund: action.payload };
    case USER_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case USER_UPDATE_PIN_REQUEST:
      return { loading: true };
    case USER_UPDATE_PIN_SUCCESS:
      return { loading: false, fund: action.payload };
    case USER_UPDATE_PIN_FAIL:
      return { loading: false, error: action.payload };
    case USER_ADD_ADDRESS_REQUEST:
    case USER_DELETE_ADDRESS_REQUEST:
    case PAYMENT_TRANSFER_WALLET_REQUEST:
    case PAYMENT_TRANSFER_WALLET_BANK_REQUEST:
    case PAYMENT_TRANSFER_BANK_REQUEST:
      return { loading: true };
    case USER_ADD_ADDRESS_SUCCESS:
    case USER_DELETE_ADDRESS_SUCCESS:
    case PAYMENT_TRANSFER_WALLET_SUCCESS:
    case PAYMENT_TRANSFER_WALLET_BANK_SUCCESS:
    case PAYMENT_TRANSFER_BANK_SUCCESS:
      return { loading: false, fund: action.payload, isSuccess: true };
    case USER_ADD_ADDRESS_FAIL:
    case USER_DELETE_ADDRESS_FAIL:
    case PAYMENT_TRANSFER_WALLET_FAIL:
    case PAYMENT_TRANSFER_WALLET_BANK_FAIL:
    case PAYMENT_TRANSFER_BANK_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const userFindEmailReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_FIND_ONE_EMAIL_REQUEST:
      return { loading: true };
    case USER_FIND_ONE_EMAIL_SUCCESS:
      return { loading: false, findEmail: action.payload, isSuccess: true };
    case USER_FIND_ONE_EMAIL_FAIL:
      return { loading: false, error: action.payload };
    case USER_SIGNOUT:
    case PAYMENT_FIND_ONE_CLEAR:
      return {};
    default:
      return state;
  }
};

export const userCloseAccountReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_CLOSE_ACCOUNT_REQUEST:
      return { loading: true };
    case USER_CLOSE_ACCOUNT_SUCCESS:
      return { loading: false, message: action.payload, isSuccess: true };
    case USER_CLOSE_ACCOUNT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
