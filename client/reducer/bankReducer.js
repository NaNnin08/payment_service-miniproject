import {
  BANK_ACC_FIND_FAIL,
  BANK_ACC_FIND_REQUEST,
  BANK_ACC_FIND_SUCCESS,
  BANK_CLEAR_SEARCH,
  BANK_FIND_FAIL,
  BANK_FIND_REQUEST,
  BANK_FIND_SUCCESS,
} from "../constants/bankConstants";

export const bankFindReducer = (state = {}, action) => {
  switch (action.type) {
    case BANK_FIND_REQUEST:
      return { loading: true };
    case BANK_FIND_SUCCESS:
      return { loading: false, bankId: action.payload };
    case BANK_FIND_FAIL:
      return { loading: false, error: action.payload };
    case BANK_CLEAR_SEARCH:
      return {};
    default:
      return state;
  }
};

export const bankAccFindReducer = (state = {}, action) => {
  switch (action.type) {
    case BANK_ACC_FIND_REQUEST:
      return { loading: true };
    case BANK_ACC_FIND_SUCCESS:
      return { loading: false, acc: action.payload };
    case BANK_ACC_FIND_FAIL:
      return { loading: false, error: action.payload };
    case BANK_CLEAR_SEARCH:
      return {};
    default:
      return state;
  }
};
