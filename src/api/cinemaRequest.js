import API from "../redux/axiosInstance"; // file mới tạo ở trên
import {
  getAllCinemaStart,
  getAllCinemaSuccess,
  getAllCinemaFailure,
  getCinemaStart,
  getCinemaSuccess,
  getCinemaFailure,
  updateCinemaStart,
  updateCinemaSuccess,
  updateCinemaFailure,
  deleteSoftCinemaStart,
  deleteSoftCinemaSuccess,
  deleteSoftCinemaFailure,
} from "../redux/cinemaSlice";

export const getAllCinema = async (dispatch) => {
  try {
    dispatch(getAllCinemaStart());
    const res = await API.get(`/cinema/`);
    dispatch(getAllCinemaSuccess(res.data.DT));
  } catch (error) {
    dispatch(getAllCinemaFailure());
    console.log(error);
  }
};

export const getCinema = async (dispatch, id) => {
  try {
    dispatch(getCinemaStart());
    const res = await API.get(`/cinema/${id}`);
    dispatch(getCinemaSuccess(res.data.DT));
    console.log("Lay rap phim: ", res.DT);
  } catch (error) {
    dispatch(getCinemaFailure());
    console.log(error);
  }
};
