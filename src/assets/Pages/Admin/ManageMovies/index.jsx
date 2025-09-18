import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createMovie, getAllMovie } from "../../../../api/movieRequest";
import { useEffect } from "react";
import ShowMovieModal from "../../../Modals/ShowMovieModal";
import EditMovieModal from "../../../Modals/EditMovieModal";
function Movie() {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const movies = useSelector((state) => state.movie.movies || []);
  const [formData, setFormData] = useState({
    img: "",
    name: "",
    description: "",
    genre: "",
    duration: "",
  });
  useEffect(() => {
    getAllMovie(dispatch);
  }, [dispatch]);

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
      setFormData((prev) => ({ ...prev, img: reader.result }));
    };
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    createMovie(dispatch, formData); // ✅ gửi data lên BE
  };
  return (
    <div>
      <ShowMovieModal
        show={show}
        movie={selectedMovie}
        onClose={() => setShow(false)}
      />
      <EditMovieModal
        show={showEdit}
        movie={selectedMovie}
        onClose={() => setShowEdit(false)}
      />
      {/* Form thêm phim */}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Ảnh</label>
          <input type="file" accept="image/*" onChange={handleFileChange} />
        </div>

        <div>
          <label>Tên phim</label>
          <input
            type="text"
            name="name"
            placeholder="Tên phim"
            value={formData.name}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Mô tả</label>
          <input
            type="text"
            name="description"
            placeholder="Mô tả phim"
            value={formData.description}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Thể loại</label>
          <input
            type="text"
            name="genre"
            placeholder="Ví dụ: Action, Comedy"
            value={formData.genre}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Thời lượng (phút)</label>
          <input
            type="number"
            name="duration"
            placeholder="120"
            value={formData.duration}
            onChange={handleInputChange}
          />
        </div>

        <button type="submit">Thêm phim</button>
      </form>
      <div className="custom-container">
        <h1 className="text-2xl text-center mb-5">Quản lý Phim</h1>
        <div className="overflow-x-auto rounded border border-gray-300 shadow-sm">
          <table className="min-w-full divide-y-2 divide-gray-200">
            <thead className="ltr:text-left rtl:text-right">
              <tr className="*:font-medium *:text-gray-900">
                <th className="px-3 py-2 whitespace-nowrap">Ảnh Bìa</th>
                <th className="px-3 py-2 whitespace-nowrap">Tên Phim</th>
                <th className="px-3 py-2 whitespace-nowrap">Độ Tuổi</th>
                <th className="px-3 py-2 whitespace-nowrap">Thời Lượng Phim</th>
                <th className="px-3 py-2 whitespace-nowrap">Phụ Đề</th>
                <th className="px-3 py-2 whitespace-nowrap">Trạng Thái</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {movies.map((movie) => (
                <tr
                  key={movie._id}
                  className="*:text-gray-900 *:first:font-medium">
                  <td className="px-3 py-2 whitespace-nowrap">
                    <img
                      src={movie.bannerUrl}
                      // src="https://innovavietnam.vn/wp-content/uploads/poster-561x800.jpg"
                      alt={movie.name}
                      className="w-16 h-24 object-cover rounded"
                    />
                    {/* <img
                      src={movie.bannerUrl}
                      alt={movie.name}
                      className="w-16 h-24 object-cover rounded"
                    /> */}
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap">{movie.name}</td>
                  <td className="px-3 py-2 whitespace-nowrap">
                    {movie.ageRating}+{" "}
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap">
                    {movie.duration} phút
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap">
                    {movie.subtitle ? "Phụ đề" : "Thuyết minh"}
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap">
                    {movie.status === "coming"
                      ? "Sắp Ra"
                      : movie.status === "showing"
                      ? "Đang Chiếu"
                      : movie.status === "ended"
                      ? "Kết Thúc"
                      : ""}
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap space-x-2">
                    {" "}
                    <button
                      className="cursor-pointer px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                      onClick={() => {
                        setSelectedMovie(movie);
                        setShow(!show);
                      }}>
                      Chi tiết
                    </button>
                    <button
                      className="cursor-pointer px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                      onClick={() => {
                        setSelectedMovie(movie);
                        setShowEdit(!showEdit);
                      }}>
                      {" "}
                      Sửa
                    </button>
                    <button className="cursor-pointer px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600">
                      Xóa
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Movie;
