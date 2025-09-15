import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true, // ⚡ cần để gửi cookie refreshToken
});

// Interceptor cho response → tự động refresh khi accessToken hết hạn
API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Nếu lỗi 401 (hết hạn accessToken) và chưa retry thì thử refresh
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // gọi API refresh token
        const res = await axios.post(
          "http://localhost:3000/auth/refreshtoken",
          {},
          { withCredentials: true }
        );

        const newAccessToken = res.data.accessToken;

        // lưu vào localStorage (hoặc Redux tuỳ bạn)
        localStorage.setItem("accessToken", newAccessToken);

        // gắn token mới vào header Authorization
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

        // thử lại request ban đầu
        console.log("✅ AccessToken refreshed:", newAccessToken);
        return API(originalRequest);
      } catch (refreshError) {
        console.error("Refresh token failed:", refreshError);
        // ❌ Nếu refresh cũng fail → có thể logout hoặc chuyển về login
      }
    }

    return Promise.reject(error);
  }
);

export default API;
