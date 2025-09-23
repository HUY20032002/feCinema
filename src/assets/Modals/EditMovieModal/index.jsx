import React, { useState, useEffect } from "react";
import { updateMovie } from "../../../api/movieRequest";
import { useDispatch } from "react-redux";
import Select from "react-select";

function EditMovieModal({ show, movie, onClose, success }) {
  if (!show || !movie) return null;

  const formatOptions = ["2D", "3D", "IMAX"];
  const genres = [
    "Hành Động",
    "Hoạt Hình",
    "Kinh Dị",
    "Gia Đình",
    "Hình Sự",
    "Chiến Tranh",
    "Bi Kịch",
    "Cổ Trang",
    "Phiêu Lưu",
    "Viễn Tưởng",
    "Tình Cảm",
    "Hài Hước",
    "Tâm Lý",
    "Thể Thao",
    "Âm Nhạc",
    "Trinh Thám",
  ];
  const subtitleOptions = ["VietSub", "Thuyết Minh", "EngSub"];

  const dispatch = useDispatch();

  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedSubtitles, setSelectedSubtitles] = useState([]);
  const [selectedFormats, setSelectedFormats] = useState([]);

  // State text
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [ageRating, setAgeRating] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const [duration, setDuration] = useState("");
  const [trailerUrl, setTrailer] = useState("");
  const [bannerUrl, setBanner] = useState("");

  // Load data khi mở modal
  useEffect(() => {
    if (movie) {
      setSelectedGenres(
        Array.isArray(movie.genre) ? movie.genre : [movie.genre]
      );
      setSelectedSubtitles(
        Array.isArray(movie.subtitle) ? movie.subtitle : [movie.subtitle]
      );
      setSelectedFormats(
        Array.isArray(movie.format) ? movie.format : [movie.format]
      );

      setName(movie.name || "");
      setDescription(movie.description || "");
      setAgeRating(movie.ageRating || "");
      setDuration(movie.duration || "");
      setTrailer(movie.trailerUrl || "");
      setBanner(movie.bannerUrl || "");
      setReleaseDate(
        movie.releaseDate
          ? new Date(movie.releaseDate).toISOString().split("T")[0]
          : ""
      );
    }
  }, [movie, show]);

  // Toggle checkboxes
  const handleToggle = (item, setSelected) => {
    setSelected((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  // 👉 dành cho file ảnh
  const handleFileChange = (e) => {
    setBanner("");
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file); // convert sang base64
    reader.onloadend = () => {
      setBanner(reader.result); // ✅ thêm dòng này để hiện preview
    };
  };
  // Submit cập nhật
  const handleSubmit = async () => {
    try {
      const updatedMovie = {
        ...movie,
        name,
        bannerUrl,
        description,
        ageRating,
        duration,
        trailerUrl,
        releaseDate,
        genre: selectedGenres,
        subtitle: selectedSubtitles,
        format: selectedFormats,
      };

      await updateMovie(dispatch, movie._id, updatedMovie);
      success();
      onClose();
    } catch (error) {
      console.log("ER: ", error);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl rounded-2xl bg-white shadow-2xl grid grid-cols-1 lg:grid-cols-2"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Nút đóng */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-2xl"
        >
          &times;
        </button>

        {/* Poster */}
        <div className="h-[300px] lg:h-full">
          <img
            src={bannerUrl}
            alt={name}
            className="w-full h-full lg:h-full object-cover"
          />
        </div>

        {/* Form */}
        <div className="p-6 flex flex-col space-y-3 overflow-y-auto max-h-[90vh]">
          <input type="file" onChange={handleFileChange} />
          <label>Tên Phim</label>
          <input
            type="text"
            className="border rounded-md p-2"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label className="block font-medium">Mô tả</label>
          <textarea
            className="w-full border rounded-md p-2 text-gray-900"
            rows={4} // số dòng mặc định hiển thị
            value={description}
            defaultValue={movie.description}
            onChange={(e) => setDescription(e.target.value)}
          />

          {/* Thể loại */}
          <h2 className="text-base  font-bold">Chọn thể loại</h2>
          <Select
            isMulti
            options={genres.map((g) => ({ value: g, label: g }))}
            value={genres
              .map((g) => ({ value: g, label: g }))
              .filter((g) => selectedGenres.includes(g.value))}
            onChange={(selected) =>
              setSelectedGenres(selected.map((s) => s.value))
            }
            className="w-full"
          />

          {/* Độ tuổi + Thời lượng */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label>Độ tuổi:</label>
              <input
                type="number"
                className="border rounded-md p-2 w-full"
                value={ageRating}
                onChange={(e) => setAgeRating(e.target.value)}
              />
            </div>
            <div>
              <label>Thời lượng (phút):</label>
              <input
                type="number"
                className="border rounded-md p-2 w-full"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6">
            {/* Định dạng */}
            <div>
              <h4 className="text-base font-bold mb-2">Chọn định dạng</h4>
              <div className="flex flex-wrap gap-4">
                {formatOptions.map((fmt) => (
                  <label key={fmt} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={selectedFormats.includes(fmt)}
                      onChange={() => handleToggle(fmt, setSelectedFormats)}
                    />
                    {fmt}
                  </label>
                ))}
              </div>
            </div>

            {/* Phụ đề */}
            <div>
              <h4 className="text-base font-bold mb-2">Chọn phụ đề</h4>
              <div className="flex flex-wrap gap-4">
                {subtitleOptions.map((sub) => (
                  <label key={sub} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={selectedSubtitles.includes(sub)}
                      onChange={() => handleToggle(sub, setSelectedSubtitles)}
                    />
                    {sub}
                  </label>
                ))}
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div className="flex flex-col gap-1">
              <label className="font-medium">Ngày phát hành</label>
              <input
                type="date"
                className="border rounded-md p-2"
                value={releaseDate}
                onChange={(e) => setReleaseDate(e.target.value)}
              />
            </div>

            {/* Trailer */}
            <div className="flex flex-col gap-1">
              <label className="font-medium">Trailer</label>
              <input
                type="text"
                className="border rounded-md p-2"
                value={trailerUrl}
                onChange={(e) => setTrailer(e.target.value)}
              />
            </div>
          </div>
          {/* Ngày phát hành */}

          {/* Submit */}
          <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Lưu thay đổi
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditMovieModal;
