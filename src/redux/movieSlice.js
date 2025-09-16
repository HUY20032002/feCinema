import { createSlice } from "@reduxjs/toolkit";

const movieSlice = createSlice({
  name: "movie",
  initialState: {
    movie: null,
    movies: [],
    loading: false,
    error: false,
  },
  reducers: {
    // Lấy 1 phim
    getMovieStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getMovieSuccess: (state, action) => {
      state.loading = false;
      state.movie = action.payload;
      state.error = false;
    },
    getMovieFailure: (state) => {
      state.loading = false;
      state.error = true;
    },

    // Lấy tất cả phim
    getAllMovieStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getAllMovieSuccess: (state, action) => {
      state.loading = false;
      state.movies = action.payload; // ✅ gán mảng phim
      state.error = false;
    },
    getAllMovieFailure: (state) => {
      state.loading = false;
      state.error = true;
    },

    // Thêm phim mới
    createMovieStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    createMovieSuccess: (state) => {
      state.loading = false;
      state.error = false;
    },
    createMovieFailure: (state) => {
      state.loading = false;
      state.error = true;
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
} = movieSlice.actions;

export default movieSlice.reducer;
