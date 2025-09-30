import React, { useState, useEffect } from "react";
import { createMovie } from "../../../api/movieRequest";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { toast } from "react-toastify";
import { clearMessage } from "../../../redux/movieSlice";

function CreateMovieModal({ show, onClose, success }) {
  if (!show) return null;

  const dispatch = useDispatch();
  const { loading, error, message } = useSelector((state) => state.movie);

  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [formData, setFormData] = useState({
    img: "",
    name: "",
    description: "",
    genre: [],
    duration: "",
    subtitle: [],
    format: [],
    releaseDate: "",
    ageRating: "",
    trailerUrl: "",
  });

  const [errors, setErrors] = useState({});

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

  // Reset form khi đóng/mở modal
  useEffect(() => {
    if (show) {
      resetForm();
    }
  }, [show]);

  // Xử lý thông báo
  useEffect(() => {
    if (message) {
      if (error) {
        toast.error(message);
      } else {
        toast.success(message);
        if (message === "Tạo phim thành công") {
          setTimeout(() => {
            onClose();
            success();
          }, 1500);
        }
      }
      dispatch(clearMessage());
    }
  }, [message, error, dispatch, onClose, success]);

  const resetForm = () => {
    setFormData({
      img: "",
      name: "",
      description: "",
      genre: [],
      duration: "",
      subtitle: [],
      format: [],
      releaseDate: "",
      ageRating: "",
      trailerUrl: "",
    });
    setSelectedImage(null);
    setSelectedGenres([]);
    setErrors({});
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Tên phim là bắt buộc";
    if (!formData.duration) newErrors.duration = "Thời lượng là bắt buộc";
    if (formData.duration <= 0)
      newErrors.duration = "Thời lượng phải lớn hơn 0";
    if (!formData.releaseDate)
      newErrors.releaseDate = "Ngày phát hành là bắt buộc";
    if (!formData.img) newErrors.img = "Ảnh poster là bắt buộc";
    if (selectedGenres.length === 0)
      newErrors.genre = "Vui lòng chọn ít nhất 1 thể loại";
    if (formData.format.length === 0)
      newErrors.format = "Vui lòng chọn ít nhất 1 định dạng";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // 👉 chỉ dành cho input text/number
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error khi user bắt đầu nhập
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // 👉 dành cho file ảnh
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      setErrors((prev) => ({ ...prev, img: "Vui lòng chọn file ảnh" }));
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setErrors((prev) => ({
        ...prev,
        img: "Kích thước ảnh không được vượt quá 5MB",
      }));
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setFormData((prev) => ({ ...prev, img: reader.result }));
      setSelectedImage(reader.result);
      if (errors.img) {
        setErrors((prev) => ({ ...prev, img: "" }));
      }
    };
  };

  // 👉 xử lý thể loại
  const handleGenreChange = (selected) => {
    const genreValues = selected.map((s) => s.value);
    setSelectedGenres(genreValues);
    setFormData((prev) => ({ ...prev, genre: genreValues }));

    if (errors.genre) {
      setErrors((prev) => ({ ...prev, genre: "" }));
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

    if (errors.format) {
      setErrors((prev) => ({ ...prev, format: "" }));
    }
  };

  const handleSubtitleChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      subtitle: checked
        ? [...prev.subtitle, value]
        : prev.subtitle.filter((s) => s !== value),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Vui lòng kiểm tra lại thông tin");
      return;
    }

    try {
      // Chuẩn bị data gửi lên server
      const submitData = {
        ...formData,
        genre: selectedGenres,
        duration: parseInt(formData.duration),
        ageRating: formData.ageRating ? parseInt(formData.ageRating) : 0,
      };

      const result = await createMovie(dispatch, submitData);

      if (result.success) {
        // Thành công - sẽ được xử lý trong useEffect
      } else {
        toast.error(result.message || "Tạo phim thất bại");
      }
    } catch (error) {
      console.log("ER: ", error);
      toast.error("Có lỗi xảy ra khi tạo phim");
    }
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
      role="dialog"
      aria-modal="true"
      onClick={handleClose}
    >
      <div
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white shadow-2xl p-6 animate-fadeIn"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Nút đóng ❌ */}
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-2xl cursor-pointer z-10"
          disabled={loading}
        >
          &times;
        </button>

        <h2 className="text-2xl font-bold mb-6 text-center">Thêm phim mới</h2>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Ảnh poster */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ảnh Poster *
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="w-full p-2 border rounded"
                  disabled={loading}
                />
                {errors.img && (
                  <p className="text-red-500 text-sm mt-1">{errors.img}</p>
                )}
              </div>

              {selectedImage && (
                <div className="mt-4">
                  <img
                    src={selectedImage}
                    alt="preview"
                    className="w-full h-full object-cover rounded-lg border"
                  />
                </div>
              )}
            </div>

            {/* Thông tin phim */}
            <div className="space-y-4">
              {/* Tên phim */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tên Phim *
                </label>
                <input
                  type="text"
                  name="name"
                  className={`w-full p-2 border rounded ${
                    errors.name ? "border-red-500" : "border-gray-300"
                  }`}
                  value={formData.name}
                  onChange={handleInputChange}
                  disabled={loading}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                )}
              </div>

              {/* Mô tả */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Mô tả
                </label>
                <textarea
                  name="description"
                  rows="3"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={formData.description}
                  onChange={handleInputChange}
                  disabled={loading}
                />
              </div>

              {/* Thể loại */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Thể loại *
                </label>
                <Select
                  isMulti
                  options={genres.map((g) => ({ value: g, label: g }))}
                  value={selectedGenres.map((g) => ({ value: g, label: g }))}
                  onChange={handleGenreChange}
                  className="w-full"
                  isDisabled={loading}
                />
                {errors.genre && (
                  <p className="text-red-500 text-sm mt-1">{errors.genre}</p>
                )}
              </div>

              {/* Thông tin phụ */}
              <div className="grid grid-cols-2 gap-4">
                {/* Độ tuổi */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Độ tuổi
                  </label>
                  <div className="flex items-center">
                    <input
                      type="number"
                      name="ageRating"
                      value={formData.ageRating}
                      onChange={handleInputChange}
                      className="w-20 p-2 border border-gray-300 rounded"
                      min="0"
                      disabled={loading}
                    />
                    <span className="ml-2">+</span>
                  </div>
                </div>

                {/* Thời lượng */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Thời lượng (phút) *
                  </label>
                  <input
                    type="number"
                    name="duration"
                    value={formData.duration}
                    onChange={handleInputChange}
                    className={`w-full p-2 border rounded ${
                      errors.duration ? "border-red-500" : "border-gray-300"
                    }`}
                    min="1"
                    disabled={loading}
                  />
                  {errors.duration && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.duration}
                    </p>
                  )}
                </div>
              </div>

              {/* Định dạng */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Định dạng *
                </label>
                <div className="flex flex-wrap gap-4">
                  {formatOptions.map((item) => (
                    <label key={item} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        value={item}
                        checked={formData.format.includes(item)}
                        onChange={handleFormatChange}
                        disabled={loading}
                      />
                      {item}
                    </label>
                  ))}
                </div>
                {errors.format && (
                  <p className="text-red-500 text-sm mt-1">{errors.format}</p>
                )}
              </div>

              {/* Phụ đề */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phụ đề
                </label>
                <div className="flex flex-wrap gap-4">
                  {subtitleOptions.map((item) => (
                    <label key={item} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        value={item}
                        checked={formData.subtitle.includes(item)}
                        onChange={handleSubtitleChange}
                        disabled={loading}
                      />
                      {item}
                    </label>
                  ))}
                </div>
              </div>

              {/* Ngày phát hành */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Ngày phát hành *
                </label>
                <input
                  type="date"
                  name="releaseDate"
                  value={formData.releaseDate}
                  onChange={handleInputChange}
                  className={`w-full p-2 border rounded ${
                    errors.releaseDate ? "border-red-500" : "border-gray-300"
                  }`}
                  disabled={loading}
                />
                {errors.releaseDate && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.releaseDate}
                  </p>
                )}
              </div>

              {/* Trailer */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Link Trailer
                </label>
                <input
                  type="text"
                  name="trailerUrl"
                  value={formData.trailerUrl}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="https://www.youtube.com/..."
                  disabled={loading}
                />
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col md:flex-row justify-end gap-3 mt-6 pt-4 border-t">
            <button
              type="button"
              className="px-6 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
              onClick={handleClose}
              disabled={loading}
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors flex items-center justify-center"
              disabled={loading}
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Đang xử lý...
                </>
              ) : (
                "Thêm phim"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateMovieModal;
