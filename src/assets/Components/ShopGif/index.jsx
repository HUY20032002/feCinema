import { useState } from "react";

function ShopGiff() {
  const [active, setActive] = useState(0);

  const shopgiffs = [
    {
      id: 1,
      name: "Sản phẩm 1",
      price: 100000,
      stock: 10,
      sold: 5,
      image:
        "https://media.lottecinemavn.com/Media/WebAdmin/1f9e1a2009dd44cfa81c938552f28160.png",
    },
    {
      id: 2,
      name: "Sản phẩm 2",
      price: 200000,
      stock: 10,
      image:
        "https://media.lottecinemavn.com/Media/WebAdmin/1f9e1a2009dd44cfa81c938552f28160.png",
    },
    {
      id: 3,
      name: "Sản phẩm 3",
      price: 300000,
      stock: 10,
      sold: 6,
      image:
        "https://media.lottecinemavn.com/Media/WebAdmin/1f9e1a2009dd44cfa81c938552f28160.png",
    },
    {
      id: 4,
      name: "Sản phẩm 4",
      price: 400000,
      stock: 10,
      sold: 10,
      image:
        "https://media.lottecinemavn.com/Media/WebAdmin/1f9e1a2009dd44cfa81c938552f28160.png",
    },
  ];

  const menus = [
    { id: "banchaynhat", label: "Bán Chạy Nhất" },
    { id: "danhmuchangban", label: "Danh mục hàng bán" },
    { id: "lottecombo", label: "Lotte Combo" },
  ];

  return (
    <div>
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
                onClick={() => setActive(index)}
              >
                <a href={`#${menu.id}`}>{menu.label}</a>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="custom-container mt-10 space-y-10">
        {/* Section 1 */}
        <div className="custom-container" id="banchaynhat">
          {/* Tiêu đề gần grid sản phẩm */}
          <h2 className="font-bold text-lg mb-2 ml-[30px]">Bán Chạy Nhất</h2>

          <div className="mx-auto max-w-screen-xl px-4 pb-8 sm:px-6 lg:px-8">
            <ul
              className="flex gap-4 overflow-x-auto
        sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:gap-6 sm:overflow-visible"
            >
              {shopgiffs && shopgiffs.length > 0 ? (
                shopgiffs.map((item) => (
                  <li key={item.id} className="flex-shrink-0 w-48 sm:w-auto">
                    <a href="#" className="group block overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-[200px] w-full object-cover transition duration-500 group-hover:scale-105 sm:h-[200px]"
                      />
                      <div className="relative bg-white pt-3">
                        <h3 className="text-xs text-gray-700 group-hover:underline group-hover:underline-offset-4">
                          {item.name}
                        </h3>
                        <p className="mt-2 tracking-wider text-gray-900">
                          {item.price.toLocaleString()} VND
                        </p>
                      </div>
                    </a>
                  </li>
                ))
              ) : (
                <li>Không có sản phẩm</li>
              )}
            </ul>
          </div>
        </div>

        {/* Section 2 */}
        <div id="danhmuchangban" className="custom-container">
          {/* Tiêu đề gần grid sản phẩm */}
          <h2 className="font-bold text-lg mb-2 ml-[30px]">
            Danh Mục Hàng Bán{" "}
          </h2>

          <div className="mx-auto max-w-screen-xl px-4 pb-8 sm:px-6 lg:px-8">
            <ul
              className="flex gap-4 overflow-x-auto
        sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:gap-6 sm:overflow-visible"
            >
              {shopgiffs && shopgiffs.length > 0 ? (
                shopgiffs.map((item) => (
                  <li key={item.id} className="flex-shrink-0 w-48 sm:w-auto">
                    <a href="#" className="group block overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-[200px] w-full object-cover transition duration-500 group-hover:scale-105 sm:h-[200px]"
                      />
                      <div className="relative bg-white pt-3">
                        <h3 className="text-xs text-gray-700 group-hover:underline group-hover:underline-offset-4">
                          {item.name}
                        </h3>
                        <p className="mt-2 tracking-wider text-gray-900">
                          {item.price.toLocaleString()} VND
                        </p>
                      </div>
                    </a>
                  </li>
                ))
              ) : (
                <li>Không có sản phẩm</li>
              )}
            </ul>
          </div>
        </div>

        {/* Section 3 */}
        <div id="lottecombo" className="custom-container">
          {/* Tiêu đề gần grid sản phẩm */}
          <h2 className="font-bold text-lg mb-2 ml-[30px]">Lotte Combo </h2>

          <div className="mx-auto max-w-screen-xl px-4 pb-8 sm:px-6 lg:px-8">
            <ul
              className="flex gap-4 overflow-x-auto
        sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:gap-6 sm:overflow-visible"
            >
              {shopgiffs && shopgiffs.length > 0 ? (
                shopgiffs.map((item) => (
                  <li key={item.id} className="flex-shrink-0 w-48 sm:w-auto">
                    <a href="#" className="group block overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-[200px] w-full object-cover transition duration-500 group-hover:scale-105 sm:h-[200px]"
                      />
                      <div className="relative bg-white pt-3">
                        <h3 className="text-xs text-gray-700 group-hover:underline group-hover:underline-offset-4">
                          {item.name}
                        </h3>
                        <p className="mt-2 tracking-wider text-gray-900">
                          {item.price.toLocaleString()} VND
                        </p>
                      </div>
                    </a>
                  </li>
                ))
              ) : (
                <li>Không có sản phẩm</li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShopGiff;
