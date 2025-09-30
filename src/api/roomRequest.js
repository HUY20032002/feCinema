import API from "../redux/axiosInstance"; // file mới tạo ở trên
import {
  getAllRoomStart,
  getAllRoomSuccess,
  getAllRoomFailure,
  getAllRoomCinemaIdStart,
  getAllRoomCinemaIdSuccess,
  getAllRoomCinemaIdFailure,
  getRoomStart,
  getRoomSuccess,
  getRoomFailure,
  updateRoomStart,
  updateRoomSuccess,
  updateRoomFailure,
  deleteSoftRoomStart,
  deleteSoftRoomSuccess,
  deleteSoftRoomFailure,
} from "../redux/RoomSlice";

export const getAllRoom = async (dispatch) => {
  try {
    dispatch(getAllRoomStart());
    const res = await API.get(`/room/`);
    dispatch(getAllRoomSuccess(res.data.DT));
  } catch (error) {
    dispatch(getAllRoomFailure());
    console.log(error);
  }
};

export const getAllRoomCinemaId = async (dispatch, id) => {
  try {
    dispatch(getAllRoomCinemaIdStart());
    const res = await API.get(`/room/${id}`);
    dispatch(getAllRoomCinemaIdSuccess(res.data.DT));
    console.log("Lay phong phim: ", res.data.DT);
  } catch (error) {
    dispatch(getAllRoomCinemaIdFailure());
    console.log(error);
  }
};
