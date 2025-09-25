import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllMovie, deleteSoftMovie } from "../../../../api/movieRequest";
import { useEffect } from "react";
import { toast } from "react-toastify";

import ShowMovieModal from "../../../Modals/ShowMovieModal";
import EditMovieModal from "../../../Modals/EditMovieModal";
import CreateMovieModal from "../../../Modals/CreateMovieModal";
function Movie() {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const movies = useSelector((state) => state.movie.movies || []);
  // const user = useSelector((state) => state.auth.login.currentUser || []);

  useEffect(() => {
    (async () => {
      try {
        await getAllMovie(dispatch);
      } catch (error) {
        console.error("Lỗi khi fetch movie:", error);
      }
    })();
  }, [dispatch]);

  // Load Data After Edit And Creat
  const LoadData = async () => {
    await getAllMovie(dispatch);
  };
  const handleDeleteSoft = async (id) => {
    try {
      const res = await deleteSoftMovie(dispatch, id);
      toast.success("Xóa mềm thành công");
      LoadData();
    } catch (error) {
      toast.success("Xóa mềm thất bại");
      console.log(error);
    }
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
        success={() => LoadData()}
      />
      <CreateMovieModal
        show={showCreate}
        onClose={() => setShowCreate(false)}
        success={() => LoadData()}
      />
      {/* Form thêm phim */}

      <div className="custom-container">
        <h1 className="text-2xl text-center mb-5">Quản lý Phim</h1>
        <div className="flex justify-end mb-3">
          {" "}
          <button
            className="cursor-pointer px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 "
            onClick={() => setShowCreate(true)}>
            Thêm Phim
          </button>
        </div>

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
              {movies && movies.length > 0 ? (
                movies.map((movie) => (
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
                    <td className="px-3 py-2 whitespace-nowrap">
                      {movie.name}
                    </td>
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
                      <button
                        className="cursor-pointer px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                        onClick={() => handleDeleteSoft(movie._id)}>
                        Xóa
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center py-4">
                    Chưa Có Phim Hãy{" "}
                    <button
                      className="cursor-pointer text-blue-500 hover:text-blue-600 hover:underline py-1"
                      onClick={() => setShowCreate(true)}>
                      Thêm Phim
                    </button>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Movie;
