import axios from "axios";
import {
  BANK_ACC_FIND_FAIL,
  BANK_ACC_FIND_REQUEST,
  BANK_ACC_FIND_SUCCESS,
  BANK_FIND_FAIL,
  BANK_FIND_REQUEST,
  BANK_FIND_SUCCESS,
  BANK_LINK_FAIL,
  BANK_LINK_REQUEST,
  BANK_LINK_SUCCESS,
  BANK_REMOVE_FAIL,
  BANK_REMOVE_REQUEST,
  BANK_REMOVE_SUCCESS,
} from "../constants/bankConstants";

export const bankFindById = (id) => async (dispatch) => {
  dispatch({ type: BANK_FIND_REQUEST });
  try {
    const { data } = await axios.get(`/api/bank/${id}`);
    dispatch({ type: BANK_FIND_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: BANK_FIND_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const bankAccFindById = (id) => async (dispatch) => {
  dispatch({ type: BANK_ACC_FIND_REQUEST });
  try {
    const { data } = await axios.get(`/api/baac/${id}`);
    dispatch({ type: BANK_ACC_FIND_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: BANK_ACC_FIND_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const bankLink = (update) => async (dispatch) => {
  dispatch({ type: BANK_LINK_REQUEST });
  try {
    const add = await axios.put(`/api/baac/${update.baac_acc_bank}`, update);
    const { data } = await axios.get(`/api/users/${update.baac_user_id}`);
    sessionStorage.removeItem("fund");
    sessionStorage.setItem("fund", JSON.stringify(data));
    dispatch({ type: BANK_LINK_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: BANK_LINK_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const bankRemoveCard = (id, id_user) => async (dispatch, getState) => {
  dispatch({ type: BANK_REMOVE_REQUEST, payload: { id, id_user } });
  try {
    const bank_acc = { baac_acc_bank: id, baac_user_id: null };
    await axios.put(`/api/baac/${id}`, bank_acc);
    const { data } = await axios.get(`/api/users/${id_user}`);
    sessionStorage.removeItem("fund");
    sessionStorage.setItem("fund", JSON.stringify(data));
    dispatch({ type: BANK_REMOVE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: BANK_REMOVE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
