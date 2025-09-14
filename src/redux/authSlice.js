import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth", // bắt buộc có
  initialState: {
    login: {
      currentUser: null,
      loading: false,
      error: false,
    },
  },
  reducers: {
    loginStart: (state) => {
      state.login.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.login.loading = false;
      state.login.currentUser = action.payload;
      state.login.error = false;
    },
    loginFailure: (state) => {
      state.login.loading = false;
      state.login.error = true;
    },
    logout: (state) => {
      state.login.currentUser = null;
      state.login.loading = false;
      state.login.error = false;
    },

    registerStart: (state) => {
      state.login.loading = true;
      state.login.error = null;
    },
    registerSuccess: (state, action) => {
      state.login.loading = false;
      state.login.currentUser = action.payload;
    },
    registerFailure: (state) => {
      state.login.loading = false;
      state.login.error = true;
    },

    forgotPasswordStart: (state) => {
      state.login.loading = true;
      state.login.error = false;
    },
    forgotPasswordSuccess: (state) => {
      state.login.loading = false;
    },
    forgotPasswordFailure: (state) => {
      state.login.loading = false;
      state.login.error = true;
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
