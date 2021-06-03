import axios from "axios";
import {
  BANK_FIND_FAIL,
  BANK_FIND_REQUEST,
  BANK_FIND_SUCCESS,
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

export const bankRemoveCard = (id, id_user) => async (dispatch) => {
  dispatch({ type: BANK_REMOVE_REQUEST, payload: { id, id_user } });
  try {
    const remove = await axios.delete(`/api/baac/${id}`);
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
