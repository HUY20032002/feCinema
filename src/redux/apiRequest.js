import axios from "axios";
import {
  loginStart,
  loginSuccess,
  loginFailure,
  registerStart,
  registerSuccess,
  registerFailure,
  forgotPasswordStart,
  forgotPasswordSuccess,
  forgotPasswordFailure,
} from "./authSlice";
const API_URL = "http://localhost:3000";
// thunk login
export const login = async (dispatch, email, password) => {
  try {
    dispatch(loginStart());
    const res = await axios.post(`${API_URL}/auth/login`, {
      email,
      password,
    });
    dispatch(loginSuccess(res.data)); // { user, accessToken }
  } catch (err) {
    dispatch(loginFailure(err.response?.data || "Login failed"));
  }
};

// thunk register
export const register = async (dispatch, data) => {
  try {
    dispatch(registerStart());
    const res = await axios.post(`${API_URL}/auth/register`, data);
    dispatch(registerSuccess(res.data));
  } catch (err) {
    dispatch(registerFailure(err.response?.data || "Register failed"));
  }
};

// thunk forgotPassword
export const forgotPassword =
  ({ email }) =>
  async (dispatch) => {
    try {
      dispatch(forgotPasswordStart());
      const res = await axios.post(`${API_URL}/auth/forgot-password`, {
        email,
      });
      dispatch(forgotPasswordSuccess(res.data));
    } catch (err) {
      dispatch(forgotPasswordFailure(err.response?.data || "Request failed"));
    }
  };
