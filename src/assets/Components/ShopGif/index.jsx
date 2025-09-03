import { useState } from "react";

function ShopGiff() {
  const [active, setActive] = useState(0);

  const shopgiffs = [
    {
      id: 1,
      name: "Sản phẩm 1",
      price: 100000,
      image: "https://via.placeholder.com/150",
    },
    {
      id: 2,
      name: "Sản phẩm 2",
      price: 200000,
      image: "https://via.placeholder.com/150",
    },
    {
      id: 3,
      name: "Sản phẩm 3",
      price: 300000,
      image: "https://via.placeholder.com/150",
    },
    {
      id: 4,
      name: "Sản phẩm 4",
      price: 400000,
      image: "https://via.placeholder.com/150",
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


      <div className="custom-section mt-10 space-y-10">
        {/* Section 1 */}
        <div className="text-center">
          <section id="banchaynhat" className="p-5 border bg-gray-100 ">
            Bán Chạy Nhất
          </section>
          <div className="flex gap-4 overflow-x-auto items-center justify-center px-4 mt-4 md:overflow-x-hidden">
            {shopgiffs.map((shopgiff) => (
              <div
                className="border p-4 rounded shadow flex-shrink-0"
                key={shopgiff.id}>
                <img
                  src={shopgiff.image}
                  alt={shopgiff.name}
                  className="w-32 h-32 object-cover mx-auto"
                />
                <div className="text-center mt-2 font-semibold">
                  {shopgiff.name}
                </div>
                <div className="text-center text-gray-600">
                  {shopgiff.price} VND
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 2 */}
        <div className="text-center">
          <section id="danhmuchangban" className="p-5 border bg-gray-100 ">
            Danh mục hàng bán
          </section>
          <div className="flex gap-4 overflow-x-auto items-center justify-center px-4 mt-4">
            {shopgiffs.map((shopgiff) => (
              <div
                className="border p-4 rounded shadow min-w-[200px] flex-shrink-0"
                key={shopgiff.id}>
                <img
                  src={shopgiff.image}
                  alt={shopgiff.name}
                  className="w-32 h-32 object-cover mx-auto"
                />
                <div className="text-center mt-2 font-semibold">
                  {shopgiff.name}
                </div>
                <div className="text-center text-gray-600">
                  {shopgiff.price} VND
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 3 */}
        <div className="text-center">
          <section id="lottecombo" className="p-5 border bg-gray-100 ">
            Lotte Combo
          </section>
          <div className="flex gap-4 overflow-x-auto items-center justify-center px-4 mt-4">
            {shopgiffs.map((shopgiff) => (
              <div
                className="border p-4 rounded shadow min-w-[200px] flex-shrink-0"
                key={shopgiff.id}>
                <img
                  src={shopgiff.image}
                  alt={shopgiff.name}
                  className="w-32 h-32 object-cover mx-auto"
                />
                <div className="text-center mt-2 font-semibold">
                  {shopgiff.name}
                </div>
                <div className="text-center text-gray-600">
                  {shopgiff.price} VND
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShopGiff;
