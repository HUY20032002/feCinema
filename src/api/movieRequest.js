import API from "../redux/axiosInstance"; // file mới tạo ở trên
import {
  getAllMovieStart,
  getAllMovieSuccess,
  getAllMovieFailure,
  getMovieStart,
  getMovieSuccess,
  getMovieFailure,
  createMovieStart,
  createMovieSuccess,
  createMovieFailure,
} from "../redux/movieSlice";

// Them phim
export const createMovie = async (dispatch, data) => {
  try {
    dispatch(createMovieStart());
    await API.post(`/movie/create`, data);
    dispatch(createMovieSuccess());
  } catch (error) {
    dispatch(createMovieFailure());
    return error.response?.data || "Lấy phim thất bại";
  }
};
// Lay tat ca danh sach phim
export const getAllMovie = async (dispatch) => {
  try {
    dispatch(getAllMovieStart());
    const res = await API.get("/movie");
    dispatch(getAllMovieSuccess(res.data.DT));
    console.log("res", res);
    return res.data.DT;
  } catch (error) {
    dispatch(getAllMovieFailure());
    return error.response?.data || "Lấy phim thất bại";
  }
};
