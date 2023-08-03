import * as api from '../api';
import { AUTH } from '../constants/actionTypes';

export const signIn = (formData, history) => async (dispatch) => {
  try {
    // LOGIN USER
    const { data } = await api.signIn(formData);
    dispatch({ type: AUTH, data });
    console.log(data);

    history('/');
  } catch (error) {
    console.log(error);
  }
};

export const signUp = (formData, history) => async (dispatch) => {
  try {
    // SIGN UP USER
    const { data } = await api.signUp(formData);
    dispatch({ type: AUTH, data });
    console.log(data);

    history('/');
  } catch (error) {
    console.log(error);
  }
};
