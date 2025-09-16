import API from "../redux/axiosInstance"; // file mới tạo ở trên
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
} from "../redux/authSlice";
// thunk login
export const login = async (dispatch, email, password) => {
  try {
    dispatch(loginStart());
    const res = await API.post("/auth/login", { email, password });

    // BE trả về accessToken + user
    dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(loginFailure(err.response?.data || "Login failed"));
  }
};

// thunk register
export const register = async (dispatch, data) => {
  try {
    dispatch(registerStart());
    const res = await API.post("/auth/register", data);
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
      const res = await API.post("/auth/forgot-password", { email });
      dispatch(forgotPasswordSuccess(res.data));
    } catch (err) {
      dispatch(forgotPasswordFailure(err.response?.data || "Request failed"));
    }
  };

// thunk logout
export const logoutUser = async (dispatch) => {
  try {
    await API.post("/auth/logout"); // ❌ không cần gửi token, BE đọc từ cookie
  } catch (err) {
    if (err.response?.status === 401) {
      dispatch(logout());
      window.location.href = "/login";
    }
  } finally {
    dispatch(logout()); // luôn reset redux state
  }
};
