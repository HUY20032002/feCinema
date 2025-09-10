import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

function Movies() {
  // Mảng ảnh dùng cho slide
  const images = [
    "https://picsum.photos/id/1018/1000/400",
    "https://picsum.photos/id/1015/1000/400",
    "https://picsum.photos/id/1019/1000/400",
    "https://picsum.photos/id/1018/1000/400",
    "https://picsum.photos/id/1015/1000/400",
    "https://picsum.photos/id/1019/1000/400",
    "https://picsum.photos/id/1018/1000/400",
    "https://picsum.photos/id/1015/1000/400",
    "https://picsum.photos/id/1019/1000/400",
    "https://picsum.photos/id/1018/1000/400",
    "https://picsum.photos/id/1015/1000/400",
    "https://picsum.photos/id/1019/1000/400",
  ];
  //  State để lưu số phim hiển thị
  const [visibleCount, setVisibleCount] = useState(8);
  // State lưu vị trí ảnh hiện tại (index trong mảng)
  const [currentIndex, setCurrentIndex] = useState(0);
  // State lưu tab menu đang active
  const [active, setActive] = useState(0);
  // useEffect tạo interval tự động chuyển ảnh sau 5 giây
  useEffect(() => {
    const interval = setInterval(() => {
      // mỗi 5s thì cộng index lên 1
      // nếu vượt quá length thì quay về 0 (dùng %)
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);

    // cleanup: xóa interval khi component bị unmount
    return () => clearInterval(interval);
  }, [images.length]);

  // Hàm lùi về ảnh trước
  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  // Hàm sang ảnh tiếp theo
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };
  const menus = [
    { id: "phimdangchieu", label: "Phim Đang Chiếu" },
    { id: "phimsapchieu", label: "Phim Sắp Chiếu" },
  ];
  // Handle menu click
  const handleMenuClick = (index) => {
    setActive(index);
    console.log(index);
  };
  return (
    <div>
      {/* Slide */}
      <section>
        {" "}
        {/* Tiêu đề */}
        <div className="text-center bg-amber-200 p-[10px]">
          PHIM HOT TẠI RẠP
        </div>
        {/* Khung chứa slide */}
        <div className="relative w-full h-[400px] bg-black flex items-center justify-center">
          {/* Ảnh hiển thị */}
          <img
            src={images[currentIndex]} // ảnh hiện tại theo index
            alt="slide"
            className="w-[1535px] h-full object-cover"
          />

          {/* Nút trái */}
          <button
            onClick={prevSlide}
            className="absolute left-5 top-1/2 -translate-y-1/2 bg-black p-2 rounded-full shadow text-white"
          >
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>

          {/* Nút phải */}
          <button
            onClick={nextSlide}
            className="absolute right-5 top-1/2 -translate-y-1/2 bg-black p-2 rounded-full shadow text-white"
          >
            <FontAwesomeIcon icon={faChevronRight} />
          </button>

          {/* Các chấm tròn hiển thị vị trí slide */}
          <div className="absolute bottom-5 flex gap-1">
            {images.map((_, index) => (
              <button
                key={index}
                // khi click vào chấm sẽ chuyển tới ảnh tương ứng
                onClick={() => setCurrentIndex(index)}
                // chấm hiện tại thì màu trắng, còn lại màu xám
                className={`w-3 h-3 rounded-full ${
                  currentIndex === index ? "bg-white" : "bg-gray-500"
                }`}
              ></button>
            ))}
          </div>
        </div>
      </section>
      {/* Tab List Movie */}
      <section className="mt-10">
        <div className="sticky top-0 z-50 bg-white shadow">
          <div className="container mx-auto flex justify-center">
            <div className="flex items-center text-xs gap-0 md:text-lg">
              {menus.map((menu, index) => (
                <div
                  key={menu.id}
                  className={`px-3 py-2 border-2 md:py-5 md:px-10 cursor-pointer
            ${
              active === index
                ? "bg-amber-500 text-white border-amber-600"
                : "border-gray-200"
            }`}
                  onClick={() => handleMenuClick(index)}
                >
                  <a href={`#${menu.id}`}>{menu.label}</a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* List Movie */}
      <section className="container lg:w-[1035px] mx-auto mt-10">
        <div className="text-center p-[10px] font-bold text-lg">
          DANH SÁCH PHIM
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
          {(active === 0 ? images : images)
            .slice(0, visibleCount)
            .map((img, index) => (
              <div key={index} className="border rounded shadow lg:w-[250px]">
                <img
                  src={img}
                  alt={`movie-${index}`}
                  className="w-full h-[250px] lg:w-[250px] lg:h-[350px] object-cover"
                />
                <div className="text-center mt-2">
                  {/* Dòng đầu tiên: độ tuổi - tên phim */}
                  <div className="flex items-center justify-center gap-2 border-b border-gray-400 pb-1">
                    <div>Độ tuổi</div>
                    <div>Tên phim</div>
                  </div>

                  {/* Dòng thứ 2: thời lượng - ngày */}
                  <div className="flex items-center justify-center gap-2 mt-2 text-sm">
                    <div>100 phút</div>
                    <div className="border-l border-gray-400 h-4"></div>
                    <div>20/2/2025</div>
                  </div>

                  {/* Dòng cuối */}
                  <div className="mt-1 font-medium">Phim {index + 1}</div>
                </div>
              </div>
            ))}
        </div>

        {/* Nút Xem thêm */}
        {visibleCount < images.length && (
          <div className="flex justify-center my-4 bg-amber-100">
            <button
              onClick={() => setVisibleCount((prev) => prev + 4)} // mỗi lần xem thêm load thêm 4 phim
              className="w-full px-4 py-2 bg-amber-500 text-white rounded hover:bg-amber-600"
            >
              Xem Thêm
            </button>
          </div>
        )}
      </section>
    </div>
  );
}

export default Movies;
