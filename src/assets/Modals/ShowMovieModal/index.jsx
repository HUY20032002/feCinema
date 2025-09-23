import React from "react";

function ShowMovieModal({ show, movie, onClose }) {
  if (!show || !movie) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modalTitle"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl rounded-2xl bg-white shadow-2xl overflow-hidden animate-fadeIn"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Nút đóng ❌ */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-2xl cursor-pointer "
        >
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
            <h2
              id="modalTitle"
              className="text-2xl font-bold text-gray-900 border-b pb-2"
            >
              {movie.name}
            </h2>
            <div
              className="
            "
            >
              {" "}
              <span className="font-medium">Mô tả:</span> {movie.description}
            </div>

            <div className="grid grid-cols-2 gap-3 text-sm text-gray-800">
              <div>
                <span className="font-medium">Thể loại:</span>{" "}
                {Array.isArray(movie.genre)
                  ? movie.genre.join(", ")
                  : movie.genre}
              </div>
              <div>
                <span className="font-medium">Độ tuổi:</span> {movie.ageRating}+
              </div>
              {/* Phụ đề */}
              <div>
                <span className="font-medium">Phụ đề:</span>{" "}
                {Array.isArray(movie.subtitle)
                  ? movie.subtitle.join(", ")
                  : movie.subtitle || "Chưa có"}
              </div>
              <div>
                <span className="font-medium">Thời lượng:</span>{" "}
                {movie.duration} phút
              </div>
              {/* Ngày phát hành */}
              <div>
                <span className="font-medium">Ngày phát hành:</span>{" "}
                {movie.releaseDate
                  ? new Date(movie.releaseDate).toLocaleDateString("vi-VN")
                  : "Chưa có"}
              </div>
              <div>
                <span className="font-medium">Định dạng:</span>{" "}
                {Array.isArray(movie.format)
                  ? movie.format.join(", ")
                  : movie.format}
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
                }`}
              >
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

export default ShowMovieModal;
