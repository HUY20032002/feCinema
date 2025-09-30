import { createSlice } from "@reduxjs/toolkit";

const showtimeSlice = createSlice({
  name: "showtime",
  initialState: {
    showtimes: [], // ✅ Đảm bảo luôn là array
    loading: false,
    error: false,
    message: "",
  },
  reducers: {
    // Tạo lịch chiếu
    createShowtimeStart: (state) => {
      state.loading = true;
      state.error = false;
      state.message = "";
      // ✅ ĐẢM BẢO showtimes luôn là array
      if (!state.showtimes) {
        state.showtimes = [];
      }
    },
    createShowtimeSuccess: (state, action) => {
      state.loading = false;
      state.error = false;

      // ✅ FIX: Đảm bảo showtimes là array trước khi push
      if (!state.showtimes) {
        state.showtimes = [];
      }

      // ✅ Thêm showtime mới vào danh sách
      if (action.payload) {
        state.showtimes.push(action.payload);
      }
      state.message = "Tạo lịch chiếu thành công";
    },
    createShowtimeFailure: (state, action) => {
      state.loading = false;
      state.error = true;
      state.message = action.payload || "Tạo lịch chiếu thất bại";
    },

    // Lấy lịch chiếu
    getShowtimesStart: (state) => {
      state.loading = true;
      state.error = false;
      state.message = "";
      // ✅ Đảm bảo showtimes là array
      if (!state.showtimes) {
        state.showtimes = [];
      }
    },
    getShowtimesSuccess: (state, action) => {
      state.loading = false;
      state.error = false;
      // ✅ Đảm bảo payload là array
      state.showtimes = Array.isArray(action.payload) ? action.payload : [];
    },
    getShowtimesFailure: (state, action) => {
      state.loading = false;
      state.error = true;
      state.message = action.payload || "Lấy lịch chiếu thất bại";
    },

    // Clear message
    clearMessage: (state) => {
      state.message = "";
      state.error = false;
    },

    // ✅ THÊM: Reset state (optional)
    resetShowtimeState: (state) => {
      state.showtimes = [];
      state.loading = false;
      state.error = false;
      state.message = "";
    },
  },
});

export const {
  createShowtimeStart,
  createShowtimeSuccess,
  createShowtimeFailure,
  getShowtimesStart,
  getShowtimesSuccess,
  getShowtimesFailure,
  clearMessage,
  resetShowtimeState, // ✅ THÊM
} = showtimeSlice.actions;

export default showtimeSlice.reducer;
