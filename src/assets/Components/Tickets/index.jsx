import React, { useEffect, useState } from "react";
import { getAllCinema } from "../../../api/cinemaRequest";
import { useDispatch, useSelector } from "react-redux";

function Tickets() {
  const cinemas = useSelector((state) => state.cinema.cinemas || []);
  const dispatch = useDispatch();
  const [active, setActive] = useState("TPHCM");

  useEffect(() => {
    getAllCinema(dispatch);
  }, [dispatch]);

  // ✅ Lấy danh sách city không trùng lặp
  const uniqueCities = [...new Set(cinemas.map((cinema) => cinema.city))];

  // ✅ Lọc các rạp theo city đang active
  const filteredCinemas = cinemas.filter((c) => c.city === active);

  return (
    <div>
      {/* Tabs city */}
      <div className="flex gap-4">
        {uniqueCities.map((city, index) => (
          <button
            key={index}
            className={`px-4 py-2 rounded cursor-pointer ${
              active === city ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => setActive(city)}
          >
            {city}
          </button>
        ))}
      </div>

      {/* Danh sách rạp */}
      <div className="mt-4">
        {filteredCinemas.map((cinema) => (
          <div key={cinema._id} className="p-2 border-b">
            <button className="px-4 py-2 rounded bg-amber-300 cursor-pointer">
              {" "}
              {cinema.address}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Tickets;
