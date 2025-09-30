import { createSlice } from "@reduxjs/toolkit";

const RoomSlice = createSlice({
  name: "room",
  initialState: {
    room: null,
    rooms: [],
    roomsCinemaId: [],
    loading: false,
    error: false,
  },

  reducers: {
    // Lấy 1 phim
    getRoomStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getRoomSuccess: (state, action) => {
      state.loading = false;
      state.room = action.payload;
      state.error = false;
    },
    getRoomFailure: (state) => {
      state.loading = false;
      state.error = true;
    },
    // Lấy tất cả phim theo CinemaId
    getAllRoomCinemaIdStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getAllRoomCinemaIdSuccess: (state, action) => {
      state.loading = false;
      state.roomsCinemaId = action.payload; // ✅ gán mảng phim
      state.error = false;
    },
    getAllRoomCinemaIdFailure: (state) => {
      state.loading = false;
      state.error = true;
    },
    // Lấy tất cả phim
    getAllRoomStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getAllRoomSuccess: (state, action) => {
      state.loading = false;
      state.rooms = action.payload; // ✅ gán mảng phim
      state.error = false;
    },
    getAllRoomFailure: (state) => {
      state.loading = false;
      state.error = true;
    },

    // Thêm phim mới
    createRoomStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    createRoomSuccess: (state) => {
      state.loading = false;
      state.error = false;
    },
    createRoomFailure: (state) => {
      state.loading = false;
      state.error = true;
    },
    // Sua Phim
    updateRoomStart: (state) => {
      state.loading = true;
      state.error = false;
    },
    updateRoomSuccess: (state, action) => {
      state.loading = false;
      state.room = action.payload;
      state.error = false;
    },
    updateRoomFailure: (state) => {
      state.loading = false;
      state.error = true;
    },
    // Xoa mem phim
    deleteSoftRoomStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    deleteSoftRoomSuccess: (state) => {
      state.loading = false;
      state.error = false;
    },
    deleteSoftRoomFailure: (state) => {
      state.loading = false;
      state.error = true;
    },
  },
});

export const {
  getAllRoomStart,
  getAllRoomSuccess,
  getAllRoomFailure,
  getAllRoomCinemaIdStart,
  getAllRoomCinemaIdSuccess,
  getAllRoomCinemaIdFailure,
  getRoomStart,
  getRoomSuccess,
  getRoomFailure,
  createRoomStart,
  createRoomSuccess,
  createRoomFailure,
  updateRoomStart,
  updateRoomSuccess,
  updateRoomFailure,
  deleteSoftRoomStart,
  deleteSoftRoomSuccess,
  deleteSoftRoomFailure,
} = RoomSlice.actions;

export default RoomSlice.reducer;
