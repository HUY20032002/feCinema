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
  logout,
} from "./authSlice";
const API_URL = "http://localhost:3000";
// thunk login
export const login = async (dispatch, email, password) => {
  try {
    dispatch(loginStart());

    const res = await axios.post(
      `${API_URL}/auth/login`,
      { email, password } // body
    );

    dispatch(loginSuccess(res.data));
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
export const logoutUser = async (dispatch, refreshToken) => {
  try {
    await axios.post(`${API_URL}/auth/logout`, { token: refreshToken });
  } catch (err) {
    if (err.response?.status === 401) {
      dispatch(logout());
      window.location.href = "/login";
    }
  } finally {
    dispatch(logout()); // luôn reset redux state
  }
};
