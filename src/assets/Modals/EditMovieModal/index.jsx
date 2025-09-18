import React, { useState } from "react";
import { useEffect } from "react";
function EditMovieModal({ show, movie, onClose }) {
  if (!show || !movie) return null;
  const genres = ["Hành động", "Tình cảm", "Kinh dị", "Hài hước", "Hoạt hình"];
  const [selectedGenres, setSelectedGenres] = useState([]);

  useEffect(() => {
    // Khi load form sửa -> set sẵn thể loại đã lưu trong DB
    if (movie?.genre) {
      setSelectedGenres(movie.genre);
    }
  }, [movie]);

  const handleChange = (genre) => {
    setSelectedGenres(
      (prev) =>
        prev.includes(genre)
          ? prev.filter((g) => g !== genre) // bỏ chọn
          : [...prev, genre] // thêm chọn
    );
  };
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modalTitle"
      onClick={onClose}>
      <div
        className="relative w-full max-w-4xl rounded-2xl bg-white shadow-2xl overflow-hidden animate-fadeIn"
        onClick={(e) => e.stopPropagation()}>
        {/* Nút đóng ❌ */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-2xl cursor-pointer ">
          &times;
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Ảnh poster */}
          <div className="h-[400px] lg:h-[100%]">
            <img
              src={movie.bannerUrl}
              // src="https://innovavietnam.vn/wp-content/uploads/poster-561x800.jpg"
              alt={movie.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Thông tin phim */}
          <div className="p-6 flex flex-col space-y-3">
            <label htmlFor="">Tên Phim</label>
            <input
              id="modalTitle"
              type="text"
              className="text-2xl font-bold text-gray-900 border-b pb-2 rounded-sm"
              defaultValue={movie.name}
            />
            <label htmlFor="">Mô tả</label>
            <input
              type="text"
              className="text-gray-700 text-sm"
              defaultValue={movie.description}
            />

            <div className="grid grid-cols-2 gap-3 text-sm text-gray-800">
              <div>
                <h2 className="text-xl font-bold">Chọn thể loại</h2>
                <div className="flex flex-col gap-2 mt-2">
                  {genres.map((genre) => (
                    <label key={genre} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        value={genre}
                        checked={selectedGenres.includes(genre)}
                        onChange={() => handleChange(genre)}
                      />
                      {genre}
                    </label>
                  ))}
                </div>

                <div className="mt-4">
                  <strong>Đã chọn:</strong>{" "}
                  {selectedGenres.join(", ") || "Chưa có"}
                </div>
              </div>
              <div>
                <span className="font-medium">Độ tuổi:</span> {movie.ageRating}+
              </div>
              <div>
                <span className="font-medium">Phụ đề:</span>{" "}
                {movie.subtitle ? "VietSub" : "Thuyết Minh"}
              </div>
              <div>
                <span className="font-medium">Thời lượng:</span>{" "}
                {movie.duration} phút
              </div>
              <div>
                <span className="font-medium">Ngày phát hành:</span>{" "}
                {movie.releaseDate || "Chưa có"}
              </div>
              <div>
                <span className="font-medium">Định dạng:</span>{" "}
                {Array.isArray(movie.format)
                  ? movie.format.join(", ")
                  : movie.format}
              </div>
              <div>
                <span className="font-medium">Ngôn ngữ:</span>{" "}
                {movie.language || "Chưa có"}
              </div>
              <div>
                <span className="font-medium">Đánh giá:</span>{" "}
                {movie.ratingAvg || 0} / 10
              </div>
            </div>

            <div className="mt-4">
              <span className="font-medium">Trạng thái:</span>{" "}
              <span
                className={`px-2 py-1 rounded text-white text-xs ${
                  movie.status === "coming"
                    ? "bg-yellow-500"
                    : movie.status === "showing"
                    ? "bg-green-500"
                    : movie.status === "ended"
                    ? "bg-gray-500"
                    : "bg-slate-400"
                }`}>
                {movie.status === "coming"
                  ? "Sắp Ra"
                  : movie.status === "showing"
                  ? "Đang Chiếu"
                  : movie.status === "ended"
                  ? "Kết Thúc"
                  : "Không rõ"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditMovieModal;
