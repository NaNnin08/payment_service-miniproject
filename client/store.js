import { createStore, compose, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { bankAccFindReducer, bankFindReducer } from "./reducer/bankReducer";
import {
  findPaymentByUserReducer,
  orderWalletReducer,
  topupFromBankReducer,
} from "./reducer/paymentReducer";
import {
  userFindOneReduccer,
  userRegisterReducer,
  userSigninReducer,
} from "./reducer/userReducer";

const initialState = {
  userSignin: {
    userInfo:
      typeof window === "object"
        ? sessionStorage.getItem("userInfo")
          ? JSON.parse(sessionStorage.getItem("userInfo"))
          : null
        : null,
  },
  userFund: {
    fund:
      typeof window === "object"
        ? sessionStorage.getItem("fund")
          ? JSON.parse(sessionStorage.getItem("fund"))
          : null
        : null,
  },
};

const reducer = combineReducers({
  userSignin: userSigninReducer,
  userRegister: userRegisterReducer,
  userFund: userFindOneReduccer,
  bank: bankFindReducer,
  bankAcc: bankAccFindReducer,
  payment: topupFromBankReducer,
  orderWallet: orderWalletReducer,
  paymentList: findPaymentByUserReducer,
});

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
