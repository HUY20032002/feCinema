import { createSlice } from "@reduxjs/toolkit";
const storedUser = localStorage.getItem("user");
const storedToken = localStorage.getItem("accessToken");

const authSlice = createSlice({
  name: "auth", // bắt buộc có
  initialState: {
    user: storedUser ? JSON.parse(storedUser) : null,
    accessToken: storedToken || null,
    loading: false,
    error: null,
  },
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;

      // lưu vào localStorage
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("accessToken", action.payload.accessToken);
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
    },

    registerStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    registerSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
    },
    registerFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    forgotPasswordStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    forgotPasswordSuccess: (state) => {
      state.loading = false;
    },
    forgotPasswordFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    logout: (state) => {
      state.user = null;
    },
  },
});

// export actions
export const {
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
} = authSlice.actions;

// export reducer
export default authSlice.reducer;
