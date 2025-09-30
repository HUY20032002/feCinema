import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getMovie } from "../../../api/movieRequest";
import { FaStar } from "react-icons/fa";

function Movie() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const movie = useSelector((state) => state.movie.movie);
  const [rating, setRating] = useState(0); // số sao được chọn
  const [hover, setHover] = useState(null); // sao khi hover
  useEffect(() => {
    try {
      getMovie(dispatch, id);
    } catch (error) {
      console.log(error);
    }
  }, [dispatch, id]);

  return (
    <div>
      {/* Slide */}
      <section>
        {/* Video */}
        <div className="relative w-full h-[300px] lg:h-[600px] bg-black flex items-center justify-center mb-5">
          {movie?.trailerUrl ? (
            <iframe
              className="
              md:w-[1500px] md:h-full h-[300px] "
              src={`https://www.youtube.com/embed/${movie.trailerUrl}`}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          ) : (
            <p className="text-white">Chưa có trailer</p>
          )}
        </div>{" "}
        {/* Information Movie */}
        <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-6 custom-container mb-5">
          {/* Poster + nút */}
          <div className="flex flex-col items-center">
            <img
              src={movie.bannerUrl}
              alt={movie.name}
              className="md:w-[250px] md:h-[350px]  object-cover rounded-md shadow"
            />
            <button className="bg-amber-950 w-full md:w-[250px] text-lg text-yellow-200 font-bold py-2 cursor-pointer mt-2 hover:bg-amber-800 transition">
              Đặt Vé
            </button>
          </div>

          {/* Thông tin */}
          <div className="bg-red-400 p-4 rounded-md">
            <h2 className="font-bold text-2xl mb-2">{movie.name}</h2>
            <p className="text-lg font-semibold">
              Xếp Hạng: <span className="font-normal">Đang cập nhật...</span>
            </p>
            <p className="text-lg font-semibold mt-2">Thông tin cơ bản:</p>
            <ul className="list-disc list-inside ml-2 text-base">
              <li>
                Loại:{" "}
                {Array.isArray(movie.format)
                  ? movie.format.join(", ")
                  : movie.format}
              </li>
              <li>Phụ đề: {movie.subtitle.join(", ")}</li>
            </ul>
          </div>
        </div>{" "}
        {/* Description */}
        <div className="custom-container mb-3">
          <p className="font-bold text-xl">Mô tả:</p>{" "}
          <p className="text-lg">{movie.description}</p>{" "}
        </div>
        {/* Xếp hạng và đánh giá */}
        <div className="custom-container ">
          <p className="font-bold text-xl mb-3"> Xếp hạng và đánh giá :</p>{" "}
          <div className="flex  ">
            {" "}
            <div className=" md:w-1/6 ">
              <div className=" bg-amber-950 ml-[50px] p-10 items-center">
                {" "}
                <div className="flex">
                  {[...Array(5)].map((star, index) => {
                    const currentRating = index + 1;
                    return (
                      <label key={index}>
                        <input
                          type="radio"
                          name="rating"
                          value={currentRating}
                          onClick={() => setRating(currentRating)}
                          className="hidden"
                        />
                        <FaStar
                          size={24}
                          className="cursor-pointer transition"
                          color={
                            currentRating <= (hover || rating)
                              ? "#ffc107"
                              : "#e4e5e9"
                          }
                          onMouseEnter={() => setHover(currentRating)}
                          onMouseLeave={() => setHover(null)}
                        />
                      </label>
                    );
                  })}
                </div>
                <p className="font-semibold text-center text-white">
                  {rating} ĐIỂM
                </p>
              </div>
            </div>
            <div className=" md:w-4/6">
              <input
                type="text"
                placeholder="Nhập đánh giá của bạn..."
                className="w-full h-full border-3  px-3 py-2 focus:outline-none focus:border-black-500"
              />
            </div>
            <div className=" md:w-1/6">
              <button className="bg-amber-950 p-13 text-yellow-200 font-bold cursor-pointer">
                ĐÁNH GIÁ
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Movie;
