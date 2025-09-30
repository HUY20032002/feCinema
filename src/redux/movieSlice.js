import { createSlice } from "@reduxjs/toolkit";

const movieSlice = createSlice({
  name: "movie",
  initialState: {
    movie: null,
    movies: [],
    loading: false,
    error: false,
    message: "", // Thêm message để lưu thông báo
  },
  reducers: {
    // Lấy 1 phim
    getMovieStart: (state) => {
      state.loading = true;
      state.error = false;
      state.message = "";
    },
    getMovieSuccess: (state, action) => {
      state.loading = false;
      state.movie = action.payload;
      state.error = false;
    },
    getMovieFailure: (state, action) => {
      state.loading = false;
      state.error = true;
      state.message = action.payload;
    },

    // Lấy tất cả phim
    getAllMovieStart: (state) => {
      state.loading = true;
      state.error = false;
      state.message = "";
    },
    getAllMovieSuccess: (state, action) => {
      state.loading = false;
      state.movies = action.payload;
      state.error = false;
    },
    getAllMovieFailure: (state, action) => {
      state.loading = false;
      state.error = true;
      state.message = action.payload;
    },

    // Thêm phim mới - ĐÃ SỬA
    createMovieStart: (state) => {
      state.loading = true;
      state.error = false;
      state.message = "";
    },
    createMovieSuccess: (state, action) => {
      state.loading = false;
      state.error = false;
      state.movies.push(action.payload); // Thêm movie mới vào danh sách
      state.message = "Tạo phim thành công";
    },
    createMovieFailure: (state, action) => {
      state.loading = false;
      state.error = true;
      state.message = action.payload;
    },

    // Sửa phim
    updateMovieStart: (state) => {
      state.loading = true;
      state.error = false;
      state.message = "";
    },
    updateMovieSuccess: (state, action) => {
      state.loading = false;
      state.movie = action.payload;
      state.error = false;
      // Cập nhật trong danh sách
      const index = state.movies.findIndex(
        (movie) => movie._id === action.payload._id
      );
      if (index !== -1) {
        state.movies[index] = action.payload;
      }
      state.message = "Cập nhật phim thành công";
    },
    updateMovieFailure: (state, action) => {
      state.loading = false;
      state.error = true;
      state.message = action.payload;
    },

    // Xóa mềm phim
    deleteSoftMovieStart: (state) => {
      state.loading = true;
      state.error = false;
      state.message = "";
    },
    deleteSoftMovieSuccess: (state) => {
      state.loading = false;
      state.error = false;
      state.message = "Xóa phim thành công";
    },
    deleteSoftMovieFailure: (state, action) => {
      state.loading = false;
      state.error = true;
      state.message = action.payload;
    },

    // Clear message - Thêm action mới
    clearMessage: (state) => {
      state.message = "";
      state.error = false;
    },
  },
});

export const {
  getAllMovieStart,
  getAllMovieSuccess,
  getAllMovieFailure,
  getMovieStart,
  getMovieSuccess,
  getMovieFailure,
  createMovieStart,
  createMovieSuccess,
  createMovieFailure,
  updateMovieStart,
  updateMovieSuccess,
  updateMovieFailure,
  deleteSoftMovieStart,
  deleteSoftMovieSuccess,
  deleteSoftMovieFailure,
  clearMessage,
} = movieSlice.actions;

export default movieSlice.reducer;
