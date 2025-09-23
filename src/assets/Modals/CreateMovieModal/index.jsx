import React, { useState } from "react";
import { createMovie } from "../../../api/movieRequest";
import { useDispatch } from "react-redux";
import Select from "react-select";

function CreateMovieModal({ show, onClose, success }) {
  if (!show) return null;
  const dispatch = useDispatch();
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [formData, setFormData] = useState({
    img: "",
    name: "",
    description: "",
    genre: selectedGenres,
    duration: "",
    subtitle: [],
    format: [],
    releaseDate: "",
    ageRating: "",
    trailerUrl: "",
  });

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

  // 👉 chỉ dành cho input text/number
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 👉 dành cho file ảnh
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file); // convert sang base64
    reader.onloadend = () => {
      setFormData((prev) => ({ ...prev, img: reader.result })); // gửi lên BE
      setSelectedImage(reader.result); // ✅ thêm dòng này để hiện preview
    };
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createMovie(dispatch, formData); // ✅ chờ API xong
      success(); // load lại
      onClose(); // rồi đóng modal
    } catch (error) {
      console.log("ER: ", error);
    }
  };

  const handleFormatChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prev) => {
      const newFormats = checked
        ? [...prev.format, value]
        : prev.format.filter((f) => f !== value);
      return { ...prev, format: newFormats };
    });
  };
  const handleSubtitleChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      // tick → thêm vào mảng
      setFormData((prev) => ({
        ...prev,
        subtitle: [...prev.subtitle, value],
      }));
    } else {
      // bỏ tick → xóa khỏi mảng
      setFormData((prev) => ({
        ...prev,
        subtitle: prev.subtitle.filter((s) => s !== value),
      }));
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl rounded-2xl bg-white shadow-2xl p-6 animate-fadeIn"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Nút đóng ❌ */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-2xl cursor-pointer"
        >
          &times;
        </button>

        <h2 className="text-xl font-bold mb-4">Thêm phim mới</h2>

        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Ảnh poster */}
          <div className="h-[400px] lg:h-[100%]">
            <input type="file" accept="image/*" onChange={handleFileChange} />
            {selectedImage && (
              <div style={{ marginTop: "10px" }}>
                <img
                  src={selectedImage}
                  alt="preview"
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>

          {/* Thông tin phim */}
          <div className="p-6 flex flex-col space-y-3">
            <label htmlFor="">Tên Phim</label>
            <input
              id="modalTitle"
              type="text"
              name="name" // 👈 thêm name
              className="text-xl text-gray-900 border-4 rounded-sm"
              value={formData.name}
              onChange={handleInputChange} // 👈 thêm onChange
            />
            <label htmlFor="" className="text-xl">
              Mô tả
            </label>
            <textarea
              type="text"
              name="description" // 👈 thêm name
              className="text-gray-700 text-xl rounded-sm border-4"
              value={formData.description}
              onChange={handleInputChange} // 👈 thêm onChange
            />
            <div>
              <h2 className="text-xl font-bold">Chọn thể loại</h2>
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
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm text-gray-800">
              <div className="flex items-center gap-1">
                <span className="font-medium">Độ tuổi:</span>{" "}
                <input
                  type="number" // 👈 chỉ cho phép số
                  name="ageRating"
                  value={formData.ageRating}
                  onChange={handleInputChange}
                  className="border rounded px-1 w-16"
                  min="0"
                />
                +
              </div>

              <div>
                <span className="font-medium">Thời lượng:</span>{" "}
                <input
                  type="number" // 👈 chỉ cho phép số
                  name="duration"
                  value={formData.duration}
                  onChange={handleInputChange}
                  className="border rounded px-1 w-16"
                  min="0"
                />
                phút
              </div>

              <div>
                <span className="font-medium">Chọn định dạng</span>
                <div className="flex flex-wrap gap-3">
                  {formatOptions.map((item) => (
                    <label key={item} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        value={item}
                        checked={formData.format.includes(item)}
                        onChange={handleFormatChange}
                      />
                      {item}
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <span className="font-medium">Phụ đề: </span>{" "}
                <div className="flex flex-wrap gap-3">
                  {subtitleOptions.map((item) => (
                    <label key={item} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        value={item}
                        checked={formData.subtitle.includes(item)}
                        onChange={handleSubtitleChange}
                      />
                      {item}
                    </label>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-medium">Ngày phát hành:</span>
              <input
                type="date"
                name="releaseDate"
                value={formData.releaseDate}
                onChange={handleInputChange}
                className="border rounded px-2 py-1 text-sm"
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="font-medium">Trailer:</span>
              <input
                type="text"
                name="trailerUrl"
                value={formData.trailerUrl}
                onChange={handleInputChange}
                className="border rounded px-2 py-1 text-sm"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row  justify-end">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 w-full mt-2 mr-2"
            onClick={handleSubmit}
          >
            Thêm phim
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 w-full mt-2"
            onClick={onClose}
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateMovieModal;
