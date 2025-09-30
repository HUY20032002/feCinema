import { createSlice } from "@reduxjs/toolkit";

const cinemaSlice = createSlice({
  name: "cinema",
  initialState: {
    cinema: null,
    cinemas: [],
    loading: false,
    error: false,
  },

  reducers: {
    // Lấy 1 phim
    getCinemaStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getCinemaSuccess: (state, action) => {
      state.loading = false;
      state.cinema = action.payload;
      state.error = false;
    },
    getCinemaFailure: (state) => {
      state.loading = false;
      state.error = true;
    },

    // Lấy tất cả phim
    getAllCinemaStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getAllCinemaSuccess: (state, action) => {
      state.loading = false;
      state.cinemas = action.payload; // ✅ gán mảng phim
      state.error = false;
    },
    getAllCinemaFailure: (state) => {
      state.loading = false;
      state.error = true;
    },

    // Thêm phim mới
    createCinemaStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    createCinemaSuccess: (state) => {
      state.loading = false;
      state.error = false;
    },
    createCinemaFailure: (state) => {
      state.loading = false;
      state.error = true;
    },
    // Sua Phim
    updateCinemaStart: (state) => {
      state.loading = true;
      state.error = false;
    },
    updateCinemaSuccess: (state, action) => {
      state.loading = false;
      state.cinema = action.payload;
      state.error = false;
    },
    updateCinemaFailure: (state) => {
      state.loading = false;
      state.error = true;
    },
    // Xoa mem phim
    deleteSoftCinemaStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    deleteSoftCinemaSuccess: (state) => {
      state.loading = false;
      state.error = false;
    },
    deleteSoftCinemaFailure: (state) => {
      state.loading = false;
      state.error = true;
    },
  },
});

export const {
  getAllCinemaStart,
  getAllCinemaSuccess,
  getAllCinemaFailure,
  getCinemaStart,
  getCinemaSuccess,
  getCinemaFailure,
  createCinemaStart,
  createCinemaSuccess,
  createCinemaFailure,
  updateCinemaStart,
  updateCinemaSuccess,
  updateCinemaFailure,
  deleteSoftCinemaStart,
  deleteSoftCinemaSuccess,
  deleteSoftCinemaFailure,
} = cinemaSlice.actions;

export default cinemaSlice.reducer;
