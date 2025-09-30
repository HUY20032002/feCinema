import API from "../redux/axiosInstance";
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

// Thêm phim - ĐÃ SỬA
export const createMovie = async (dispatch, data) => {
  try {
    dispatch(createMovieStart());
    const res = await API.post(`/movie/create`, data);

    // Thêm movie mới vào state
    dispatch(createMovieSuccess(res.data.DT));

    // Trả về thông báo thành công
    return {
      success: true,
      message: res.data.message,
      data: res.data.DT,
    };
  } catch (error) {
    const errorMessage = error.response?.data?.message || "Tạo phim thất bại";
    dispatch(createMovieFailure());

    return {
      success: false,
      message: errorMessage,
      data: null,
    };
  }
};

// Lấy tất cả danh sách phim
export const getAllMovie = async (dispatch) => {
  try {
    dispatch(getAllMovieStart());
    const res = await API.get("/movie");
    dispatch(getAllMovieSuccess(res.data.DT));
    return {
      success: true,
      data: res.data.DT,
    };
  } catch (error) {
    const errorMessage = error.response?.data?.message || "Lấy phim thất bại";
    dispatch(getAllMovieFailure());
    return {
      success: false,
      message: errorMessage,
      data: [],
    };
  }
};

// Lấy 1 phim
export const getMovie = async (dispatch, id) => {
  try {
    dispatch(getMovieStart());
    const res = await API.get(`/movie/${id}`);
    dispatch(getMovieSuccess(res.data.DT));
    return {
      success: true,
      data: res.data.DT,
    };
  } catch (error) {
    const errorMessage = error.response?.data?.message || "Lấy phim thất bại";
    dispatch(getMovieFailure());
    return {
      success: false,
      message: errorMessage,
      data: null,
    };
  }
};

// Cập nhật phim
export const updateMovie = async (dispatch, id, data) => {
  try {
    dispatch(updateMovieStart());
    const res = await API.put(`/movie/${id}`, data);
    dispatch(updateMovieSuccess(res.data.DT));
    return {
      success: true,
      message: res.data.message,
      data: res.data.DT,
    };
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "Cập nhật phim thất bại";
    dispatch(updateMovieFailure());
    return {
      success: false,
      message: errorMessage,
      data: null,
    };
  }
};

// Xóa mềm
export const deleteSoftMovie = async (dispatch, id) => {
  try {
    dispatch(deleteSoftMovieStart());
    const res = await API.patch(`/movie/soft-delete/${id}`); // Sửa endpoint cho rõ ràng
    dispatch(deleteSoftMovieSuccess());
    return {
      success: true,
      message: res.data.message,
    };
  } catch (error) {
    const errorMessage = error.response?.data?.message || "Xóa phim thất bại";
    dispatch(deleteSoftMovieFailure());
    return {
      success: false,
      message: errorMessage,
    };
  }
};
