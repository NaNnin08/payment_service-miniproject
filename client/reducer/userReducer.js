import {
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
    default:
      return state;
  }
};
