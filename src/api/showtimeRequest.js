import API from "../redux/axiosInstance";
import {
  createShowtimeStart,
  createShowtimeSuccess,
  createShowtimeFailure,
  getShowtimesStart,
  getShowtimesSuccess,
  getShowtimesFailure,
} from "../redux/showtimeSlice";

// Tạo lịch chiếu - ĐÃ SỬA
export const createShowtime = async (dispatch, data) => {
  try {
    console.log("🔄 Starting createShowtime API call...");
    dispatch(createShowtimeStart());

    console.log("📤 Sending data to BE:", data);
    const res = await API.post(`/showtime/create`, data);

    console.log("✅ BE Response received:", {
      status: res.status,
      data: res.data,
    });

    // ✅ Xử lý thành công (status 2xx)
    if (res.status >= 200 && res.status < 300) {
      console.log("✅ Dispatching success with payload:", res.data.DT);
      console.log("✅ Payload type:", typeof res.data.DT);
      console.log("✅ Is payload defined?", !!res.data.DT);

      // ✅ Đảm bảo dispatch đúng payload
      dispatch(createShowtimeSuccess(res.data.DT));

      return {
        success: true,
        message: res.data.message || "Tạo lịch chiếu thành công",
        data: res.data.DT,
      };
    } else {
      console.warn("⚠️ Unexpected status:", res.status);
      dispatch(createShowtimeFailure(`Status ${res.status}`));

      return {
        success: false,
        message: `Lỗi không xác định: ${res.status}`,
        data: null,
      };
    }
  } catch (error) {
    console.error("❌ API Error caught:", error);

    // Xử lý lỗi mạng hoặc lỗi từ BE
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      "Tạo lịch chiếu thất bại";

    console.error("❌ Error message:", errorMessage);
    dispatch(createShowtimeFailure(errorMessage));

    return {
      success: false,
      message: errorMessage,
      data: null,
    };
  }
};
