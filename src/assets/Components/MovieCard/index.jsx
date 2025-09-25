import React from "react";

function MovieCard({ movie, index }) {
  return (
    <div className="border rounded shadow lg:w-[250px]">
      <div className="relative group">
        <img
          src={movie.bannerUrl}
          alt={movie.name}
          className="w-full h-[250px] lg:w-[250px] lg:h-[350px] object-cover "
        />
        {/* Overlay */}
        <div
          className="absolute inset-0 bg-black/50 flex items-center justify-center gap-3 
                  opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button className="px-4 py-2 bg-white text-black rounded-lg font-semibold hover:bg-gray-200">
            Chi tiết
          </button>
          <button className="px-4 py-2 bg-pink-600 text-white rounded-lg font-semibold hover:bg-pink-700">
            Đặt vé
          </button>
        </div>
      </div>
      <div className="text-center mt-2">
        {/* Dòng đầu tiên: độ tuổi - tên phim */}
        <div className="flex items-center gap-2 border-b border-gray-300 pb-1">
          <div
            className={`w-6 h-6 flex items-center justify-center rounded-full text-white text-xs font-bold ml-2
        ${Number(movie.ageRating) >= 16 ? "bg-pink-600" : "bg-blue-600"}`}>
            {movie.ageRating}
          </div>

          <div
            className="font-extrabold text-sm tracking-wide uppercase truncate max-w-[200px]"
            title={movie.name}>
            {movie.name}
          </div>
        </div>

        {/* Dòng thứ 2: thời lượng - ngày */}
        <div className="flex items-center justify-center gap-2 mt-2 text-sm text-gray-700">
          <div>{movie.duration} phút</div>
          <div className="border-l border-gray-400 h-4"></div>
          <div>{new Date(movie.releaseDate).toLocaleDateString("vi-VN")}</div>
        </div>

        {/* Dòng cuối */}
        <div className="mt-1 font-medium text-gray-800">Phim {index + 1}</div>
      </div>
    </div>
  );
}

export default MovieCard;
