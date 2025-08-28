function Nagivator({ active, setActive }) {
  const menus = [
    "SHOP QUÀ TẶNG",
    "MUA VÉ",
    "PHIM",
    "RẠP CHIẾU PHIM",
    "TIN MỚI VÀ ƯU ĐÃI",
    "LIÊN HỆ",
  ];

  return (
    <nav className="bg-red-200">
      <div className="flex flex-row justify-start md:justify-center overflow-x-auto whitespace-nowrap py-3 divide-x divide-black">
        {menus.map((menu) => (
          <div
            key={menu}
            className="px-4 text-center text-sm md:text-lg flex-shrink-0">
            <span
              onClick={() => setActive(menu)}
              className={`inline-block transition duration-200 cursor-pointer ${
                active === menu
                  ? "text-black underline decoration-2 underline-offset-4"
                  : "text-gray-500 hover:text-black"
              }`}>
              {menu}
            </span>
          </div>
        ))}
      </div>
    </nav>
  );
}

export default Nagivator;
