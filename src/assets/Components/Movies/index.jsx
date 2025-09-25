import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { getAllMovie } from "../../../api/movieRequest";
import { useDispatch, useSelector } from "react-redux";
import MovieCard from "../MovieCard";

function Movies() {
  const movies = useSelector((state) => state.movie.movies || []);
  const dispatch = useDispatch();

  const images = [
    "https://picsum.photos/id/1018/1000/400",
    "https://picsum.photos/id/1015/1000/400",
    "https://picsum.photos/id/1019/1000/400",
  ];

  const [visibleCount, setVisibleCount] = useState(8);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  useEffect(() => {
    getAllMovie(dispatch);
  }, [dispatch]);

  const prevSlide = () =>
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % images.length);

  const menus = [
    { id: "phimdangchieu", label: "Phim Đang Chiếu" },
    { id: "phimsapchieu", label: "Phim Sắp Chiếu" },
  ];

  // --- Lọc phim ở ngoài ---
  const today = new Date();
  const nowShowing = movies.filter((m) => new Date(m.releaseDate) <= today);
  const comingSoon = movies.filter((m) => new Date(m.releaseDate) > today);
  const data = active === 0 ? nowShowing : comingSoon;

  return (
    <div>
      {/* Slide */}
      <section>
        <div className="text-center bg-amber-200 p-[10px]">
          PHIM HOT TẠI RẠP
        </div>
        <div className="relative w-full h-[400px] bg-black flex items-center justify-center">
          <img
            src={images[currentIndex]}
            alt="slide"
            className="w-[1535px] h-full object-cover"
          />
          <button
            onClick={prevSlide}
            className="absolute left-5 top-1/2 -translate-y-1/2 bg-black p-2 rounded-full text-white">
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-5 top-1/2 -translate-y-1/2 bg-black p-2 rounded-full text-white">
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
          <div className="absolute bottom-5 flex gap-1">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`w-3 h-3 rounded-full ${
                  currentIndex === i ? "bg-white" : "bg-gray-500"
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Tabs */}
      <section className="mt-10 sticky top-0 z-50 bg-white shadow">
        <div className="container mx-auto flex justify-center">
          <div className="flex items-center text-xs md:text-lg">
            {menus.map((menu, i) => (
              <div
                key={menu.id}
                className={`px-3 py-2 md:py-5 md:px-10 border-2 cursor-pointer ${
                  active === i
                    ? "bg-amber-500 text-white border-amber-600"
                    : "border-gray-200"
                }`}
                onClick={() => setActive(i)}>
                {menu.label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* List Movie */}
      <section className="container lg:w-[1075px] mx-auto mt-10">
        <div className="text-center p-[10px] font-bold text-lg">
          {active === 0 ? "PHIM ĐANG CHIẾU" : "PHIM SẮP CHIẾU"}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
          {data.slice(0, visibleCount).map((movie, i) => (
            <MovieCard key={movie._id} movie={movie} index={i} />
          ))}
        </div>

        {visibleCount < data.length && (
          <div className="flex justify-center my-4 bg-amber-100">
            <button
              onClick={() => setVisibleCount((p) => p + 4)}
              className="w-full px-4 py-2 bg-amber-500 text-white rounded hover:bg-amber-600">
              Xem Thêm
            </button>
          </div>
        )}
      </section>
    </div>
  );
}

export default Movies;
