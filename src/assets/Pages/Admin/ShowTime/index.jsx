import React, { useEffect, useState } from "react";
import { getAllCinema } from "../../../../api/cinemaRequest";
import { getAllMovie } from "../../../../api/movieRequest";
import { getAllRoomCinemaId } from "../../../../api/roomRequest";
import { createShowtime } from "../../../../api/showtimeRequest";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

function ShowTime() {
  const cinemas = useSelector((state) => state.cinema.cinemas || []);
  const movies = useSelector((state) => state.movie.movies || []);
  const rooms = useSelector((state) => state.room.roomsCinemaId || []);

  const [city, setCity] = useState("");
  const [cinemaId, setCinemaId] = useState("");
  const [movieId, setMovieId] = useState("");
  const [roomId, setRoomId] = useState("");
  const [startDateTime, setStartDateTime] = useState("");
  const [endDateTime, setEndDateTime] = useState("");
  const [duration, setDuration] = useState(0);
  const [format, setFormat] = useState("2D");
  const [price, setPrice] = useState({
    normal: 55000,
    vip: 75000,
    couple: 85000,
  });

  const dispatch = useDispatch();

  // Chỉ gọi 1 lần khi mount
  useEffect(() => {
    getAllCinema(dispatch);
    getAllMovie(dispatch);
  }, [dispatch]);

  // Gọi API lấy room khi cinemaId thay đổi
  useEffect(() => {
    setRoomId(""); // reset lựa chọn phòng
    if (cinemaId) {
      getAllRoomCinemaId(dispatch, cinemaId);
    }
  }, [cinemaId, dispatch]);

  // Khi chọn phim -> setMovieId + setDuration + setFormat mặc định
  useEffect(() => {
    if (movieId) {
      const selectedMovie = movies.find((m) => m._id === movieId);
      if (selectedMovie) {
        setDuration(selectedMovie.duration || 0);
        // Set format mặc định là format đầu tiên của phim
        if (selectedMovie.format && selectedMovie.format.length > 0) {
          setFormat(selectedMovie.format[0]);
        }
      }
    } else {
      setDuration(0);
    }
  }, [movieId, movies]);

  // Tính giờ kết thúc mỗi khi startDateTime hoặc duration thay đổi
  useEffect(() => {
    if (startDateTime && duration > 0) {
      const startDate = new Date(startDateTime);
      const endDate = new Date(startDate.getTime() + duration * 60000);

      // ✅ FIX: Manual format để tránh timezone issues
      const year = endDate.getFullYear();
      const month = String(endDate.getMonth() + 1).padStart(2, "0");
      const day = String(endDate.getDate()).padStart(2, "0");
      const hours = String(endDate.getHours()).padStart(2, "0");
      const minutes = String(endDate.getMinutes()).padStart(2, "0");

      const formattedEndDateTime = `${year}-${month}-${day}T${hours}:${minutes}`;
      setEndDateTime(formattedEndDateTime);

      // Debug
      console.log("🕐 Time Debug:");
      console.log("Phim:", duration, "phút");
      console.log("Bắt đầu:", startDateTime, "→", startDate.toString());
      console.log("Kết thúc:", formattedEndDateTime, "→", endDate.toString());
    } else {
      setEndDateTime("");
    }
  }, [startDateTime, duration]);
  // Lấy danh sách city duy nhất
  const cities = [...new Set(cinemas.map((c) => c.city))];

  // Lấy danh sách rạp theo city
  const filteredCinemas = cinemas.filter((c) => c.city === city);

  // Lấy thông tin phim được chọn
  const selectedMovie = movies.find((m) => m._id === movieId);

  const handleSubmit = async () => {
    // Validation
    if (!cinemaId || !movieId || !roomId || !startDateTime || !format) {
      toast.error("Vui lòng điền đầy đủ thông tin bắt buộc");
      return;
    }

    if (!price.normal || !price.vip || !price.couple) {
      toast.error("Vui lòng nhập đầy đủ giá vé");
      return;
    }

    const data = {
      cinemaId,
      roomId,
      movieId,
      startTime: startDateTime,
      endTime: endDateTime,
      format,
      price,
      language: "Vietnamese",
      subtitle: "Vietnamese",
    };

    console.log("🎬 Submitting showtime creation...", data);

    try {
      const result = await createShowtime(dispatch, data);
      console.log("📊 API Result:", result);
      // ✅ Xử lý kết quả DỰA TRÊN result.success
      if (result) {
        toast.success(result.message);
        resetForm();
        console.log("🎉 Showtime created successfully!");
      } else {
        toast.error(result.message);
        console.log("❌ Showtime creation failed:", result.message);
      }
    } catch (error) {
      // ❌ Đây là lỗi TRONG quá trình gọi API, không phải lỗi từ BE
      console.error("💥 Unexpected error in handleSubmit:", error);
      toast.error("Lỗi hệ thống: " + error.message);
    }
  };

  const resetForm = () => {
    setCity("");
    setCinemaId("");
    setMovieId("");
    setRoomId("");
    setStartDateTime("");
    setEndDateTime("");
    setDuration(0);
    setFormat("2D");
    setPrice({
      normal: 0,
      vip: 0,
      couple: 0,
    });
  };

  const handlePriceChange = (type, value) => {
    setPrice((prev) => ({
      ...prev,
      [type]: parseInt(value) || 0,
    }));
  };

  return (
    <div className="custom-container max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-center font-bold text-2xl mb-6">
        Đặt Lịch Chiếu Phim
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Cột trái */}
        <div className="space-y-4">
          {/* Chọn khu vực */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Khu Vực *
            </label>
            <select
              onChange={(e) => {
                setCity(e.target.value);
                setCinemaId(""); // Reset cinema khi đổi city
              }}
              value={city}
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">---Chọn Khu Vực---</option>
              {cities.map((cityName, index) => (
                <option key={index} value={cityName}>
                  {cityName}
                </option>
              ))}
            </select>
          </div>

          {/* Chọn rạp */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Rạp Chiếu *
            </label>
            <select
              onChange={(e) => setCinemaId(e.target.value)}
              value={cinemaId}
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              disabled={!city}
            >
              <option value="">---Chọn Rạp---</option>
              {filteredCinemas.map((cinema) => (
                <option key={cinema._id} value={cinema._id}>
                  {cinema.name} - {cinema.address}
                </option>
              ))}
            </select>
          </div>

          {/* Chọn phim */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phim *
            </label>
            <select
              onChange={(e) => setMovieId(e.target.value)}
              value={movieId}
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">---Chọn Phim---</option>
              {movies.map((movie) => (
                <option key={movie._id} value={movie._id}>
                  {movie.name} ({movie.duration} phút)
                </option>
              ))}
            </select>
          </div>

          {/* Chọn phòng */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phòng Chiếu *
            </label>
            <select
              onChange={(e) => setRoomId(e.target.value)}
              value={roomId}
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              disabled={!cinemaId}
            >
              <option value="">---Chọn Phòng---</option>
              {rooms.length > 0 ? (
                rooms.map((room) => (
                  <option key={room._id} value={room._id}>
                    Phòng {room.name} ({room.totalSeats} ghế)
                  </option>
                ))
              ) : (
                <option value="" disabled>
                  Không có phòng nào
                </option>
              )}
            </select>
          </div>
        </div>

        {/* Cột phải */}
        <div className="space-y-4">
          {/* Định dạng */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Định dạng *
            </label>
            <select
              value={format}
              onChange={(e) => setFormat(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="2D">2D</option>
              <option value="3D">3D</option>
              <option value="IMAX">IMAX</option>
            </select>
          </div>

          {/* Thời gian bắt đầu */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Thời gian bắt đầu *
            </label>
            <input
              type="datetime-local"
              value={startDateTime}
              onChange={(e) => setStartDateTime(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              min={new Date().toISOString().slice(0, 16)}
            />
          </div>

          {/* Thời gian kết thúc (readonly) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Thời gian kết thúc
            </label>
            <input
              type="datetime-local"
              value={endDateTime}
              readOnly
              className="w-full border border-gray-300 rounded-md p-2 bg-gray-100 cursor-not-allowed"
            />
            {duration > 0 && (
              <p className="text-sm text-gray-500 mt-1">
                Thời lượng: {duration} phút
              </p>
            )}
          </div>

          {/* Giá vé */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Giá vé *
            </label>

            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="block text-xs text-gray-600 mb-1">
                  Ghế thường
                </label>
                <input
                  type="number"
                  value={price.normal}
                  onChange={(e) => handlePriceChange("normal", e.target.value)}
                  className="w-full border border-gray-300 rounded-md p-2 text-sm"
                  min="0"
                  placeholder="Giá"
                />
              </div>

              <div>
                <label className="block text-xs text-gray-600 mb-1">
                  Ghế VIP
                </label>
                <input
                  type="number"
                  value={price.vip}
                  onChange={(e) => handlePriceChange("vip", e.target.value)}
                  className="w-full border border-gray-300 rounded-md p-2 text-sm"
                  min="0"
                  placeholder="Giá"
                />
              </div>

              <div>
                <label className="block text-xs text-gray-600 mb-1">
                  Ghế đôi
                </label>
                <input
                  type="number"
                  value={price.couple}
                  onChange={(e) => handlePriceChange("couple", e.target.value)}
                  className="w-full border border-gray-300 rounded-md p-2 text-sm"
                  min="0"
                  placeholder="Giá"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Nút submit */}
      <div className="mt-8 flex justify-center">
        <button
          onClick={handleSubmit}
          className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium transition-colors"
        >
          Tạo Lịch Chiếu
        </button>
      </div>

      {/* Thông tin phim được chọn */}
      {selectedMovie && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg border">
          <h3 className="font-semibold text-lg mb-2">Thông tin phim:</h3>
          <p>
            <strong>Tên:</strong> {selectedMovie.name}
          </p>
          <p>
            <strong>Thể loại:</strong> {selectedMovie.genre?.join(", ")}
          </p>
          <p>
            <strong>Định dạng có sẵn:</strong>{" "}
            {selectedMovie.format?.join(", ")}
          </p>
          <p>
            <strong>Độ tuổi:</strong>{" "}
            {selectedMovie.ageRating
              ? `${selectedMovie.ageRating}+`
              : "Chưa có"}
          </p>
        </div>
      )}
    </div>
  );
}

export default ShowTime;
