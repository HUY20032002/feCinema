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
  updateMovieStart,
  updateMovieSuccess,
  updateMovieFailure,
  deleteSoftMovieStart,
  deleteSoftMovieSuccess,
  deleteSoftMovieFailure,
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
    console.log("api get all movie res: ", res);
    return res.data.DT;
  } catch (error) {
    dispatch(getAllMovieFailure());
    return error.response?.data || "Lấy phim thất bại";
  }
};
// Lay 1 phim
export const getMovie = async (dispatch, id) => {
  try {
    dispatch(getMovieStart());
    const res = await API.get(`/movie/${id}`);
    dispatch(getMovieSuccess(res.data.DT));
    console.log("api get movie res: ", res);
    return res.data.DT;
  } catch (error) {
    dispatch(getMovieFailure());
    return error.response?.data || "Lấy phim thất bại";
  }
};
// cajp nhat
export const updateMovie = async (dispatch, id, data) => {
  try {
    dispatch(updateMovieStart());
    const res = await API.put(`/movie/${id}`, data); // nên dùng PUT
    dispatch(updateMovieSuccess(res.data.DT));
    console.log("api update movie res: ", res);
  } catch (error) {
    dispatch(updateMovieFailure());
    console.log("error update: ", error);
  }
};
// Xoa mem
export const deleteSoftMovie = async (dispatch, id) => {
  try {
    dispatch(deleteSoftMovieStart());
    await API.patch(`/movie/${id}`);
    dispatch(deleteSoftMovieSuccess());
  } catch (error) {
    dispatch(deleteSoftMovieFailure());
    console.log("error update: ", error);
  }
};
